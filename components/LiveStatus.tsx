"use client";

import { useAhmedabadLive } from "../hooks/useAhmedabadLive";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LiveStatus() {
  const { hour, status, isDay } = useAhmedabadLive();
  const [currentStatus, setCurrentStatus] = useState("thinking about this exact problem");

  useEffect(() => {
    if (status !== 'success') return;

    if (hour >= 1 && hour < 7) {
      setCurrentStatus("probably deep in sleep");
    } else if (hour >= 7 && hour < 9) {
      setCurrentStatus("drinking coffee, staring at a wall");
    } else if (hour >= 13 && hour < 15) {
      setCurrentStatus("probably eating lunch");
    } else if (hour >= 20 && hour < 22) {
      setCurrentStatus("probably eating dinner");
    } else if (hour % 3 === 0) {
      setCurrentStatus("listening to something loud");
    } else if (hour % 2 === 0) {
      setCurrentStatus("designing in figma");
    } else {
      setCurrentStatus("thinking about this exact problem");
    }
  }, [hour, status]);

  const isNight = hour >= 19 || hour < 6;

  return (
    <div className={`absolute left-8 top-8 z-50 hidden xl:flex flex-col gap-1.5 text-[11px] font-mono tracking-widest uppercase ${isNight ? 'text-white/40' : 'text-black/40'} transition-colors duration-1000`}>
      <span className={`font-semibold ${isNight ? 'text-white/60' : 'text-black/60'}`}>Right Now:</span>
      <AnimatePresence mode="wait">
        <motion.span 
          key={currentStatus}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <span className={isNight ? 'text-white/20' : 'text-black/20'}>↳</span> {currentStatus}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
