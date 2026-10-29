import React, { useState } from 'react';
import { Play, RotateCcw, Code, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

export const PythonLabPreview: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<'binarySearch' | 'mergeSort' | 'fibonacci'>('binarySearch');
  const [targetNumber, setTargetNumber] = useState<number>(42);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    "// Python 3.12 Computational Lab Ready.",
    "// Select an algorithm and trigger execution to inspect the step-by-step runtime trace."
  ]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const arrayData = [12, 19, 27, 33, 42, 58, 64, 75, 88, 93];

  const runAlgorithm = () => {
    sound.click();
    setIsRunning(true);
    setExecutionLogs(["[INIT] Initializing Python execution runtime...", "[STACK] Allocating memory frames..."]);

    if (selectedAlgo === 'binarySearch') {
      let low = 0;
      let high = arrayData.length - 1;
      const logs: string[] = [
        `[SEARCH] Target: ${targetNumber} in sorted array: [${arrayData.join(', ')}]`,
      ];

      let step = 1;
      let found = false;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const val = arrayData[mid];
        logs.push(`Step ${step}: low=${low}, high=${high}, mid=${mid} -> val=${val}`);

        if (val === targetNumber) {
          logs.push(`[SUCCESS] Found target ${targetNumber} at index ${mid} in ${step} steps (O(log n)).`);
          found = true;
          break;
        } else if (val < targetNumber) {
          logs.push(` -> ${val} < ${targetNumber}, narrowing search to right subarray [${mid + 1}..${high}]`);
          low = mid + 1;
        } else {
          logs.push(` -> ${val} > ${targetNumber}, narrowing search to left subarray [${low}..${mid - 1}]`);
          high = mid - 1;
        }
        step++;
      }

      if (!found) {
        logs.push(`[NOT_FOUND] Target ${targetNumber} not present in dataset.`);
      }

      setTimeout(() => {
        setExecutionLogs(logs);
        setIsRunning(false);
        sound.success();
      }, 350);
    } else if (selectedAlgo === 'mergeSort') {
      setTimeout(() => {
        setExecutionLogs([
          `[SORT] Unsorted array: [64, 33, 12, 88, 19, 75, 42, 27]`,
          `[DIVIDE] Partitioning at mid: Left=[64, 33, 12, 88] | Right=[19, 75, 42, 27]`,
          `[DIVIDE] Recursive leaf split: [64, 33] -> [12, 88]`,
          `[CONQUER] Merging sorted pairs: [33, 64] & [12, 88] -> [12, 33, 64, 88]`,
          `[CONQUER] Merging sorted pairs: [19, 75] & [27, 42] -> [19, 27, 42, 75]`,
          `[FINAL] Two-pointer merge into complete sorted array:`,
          `-> [12, 19, 27, 33, 42, 64, 75, 88] (Time: O(n log n), Space: O(n))`
        ]);
        setIsRunning(false);
        sound.success();
      }, 400);
    } else {
      setTimeout(() => {
        setExecutionLogs([
          `[FIBONACCI] Calculating fib(8) with Memoization Cache:`,
          `Cache hit check: memo = {}`,
          `fib(2) = 1 (saved)`,
          `fib(3) = fib(2) + fib(1) = 2 (saved)`,
          `fib(4) = fib(3) + fib(2) = 3 (cache lookup O(1))`,
          `fib(5) = fib(4) + fib(3) = 5 (cache lookup O(1))`,
          `fib(6) = 8, fib(7) = 13, fib(8) = 21`,
          `[RESULT] fib(8) = 21. Reduced operations from O(2^n) exponential to O(n) linear!`
        ]);
        setIsRunning(false);
        sound.success();
      }, 400);
    }
  };

  const resetLogs = () => {
    sound.hover();
    setExecutionLogs([
      "// Python 3.12 Computational Lab Ready.",
      "// Select an algorithm and trigger execution to inspect the step-by-step runtime trace."
    ]);
  };

  return (
    <div className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl overflow-hidden text-xs font-mono shadow-2xl">
      {/* Interactive Controls Header */}
      <div className="bg-[var(--bg-surface-elevated)] px-3 py-2 border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Code size={14} className="text-[var(--color-pink)]" />
          <span className="font-display font-bold text-[var(--text-primary)]">PYTHON ALGORITHMIC LAB</span>
        </div>

        {/* Algo Selector Buttons */}
        <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded border border-[var(--border-subtle)]">
          <button
            onClick={() => { sound.switch(); setSelectedAlgo('binarySearch'); }}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
              selectedAlgo === 'binarySearch' ? 'bg-[var(--color-turquoise)] text-white font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Binary Search
          </button>
          <button
            onClick={() => { sound.switch(); setSelectedAlgo('mergeSort'); }}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
              selectedAlgo === 'mergeSort' ? 'bg-[var(--color-pink)] text-white font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            MergeSort
          </button>
          <button
            onClick={() => { sound.switch(); setSelectedAlgo('fibonacci'); }}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
              selectedAlgo === 'fibonacci' ? 'bg-[var(--color-blue)] text-white font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Memoized Fib
          </button>
        </div>
      </div>

      {/* Target Array & Controls Bar */}
      <div className="p-3 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-[var(--text-muted)]">Array:</span>
          <div className="flex flex-wrap gap-1">
            {arrayData.map((val) => (
              <span
                key={val}
                onClick={() => {
                  sound.hover();
                  setTargetNumber(val);
                }}
                className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                  val === targetNumber
                    ? 'bg-[var(--color-pink)] text-white font-bold'
                    : 'bg-[var(--bg-surface-elevated)] text-[var(--color-turquoise)] hover:border hover:border-[var(--color-turquoise)]'
                }`}
                title={`Click to set target = ${val}`}
              >
                {val}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runAlgorithm}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 bg-[var(--color-turquoise)] hover:opacity-90 text-white font-bold rounded transition-colors disabled:opacity-50"
          >
            <Play size={11} fill="currentColor" /> {isRunning ? "Running..." : "Run Python Script"}
          </button>
          <button
            onClick={resetLogs}
            className="p-1 hover:text-[var(--color-pink)] text-[var(--text-muted)] transition-colors"
            title="Clear output"
            aria-label="Clear output"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Terminal Output Window */}
      <div className="p-3 bg-[var(--bg-primary)] min-h-[140px] max-h-[190px] overflow-y-auto space-y-1 text-[11px] leading-relaxed">
        {executionLogs.map((log, index) => {
          const isSuccess = log.includes('[SUCCESS]') || log.includes('[RESULT]');
          const isInit = log.includes('[INIT]') || log.includes('//');
          const isDivide = log.includes('[DIVIDE]') || log.includes('[CONQUER]');
          return (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                isSuccess
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : isInit
                  ? 'text-[var(--text-muted)]'
                  : isDivide
                  ? 'text-[var(--color-blue)]'
                  : 'text-[var(--text-primary)]'
              }`}
            >
              {isSuccess && <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" />}
              <span>{log}</span>
            </div>
          );
        })}
      </div>

      <div className="px-3 py-1.5 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[9px] text-[var(--text-muted)]">
        <span>RUNTIME: PYTHON 3 INTERACTIVE REPL ENGINE</span>
        <span className="text-[var(--color-turquoise)] font-semibold">ALGORITHMIC ANALYSIS ACTIVE</span>
      </div>
    </div>
  );
};

