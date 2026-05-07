"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  "Long story—short",
  "If You're Hiring",
  "In a Team",
  "If You're a Founder"
];

export function AboutTabsClient({ 
  profileData, 
  aboutParagraphs 
}: { 
  profileData: any; 
  aboutParagraphs: string[];
}) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [storyHoveredIndex, setStoryHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Content map with subtle interactive styling
  const contentMap = [
    (
      <motion.div 
        variants={containerVariants} 
        initial="initial" 
        animate="animate" 
        className="relative space-y-0"
      >
        {/* Vertical Line */}
        <div className="absolute left-[154px] top-6 bottom-6 w-px bg-rule/40 z-0" />

        <StoryTimelineItem 
          index={0}
          hoveredIndex={storyHoveredIndex}
          onHover={setStoryHoveredIndex}
          label="TODAY" 
          title="Product Designer" 
          description={aboutParagraphs[0]}
          isLatest
        />
        <StoryTimelineItem 
          index={1}
          hoveredIndex={storyHoveredIndex}
          onHover={setStoryHoveredIndex}
          label="STRATEGY" 
          title="Design for Outcomes" 
          description={aboutParagraphs[1]}
        />
        <StoryTimelineItem 
          index={2}
          hoveredIndex={storyHoveredIndex}
          onHover={setStoryHoveredIndex}
          label="ROOTS" 
          title="Startups & Engineering" 
          description={aboutParagraphs[2]}
        />
        <StoryTimelineItem 
          index={3}
          hoveredIndex={storyHoveredIndex}
          onHover={setStoryHoveredIndex}
          label="LAB" 
          title="Curiosity & AI" 
          description={aboutParagraphs[3]}
        />
      </motion.div>
    ),
    (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="font-sans text-[16px] md:text-[18px] text-ink-dim leading-relaxed space-y-8">
        <motion.p variants={itemVariants}>
          <strong className="text-ink font-bold block mb-2 text-[18px] md:text-[20px] tracking-tight">Looking for a product-minded designer?</strong>
          I am currently open to B2C and growth product design roles, whether based in India or remote. My previous experience at AllEvents scaling discovery past 20M users means I know how to design for high-velocity environments where every pixel needs to justify its existence through conversion and retention.
        </motion.p>
        <motion.p variants={itemVariants}>
          <strong className="text-ink font-bold block mb-2 text-[18px] md:text-[20px] tracking-tight">I am available to start immediately.</strong>
          If you think I'd be a good fit for your team, let's talk.
        </motion.p>
      </motion.div>
    ),
    (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="font-sans text-[16px] md:text-[18px] text-ink-dim leading-relaxed space-y-8">
        <motion.p variants={itemVariants}>
          <strong className="text-ink font-bold block mb-2 text-[18px] md:text-[20px] tracking-tight">I believe in radical collaboration.</strong>
          Design doesn&rsquo;t happen in a vacuum. My best work happens when I am closely paired with engineering and product management. I heavily prioritize unblocking developers through clean specs and prototyping, while aligning with PMs on exact business outcomes rather than just aesthetic goals.
        </motion.p>
        <motion.p variants={itemVariants}>
          <strong className="text-ink font-bold block mb-2 text-[18px] md:text-[20px] tracking-tight">I take extreme ownership.</strong>
          When I own a feature, I own its success, its failure, and its technical feasibility. I don&rsquo;t just ship screens; I ship results.
        </motion.p>
      </motion.div>
    ),
    (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="font-sans text-[16px] md:text-[18px] text-ink-dim leading-relaxed space-y-8">
        <motion.p variants={itemVariants}>
          <strong className="text-ink font-bold block mb-2 text-[18px] md:text-[20px] tracking-tight">I understand the stakes.</strong>
          Having run my own independent practice (Glint), I deeply understand that design resources are finite and runways are real. I index heavily on moving fast, shipping iteratively, and prioritizing growth loops—viral mechanics, SEO-led acquisition, and activation funnels.
        </motion.p>
        <motion.p variants={itemVariants}>
          <strong className="text-ink font-bold block mb-2 text-[18px] md:text-[20px] tracking-tight">High speed, low friction.</strong>
          I work best with founders who value speed and are looking for a designer who can think like a product owner.
        </motion.p>
      </motion.div>
    )
  ];

  return (
    <section className="relative mb-24 lg:mb-32">
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-16 lg:gap-24 items-start pt-12">
          {/* Left Column: Photo & Name */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-[4/5] rounded-[80px] overflow-hidden bg-white shadow-[0_24px_48px_rgba(0,0,0,0.1)] border border-black/5 mb-10 p-2.5 group"
            >
              <div className="relative w-full h-full rounded-[60px] overflow-hidden">
                <Image 
                  src="/images/about/about.JPG" 
                  alt={profileData?.name || "Vimarsh Tiwari"} 
                  fill 
                  className="object-cover scale-[2.2] origin-[center_82%] transition-all duration-1000 group-hover:scale-[2.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-700" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div>
                <h2 className="font-sans font-bold text-[32px] md:text-[36px] tracking-tight text-ink leading-none mb-2">
                  {profileData?.name || "Vimarsh Tiwari"}
                </h2>
                <p className="font-sans text-[18px] font-medium text-ink-faint tracking-tight">
                  Product Designer
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-[14px] font-bold text-ink-dim uppercase tracking-wider">Available for new roles</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Tab Navigation */}
          <div className="flex flex-col">
            {/* Tabs Container */}
            <div className="relative p-1.5 bg-bg-muted/50 backdrop-blur-sm border border-rule rounded-2xl mb-12 flex flex-wrap gap-1">
              {TABS.map((tab, idx) => {
                const isActive = activeTabIdx === idx;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTabIdx(idx)}
                    className={cn(
                      "relative px-5 py-2.5 rounded-xl font-sans text-[14px] md:text-[15px] font-bold transition-all duration-300 outline-none flex-1 min-w-fit",
                      isActive ? "text-ink" : "text-ink-faint hover:text-ink-dim"
                    )}
                  >
                    <span className="relative z-10">{tab}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="about-tab-pill"
                        className="absolute inset-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/5 rounded-xl z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTabIdx}
                  initial="exit"
                  animate="animate"
                  exit="exit"
                  variants={containerVariants}
                  className="relative z-10"
                >
                  {contentMap[activeTabIdx]}
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryTimelineItem({ 
  label, 
  title, 
  description,
  isLatest = false,
  index,
  hoveredIndex,
  onHover
}: { 
  label: string; 
  title: string; 
  description: string;
  isLatest?: boolean;
  index: number;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}) {
  const isHovered = hoveredIndex === index;

  return (
    <div 
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="relative grid grid-cols-[120px_1fr] gap-16 py-10 first:pt-0 group cursor-default"
    >
      {/* Sliding Background */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            layoutId="story-hover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-x-[-24px] md:inset-x-[-32px] inset-y-1 bg-bg-subtle rounded-[24px] -z-10 border border-rule/40 shadow-sm"
          />
        )}
      </AnimatePresence>

      {/* Label */}
      <div className={cn(
        "font-sans text-[11px] font-bold tracking-[0.15em] pt-2 text-right transition-colors duration-500",
        isHovered ? "text-accent" : "text-ink-faint"
      )}>
        {label}
      </div>

      {/* Indicator & Content */}
      <div className="relative">
        {/* Dot Indicator */}
        <div className={cn(
          "absolute left-[-30px] top-[15px] h-3 w-3 rounded-full z-10 transition-all duration-500 border-[3px] border-white",
          isHovered ? "bg-accent scale-125 shadow-[0_0_15px_rgba(28,0,255,0.4)]" : "bg-rule-strong"
        )} />
        
        {/* Content */}
        <div className="space-y-2 pl-4">
          <h4 className={cn(
            "font-sans font-bold text-[19px] md:text-[22px] tracking-tight transition-colors duration-500",
            isHovered ? "text-black" : "text-ink"
          )}>
            {title}
          </h4>
          <p className={cn(
            "font-sans text-[16px] md:text-[18px] leading-relaxed max-w-2xl transition-colors duration-500",
            isHovered ? "text-ink-dim" : "text-ink-dim/80"
          )}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

