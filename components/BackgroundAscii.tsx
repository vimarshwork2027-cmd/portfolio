"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "/\\_-+.:01<>";
const DENSITY = 0.04; // Percentage of grid cells occupied

export function BackgroundAscii() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate a fixed set of characters with positions
  const charData = useMemo(() => {
    if (!mounted || !dimensions.width) return [];
    
    const rows = Math.floor(dimensions.height / 40);
    const cols = Math.floor(dimensions.width / 40);
    const data = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < DENSITY) {
          data.push({
            id: `${r}-${c}`,
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
            x: c * 40 + Math.random() * 20,
            y: r * 40 + Math.random() * 20,
            duration: 3 + Math.random() * 5,
            delay: Math.random() * 5,
          });
        }
      }
    }
    return data;
  }, [dimensions]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden bg-bg">
      <motion.div 
        className="relative w-full h-full"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {charData.map((item) => (
          <motion.span
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.02, 0.08, 0.02],
              scale: [1, 1.1, 1] 
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
            className="absolute font-mono text-[11px] text-ink-ghost"
            style={{ 
              left: `${item.x}px`, 
              top: `${item.y}px` 
            }}
          >
            {item.char}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtle Gradient Overlay to fade out edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg opacity-40" />
    </div>
  );
}
