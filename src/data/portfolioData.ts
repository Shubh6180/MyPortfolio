import { Project, Skill, JourneyMilestone } from '../types';

export const PERSONAL_INFO = {
  name: "Shubh Srivastava",
  monogram: "SS",
  headline: "CURIOUS MIND. BUILDING WHAT'S NEXT.",
  subheadline: "I'm Shubh — a BTech student at Newton School of Technology, exploring software engineering, AI, and the art of turning ideas into things people can use.",
  philosophy: "I learn by building, experiment without being afraid to break things, and believe the best way to understand technology is to create something with it.",
  education: {
    degree: "Bachelor of Technology (BTech) in Computer Science",
    institution: "Newton School of Technology",
    location: "Pune, India",
    status: "Currently Pursuing (Early Engineering Journey)",
  },
  earlyBackground: [
    "WhiteHat Jr Mobile App Development Certification",
    "WhiteHat Jr Game Development Certification",
  ],
  socialLinks: {
    github: "https://github.com/Shubh6180",
    linkedin: "https://www.linkedin.com/in/shubh-srivastava-75081530b/",
    instagram: "https://www.instagram.com/shubhrealm/",
  },
  contactPlaceholder: "shubh.srivastava.tech@placeholder.dev",
  coordinates: "18.5204° N, 73.8567° E (Pune, IN)",
  status: "ACTIVE EXPLORER & BUILDER",
};

export const PROJECTS: Project[] = [
  {
    id: "hostlur",
    number: "01",
    title: "Hostlur",
    tagline: "Student Hostel Management & Utility Hub Prototype",
    category: "HACKATHON PROTOTYPE",
    statusBadge: "Hackathon Prototype",
    timeframe: "Student Hackathon Project",
    summary: "A focused student hackathon prototype engineered to solve fragmented communication and service coordination for residents in university hostels.",
    star: {
      situation: "Students residing in university hostels frequently struggle with disjointed channels for reporting maintenance issues, checking dining schedules, and receiving urgent community notices.",
      task: "Conceive, architect, and prototype a unified, accessible web interface within hackathon time constraints to streamline daily hostel living utilities into a single coherent portal.",
      action: "Crafted responsive UI wireframes, established the information hierarchy, and implemented functional client-side logic for room maintenance logs, query categories, and mock notice broadcasts using HTML, CSS, and modern JavaScript.",
      result: "Constructed a functional interactive prototype demonstrated to peer builders; solidified core skills in DOM state synchronization, responsive design patterns, and collaborative fast-paced problem solving."
    },
    technologies: ["HTML5", "CSS3", "JavaScript (ES6)", "UI/UX Architecture", "Client State Management"],
    keyLearnings: [
      "Structuring multi-view user journeys under tight time limits",
      "Designing responsive layouts prioritizing mobile viewports for busy students",
      "Translating common campus pain points into clean user flows"
    ],
    verifiedLinks: {
      github: "https://github.com/Shubh6180", // user's verified GitHub profile
    },
    interactiveType: "hostlur-preview",
    isFlagship: true,
  },
  {
    id: "urbanpulse-ai",
    number: "02",
    title: "UrbanPulse AI",
    tagline: "Transit-Mounted Urban Infrastructure & Road Telemetry Concept",
    category: "PROPOSED ARCHITECTURE / CONCEPT",
    statusBadge: "Proposed Concept & Architecture",
    timeframe: "System Design Exploration",
    summary: "A proposed architectural concept leveraging municipal transit vehicles as mobile sensory units to detect road surface hazards with edge computer vision.",
    star: {
      situation: "Municipal road monitoring typically relies on sporadic manual inspection or reactive citizen complaints, leading to delayed repair cycles, traffic hazards, and high inspection overhead.",
      task: "Formulate a proactive, low-infrastructure urban sensing framework using existing public transit fleets (city buses) as continuous road-monitoring nodes.",
      action: "Researched and drafted a multi-tier technical architecture: onboard camera video ingestion, lightweight edge computer vision inference for pothole/crack detection, GPS coordinate tagging, severity scoring algorithms, and a municipal GIS dashboard blueprint.",
      result: "Formulated an end-to-end technical specification and conceptual system blueprint; deepened understanding of edge AI constraints, video ingestion pipelines, and geospatial data processing."
    },
    technologies: ["Computer Vision (Concept)", "Edge AI Pipeline", "GPS Telemetry", "System Architecture", "Urban Analytics"],
    keyLearnings: [
      "Architecting edge-to-cloud data synchronization models",
      "Managing false-positive filtering in real-world computer vision pipelines",
      "Severity indexing algorithms for municipal triage prioritization"
    ],
    verifiedLinks: {
      github: "https://github.com/Shubh6180",
    },
    interactiveType: "urbanpulse-telemetry",
    isFlagship: true,
  },
  {
    id: "python-experiments",
    number: "03",
    title: "Computational & Algorithmic Lab",
    tagline: "Python Scripts, Data Processing & Algorithmic Problem Solving",
    category: "EXPLORATORY CODE & UTILITIES",
    statusBadge: "Active Codebase",
    timeframe: "Ongoing Exploration",
    summary: "A practical lab of computational scripts, automation tools, and algorithmic solutions developed to build rigorous programming fundamentals.",
    star: {
      situation: "Deep engineering confidence requires continuous hands-on problem solving beyond theoretical lectures, testing edge cases and code efficiency.",
      task: "Build focused Python programs to explore algorithmic complexity, file automation, data structures, and mathematical simulations.",
      action: "Implemented algorithmic scripts (sorting mechanics, graph representations, recursion puzzles), file parsing utilities, and problem-solving exercises with clean modular functions.",
      result: "Strengthened algorithmic reasoning, clean coding practices, and debugging resilience; built the foundational computational core required for advanced AI and machine learning."
    },
    technologies: ["Python 3", "Data Structures", "Algorithm Analysis", "File Automation", "Terminal CLI"],
    keyLearnings: [
      "Analyzing Big-O time and space complexities in practice",
      "Writing modular, defensive Python code with proper exception handling",
      "Structuring clean command-line interfaces for developer scripts"
    ],
    verifiedLinks: {
      github: "https://github.com/Shubh6180",
    },
    interactiveType: "python-playground",
  },
  {
    id: "foundational-game-dev",
    number: "04",
    title: "Interactive Game Systems & Mechanics",
    tagline: "Early Interactive Systems, Coordinate Geometry & Event Loops",
    category: "FOUNDATIONAL LEARNING",
    statusBadge: "Foundational Milestone",
    timeframe: "Early Spark & Certifications",
    summary: "The creative origin of my programming journey: translating interactive game concepts into running event loops, collision detection, and sprite systems.",
    star: {
      situation: "Playing video games sparked an intense curiosity about how static screens transform into responsive, living worlds through code.",
      task: "Complete structured WhiteHat Jr Game Development & Mobile App curricula to grasp foundational event handlers, loops, and coordinate geometry.",
      action: "Engineered sprite-based mechanics, dynamic collision boundaries, scoring states, and responsive touch/keyboard event listeners across interactive mini-projects.",
      result: "Achieved WhiteHat Jr certifications and discovered the thrill of creating interactive software from scratch; sparked the definitive ambition to pursue a Computer Science engineering degree."
    },
    technologies: ["Game Loops", "Coordinate Math", "Collision Detection", "Event Dispatching", "Interactive Logic"],
    keyLearnings: [
      "Understanding state transitions driven by continuous tick-based render loops",
      "Translating user input events into real-time visual coordinate changes",
      "The creative empowerment of turning abstract logic into playable experiences"
    ],
    verifiedLinks: {
      github: "https://github.com/Shubh6180",
    },
    interactiveType: "game-engine",
  }
];

export const SKILLS: Skill[] = [
  // Building With
  {
    id: "python",
    name: "Python",
    category: "Languages",
    stage: "Building With",
    relevance: "Primary language for computational problem solving, data scripts, and entry point into machine learning.",
    application: "Algorithm scripts, utility tools, data manipulation, and technical exploration."
  },
  {
    id: "html-css",
    name: "HTML5 & CSS3",
    category: "Web & Frontend",
    stage: "Building With",
    relevance: "Core foundation for semantic web markup, responsive layouts, Flexbox, CSS Grid, and custom design systems.",
    application: "Frontend project interfaces, interactive prototypes like Hostlur, and responsive UI."
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "Languages",
    stage: "Building With",
    relevance: "Modern client-side scripting, DOM manipulation, asynchronous programming, and interactive web mechanics.",
    application: "Application logic for web prototypes, event handling, and dynamic interface states."
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    category: "Developer Tools",
    stage: "Building With",
    relevance: "Version control system essential for tracking code changes, branching experiments, and collaborative builds.",
    application: "Maintaining personal repositories, project history, and hackathon collaboration."
  },
  {
    id: "vscode",
    name: "VS Code & Terminal",
    category: "Developer Tools",
    stage: "Building With",
    relevance: "Daily development environment with custom workflows, terminal navigation, and diagnostic debugging.",
    application: "Writing, testing, and debugging Python and web projects."
  },

  // Exploring & Learning
  {
    id: "react",
    name: "React & TypeScript",
    category: "Web & Frontend",
    stage: "Exploring & Learning",
    relevance: "Modern declarative UI development, component architecture, hooks, and static type safety.",
    application: "Building component-driven frontends and this interactive portfolio platform."
  },
  {
    id: "java",
    name: "Java Fundamentals",
    category: "Languages",
    stage: "Exploring & Learning",
    relevance: "Object-oriented programming concepts, strong typing, class hierarchies, and memory management.",
    application: "Academic CS coursework, data structures, and core software engineering paradigms."
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    category: "Core CS & AI",
    stage: "Exploring & Learning",
    relevance: "Understanding neural network fundamentals, computer vision pipelines, and modern AI development.",
    application: "Conceptualizing architectures like UrbanPulse AI and experimenting with ML libraries."
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    category: "Core CS & AI",
    stage: "Exploring & Learning",
    relevance: "Time and space complexity (Big-O), arrays, linked lists, recursion, trees, and searching/sorting algorithms.",
    application: "Competitive programming practice and rigorous problem-solving foundation."
  },
  {
    id: "linux-cli",
    name: "Linux / Unix Shell",
    category: "Developer Tools",
    stage: "Exploring & Learning",
    relevance: "Command-line proficiency, file system navigation, shell scripting basics, and environment configuration.",
    application: "Navigating terminal environments and automating development tasks."
  },

  // Foundational
  {
    id: "game-systems",
    name: "Game Systems & Logic",
    category: "Core CS & AI",
    stage: "Foundational",
    relevance: "Real-time render loops, 2D coordinate calculations, collision bounding boxes, and state machines.",
    application: "Early interactive game builds and WhiteHat Jr certification projects."
  },
  {
    id: "ui-ux",
    name: "UI/UX & Visual Design",
    category: "Web & Frontend",
    stage: "Foundational",
    relevance: "Visual hierarchy, deliberate typography, color theory, spacing, and user accessibility.",
    application: "Designing interfaces that are both aesthetically striking and intuitively usable."
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    era: "FOUNDATIONS",
    phaseLabel: "Early Spark & Genesis",
    title: "First Code & Game Development",
    institutionOrContext: "WhiteHat Jr Courses & Certifications",
    description: "Encountered programming through hands-on mobile app and game development curricula. Learned the power of variables, conditions, loops, and coordinates while building playable games.",
    keyTakeaway: "Discovered that code is not just dry math—it is a creative canvas where abstract logic transforms into living, interactive products.",
    tags: ["Mobile App Dev", "Game Logic", "Certification", "Early Curiosity"],
    type: "early-spark"
  },
  {
    era: "ACADEMICS",
    phaseLabel: "Engineering Journey",
    title: "BTech in Computer Science",
    institutionOrContext: "Newton School of Technology, Pune",
    description: "Began formal engineering studies at Newton School of Technology. Immersing in computer science fundamentals, programming logic, object-oriented concepts, and collaborative engineering.",
    keyTakeaway: "Building a rigorous academic foundation while maintaining an active bias toward hands-on coding and practical execution.",
    tags: ["BTech CSE", "Data Structures", "Java Basics", "Campus Community"],
    type: "education"
  },
  {
    era: "EXPERIENCE",
    phaseLabel: "Hackathon Prototyping",
    title: "Building Hostlur Prototype",
    institutionOrContext: "Student Hackathon Event",
    description: "Collaborated under high intensity to design and prototype Hostlur, a student hostel management web interface aimed at simplifying residential logistics and maintenance tracking.",
    keyTakeaway: "Experienced the rush of rapid product thinking, front-end architecture under deadline pressure, and effective peer collaboration.",
    tags: ["Hackathon", "Web Development", "JavaScript", "User Flow Design"],
    type: "hackathon"
  },
  {
    era: "EXPLORATION",
    phaseLabel: "Architectural Thinking",
    title: "UrbanPulse AI & Systems Design",
    institutionOrContext: "Independent Concept & Research",
    description: "Proposed the UrbanPulse AI architecture, conceptualizing mobile transit units equipped with computer vision for proactive road hazard telemetry and municipal triage.",
    keyTakeaway: "Gained an appreciation for system architecture, edge computing constraints, and how AI can address real-world municipal infrastructure challenges.",
    tags: ["Computer Vision Concept", "System Design", "Edge AI", "GIS Telemetry"],
    type: "expansion"
  },
  {
    era: "CURRENT HORIZON",
    phaseLabel: "Active Learning & Building",
    title: "Expanding Foundations & Open Source",
    institutionOrContext: "Present Focus",
    description: "Actively writing Python scripts, diving into modern web frameworks (React, TypeScript), mastering data structures, and seeking collaborative engineering opportunities.",
    keyTakeaway: "'I learn by building, experiment without being afraid to break things, and believe the best way to understand technology is to create something with it.'",
    tags: ["React & TypeScript", "Python Problem Solving", "Open Source", "Continuous Learning"],
    type: "current"
  }
];

