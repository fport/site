'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedAILearning() {
  const [text, setText] = useState('');
  const fullText = "My Journey in Generative AI";
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-8 text-2xl font-bold text-gray-800"
    >
      {text}
      <span className="animate-blink">|</span>
    </motion.div>
  );
} 