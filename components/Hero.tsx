"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero({ 
  profilePhotoUrl, 
  statusLabel 
}: { 
  profilePhotoUrl?: string; 
  statusLabel?: string; 
}) {
  const easing = [0.22, 1, 0.36, 1];

  return (
    <section 
      className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-white text-ink"
    >
      {/* Subtle Dot Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
        style={{ 
          backgroundImage: `radial-gradient(#e5e7eb 1.5px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 w-full max-w-[1000px] mx-auto flex flex-col items-center text-center">
        
        {/* Centered Circular Headshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          className="mb-10"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-black/5">
            <img 
              src={profilePhotoUrl || "/images/about/about.JPG"} 
              alt="Vimarsh Tiwari" 
              className="w-full h-full object-cover scale-[1.8] object-[center_90%]"
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
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl md:text-4xl animate-bounce-slow">👋</span>
            <span className="text-xl md:text-3xl font-bold tracking-[0.02em] text-[#333333]">
              Hi, I'm Vimarsh
            </span>
          </div>

          {/* Main Titles */}
          <h1 className="flex flex-col items-center gap-0 mb-8">
            <span className="text-display-xl font-extrabold tracking-tight text-black">
              Product Designer
            </span>
            <span className="text-display-lg font-serif italic text-gradient-hero">
              AllEvents
            </span>
          </h1>

          {/* Description */}
          <p className="text-[18px] md:text-[22px] text-ink-dim max-w-[700px] leading-relaxed font-medium">
            Most recently led discovery and growth design at AllEvents — building event experiences for 200K+ users.
          </p>
        </motion.div>

        {/* Scroll Indicator or Actions could go here, but reference is minimal */}
      </div>
    </section>
  );
}


