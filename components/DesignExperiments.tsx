"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Twitter, Globe, Github } from "lucide-react";
import Link from "next/link";
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
  
  // Create a doubled array for seamless infinite loop
  const marqueeItems = [...experiments, ...experiments, ...experiments];

  return (
    <section id="experiments" className={cn("py-24 md:py-32 overflow-hidden", !hideHeader && "border-t border-rule")}>
      {!hideHeader && (
        <div className="container-content mb-16 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="font-serif italic text-[#2511CC] text-[17px] md:text-[18px] mb-4 tracking-tight">Visual Playground</div>
            <h2 className="font-sans font-medium text-3xl md:text-4xl tracking-[-0.05em] text-black">
              Design Experiments<span className="font-serif text-gradient-hero ml-1">.</span>
            </h2>
          </div>
        </div>
      )}
      
      <div className="relative w-full">
        {/* Continuous Marquee Track */}
        <div className="flex gap-4 md:gap-6 w-max animate-marquee pause-on-hover">
          {marqueeItems.map((exp, i) => (
            <ExperimentCard key={`${exp.id}-${i}`} experiment={exp} />
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

function ExperimentCard({ experiment }: { experiment: ExperimentData }) {
  return (
    <div className="relative group shrink-0 pt-16">
      {/* Top Floating Text - Outside overflow box */}
      <div className="absolute top-0 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 group-hover:-top-4 transition-all duration-500 ease-out-expo pointer-events-none z-50">
         <div className="font-handwriting text-ink text-[20px] md:text-[24px] flex flex-col items-center text-center max-w-[90%] leading-none tracking-normal">
           {experiment.hoverNote || "why i made this"}
           <ArrowDown className="w-6 h-6 mt-1 animate-bounce" />
         </div>
      </div>

      <div 
        className="w-[180px] md:w-[260px] hover:w-[320px] md:hover:w-[450px] aspect-[9/16] hover:aspect-auto h-[320px] md:h-[460px] rounded-[24px] md:rounded-[32px] overflow-hidden relative border border-black/[0.05] transition-all duration-700 ease-out-expo"
      >
         {/* Content / Media */}
         <div 
           className={cn(
             "w-full h-full relative overflow-hidden transition-transform duration-700 ease-out-expo group-hover:scale-105",
             !experiment.mediaUrl && `bg-gradient-to-br ${experiment.gradientConfig || "from-slate-100 to-slate-200"}`
           )} 
         >
            {experiment.mediaUrl ? (
              <div className="absolute inset-0 w-full h-full bg-black">
                {experiment.mediaUrl.match(/\.(mp4|mov|webm)$|video/i) ? (
                  <video src={experiment.mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={experiment.mediaUrl} alt={experiment.title} className="w-full h-full object-cover" />
                )}
              </div>
            ) : (
              <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center px-8">
                <span className="text-white/40 text-[13px] font-medium uppercase tracking-widest mb-4">Experimental</span>
                <h4 className="text-white text-lg md:text-xl font-bold leading-tight">{experiment.title}</h4>
              </div>
            )}
  
            {/* Hover Overlay - Localized to bottom */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end p-8 text-center bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20">
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
