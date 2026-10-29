import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Layers, Zap, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';

type GeometryMode = 'matrix' | 'torus' | 'lattice';

export const ThreeHeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<GeometryMode>('matrix');
  const [isDragging, setIsDragging] = useState(false);
  const [fps, setFps] = useState(60);
  const [rotationTelemetry, setRotationTelemetry] = useState({ pitch: '0.0', yaw: '0.0' });

  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const modeRef = useRef<GeometryMode>('matrix');
  modeRef.current = activeMode;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const isLightInitial = themeRef.current === 'light';
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isLightInitial ? 0xF3EBDD : 0x070600, 0.022);

    let width = container.clientWidth || 550;
    let height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      console.warn('WebGL is not supported or failed to initialize:', err);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.cursor = 'grab';

    // 2. Dynamic Lighting Rig
    const ambientLight = new THREE.AmbientLight(isLightInitial ? 0xFAF7F0 : 0x070600, isLightInitial ? 2.6 : 1.5);
    scene.add(ambientLight);

    // Primary Pink Key Light
    const pinkLight = new THREE.PointLight(isLightInitial ? 0xD94364 : 0xEA526F, 5.5, 28);
    pinkLight.position.set(5, 4, 4);
    scene.add(pinkLight);

    // Turquoise Fill Light
    const turquoiseLight = new THREE.PointLight(isLightInitial ? 0x138DA3 : 0x23B5D3, 5.8, 28);
    turquoiseLight.position.set(-5, -3, 3);
    scene.add(turquoiseLight);

    // Electric Blue Rim Light
    const blueLight = new THREE.PointLight(isLightInitial ? 0x277AC1 : 0x279AF1, 4.0, 24);
    blueLight.position.set(0, 6, -3);
    scene.add(blueLight);

    // Mouse Tracking Specular Spotlight
    const cursorLight = new THREE.PointLight(isLightInitial ? 0x138DA3 : 0x23B5D3, 3.5, 16);
    cursorLight.position.set(0, 0, 4.5);
    scene.add(cursorLight);

    // 3. Central Geometry Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Mode Geometries
    const matrixGeom = new THREE.IcosahedronGeometry(2.1, 1);
    const torusGeom = new THREE.TorusKnotGeometry(1.4, 0.42, 140, 18);
    const latticeGeom = new THREE.DodecahedronGeometry(2.1, 0);

    // Material
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: isLightInitial ? 0xFAF7F0 : 0x0B0A06,
      emissive: isLightInitial ? 0x1C1914 : 0x091418,
      roughness: isLightInitial ? 0.25 : 0.14,
      metalness: isLightInitial ? 0.32 : 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      flatShading: true,
    });

    const coreMesh = new THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>(matrixGeom, coreMaterial);
    coreGroup.add(coreMesh);

    // Wireframe Overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: isLightInitial ? 0x138DA3 : 0x23B5D3,
      wireframe: true,
      transparent: true,
      opacity: isLightInitial ? 0.55 : 0.45,
    });
    const wireframeMesh = new THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>(matrixGeom, wireframeMaterial);
    wireframeMesh.scale.setScalar(1.025);
    coreGroup.add(wireframeMesh);

    // Glowing Vertex Points
    const vertexPointsGeom = new THREE.BufferGeometry();
    vertexPointsGeom.setAttribute('position', matrixGeom.attributes.position);

    const vertexMaterial = new THREE.PointsMaterial({
      color: isLightInitial ? 0xD94364 : 0xEA526F,
      size: 0.14,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const vertexPoints = new THREE.Points(vertexPointsGeom, vertexMaterial);
    coreGroup.add(vertexPoints);

    // 4. Floating Sculptural Satellite Fragments
    const fragmentsGroup = new THREE.Group();
    scene.add(fragmentsGroup);

    const fragmentGeom = new THREE.OctahedronGeometry(0.22, 0);
    const fragmentMat = new THREE.MeshPhysicalMaterial({
      color: isLightInitial ? 0xEAE0CF : 0x16140A,
      roughness: 0.22,
      metalness: isLightInitial ? 0.35 : 0.85,
      flatShading: true,
    });

    const fragmentCount = 14;
    const fragments: { mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; tilt: number }[] = [];

    for (let i = 0; i < fragmentCount; i++) {
      const fragMesh = new THREE.Mesh(fragmentGeom, fragmentMat);
      const orbitRadius = 2.8 + Math.random() * 1.6;
      const angle = (i / fragmentCount) * Math.PI * 2;
      const tilt = (Math.random() - 0.5) * Math.PI * 0.7;

      fragMesh.position.x = Math.cos(angle) * orbitRadius;
      fragMesh.position.y = Math.sin(angle) * Math.sin(tilt) * orbitRadius;
      fragMesh.position.z = Math.sin(angle) * Math.cos(tilt) * orbitRadius;

      fragmentsGroup.add(fragMesh);
      fragments.push({
        mesh: fragMesh,
        orbitRadius,
        speed: 0.006 + Math.random() * 0.008,
        angle,
        tilt,
      });
    }

    // 5. Gyroscopic Orbital Precision Rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Ring 1 (Turquoise)
    const ring1Geom = new THREE.RingGeometry(3.3, 3.33, 90);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: isLightInitial ? 0x138DA3 : 0x23B5D3,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.52,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI * 0.35;
    ringGroup.add(ring1);

    // Ring 2 (Pink)
    const ring2Geom = new THREE.RingGeometry(3.8, 3.83, 90);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: isLightInitial ? 0xD94364 : 0xEA526F,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.44,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI * 0.4;
    ring2.rotation.z = Math.PI * 0.2;
    ringGroup.add(ring2);

    // Ring 3 (Electric Blue Dashed)
    const ring3Curve = new THREE.EllipseCurve(0, 0, 4.35, 4.35, 0, 2 * Math.PI, false, 0);
    const ring3Points = ring3Curve.getPoints(120);
    const ring3Geom = new THREE.BufferGeometry().setFromPoints(ring3Points);
    const ring3Mat = new THREE.LineDashedMaterial({
      color: isLightInitial ? 0x277AC1 : 0x279AF1,
      dashSize: 0.4,
      gapSize: 0.25,
      transparent: true,
      opacity: 0.6,
    });
    const ring3 = new THREE.Line(ring3Geom, ring3Mat);
    ring3.computeLineDistances();
    ring3.rotation.x = Math.PI * 0.62;
    ringGroup.add(ring3);

    // 6. Photonic Expanding Shockwave Ring (Triggers on click)
    const shockwaveGeom = new THREE.RingGeometry(0.1, 0.16, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: isLightInitial ? 0xD94364 : 0xEA526F,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const shockwave = new THREE.Mesh(shockwaveGeom, shockwaveMat);
    scene.add(shockwave);

    let shockwaveActive = false;
    let shockwaveScale = 0.1;

    const triggerShockwave = () => {
      sound.click();
      shockwaveActive = true;
      shockwaveScale = 0.1;
      shockwave.scale.setScalar(shockwaveScale);
      shockwaveMat.opacity = 0.9;
    };

    // 7. Volumetric Ambient Dust
    const particleCount = 1200;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const updateParticleColors = (isLight: boolean) => {
      const colPink = new THREE.Color(isLight ? 0xD94364 : 0xEA526F);
      const colTurquoise = new THREE.Color(isLight ? 0x138DA3 : 0x23B5D3);
      const colNeutral = new THREE.Color(isLight ? 0x70685D : 0xF7F7FF);

      for (let i = 0; i < particleCount; i++) {
        const choice = (i % 10) / 10;
        const col = choice < 0.35 ? colPink : choice < 0.75 ? colTurquoise : colNeutral;
        particleColors[i * 3] = col.r;
        particleColors[i * 3 + 1] = col.g;
        particleColors[i * 3 + 2] = col.b;
      }
      particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    };
    updateParticleColors(isLightInitial);

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: isLightInitial ? 0.75 : 0.65,
      blending: isLightInitial ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particleGeom, particleMat);
    scene.add(particleField);

    // 8. Interaction State
    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isDown: false,
      downX: 0,
      downY: 0,
      rotX: 0,
      rotY: 0,
      targetRotX: 0,
      targetRotY: 0,
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.targetX = nx;
      pointer.targetY = ny;

      if (pointer.isDown) {
        const dx = e.clientX - pointer.downX;
        const dy = e.clientY - pointer.downY;
        pointer.targetRotY += dx * 0.007;
        pointer.targetRotX += dy * 0.007;
        pointer.downX = e.clientX;
        pointer.downY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      pointer.isDown = true;
      pointer.downX = e.clientX;
      pointer.downY = e.clientY;
      setIsDragging(true);
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerUp = () => {
      pointer.isDown = false;
      setIsDragging(false);
      renderer.domElement.style.cursor = 'grab';
    };

    const onDoubleClick = () => {
      triggerShockwave();
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('dblclick', onDoubleClick);

    // Resize Handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Frame Rate & Render Loop
    let animId: number;
    let frameCount = 0;
    let lastFpsUpdate = performance.now();
    let currentGeometryMode: GeometryMode = 'matrix';

    const render = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastFpsUpdate >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFpsUpdate = now;
      }

      // Check for mode change
      if (modeRef.current !== currentGeometryMode) {
        currentGeometryMode = modeRef.current;
        let targetGeom: THREE.BufferGeometry = matrixGeom;
        if (currentGeometryMode === 'torus') targetGeom = torusGeom;
        if (currentGeometryMode === 'lattice') targetGeom = latticeGeom;

        coreMesh.geometry = targetGeom;
        wireframeMesh.geometry = targetGeom;
        vertexPointsGeom.setAttribute('position', targetGeom.attributes.position);
        triggerShockwave();
      }

      // Smooth pointer damping
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      // Update cursor light
      cursorLight.position.x = pointer.x * 4.5;
      cursorLight.position.y = pointer.y * 4.5;

      // Continuous auto-rotation when not dragging
      if (!pointer.isDown) {
        pointer.targetRotY += 0.004;
        pointer.targetRotX = Math.sin(now * 0.0008) * 0.15;
      }

      pointer.rotX += (pointer.targetRotX - pointer.rotX) * 0.08;
      pointer.rotY += (pointer.targetRotY - pointer.rotY) * 0.08;

      coreGroup.rotation.x = pointer.rotX;
      coreGroup.rotation.y = pointer.rotY;

      // Update Telemetry Display (degrees)
      const degPitch = ((pointer.rotX * 180) / Math.PI) % 360;
      const degYaw = ((pointer.rotY * 180) / Math.PI) % 360;
      setRotationTelemetry({
        pitch: degPitch.toFixed(1),
        yaw: degYaw.toFixed(1),
      });

      // Animate Orbital Rings
      ring1.rotation.z += 0.007;
      ring2.rotation.x += 0.005;
      ring3.rotation.z -= 0.004;

      // Animate Satellite Fragments
      fragments.forEach((frag) => {
        frag.angle += frag.speed;
        frag.mesh.position.x = Math.cos(frag.angle) * frag.orbitRadius;
        frag.mesh.position.y = Math.sin(frag.angle) * Math.sin(frag.tilt) * frag.orbitRadius;
        frag.mesh.position.z = Math.sin(frag.angle) * Math.cos(frag.tilt) * frag.orbitRadius;
        frag.mesh.rotation.x += 0.015;
        frag.mesh.rotation.y += 0.02;
      });

      // Animate Particle Field
      particleField.rotation.y -= 0.0008;
      particleField.rotation.x = Math.sin(now * 0.0004) * 0.08;

      // Shockwave Pulse Animation
      if (shockwaveActive) {
        shockwaveScale += 0.18;
        shockwave.scale.setScalar(shockwaveScale);
        shockwaveMat.opacity = Math.max(0, 0.9 - shockwaveScale * 0.16);
        shockwave.rotation.z += 0.04;
        if (shockwaveMat.opacity <= 0.01) {
          shockwaveActive = false;
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('dblclick', onDoubleClick);
      cancelAnimationFrame(animId);

      renderer.dispose();
      matrixGeom.dispose();
      torusGeom.dispose();
      latticeGeom.dispose();
      fragmentGeom.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      particleGeom.dispose();
      shockwaveGeom.dispose();
      coreMaterial.dispose();
      wireframeMaterial.dispose();
      vertexMaterial.dispose();
      fragmentMat.dispose();
      shockwaveMat.dispose();
    };
  }, []);

  const switchMode = (mode: GeometryMode) => {
    sound.switch();
    setActiveMode(mode);
  };

  return (
    <div
      data-cursor-label="DRAG 3D"
      className="relative w-full h-[440px] sm:h-[520px] lg:h-[600px] flex items-center justify-center select-none"
    >
      {/* Background Soft Atmospheric Glow */}
      <div className="absolute inset-0 bg-radial from-[var(--color-turquoise)]/12 via-[var(--color-pink)]/06 to-transparent blur-3xl pointer-events-none" />

      {/* WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full relative z-10"
        title="Interactive 3D WebGL Core — Click & drag to rotate, double click for energy pulse"
      />

      {/* Top Left: Sleek Segmented Geometry Mode Switcher */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 font-mono text-[11px] bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] p-2 rounded-xl shadow-xl text-[var(--text-primary)]">
        <span className="flex items-center gap-1.5 text-[var(--color-turquoise)] font-semibold uppercase text-[10px] tracking-wider">
          <Layers size={11} className="text-[var(--color-pink)]" />
          GEOMETRY MORPH
        </span>
        <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
          <button
            onClick={() => switchMode('matrix')}
            className={`px-2.5 py-1 rounded-md text-[10px] transition-all font-semibold ${
              activeMode === 'matrix'
                ? 'bg-[var(--color-pink)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Matrix
          </button>
          <button
            onClick={() => switchMode('torus')}
            className={`px-2.5 py-1 rounded-md text-[10px] transition-all font-semibold ${
              activeMode === 'torus'
                ? 'bg-[var(--color-turquoise)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Torus
          </button>
          <button
            onClick={() => switchMode('lattice')}
            className={`px-2.5 py-1 rounded-md text-[10px] transition-all font-semibold ${
              activeMode === 'lattice'
                ? 'bg-[var(--color-blue)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Lattice
          </button>
        </div>
      </div>

      {/* Top Right: Telemetry & Orientation */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:flex flex-col items-end gap-1 font-mono text-[10px] text-[var(--text-muted)] bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] px-3 py-2 rounded-xl shadow-lg">
        <span className="text-[var(--color-turquoise)] flex items-center gap-1.5 font-semibold">
          <Activity size={11} className="animate-pulse" /> PITCH: {rotationTelemetry.pitch}° | YAW: {rotationTelemetry.yaw}°
        </span>
        <span className="text-[var(--color-pink)] font-bold flex items-center gap-1">
          <Rotate3d size={11} /> THREE.JS PBR // {fps} FPS
        </span>
      </div>

      {/* Bottom Center: Gesture Hint Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 font-mono text-[10px] text-[var(--text-secondary)] bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] px-3.5 py-1.5 rounded-full shadow-lg">
        <Zap size={11} className="text-[var(--color-pink)] animate-pulse" />
        <span>{isDragging ? 'ROTATING 3D MODEL' : 'DRAG TO ROTATE // DBL-CLICK TO PULSE'}</span>
      </div>
    </div>
  );
};
