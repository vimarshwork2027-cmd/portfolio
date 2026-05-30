"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square } from "lucide-react";

// Deep, peaceful pentatonic scale (C Major Pentatonic)
const PENTATONIC = [
  65.41, 73.42, 82.41, 98.00, 110.00,     // Octave 2 (Sub drone)
  130.81, 146.83, 164.81, 196.00, 220.00, // Octave 3 (Warm mid)
  261.63, 293.66, 329.63, 392.00, 440.00, // Octave 4 (Melody)
];

export function GenerativeSong() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  
  // Interaction states
  const scrollSpeedRef = useRef(0);
  const lastScrollY = useRef(0);
  const cursorY = useRef(0.5); // Normalized 0 to 1

  // Track interactions
  useEffect(() => {
    let ticking = false;
    let lastMouseTime = performance.now();
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const delta = Math.abs(currentScroll - lastScrollY.current);
          scrollSpeedRef.current = Math.min(100, scrollSpeedRef.current + delta * 0.5);
          lastScrollY.current = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (lastMouseX === 0 && lastMouseY === 0) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }

      const now = performance.now();
      const dt = Math.max(1, now - lastMouseTime);
      
      if (dt > 16) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt; // px per ms
        
        // Wakes up the music if mouse moves fast
        if (speed > 0.5) {
          scrollSpeedRef.current = Math.min(100, scrollSpeedRef.current + speed * 3);
        }

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        lastMouseTime = now;
      }

      // Normalize cursor Y position (0 = top, 1 = bottom)
      cursorY.current = e.clientY / window.innerHeight;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Burst of energy when hovering over links or buttons
      if (target && (target.closest('a') || target.closest('button'))) {
        scrollSpeedRef.current = Math.min(100, scrollSpeedRef.current + 30);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    
    // Decay interaction speed over time faster so it settles immediately
    const decayInterval = setInterval(() => {
      if (scrollSpeedRef.current > 0) {
        scrollSpeedRef.current = Math.max(0, scrollSpeedRef.current - 5);
      }
    }, 50);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      clearInterval(decayInterval);
    };
  }, []);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtxRef.current = new AudioContextClass();
  };

  const playGenerativeSong = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // 1. Master Volume & Filter
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.8;
    
    // Global Lowpass filter modulated by cursor Y
    // Cursor at top = brighter sound (2000Hz). Cursor at bottom = muffled, deep sound (400Hz).
    const masterFilter = ctx.createBiquadFilter();
    masterFilter.type = "lowpass";
    masterFilter.frequency.value = 1000;
    
    masterGain.connect(masterFilter);
    masterFilter.connect(ctx.destination);

    // 2. Washy Ambient Reverb Simulation (Ping-pong delays)
    const delayL = ctx.createDelay(5.0);
    const delayR = ctx.createDelay(5.0);
    delayL.delayTime.value = 0.8; // Left bounces every 0.8s
    delayR.delayTime.value = 1.2; // Right bounces every 1.2s

    const feedbackL = ctx.createGain();
    const feedbackR = ctx.createGain();
    feedbackL.gain.value = 0.6; // Heavy feedback for infinite wash
    feedbackR.gain.value = 0.6;

    // Cross-feedback loop
    delayL.connect(feedbackL);
    feedbackL.connect(delayR);
    delayR.connect(feedbackR);
    feedbackR.connect(delayL);

    delayL.connect(masterGain);
    delayR.connect(masterGain);

    const scheduleNote = () => {
      if (!isPlayingRef.current || !audioCtxRef.current) return;

      const currentScrollSpeed = scrollSpeedRef.current;
      
      // Update master filter dynamically based on mouse position
      // Keep it much lower and muffled. Max 1000Hz, base 200Hz.
      const targetFreq = 200 + (1 - cursorY.current) * 800;
      masterFilter.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.5);

      // Play a note if there's interaction or randomly for sparse ambience
      const shouldPlay = Math.random() < 0.1 || currentScrollSpeed > 5;
      
      if (shouldPlay) {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        // Pick frequency. Mostly stay in the warm mids to avoid piercing highs.
        const baseIndex = currentScrollSpeed > 20 ? 5 : 2; 
        const freqIndex = baseIndex + Math.floor(Math.random() * 10);
        osc.frequency.value = PENTATONIC[Math.min(freqIndex, PENTATONIC.length - 1)];
        
        osc.type = "sine";

        // Extremely slow attack and release for ambient pads
        const now = ctx.currentTime;
        noteGain.gain.setValueAtTime(0, now);
        
        // Much softer volume
        const peakVolume = 0.008 + (currentScrollSpeed / 100) * 0.01;
        const attackTime = 4 + Math.random() * 3;
        const releaseTime = 10 + Math.random() * 5;
        
        noteGain.gain.linearRampToValueAtTime(peakVolume, now + attackTime);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + attackTime + releaseTime);

        osc.connect(noteGain);
        noteGain.connect(masterGain);
        noteGain.connect(delayL); // Send into the reverb wash

        osc.start(now);
        osc.stop(now + attackTime + releaseTime);
      }

      // Schedule next check (very fluid)
      setTimeout(scheduleNote, Math.random() * 2000 + 1000);
    };

    // Constant deep sub drone
    const startDrone = () => {
      if (!isPlayingRef.current || !audioCtxRef.current) return;
      
      const droneOsc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      droneOsc.type = "sine";
      droneOsc.frequency.value = PENTATONIC[0]; // Lowest C
      
      droneOsc.connect(droneGain);
      droneGain.connect(masterGain);
      
      const now = ctx.currentTime;
      droneGain.gain.setValueAtTime(0, now);
      droneGain.gain.linearRampToValueAtTime(0.015, now + 10); // 10 second fade in, very quiet
      
      droneOsc.start(now);
      
      // Stop logic handles this on unmount/toggle
      return { osc: droneOsc, gain: droneGain };
    };

    scheduleNote();
    const drone = startDrone();
    
    // Store drone to stop it cleanly later
    (window as any).activeDrone = drone;
  };

  const togglePlay = async () => {
    if (!isPlaying) {
      initAudio();
      if (audioCtxRef.current?.state === "suspended") {
        await audioCtxRef.current.resume();
      }
      setIsPlaying(true);
      isPlayingRef.current = true;
      playGenerativeSong();
    } else {
      setIsPlaying(false);
      isPlayingRef.current = false;
      
      // Fade out drone cleanly
      const drone = (window as any).activeDrone;
      if (drone && audioCtxRef.current) {
        const now = audioCtxRef.current.currentTime;
        drone.gain.gain.cancelScheduledValues(now);
        drone.gain.gain.setValueAtTime(drone.gain.gain.value, now);
        drone.gain.gain.exponentialRampToValueAtTime(0.0001, now + 2);
        setTimeout(() => drone.osc.stop(), 2100);
      }
      
      if (audioCtxRef.current) {
        setTimeout(async () => {
          if (!isPlayingRef.current && audioCtxRef.current) {
            await audioCtxRef.current.suspend();
          }
        }, 2500);
      }
    }
  };

  return (
    // Shifted right slightly (left-24) to avoid overlapping the bolt button from the screenshot
    <div className="fixed bottom-6 left-8 z-50 hidden md:flex items-center gap-3">
      <div className="relative group">
        <motion.button 
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={!isPlaying ? { 
            boxShadow: [
              "0px 2px 12px rgba(0,0,0,0.06)", 
              "0px 4px 20px rgba(37,17,204,0.15)", 
              "0px 2px 12px rgba(0,0,0,0.06)"
            ] 
          } : { 
            boxShadow: "0px 2px 12px rgba(0,0,0,0.06)" 
          }}
          transition={{ repeat: !isPlaying ? Infinity : 0, duration: 3, ease: "easeInOut" }}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-lg border border-white/50 text-black hover:bg-white transition-colors"
          aria-label={isPlaying ? "Stop Generative Song" : "Play Generative Song"}
        >
          {isPlaying ? (
            <Square className="w-4 h-4 fill-current text-black" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5 text-[#2511CC]" />
          )}
        </motion.button>
        
        {/* Hover Tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-black/90 backdrop-blur-sm text-white text-[9px] font-mono whitespace-nowrap rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none tracking-widest uppercase">
          your visit, as sound
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, filter: "blur(4px)", x: -5 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", x: -5 }}
            className="flex items-center gap-3 bg-white/60 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/[0.04] rounded-full pl-3 pr-4 py-1.5"
          >
            {/* Live Waveform */}
            <div className="flex items-end gap-[2px] h-[14px]">
              <motion.div className="w-[2px] bg-[#2511CC] rounded-full" animate={{ height: ["30%", "100%", "40%", "80%", "30%"] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="w-[2px] bg-[#2511CC] rounded-full" animate={{ height: ["80%", "20%", "100%", "50%", "80%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
              <motion.div className="w-[2px] bg-[#2511CC] rounded-full" animate={{ height: ["50%", "90%", "30%", "100%", "50%"] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
              <motion.div className="w-[2px] bg-[#2511CC] rounded-full" animate={{ height: ["100%", "40%", "80%", "20%", "100%"] }} transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} />
            </div>

            <div className="text-[10px] font-mono tracking-widest text-black/50 uppercase pt-0.5">
              Playing <span className="text-black font-semibold ml-1">The Visitors</span>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="stopped"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-[11px] font-mono tracking-widest text-black/40 uppercase"
          >
            Turn your browsing into music
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
