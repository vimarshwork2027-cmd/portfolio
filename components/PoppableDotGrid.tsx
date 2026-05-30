"use client";

import { useEffect, useRef } from "react";

interface PoppableDotGridProps {
  dotScale: number;
  dotColor: string;
  isNight: boolean;
}

export function PoppableDotGrid({ dotScale, dotColor, isNight }: PoppableDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let dots: { x: number; y: number; popped: boolean }[] = [];
    let particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];
    
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      initDots();
    };

    const initDots = () => {
      dots = [];
      cols = Math.ceil(width / dotScale);
      rows = Math.ceil(height / dotScale);
      
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          dots.push({
            x: i * dotScale,
            y: j * dotScale,
            popped: false
          });
        }
      }
    };

    const getRenderPos = (dot: {x: number, y: number}, time: number) => {
      // Imperceptible continental drift
      const driftX = time * 0.002; 
      const driftY = time * 0.001;
      const totalW = (cols + 1) * dotScale;
      const totalH = (rows + 1) * dotScale;
      
      return {
        x: (dot.x + driftX) % totalW,
        y: (dot.y + driftY) % totalH
      };
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Center of screen for the anchor dot logic
      const cx = width / 2;
      const cy = height / 2;
      const centerDistThresholdSq = (dotScale * dotScale) / 4;

      // Draw unpopped dots
      ctx.fillStyle = dotColor;
      for (const dot of dots) {
        if (!dot.popped) {
          const { x: baseRenderX, y: baseRenderY } = getRenderPos(dot, time);
          
          let renderX = baseRenderX;
          let renderY = baseRenderY;

          // Magnetic pull towards cursor
          const mdx = mouseX - renderX;
          const mdy = mouseY - renderY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 120 && mDist > 0) {
            const pull = ((120 - mDist) / 120) * 4; // Max 4px pull
            renderX += (mdx / mDist) * pull;
            renderY += (mdy / mDist) * pull;
          }

          // Subconsciously balanced center dot
          const cdx = renderX - cx;
          const cdy = renderY - cy;
          const isCenter = (cdx * cdx + cdy * cdy) < centerDistThresholdSq;
          const radius = isCenter ? 2.2 : 1.5;

          ctx.beginPath();
          ctx.arc(renderX, renderY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw popping splash particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.life--;

        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.globalAlpha = p.life / p.maxLife;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickX < 0 || clickX > rect.width || clickY < 0 || clickY > rect.height) return;

      const clickRadius = 25; 
      const time = performance.now();
      
      for (const dot of dots) {
        if (!dot.popped) {
          const { x: baseRenderX, y: baseRenderY } = getRenderPos(dot, time);
          
          let renderX = baseRenderX;
          let renderY = baseRenderY;

          // Apply magnetic pull for accurate click detection
          const mdx = clickX - renderX;
          const mdy = clickY - renderY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 120 && mDist > 0) {
            const pull = ((120 - mDist) / 120) * 4;
            renderX += (mdx / mDist) * pull;
            renderY += (mdy / mDist) * pull;
          }

          const dx = renderX - clickX;
          const dy = renderY - clickY;
          if (dx * dx + dy * dy < clickRadius * clickRadius) {
            dot.popped = true;
            
            // Ink splash
            for (let k = 0; k < 8; k++) {
              particles.push({
                x: renderX,
                y: renderY,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - 1,
                life: 25 + Math.random() * 20,
                maxLife: 45,
                size: Math.random() * 1.5 + 0.5
              });
            }
            break; 
          }
        }
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousedown", handleGlobalClick);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    resize();
    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousedown", handleGlobalClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [dotScale, dotColor]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 z-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${!isNight ? 'mix-blend-multiply opacity-30' : 'opacity-40'}`}
    />
  );
}
