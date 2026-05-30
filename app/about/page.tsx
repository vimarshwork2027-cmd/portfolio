"use client";

import { site } from "@/lib/site";
import React from "react";
import Link from "next/link";
import { AboutTabsClient } from "@/components/AboutTabsClient";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Compass, TrendingUp, MousePointer2, Palette, type LucideIcon } from "lucide-react";

export default function About() {
  const profileData = site;
  
  const aboutParagraphs = site.about.body;

  const skills = [
    { id: "1", name: "Product Strategy", description: "Beyond visuals, I focus on the 'why'. Defining success metrics, mapping retention loops, and aligning design decisions with business goals.", icon: Compass },
    { id: "2", name: "Growth Design", description: "Engineering virality and conversion. Experienced in A/B testing, funnel optimization, and building organic viral mechanics for consumer apps.", icon: TrendingUp },
    { id: "3", name: "Interaction Design", description: "Crafting seamless user flows and high-fidelity prototypes. Expert in Figma and modern prototyping tools to communicate complex motions.", icon: MousePointer2 },
    { id: "4", name: "Visual Craft", description: "A keen eye for modern aesthetics, typography, and layout. Building design systems that are both beautiful and functional at scale.", icon: Palette }
  ];

  return (
    <main className="container-content pt-32 pb-24 selection:bg-accent-soft selection:text-accent-ink overflow-hidden">
      <AboutTabsClient profileData={profileData} aboutParagraphs={aboutParagraphs} />

      {/* Experience Timeline — Apple Editorial Style */}
      <section className="mb-40 relative">
        <div className="label-mono mb-10 text-ink-faint tracking-[0.2em] flex items-center gap-4">
          <span>WHERE I&rsquo;VE BEEN</span>
        </div>
        
        <div className="relative group/timeline">
          <TimelineRow 
            year="2025 — 2026" 
            role="Product Designer" 
            company="AllEvents" 
            description="Leading design for the discovery vertical, focusing on conversion funnels and viral growth loops for a global platform with 20M+ users."
            isLatest 
          />
          <TimelineRow 
            year="2024 — 2025" 
            role="Founder & Designer" 
            company="Glint (Freelance)" 
            description="Founded a design practice focused on helping B2B and consumer startups find product-market fit through rapid prototyping."
          />
          <TimelineRow 
            year="JAN — APR 2025" 
            role="UI/UX Design Intern" 
            company="Zealous System" 
            description="Collaborated with senior designers on multi-platform design systems and high-fidelity prototypes for consumer applications."
          />
          <TimelineRow 
            year="2020 — 2024" 
            role="B.Tech, Engineering" 
            company="Silver Oak College" 
            description="Engineering undergrad studies, bridging the gap between technical constraints and user-centric design solutions."
          />
        </div>
      </section>

      {/* Sentence Skills Grid */}
      <section className="mb-40 relative">
        <div className="label-mono mb-16 text-ink-faint tracking-widest uppercase flex items-center gap-4">
          <span>SKILLS & EXPERTISE</span>
          <div className="h-px flex-1 bg-rule/50" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          {skills.map((skill) => (
            <SkillBlock 
              key={skill.id}
              title={skill.name} 
              desc={skill.description} 
              Icon={skill.icon}
            />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pt-24 border-t border-rule relative">
        <div className="max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-medium text-[clamp(2.5rem,6vw,3.5rem)] tracking-tight text-ink mb-8 leading-[1.1]"
          >
            I&rsquo;m looking for my next <span className="font-serif text-gradient-hero">challenge.</span>
          </motion.h2>
          <p className="font-sans text-[20px] md:text-[22px] text-ink-dim leading-relaxed mb-12 max-w-2xl">
            I&rsquo;m interviewing for B2C and growth product design roles. If you&rsquo;re building something that moves the needle, I&rsquo;d love to help.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link 
              href={`mailto:${site.email || ""}`} 
              className="bg-black text-white px-10 py-5 rounded-2xl font-bold text-[16px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
            >
              Email me
            </Link>
            <Link 
              href={site.resumeUrl || "#"} 
              target="_blank"
              className="bg-white border border-rule text-ink px-10 py-5 rounded-2xl font-bold text-[16px] hover:bg-bg-subtle transition-all"
            >
              View Resume
            </Link>
          </div>
        </div>
        
        {/* Floating Decorative Element */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none hidden lg:block">
          <div className="w-64 h-64 border-[40px] border-black/5 rounded-full" />
        </div>
      </section>
    </main>
  );
}

function TimelineRow({ 
  year, 
  role, 
  company, 
  description,
  isLatest = false 
}: { 
  year: string; 
  role: string; 
  company: string;
  description: string;
  isLatest?: boolean;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col py-8 px-6 -mx-6 transition-all duration-300"
    >
      {/* Sliding Background Pill */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            layoutId="timeline-hover"
            className="absolute inset-0 bg-bg-subtle/80 rounded-[32px] -z-10 shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-[160px_1fr_auto] items-start w-full gap-8">
        {/* Year */}
        <div className="font-sans text-[12px] md:text-[13px] font-bold text-ink-faint tracking-[0.05em] uppercase pt-2">
          {year}
        </div>

        {/* Role & Indicator & Description */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-4">
            <div className="font-sans font-bold text-[19px] md:text-[22px] text-ink tracking-tight group-hover:text-black transition-colors">
              {role}
            </div>
            {isLatest && (
              <span className="px-2.5 py-0.5 rounded-full bg-accent-soft text-accent-ink font-mono text-[9px] font-bold tracking-[0.1em] uppercase shadow-sm">
                Latest
              </span>
            )}
          </div>
          
          <motion.div
            initial={false}
            animate={{ 
              height: isHovered ? "auto" : 0, 
              opacity: isHovered ? 1 : 0,
              marginTop: isHovered ? 8 : 0
            }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[15px] md:text-[16px] text-ink-dim leading-relaxed max-w-2xl">
              {description}
            </p>
          </motion.div>
        </div>

        {/* Company */}
        <div className="pt-1.5 text-right">
          <span className={cn(
            "font-sans text-[16px] md:text-[18px] font-bold tracking-tight transition-all duration-500",
            isHovered ? "text-accent translate-x-[-4px]" : "text-ink-faint"
          )}>
            {company}
          </span>
        </div>
      </div>
      
      {/* Thin Divider */}
      {!isHovered && (
        <div className="absolute bottom-0 left-6 right-6 h-px bg-rule/30 transition-opacity" />
      )}
    </motion.div>
  );
}

function SkillBlock({ title, desc, Icon }: { title: string; desc: string; Icon?: LucideIcon }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-6 p-8 rounded-[32px] bg-white border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group"
    >
      <div className="h-12 w-12 rounded-2xl bg-accent-soft flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-500">
        {Icon ? <Icon size={20} /> : <div className="w-5 h-5 border-2 border-current rounded-sm" />}
      </div>
      <div className="space-y-3">
        <h3 className="font-sans font-bold text-2xl text-ink tracking-tight">{title}</h3>
        <p className="font-sans text-[17px] text-ink-dim leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
