"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { CaseStudyCard } from "./CaseStudyCard";
import { cn } from "@/lib/utils";

const fadeUpStagger = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function FeaturedCaseStudy({ project }: { project: any }) {
  const isComingSoon = project?.status === "coming-soon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mb-24 md:mb-32"
    >
      <Link
        href={isComingSoon ? "#" : `/${project.slug}`}
        className={cn(
          "group flex flex-col md:flex-row items-center gap-8 md:gap-12",
          isComingSoon ? "cursor-default" : "cursor-pointer"
        )}
      >
        {/* Image Side */}
        <div 
          className="w-full md:w-1/2 aspect-video rounded-[24px] md:rounded-[32px] overflow-hidden relative transition-transform duration-700 group-hover:scale-[1.01]"
          style={{ backgroundColor: project.bgColor || "#6049E7" }}
        >
          {project.heroImageUrl ? (
            <img 
              src={project.heroImageUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 font-bold text-3xl">
              [Featured]
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start pl-0 md:pl-8">
          <div className="flex items-center gap-2 px-3 py-1 bg-black/[0.04] border border-black/[0.08] rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_6px_rgba(168,85,247,0.4)]" />
            <span className="text-[12px] font-medium text-ink-dim uppercase tracking-wider">
              Featured
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-ink leading-[1.1] tracking-tight mb-4 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-ink-faint font-medium mb-10">
            {project.date} {project.tools && <span className="opacity-60"> &middot; {project.tools}</span>}
          </p>
          
          <div className="flex items-center">
            {isComingSoon ? (
              <div className="bg-black/[0.05] text-ink-ghost px-7 py-3 rounded-full text-[14px] font-bold flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Under NDA
              </div>
            ) : (
              <div className="bg-black/[0.05] text-ink px-7 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 transition-all duration-300 group-hover:bg-black/[0.08] group-hover:scale-[1.02] active:scale-[0.98]">
                {project.buttonLabel || "Read case study"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function WorkSection({ 
  experience = [] 
}: { 
  experience?: any[] 
}) {
  const featuredProject = experience.flatMap(exp => exp.projects).find(p => p.isFeatured);

  return (
    <div className="bg-bg">
      <section id="work" className="py-24 md:py-32 scroll-mt-20 overflow-x-hidden px-6 md:px-12 lg:px-24">
        {/* Header Section - Contained */}
        <div className="max-w-[1200px] mx-auto mb-12">
          <div className="font-serif italic text-[#2511CC] text-[17px] md:text-[18px] mb-4 tracking-tight">Case Studies</div>
          <h2 className="font-sans font-medium text-3xl md:text-4xl tracking-[-0.05em] text-ink mb-12">
            Stuff I built<span className="font-serif text-gradient-hero ml-1">.</span>
          </h2>
          <p className="text-ink font-handwriting text-[24px] mb-6 tracking-normal flex items-center gap-2">
            Jump to a case study <span className="text-ink-ghost ml-1">(I know you are in a hurry)</span>
            <ArrowDown className="w-5 h-5 text-ink-ghost animate-bounce" />
          </p>
        </div>

        {/* Featured Project - Contained */}
        {featuredProject && (
          <div className="max-w-[1200px] mx-auto mb-32">
            <FeaturedCaseStudy project={featuredProject} />
          </div>
        )}

        {/* Experience Groups */}
        <div className="flex flex-col gap-24 md:gap-32">
          {(experience || []).map((exp, expIdx) => (
            <div key={exp.company} className="flex flex-col">
              {/* Company Header - Contained */}
              <div className="max-w-[1200px] mx-auto w-full mb-10">
                <div className="flex items-center gap-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    {exp.logo ? (
                      <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-accent/5 flex items-center justify-center text-accent font-bold text-lg">
                        {exp.company[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-sans font-bold text-xl md:text-2xl text-ink leading-none mb-1">
                      {exp.company}
                    </h3>
                    <div className="text-ink-ghost text-sm md:text-base font-medium">
                      {exp.role} &middot; <span className="opacity-70">{exp.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Scroll Container - Full Width Bleed */}
              {/* We need to offset the parent's padding for the scroll area */}
              <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] overflow-x-auto scrollbar-hide snap-x snap-proximity scroll-smooth">
                <div className="flex gap-6 md:gap-8 pb-8 px-6 md:px-12 lg:px-[calc((100vw-1200px)/2+96px)] min-w-full pr-[calc((100vw-1200px)/2+128px)]">
                  {exp.projects.filter((p: any) => !p.isFeatured).map((project: any, i: number) => (
                    <div 
                      key={project.id || i} 
                      className="w-[280px] md:w-[400px] flex-shrink-0 snap-start"
                    >
                      <CaseStudyCard 
                        caseStudy={project} 
                        index={i} 
                        variant="small"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatItem({ 
  topLabel, 
  value, 
  unit, 
  bottomLabel, 
  isAccent,
  index 
}: { 
  topLabel: string; 
  value: string; 
  unit?: string;
  bottomLabel?: string; 
  isAccent?: boolean;
  index: number;
}) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUpStagger}
      custom={index}
      className="flex flex-col gap-3"
    >
      <div className="label-mono text-[11px] font-bold uppercase tracking-[0.08em]">{topLabel}</div>
      <div className={`font-sans font-bold text-5xl md:text-6xl tracking-tighter tabular-nums ${isAccent ? 'text-accent' : 'text-ink'}`}>
        {value}{unit && unit !== "—" && <span className="text-[0.6em] font-medium italic text-ink-dim ml-1">{unit}</span>}
      </div>
      {bottomLabel && (
        <div className="text-[14px] text-ink-dim font-sans leading-snug">{bottomLabel}</div>
      )}
    </motion.div>
  );
}
