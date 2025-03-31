import React, { useEffect, useState } from 'react';

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ words, className = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100; // Faster when deleting
    const deletingDelay = 2000; // How long to wait before deleting
    const word = words[currentWordIndex];

    if (!isDeleting && currentText === word) {
      // Word is complete, wait before deleting
      const timeout = setTimeout(() => setIsDeleting(true), deletingDelay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentText === '') {
      // Word is deleted, move to next word
      setIsDeleting(false);
      setCurrentWordIndex((current) => (current + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText(current => {
        if (isDeleting) {
          return current.slice(0, -1);
        }
        return word.slice(0, current.length + 1);
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default AnimatedText; 