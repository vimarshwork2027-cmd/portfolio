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
  const allProjects = experience.flatMap(exp => 
    (exp.projects || []).map((p: any) => ({ ...p, company: exp.company }))
  );
  
  const featuredProject = allProjects.find(p => p.isFeatured);
  const otherProjects = allProjects.filter(p => !p.isFeatured);

  return (
    <div className="bg-bg">
      <section id="work" className="py-24 md:py-32 scroll-mt-20 overflow-x-hidden px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="max-w-[1200px] mx-auto mb-16">
          <div className="font-serif italic text-[#2511CC] text-[17px] md:text-[18px] mb-4 tracking-tight">Case Studies</div>
          <h2 className="font-sans font-medium text-4xl md:text-5xl tracking-[-0.05em] text-ink mb-12">
            Selected Work<span className="font-serif text-gradient-hero ml-1">.</span>
          </h2>
          <p className="text-ink font-handwriting text-[24px] mb-6 tracking-normal flex items-center gap-2">
            Jump to a case study <span className="text-ink-ghost ml-1">(I know you are in a hurry)</span>
            <ArrowDown className="w-5 h-5 text-ink-ghost animate-bounce" />
          </p>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <div className="max-w-[1200px] mx-auto mb-20 md:mb-32">
            <FeaturedCaseStudy project={featuredProject} />
          </div>
        )}

        {/* All Other Projects in a clean grid */}
        <div className="max-w-[1200px] mx-auto mb-32 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {otherProjects.map((project, i) => (
            <div key={project.id || i} className="w-full">
              <CaseStudyCard 
                caseStudy={project} 
                index={i} 
                variant="small"
              />
            </div>
          ))}
        </div>

        {/* Timeline Footnote */}
        {experience.length > 0 && (
          <div className="max-w-[1200px] mx-auto pt-16 border-t border-black/[0.06]">
            <div className="font-serif italic text-[#2511CC] text-[17px] md:text-[18px] mb-8 tracking-tight">Where this work happened</div>
            <div className="flex flex-col">
              {experience.map((exp) => (
                <div key={exp.company} className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 py-6 border-b border-black/[0.04] last:border-0 group hover:bg-black/[0.02] px-4 -mx-4 rounded-2xl transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {exp.logo ? (
                        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <div className="w-full h-full bg-black/5 rounded-full flex items-center justify-center text-ink-dim font-bold text-lg">
                          {exp.company[0]}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-sans font-bold text-xl text-ink leading-none mb-1.5">
                        {exp.company}
                      </h4>
                      <div className="text-ink-ghost text-[15px] font-medium">
                        {exp.role}
                      </div>
                    </div>
                  </div>
                  <div className="font-sans text-[14px] md:text-[15px] font-medium text-ink-ghost tracking-[-0.01em] md:text-right mt-2 md:mt-0 pl-[72px] md:pl-0">
                    {exp.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
