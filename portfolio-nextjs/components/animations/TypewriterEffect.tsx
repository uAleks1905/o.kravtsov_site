'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TypewriterLine {
  text: string;
  className?: string;
}

interface TypewriterEffectProps {
  lines: TypewriterLine[];
  typingSpeed?: number;
  delayBetweenLines?: number;
  startDelay?: number;
}

export default function TypewriterEffect({
  lines,
  typingSpeed = 100,
  delayBetweenLines = 500,
  startDelay = 500,
}: TypewriterEffectProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  const advanceLine = useCallback(() => {
    if (currentLineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, delayBetweenLines);
    }
  }, [currentLineIndex, lines.length, delayBetweenLines]);

  useEffect(() => {
    if (!started) return;
    if (currentLineIndex >= lines.length) return;

    const currentText = lines[currentLineIndex].text;

    if (currentCharIndex < currentText.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      advanceLine();
    }
  }, [started, currentCharIndex, currentLineIndex, lines, typingSpeed, advanceLine]);

  const isTypingCurrentLine = (lineIndex: number) =>
    lineIndex === currentLineIndex && currentCharIndex < lines[lineIndex].text.length;

  const isLastLine = (lineIndex: number) =>
    lineIndex === lines.length - 1;

  const showCursor = (lineIndex: number) => {
    if (lineIndex < currentLineIndex) return false;
    if (lineIndex > currentLineIndex) return false;
    if (isTypingCurrentLine(lineIndex)) return true;
    if (lineIndex === currentLineIndex && currentCharIndex >= lines[lineIndex].text.length && isLastLine(lineIndex)) return true;
    return false;
  };

  return (
    <div>
      {lines.map((line, lineIndex) => {
        const displayText =
          lineIndex < currentLineIndex
            ? line.text
            : lineIndex === currentLineIndex
              ? line.text.slice(0, currentCharIndex)
              : '';

        if (lineIndex > currentLineIndex && !displayText) {
          return (
            <div key={lineIndex} className={line.className} style={{ opacity: 0 }}>
              {line.text}
            </div>
          );
        }

        return (
          <div key={lineIndex} className={line.className}>
            {displayText}
            {showCursor(lineIndex) && (
              <motion.span
                className="inline-block w-[3px] h-[1em] bg-brand-primary ml-[2px] align-bottom"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
