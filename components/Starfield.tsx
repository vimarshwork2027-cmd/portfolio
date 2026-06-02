"use client";

import { useEffect, useRef } from "react";

interface StarfieldProps {
  isNight: boolean;
}

export function Starfield({ isNight }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isNight) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId: number;

    // Star types
    interface Star {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      life: number;
      maxLife: number;
      width: number;
    }

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 4000); // density based on area
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.4,
          baseAlpha: Math.random() * 0.3 + 0.15,
          twinkleSpeed: Math.random() * 0.015 + 0.003,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const spawnShootingStar = () => {
      const startX = Math.random() * width * 0.8;
      const startY = Math.random() * height * 0.4; // upper portion
      const angle = (Math.random() * 30 + 15) * (Math.PI / 180); // 15-45 degrees

      shootingStars.push({
        x: startX,
        y: startY,
        len: Math.random() * 80 + 60,
        speed: Math.random() * 8 + 6,
        angle: angle,
        life: 0,
        maxLife: Math.random() * 40 + 30,
        width: Math.random() * 1.5 + 0.5,
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initStars();
    };

    let lastShootingStarTime = 0;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw twinkling stars
      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.baseAlpha + twinkle * 0.15;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 116, 150, ${Math.max(0.05, alpha)})`;
        ctx.fill();

        // Larger stars get a subtle glow
        if (star.radius > 1.4) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 116, 170, ${Math.max(0, alpha * 0.12)})`;
          ctx.fill();
        }
      }

      // Spawn shooting stars occasionally (every 3-8 seconds)
      if (time - lastShootingStarTime > (Math.random() * 5000 + 3000)) {
        if (shootingStars.length < 2) {
          spawnShootingStar();
          lastShootingStarTime = time;
        }
      }

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        const progress = s.life / s.maxLife;
        const fadeAlpha = progress < 0.3 
          ? progress / 0.3 
          : 1 - ((progress - 0.3) / 0.7);

        // Trail
        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, `rgba(100, 116, 150, 0)`);
        gradient.addColorStop(0.7, `rgba(90, 110, 160, ${fadeAlpha * 0.3})`);
        gradient.addColorStop(1, `rgba(80, 100, 150, ${fadeAlpha * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80, 100, 150, ${fadeAlpha * 0.4})`;
        ctx.fill();

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [isNight]);

  if (!isNight) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}
