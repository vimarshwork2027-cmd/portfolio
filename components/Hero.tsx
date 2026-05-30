"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { WeatherBackground } from "./WeatherBackground";
import { PoppableDotGrid } from "./PoppableDotGrid";
import { useAhmedabadLive } from "../hooks/useAhmedabadLive";

export function Hero({ 
  profilePhotoUrl, 
  statusLabel 
}: { 
  profilePhotoUrl?: string; 
  statusLabel?: string; 
}) {
  const liveData = useAhmedabadLive();
  const easing = [0.22, 1, 0.36, 1];

  const isNight = liveData.hour >= 19 || liveData.hour < 6;
  
  // Dot grid scales based on humidity (denser when humid)
  const dotScale = Math.max(16, 48 - (liveData.humidity / 100) * 32); 
  const dotColor = isNight ? '#334155' : '#94a3b8';

  // The Argumentative Headline
  const ARGUMENTS = [
    "Product Designer",
    "Problem Solver",
    "Systems Thinker",
    "Design Engineer"
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  
  const SUBTITLES = [
    "led discovery and growth design for 200K+ users at AllEvents",
    "the kind of designer who asks why before asking how"
  ];
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const hoverIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic Greeting based on VISITOR's local time
  const [greeting, setGreeting] = useState({ emoji: "👋", text: "Hi, I'm" });
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    const isWeekend = day === 0 || day === 6;

    if (hour >= 1 && hour < 6) {
      setGreeting({ emoji: "👀", text: "you're up late. I'm" });
    } else if (isWeekend) {
      setGreeting({ emoji: "😌", text: "hey, I'm" });
    } else if (hour >= 21 || hour === 0) { // 9pm to 1am
      setGreeting({ emoji: "🌙", text: "oh hey, I'm" });
    } else {
      setGreeting({ emoji: "👋", text: "Hi, I'm" });
    }
  }, []);

  const handleHeadlineEnter = () => {
    if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);
    
    hoverIntervalRef.current = setInterval(() => {
      setTitleIndex(prev => {
        if (prev < ARGUMENTS.length - 1) {
          return prev + 1;
        }
        if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);
        return prev;
      });
    }, 2500); // Wait 2.5 seconds before changing
  };

  const handleHeadlineLeave = () => {
    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current);
    }
  };

  useEffect(() => {
    const subInterval = setInterval(() => {
      setSubtitleIndex(prev => (prev + 1) % SUBTITLES.length);
    }, 5000);
    
    return () => {
      if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);
      clearInterval(subInterval);
    };
  }, []);

  const playPronunciation = () => {
    const audio = new Audio('/vimarsh.mp3');
    audio.play().catch(() => {
      // Fallback to Web Speech API if the file doesn't exist yet
      const utterance = new SpeechSynthesisUtterance("Vimarsh");
      utterance.lang = "hi-IN"; // Hindi locale ensures correct phonetics
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    });
  };

  return (
    <section 
      className={`relative z-10 flex flex-col items-center justify-center min-h-[90vh] pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-transparent transition-colors duration-1000 ${isNight ? 'text-white' : 'text-ink'}`}
    >
      <WeatherBackground data={liveData} />

      {/* Heat shimmer on text via CSS filter if super hot */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes heatShimmer {
          0% { filter: url(#displacementFilter); }
          50% { filter: url(#displacementFilter2); }
          100% { filter: url(#displacementFilter); }
        }
        .heat-shimmer-text {
          animation: heatShimmer 2s infinite alternate;
        }
      `}} />
      {liveData.temperature >= 40 && !isNight && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="displacementFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="displacementFilter2">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      )}

      {/* Poppable Dot Grid Background */}
      <PoppableDotGrid dotScale={dotScale} dotColor={dotColor} isNight={isNight} />

      <div className={`relative z-10 w-full max-w-[1000px] mx-auto flex flex-col items-center text-center transition-opacity duration-1000`}>
        
        {/* Centered Circular Headshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          className="mb-10"
        >
          <div className={`group relative w-32 h-32 md:w-40 md:h-40 rounded-[56px] overflow-hidden border-4 shadow-xl ring-1 ring-black/5 ${isNight ? 'border-slate-800 shadow-black/50' : 'border-white'}`}>
            <img 
              src={profilePhotoUrl || "/images/about/about.JPG"} 
              alt="Vimarsh Tiwari" 
              className="w-full h-full object-cover scale-[1.1] group-hover:scale-[1.05] transition-all duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] object-[center_75%]"
            />
          </div>
        </motion.div>

        {/* Headline Group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easing }}
          className="flex flex-col items-center"
        >
          {/* Greeting */}
          <div className="flex items-center gap-3 mb-2">
            <motion.span 
              className="text-3xl md:text-4xl inline-block origin-[70%_70%]"
              animate={greeting.emoji === "👋" ? { rotate: [0, 14, -8, 14, -4, 10, 0, 0] } : {}}
              transition={greeting.emoji === "👋" ? {
                duration: 2.5,
                ease: "easeInOut",
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1],
                repeat: Infinity,
                repeatDelay: 1
              } : {}}
            >
              {greeting.emoji}
            </motion.span>
            <span className={`text-xl md:text-3xl font-light tracking-[0.02em] flex items-center gap-1.5 ${isNight ? 'text-slate-300' : 'text-[#333333]'}`}>
              {greeting.text} 
              <span 
                className="relative inline-flex items-center group cursor-pointer"
                onClick={playPronunciation}
              >
                <span className="group-hover:text-amber-500 transition-colors duration-300 relative z-10 border-b border-transparent group-hover:border-amber-500/30 pb-0.5">Vimarsh</span>
                <Volume2 className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-500 absolute -right-6" />
              </span>
            </span>
          </div>

          {/* Main Titles (The Negotiation) */}
          <h1 
            className={`flex flex-col items-center gap-0 mb-3 cursor-default select-none min-h-[90px] md:min-h-[110px] justify-center ${liveData.temperature >= 40 && !isNight ? 'heat-shimmer-text' : ''}`}
            onMouseEnter={handleHeadlineEnter}
            onMouseLeave={handleHeadlineLeave}
            onTouchStart={handleHeadlineEnter}
            onTouchEnd={handleHeadlineLeave}
          >
            <AnimatePresence mode="wait">
              <motion.span 
                key={titleIndex}
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`font-bold tracking-tight text-center ${isNight ? 'text-white' : 'text-black'} text-display-xl`}
              >
                {ARGUMENTS[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </h1>

          {/* Description */}
          <div className="h-[60px] md:h-[70px] flex items-center justify-center relative w-full mt-0">
            <AnimatePresence mode="wait">
              <motion.p 
                key={subtitleIndex}
                initial={{ opacity: 0, filter: "blur(4px)", y: 4 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)", y: -4 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`text-[17px] md:text-[21px] max-w-[900px] md:whitespace-nowrap leading-relaxed font-medium absolute text-center w-full ${isNight ? 'text-slate-400' : 'text-ink-dim'}`}
              >
                {SUBTITLES[subtitleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Status Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easing }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-5"
          >
            {["available for work", "open to relocation", "2 yrs exp"].map((pill, i) => (
              <span 
                key={i} 
                className={`px-3.5 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full border backdrop-blur-md transition-all flex items-center gap-2 cursor-default ${
                  isNight 
                    ? 'border-white/10 text-white/70 bg-white/5 hover:bg-white/10 hover:text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]' 
                    : 'border-black/[0.06] text-black/60 bg-white/60 hover:bg-white hover:text-black hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
                }`}
              >
                {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />}
                {pill}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
