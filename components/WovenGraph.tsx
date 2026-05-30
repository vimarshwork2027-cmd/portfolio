"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const WovenGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  
  // Snappier Spring for micro-scale precision
  const springConfig = { stiffness: 600, damping: 50, mass: 0.5 };
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const pointerX = useSpring(0, springConfig);
  const pointerY = useSpring(20, springConfig);
  const progressPathLength = useSpring(0, springConfig);


  // Trigger "draw-in" animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      progressPathLength.set(0.96);
      pointerX.set(212);
      pointerY.set(15);
    }, 500);
    return () => clearTimeout(timer);
  }, [pointerX, pointerY, progressPathLength]);

  // Super-Wide growth path data - Full 220 Width
  const pathData = "M 0 32 C 30 32, 60 28, 90 24 C 130 20, 160 18, 200 16 C 210 15, 215 15, 220 15";

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !pathRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Precise padding compensation (px-2 = 8px)
    const padding = 8;
    const svgWidth = rect.width - (padding * 2);
    const x = Math.max(0, Math.min(e.clientX - rect.left - padding, svgWidth));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    const pathTotalLength = pathRef.current.getTotalLength();
    const ratio = Math.min(x / svgWidth, 0.96);
    
    const actualLengthAtRatio = ratio * pathTotalLength;
    const p = pathRef.current.getPointAtLength(actualLengthAtRatio);

    mouseX.set(ratio * 220);
    mouseY.set((y / rect.height) * 40);

    pointerX.set(p.x);
    pointerY.set(p.y);
    progressPathLength.set(ratio);
  };

  const normalizedX = (x: number, w: number) => (x / w) * 220;
  const normalizedY = (y: number, h: number) => (y / h) * 40;

  // Map SVG coordinates to percentage positions for the non-stretching overlay
  const leftPos = useTransform(pointerX, [0, 220], ["0%", "100%"]);
  const topPos = useTransform(pointerY, [0, 40], ["5%", "95%"]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    progressPathLength.set(0.96);
    pointerX.set(212);
    pointerY.set(15);
    mouseX.set(50);
    mouseY.set(20);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <div className="relative group/graph px-0.5 w-full h-full">
      {/* 
          Tethered Glass Tooltip - OUTSIDE the overflow container 
          This ensures it's never clipped by the pill borders.
      */}
      <motion.div
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? -25 : -15, // Anchored tightly above the jewel
          scale: isHovered ? 1 : 0.95,
        }}
        style={{ left: leftPos, top: topPos, x: "-50%" }}
        className="absolute pointer-events-none z-50 whitespace-nowrap px-2"
      >
        <div className="bg-white/90 backdrop-blur-md border border-black/5 rounded-full px-2.5 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#2511CC] rounded-full animate-pulse" />
          <span className="text-[10px] font-bold tracking-tight text-black/80 font-sans uppercase">+24% Outcome</span>
        </div>
      </motion.div>

      <motion.div 
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full px-2 bg-white border border-black/10 rounded-[20px] shadow-[0_1px_4px_rgba(0,0,0,0.02),inset_0_1px_2px_rgba(255,255,255,0.8)] overflow-hidden flex items-center relative group cursor-none transition-colors hover:bg-gray-50/50"
      >
        <svg 
          viewBox="0 0 220 40" 
          className="w-full h-[90%] overflow-hidden"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2511CC" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2511CC" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Museum Horizontal Grid Lines */}
          {[10, 20, 30].map((y) => (
            <line 
              key={y} 
              x1="0" y1={y} x2="220" y2={y} 
              stroke="black" strokeOpacity="0.04" strokeWidth="0.4" 
              strokeDasharray="1.5 1.5"
            />
          ))}

          {/* Vertical Scrubber Line */}
          <motion.line 
            style={{ x1: pointerX, x2: pointerX, opacity: isHovered ? 0.35 : 0 }}
            y1="-5" y2="45"
            stroke="#2511CC" strokeWidth="0.7" strokeDasharray="3 3"
          />

          {/* Fill Area */}
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            d={`${pathData} L 220 40 L 0 40 Z`}
            fill="url(#graphGradient)"
            className="pointer-events-none"
          />

          {/* Base Path */}
          <path d={pathData} fill="none" stroke="#2511CC" strokeWidth="1.5" strokeLinecap="round" className="opacity-10" />

          {/* Active Progress Path */}
          <motion.path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="#2511CC"
            strokeWidth="2.2"
            strokeLinecap="round"
            style={{ pathLength: progressPathLength }}
          />
        </svg>

        {/* Bulletproof Pointer Overlay (Guarantees perfect circularity) */}
        <motion.div
          style={{ left: leftPos, top: topPos, x: "-50%", y: "-50%" }}
          className="absolute pointer-events-none z-20 flex items-center justify-center h-full px-2"
        >
          <div className="relative flex items-center justify-center">
            {/* Main Pointer Circle */}
            <div className="w-[11px] h-[11px] bg-[#2511CC] rounded-full border-[2px] border-white shadow-xl shadow-black/20" />
            
            {/* Pulse Ring */}
            <motion.div 
              animate={{ 
                scale: isHovered ? [1, 1.4, 1] : 0, 
                opacity: isHovered ? 0.15 : 0 
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute w-6 h-6 bg-[#2511CC] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
