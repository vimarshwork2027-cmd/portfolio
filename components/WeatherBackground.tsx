"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LiveData } from "../hooks/useAhmedabadLive";

export function WeatherBackground({ data }: { data: LiveData }) {
  const { temperature, humidity, weatherCode, aqi, hour, status, feelsLike, windSpeed, sunset } = data;

  const [rotatingIndex, setRotatingIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex(prev => (prev + 1) % 5);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (status === "loading") {
    return <div className="absolute inset-0 z-0 bg-slate-50 transition-colors duration-1000" />;
  }

  // Weather conditions
  const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];
  const thunderCodes = [95, 96, 99];
  const isRaining = rainCodes.includes(weatherCode);
  const isThunder = thunderCodes.includes(weatherCode);

  // Time of day base
  let baseGradient = "from-sky-100 to-white";
  if (hour >= 6 && hour < 9) { // Dawn
    baseGradient = "from-rose-100 via-orange-50 to-white";
  } else if (hour >= 17 && hour < 19) { // Dusk
    baseGradient = "from-orange-100 via-indigo-50 to-slate-100";
  } else if (temperature >= 35 && !isRaining) { 
    baseGradient = "from-orange-50/50 via-[#fafaf9] to-white";
  }
  
  // Bleaching out as temperature rises
  const bleachOpacity = Math.max(0, Math.min(1, (temperature - 35) / 10));

  // AQI tint
  let aqiTint = "";
  if (aqi > 50 && aqi <= 100) aqiTint = "bg-[#f5f5f4]/40";
  else if (aqi > 100 && aqi <= 150) aqiTint = "bg-[#e7e5e4]/60";
  else if (aqi > 150) aqiTint = "bg-[#d6d3d1]/80";

  // AQI Color coding
  let aqiColor = "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]";
  if (aqi >= 100 && aqi < 150) aqiColor = "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]";
  else if (aqi >= 150 && aqi < 200) aqiColor = "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]";
  else if (aqi >= 200) aqiColor = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]";

  const rotatingData = [
    new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: true, hour: '2-digit', minute:'2-digit' }),
    `WIND ${windSpeed || 12} KM/H`,
    `${humidity}% HUMIDITY`,
    `FEELS LIKE ${feelsLike || temperature}°C`,
    `SUNSET ${sunset || '7:42 PM'}`
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000">
      {/* Base Time of Day Gradient */}
      <div className={`absolute inset-0 transition-colors duration-1000 bg-gradient-to-b ${baseGradient}`} />

      {/* Extreme Heat Bleach Overlay */}
      {bleachOpacity > 0 && (
        <div 
          className="absolute inset-0 bg-[#ffffff] z-0 transition-opacity duration-1000" 
          style={{ opacity: bleachOpacity * 0.8 }} 
        />
      )}

      {/* AQI Overlay */}
      {aqiTint && (
        <div 
          className={`absolute inset-0 z-0 transition-colors duration-1000 ${aqiTint}`} 
          style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
        />
      )}

      {/* Rain Effect */}
      {(isRaining || isThunder) && (
        <div className="absolute inset-0 opacity-40 z-0">
          {[...Array(isThunder ? 60 : 30)].map((_, i) => (
            <motion.div
              key={`rain-${i}`}
              className="absolute w-[1px] rounded-full bg-slate-600/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20%`,
                height: `${Math.random() * 15 + 5}%`,
              }}
              animate={{ y: ["0vh", "120vh"] }}
              transition={{
                duration: Math.random() * 0.4 + 0.6,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Thunder Flash */}
      {isThunder && (
        <motion.div 
          className="absolute inset-0 bg-white mix-blend-overlay z-0"
          animate={{ opacity: [0, 0, 0.8, 0, 0, 0.5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", times: [0, 0.8, 0.82, 0.85, 0.9, 0.92, 1] }}
        />
      )}

      {/* Heat Shimmer (Visual blobs) */}
      {temperature >= 35 && !isRaining && (
        <div className="absolute inset-0">
          <motion.div 
            className="absolute -top-[10%] left-[20%] w-[40vw] h-[40vw] bg-amber-500/10 blur-[100px] rounded-full"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] bg-rose-500/5 blur-[120px] rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      )}

      {/* Tiny Live Data Readout */}
      <div className="absolute top-8 right-8 text-[11px] font-mono tracking-widest z-10 hidden md:flex flex-col items-end gap-1 text-black/60">
        <span className="text-black/90 font-medium">AHMEDABAD LIVE</span>
        
        <span className="flex items-center gap-1.5">
          {temperature}°C &middot; AQI {aqi}
          <span className={`w-1.5 h-1.5 rounded-full ${aqiColor}`} />
        </span>

        <div className="h-4 relative w-48 flex justify-end overflow-visible mt-0.5">
          <AnimatePresence mode="wait">
            <motion.span
              key={rotatingIndex}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute right-0 whitespace-nowrap text-[10px] text-current/80"
            >
              {rotatingData[rotatingIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
