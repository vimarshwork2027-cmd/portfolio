"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Twitter, Globe, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { site } from "@/lib/site";

interface ExperimentData {
  id: string;
  title: string;
  mediaUrl?: string | null;
  gradientConfig: string;
  linkUrl?: string | null;
  tools?: string | null;
  hoverNote?: string | null;
}

export function DesignExperiments({ 
  experiments = [],
  hideHeader = false
}: { 
  experiments?: ExperimentData[],
  hideHeader?: boolean
}) {
  const hasExperiments = experiments && experiments.length > 0;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Create a doubled array for seamless infinite loop
  const marqueeItems = [...experiments, ...experiments, ...experiments];

  return (
    <section id="experiments" className={cn("py-24 md:py-32 overflow-hidden")} style={{ backgroundColor: '#F8F8F8' }}>
      {!hideHeader && (
        <div className="container-content mb-16 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="font-serif italic text-accent text-[17px] md:text-[18px] mb-4 tracking-tight">Visual Playground</div>
            <h2 className="font-sans font-medium text-3xl md:text-4xl tracking-[-0.05em] text-ink">
              Design Experiments<span className="font-serif text-gradient-hero ml-1">.</span>
            </h2>
          </div>
        </div>
      )}
      
      <div className="relative w-full">
        {/* Continuous Marquee Track */}
        <div className="flex gap-4 md:gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((exp, i) => (
            <ExperimentCard 
              key={`${exp.id}-${i}`} 
              experiment={exp} 
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        {/* Gradient Fades for Edge Polishing */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
      </div>

      {!hideHeader && (
        <div className="container-content mt-16 md:mt-20">
          <div className="flex justify-center">
            <Link 
              href={site.instagram || "#"}
              target="_blank"
              className="group bg-black/[0.05] text-ink px-8 py-4 rounded-full text-[15px] font-bold flex items-center gap-2 transition-all duration-300 hover:bg-black/[0.08] hover:scale-[1.02] active:scale-[0.98]"
            >
              View more on Instagram
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

function ExperimentCard({ 
  experiment, 
  index,
  hoveredIndex,
  setHoveredIndex
}: { 
  experiment: ExperimentData;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const isHovered = hoveredIndex === index;
  const isAdjacent = hoveredIndex !== null && (hoveredIndex === index - 1 || hoveredIndex === index + 1);
  const isOther = hoveredIndex !== null && !isHovered && !isAdjacent;

  let scaleClass = "scale-100";
  let opacityClass = "opacity-100 brightness-100";
  let zClass = "z-0";

  if (hoveredIndex !== null) {
    if (isHovered) {
      scaleClass = "scale-[1.08]";
      opacityClass = "opacity-100 brightness-100";
      zClass = "z-50";
    } else if (isAdjacent) {
      scaleClass = "scale-[0.96]";
      opacityClass = "opacity-60 brightness-[0.85]";
      zClass = "z-10";
    } else {
      scaleClass = "scale-[0.94]";
      opacityClass = "opacity-40 brightness-75";
      zClass = "z-0";
    }
  }

  return (
    <div 
      className={cn(
        "relative shrink-0 pt-16 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu origin-center",
        scaleClass, opacityClass, zClass
      )}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Top Floating Text - Outside overflow box */}
      <div className={cn(
        "absolute inset-x-0 flex justify-center transition-all duration-500 ease-out-expo pointer-events-none z-50",
        isHovered ? "top-0 opacity-100" : "top-4 opacity-0"
      )}>
         <div className="font-handwriting text-ink text-[20px] md:text-[24px] flex flex-col items-center text-center max-w-[90%] leading-none tracking-normal">
           {experiment.hoverNote || "why i made this"}
           <ArrowDown className="w-6 h-6 mt-1 animate-bounce" />
         </div>
      </div>

      <div 
        className={cn(
          "h-[320px] md:h-[460px] rounded-[32px] md:rounded-[48px] overflow-hidden relative transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] isolation-auto",
          isHovered ? "w-[320px] md:w-[450px]" : "w-[180px] md:w-[260px]"
        )}
      >
         {/* Content / Media */}
         <div 
           className={cn(
             "w-full h-full relative overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
             !experiment.mediaUrl && `bg-gradient-to-br ${experiment.gradientConfig || "from-slate-100 to-slate-200"}`
           )} 
         >
            {experiment.mediaUrl ? (
              <div className="absolute inset-0 w-full h-full bg-black">
                {experiment.mediaUrl.match(/\.(mp4|mov|webm)$|video/i) ? (
                  <video src={experiment.mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : experiment.mediaUrl.match(/\.gif$/i) ? (
                  <img src={experiment.mediaUrl} alt={experiment.title} className="w-full h-full object-cover" />
                ) : (
                  <Image src={experiment.mediaUrl} alt={experiment.title} fill quality={75} sizes="(max-width: 768px) 320px, 450px" className="object-cover" />
                )}
              </div>
            ) : (
              <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center px-8">
                <span className="text-white/40 text-[13px] font-medium uppercase tracking-widest mb-4">Experimental</span>
                <h4 className="text-white text-lg md:text-xl font-bold leading-tight">{experiment.title}</h4>
              </div>
            )}
  
            {/* Hover Overlay - Localized to bottom */}
            <div className={cn(
              "absolute inset-x-0 bottom-0 h-2/5 transition-opacity duration-500 flex flex-col items-center justify-end p-8 text-center bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
               <span className="text-white font-bold text-lg md:text-xl tracking-tight leading-tight mb-1">{experiment.title}</span>
               {experiment.tools && (
                 <span className="text-white/60 text-[12px] font-medium tracking-wide uppercase">{experiment.tools}</span>
               )}
            </div>
         </div>
  
         {/* Link Overlay */}
         {experiment.linkUrl && (
           <Link 
             href={experiment.linkUrl}
             target="_blank"
             className="absolute inset-0 z-40"
             aria-label={`View ${experiment.title}`}
           />
         )}
      </div>
    </div>
  );
}
