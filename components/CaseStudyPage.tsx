"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { CaseStudySummary } from "./CaseStudySummary";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Process" },
  { id: "iterations", label: "Iterations" },
  { id: "solution", label: "Solution" },
  { id: "summary", label: "Summary" },
];

const Stardust = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: [0, Math.random() * 0.7 + 0.3, 0],
            scale: [0, Math.random() * 1.5 + 0.5, 0],
            y: [null, `-${Math.random() * 150 + 100}px`],
            x: [null, `${(Math.random() - 0.5) * 100}px`]
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};


export function CaseStudyPage({ caseStudy }: { caseStudy: any }) {
  const [activeSection, setActiveSection] = useState("overview");

  // Derive sections dynamically
  const dynamicSections = [
    { id: "overview", label: "Overview", isImportant: true },
    ...(caseStudy.sections?.map((s: any) => ({ 
      id: s.id, 
      label: s.navLabel || s.title || s.id, 
      isImportant: s.isImportant !== undefined ? s.isImportant : !!s.title 
    })) || []),
    ...(caseStudy.summary ? [{ id: "summary", label: "Summary", isImportant: true }] : [])
  ];

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = dynamicSections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          const currentSection = dynamicSections[i];
          const nearestImportant = dynamicSections.slice(0, i + 1).reverse().find(s => s.isImportant);
          setActiveSection(nearestImportant?.id || currentSection.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dynamicSections]);

  const isDarkSection = activeSection === "breakthrough";

  useEffect(() => {
    if (isDarkSection) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, [isDarkSection]);

  // Enable snapping for this page specifically
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = "y mandatory";
    html.style.scrollBehavior = "smooth";
    
    return () => {
      html.style.scrollSnapType = "";
      html.style.scrollBehavior = "";
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        backgroundColor: isDarkSection ? "#000000" : "#ffffff" 
      }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      <div className="container-content pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-12 lg:gap-32">
          
          {/* Left Column: Minimalist Dash Navigation */}
          <aside className="hidden lg:block h-full relative z-20 lg:-ml-16">
            <nav className="sticky top-40 space-y-2 flex flex-col items-start h-fit">
              {dynamicSections.filter(s => s.isImportant).map((section: any) => (
                <button
                  key={section.id}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative flex items-center py-1 w-full text-left"
                >
                  <motion.span 
                    animate={{ 
                      color: activeSection === section.id 
                        ? (isDarkSection ? "#ffffff" : "#000000") 
                        : (isDarkSection ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"),
                      fontWeight: activeSection === section.id ? 600 : 400,
                      opacity: activeSection === section.id ? 1 : 0.6
                    }}
                    className="font-sans text-[15px] md:text-[16px] tracking-tight transition-all duration-500"
                  >
                    {section.label}
                  </motion.span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Column: Content Area */}
          <main className="w-full">
            <header className="flex items-center gap-3 mb-8 snap-start scroll-mt-40">
              <div className="relative w-14 h-14 flex items-center justify-start overflow-hidden">
                {caseStudy.logo ? (
                  <Image src={caseStudy.logo} alt={caseStudy.company} fill sizes="56px" className="object-contain" />
                ) : (
                  <span className={cn(
                    "font-bold text-2xl",
                    isDarkSection ? "text-white" : "text-black"
                  )}>{caseStudy.company?.[0]}</span>
                )}
              </div>
              <div className="flex flex-col">
                <motion.span 
                  animate={{ color: isDarkSection ? "#ffffff" : "#000000" }}
                  className="font-sans font-bold text-[20px] leading-tight"
                >
                  {caseStudy.company}
                </motion.span>
                <motion.span 
                  animate={{ color: isDarkSection ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)" }}
                  className="font-sans text-[15px] font-medium"
                >
                  {caseStudy.tagline}
                </motion.span>
              </div>
            </header>

            <div className="mb-0">
              <div className="max-w-3xl">
                <section id="overview" className="snap-start scroll-mt-40">
                  <motion.h1 
                    animate={{ color: isDarkSection ? "#ffffff" : "#000000" }}
                    className="font-sans font-bold text-[26px] md:text-[36px] leading-[1.2] tracking-[-0.03em] mb-6"
                  >
                    {caseStudy.title}
                  </motion.h1>
                  <motion.p 
                    animate={{ color: isDarkSection ? "rgba(255, 255, 255, 0.5)" : "#353839" }}
                    className="font-sans text-[17px] md:text-[19px] leading-[1.6] font-medium mb-0"
                  >
                    {caseStudy.hero || caseStudy.description}
                  </motion.p>
                </section>
              </div>
            </div>

            {caseStudy.sections ? (
              <div className="space-y-0">
                {caseStudy.sections.map((section: any, index: number) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={cn(
                      "py-12 md:py-16 transition-colors duration-1000 snap-start scroll-mt-40 relative overflow-visible",
                      index === 0 && "!pt-0",
                      section.id === "breakthrough" ? "min-h-[80vh] flex flex-col justify-center" : "",
                      (isDarkSection && section.id === "breakthrough") || section.theme === "dark" && isDarkSection ? "text-white" : "text-black"
                    )}
                    style={{ 
                      scrollSnapStop: "always",
                      backgroundColor: section.bgColor || "transparent",
                      boxShadow: section.bgColor ? `0 0 0 100vmax ${section.bgColor}` : "none",
                      clipPath: section.bgColor ? "inset(0 -100vmax)" : "none"
                    }}
                  >
                    {section.isMagical && <Stardust />}
                    <div className={cn(
                      "max-w-4xl mx-auto space-y-8 relative z-10",
                      section.fullWidth && "max-w-none w-full"
                    )}>
                      <div className="space-y-4">
                        {section.subtitle && (
                          <div className={cn(
                            "label-mono text-[13px] font-bold uppercase tracking-wider",
                            (isDarkSection && section.id === "breakthrough") || section.theme === "dark" && isDarkSection ? "text-white/40" : "text-black/30"
                          )}>
                            {section.subtitle}
                          </div>
                        )}
                        {section.title && (
                          <h2 className={cn(
                            "font-sans font-medium text-[24px] md:text-[28px] tracking-tight",
                            (isDarkSection && section.id === "breakthrough") || section.theme === "dark" && isDarkSection ? "text-white" : "text-black"
                          )}>
                            {section.title}
                          </h2>
                        )}
                      </div>

                      <div className="space-y-8">

                        {section.content && (
                          <motion.div 
                            initial={section.isMagical ? { opacity: 0, y: 40, scale: 0.95, filter: "blur(20px)" } : undefined}
                            whileInView={section.isMagical ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className={cn(
                              "font-sans text-[18px] leading-relaxed max-w-3xl",
                              (isDarkSection && section.id === "breakthrough") || section.theme === "dark" && isDarkSection ? "text-white/80" : "text-black/80"
                            )}
                            dangerouslySetInnerHTML={{ __html: section.content }}
                          />
                        )}


                        {section.marqueeImages && (
                          <div className={cn(
                            "relative overflow-visible py-12 md:py-20",
                            section.fullWidth 
                              ? "w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]" 
                              : "w-full"
                          )}>
                            <motion.div 
                              className="flex gap-8 w-fit"
                              animate={{ x: ["0%", "-50%"] }}
                              transition={{ 
                                duration: 30, 
                                repeat: Infinity, 
                                ease: "linear" 
                              }}
                            >
                              {[...section.marqueeImages, ...section.marqueeImages].map((img: string, i: number) => (
                                <div key={i} className="flex-shrink-0">
                                  <div 
                                    className={cn(
                                      "relative h-[246px] md:h-[396px] w-[176px] md:w-[296px] rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.05]",
                                      isDarkSection || section.theme === "dark" 
                                        ? "shadow-none" 
                                        : "shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
                                    )}
                                    style={{
                                      rotate: i % 2 === 0 ? "1deg" : "-1deg",
                                      marginTop: i % 2 === 0 ? "0px" : "20px"
                                    }}
                                  >
                                    <Image 
                                      src={img} 
                                      alt="Contest Visual" 
                                      fill
                                      className="object-cover"
                                      sizes="(max-width: 768px) 176px, 296px"
                                    />
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          </div>
                        )}

                        {section.secondaryContent && (
                          <div 
                            className={cn(
                              "font-sans text-[18px] leading-relaxed max-w-3xl mt-12",
                              (isDarkSection && section.id === "breakthrough") || section.theme === "dark" && isDarkSection ? "text-white/80" : "text-black/80"
                            )}
                            dangerouslySetInnerHTML={{ __html: section.secondaryContent }}
                          />
                        )}

                        {section.bullets && (
                          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm max-w-3xl">
                            <div className="font-sans font-bold text-[15px] tracking-tight mb-5 text-black">
                              {section.title}
                            </div>
                            <div className="space-y-3">
                              {section.bullets.map((bullet: { text: string; bold?: string }, i: number) => (
                                <div key={i} className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-black/25 flex-shrink-0" />
                                  <div className="font-sans text-[14px] leading-snug text-black/65">
                                    {bullet.bold && <strong className="text-black/80 font-semibold">{bullet.bold}</strong>}
                                    {bullet.text}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {section.gridImages && (
                          <div className="relative">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-3xl relative z-10">
                              {section.gridImages.map((img: string, i: number) => (
                                <div 
                                  key={i} 
                                  className={cn(
                                    "bg-white p-2 pb-8 shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-all duration-500 hover:scale-[1.05] hover:rotate-0 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]",
                                    isDarkSection || section.theme === "dark" ? "border border-white/10" : "border border-black/5"
                                  )}
                                  style={{
                                    rotate: i % 2 === 0 ? "1.5deg" : "-1.2deg"
                                  }}
                                >
                                  <div className="aspect-[4/5] overflow-hidden bg-gray-50">
                                    <Image 
                                      src={img} 
                                      alt={`Polaroid visual ${i+1}`}
                                      fill
                                      quality={75}
                                      sizes="(max-width: 768px) 50vw, 25vw"
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>

                            {section.gridCaveat && (
                              <div className="absolute -right-32 top-1/2 -translate-y-1/2 hidden lg:block z-0 pointer-events-none">
                                <div className="flex items-center gap-2">
                                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="text-black/20">
                                    <path d="M0 20C20 20 30 10 50 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
                                    <path d="M42 6L50 2L46 -2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <p className="font-handwriting text-[20px] text-black/60 leading-tight max-w-[160px] -rotate-3">
                                    {section.gridCaveat}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}


                        {section.quote && (
                          <div className={cn(
                            "border-l-2 py-2 pl-8 my-12 max-w-3xl",
                            isDarkSection || section.theme === "dark" ? "border-white/20" : "border-black/10"
                          )}>
                            <div className={cn(
                              "font-sans text-[12px] font-bold uppercase tracking-wider mb-3 opacity-40",
                              isDarkSection || section.theme === "dark" ? "text-white" : "text-black"
                            )}>
                              Insight 💡
                            </div>
                            <p className={cn(
                              "font-sans text-[20px] md:text-[22px] font-medium italic leading-relaxed",
                              isDarkSection || section.theme === "dark" ? "text-white/90" : "text-black/80"
                            )}>
                              &ldquo;{section.quote}&rdquo;
                            </p>
                          </div>
                        )}

                        {section.metadata && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-rule/50 mt-12">
                            {section.metadata.map((item: any, idx: number) => (
                              <div key={idx}>
                                <h3 className={cn(
                                  "font-sans text-[20px] md:text-[22px] font-medium mb-4",
                                  isDarkSection || section.theme === "dark" ? "text-white" : "text-black"
                                )}>
                                  {item.label}
                                </h3>
                                {Array.isArray(item.value) ? (
                                  <ul className={cn(
                                    "space-y-2 font-sans text-[15px] md:text-[16px]",
                                    isDarkSection || section.theme === "dark" ? "text-white/80" : "text-black/80"
                                  )}>
                                    {item.value.map((v: string, i: number) => (
                                      <li 
                                        key={i}
                                        dangerouslySetInnerHTML={{ __html: v }}
                                      />
                                    ))}
                                  </ul>
                                ) : (
                                  <p 
                                    className={cn(
                                      "font-sans text-[15px] md:text-[16px] leading-relaxed",
                                      isDarkSection || section.theme === "dark" ? "text-white/80" : "text-black/80"
                                    )}
                                    dangerouslySetInnerHTML={{ __html: item.value }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {section.image && (
                          <div className="space-y-6">
                            {section.imageTitle && (
                              <h3 className={cn(
                                "font-sans font-medium text-[20px] tracking-tight mb-6",
                                isDarkSection || section.theme === "dark" ? "text-white/90" : "text-black/90"
                              )}>
                                {section.imageTitle}
                              </h3>
                            )}
                            <div className={cn(
                            "relative overflow-hidden w-full mt-12 mx-auto",
                            (section.image.endsWith('.gif') || section.noContainer) 
                              ? "bg-transparent p-0" 
                              : isDarkSection || section.theme === "dark"
                                ? cn(section.noRadius ? "rounded-none" : "rounded-[32px] md:rounded-[48px]", "bg-white/5 p-6 md:p-10 border border-white/10")
                                : cn(section.noRadius ? "rounded-none" : "rounded-[32px] md:rounded-[48px]", "bg-[#F9F9F9] p-6 md:p-10"),
                            section.fullWidth ? "max-w-screen-2xl" : "max-w-3xl"
                          )}>
                            <Image 
                              src={section.image} 
                              alt={section.title || "Section visual"}
                              width={1200}
                              height={800}
                              quality={75}
                              className={cn(
                                "w-full h-auto object-contain",
                                (section.image.endsWith('.gif') || section.noContainer) 
                                  ? cn(section.noRadius ? "rounded-none" : "rounded-[24px] md:rounded-[32px]", "mx-auto", section.fullWidth ? "max-w-screen-2xl" : "max-w-2xl") 
                                  : section.fullWidth ? "max-w-screen-2xl mx-auto" : "max-w-3xl mx-auto"
                              )}
                            />
                          </div>
                          </div>
                        )}

                        {section.image2 && (
                          <div className={cn(
                            "relative overflow-hidden w-full mt-8 mx-auto",
                            (section.image2.endsWith('.gif') || section.noContainer) 
                              ? "bg-transparent p-0" 
                              : isDarkSection || section.theme === "dark"
                                ? cn(section.noRadius ? "rounded-none" : "rounded-[32px] md:rounded-[48px]", "bg-white/5 p-6 md:p-10 border border-white/10")
                                : cn(section.noRadius ? "rounded-none" : "rounded-[32px] md:rounded-[48px]", "bg-[#F9F9F9] p-6 md:p-10"),
                            "max-w-3xl"
                          )}>
                            <Image 
                              src={section.image2} 
                              alt={`${section.title} detail 1`}
                              width={1200}
                              height={800}
                              quality={75}
                              className={cn(
                                "w-full h-auto object-contain mx-auto",
                                (section.image2.endsWith('.gif') || section.noContainer) 
                                  ? cn(section.noRadius ? "rounded-none" : "max-w-2xl rounded-[24px] md:rounded-[32px]", "mx-auto") 
                                  : "max-w-3xl"
                              )}
                            />
                          </div>
                        )}

                        {section.image3 && (
                          <div className={cn(
                            "relative overflow-hidden w-full mt-8 mx-auto",
                            (section.image3.endsWith('.gif') || section.noContainer) 
                              ? "bg-transparent p-0" 
                              : isDarkSection || section.theme === "dark"
                                ? cn(section.noRadius ? "rounded-none" : "rounded-[32px] md:rounded-[48px]", "bg-white/5 p-6 md:p-10 border border-white/10")
                                : cn(section.noRadius ? "rounded-none" : "rounded-[32px] md:rounded-[48px]", "bg-[#F9F9F9] p-6 md:p-10"),
                            "max-w-3xl"
                          )}>
                            <Image 
                              src={section.image3} 
                              alt={`${section.title} detail 2`}
                              width={1200}
                              height={800}
                              quality={75}
                              className={cn(
                                "w-full h-auto object-contain mx-auto",
                                (section.image3.endsWith('.gif') || section.noContainer) 
                                  ? cn(section.noRadius ? "rounded-none" : "max-w-2xl rounded-[24px] md:rounded-[32px]", "mx-auto") 
                                  : "max-w-3xl"
                              )}
                            />
                          </div>
                        )}



                        {section.statements && (
                          <div className="space-y-8 mt-12 max-w-4xl">
                            {section.statementsTitle && (
                              <h3 className={cn(
                                "font-sans font-medium text-[20px] tracking-tight mb-6",
                                isDarkSection || section.theme === "dark" ? "text-white/90" : "text-black/90"
                              )}>
                                {section.statementsTitle}
                              </h3>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                              {section.statements.map((statement: any, i: number) => (
                              <div 
                                key={i} 
                                className={cn(
                                  "relative p-8 md:p-10 flex flex-col justify-start transition-all duration-500",
                                  isDarkSection || section.theme === "dark" 
                                    ? "bg-[#1E293B] text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.3)]" 
                                    : "bg-[#F0F9FF] text-slate-800 shadow-[5px_5px_15px_rgba(0,0,0,0.08)] border border-blue-100/50"
                                )}
                                style={{
                                  rotate: i % 2 === 0 ? "1.5deg" : "-1.2deg",
                                  transformOrigin: "center center"
                                }}
                              >
                                {/* Tape effect */}
                                <div className={cn(
                                  "absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8 opacity-40 blur-[1px]",
                                  isDarkSection || section.theme === "dark" ? "bg-white/10" : "bg-white/60"
                                )} />

                                <div className="relative z-10 space-y-4">
                                  <div className={cn(
                                    "inline-flex text-[10px] font-bold uppercase tracking-[0.1em] opacity-40",
                                    isDarkSection || section.theme === "dark" ? "text-white" : "text-slate-600"
                                  )}>
                                    {statement.label}
                                  </div>
                                  <p className={cn(
                                    "font-sans text-[16px] md:text-[18px] leading-relaxed font-medium italic",
                                    isDarkSection || section.theme === "dark" ? "text-white/90" : "text-slate-800"
                                  )}>
                                    &ldquo;{statement.text}&rdquo;
                                  </p>
                                </div>
                              </div>
                            ))}
                            </div>
                          </div>
                        )}

                        {section.subContent && (
                          <div 
                            className={cn(
                              "font-sans text-[18px] leading-relaxed max-w-3xl",
                              (isDarkSection && section.id === "breakthrough") || section.theme === "dark" && isDarkSection ? "text-white/80" : "text-black/80"
                            )}
                            dangerouslySetInnerHTML={{ __html: section.subContent }}
                          />
                        )}

                        {section.steps && (
                          <SystemLoop steps={section.steps} isDark={isDarkSection || section.theme === 'dark'} />
                        )}

                        {section.highlightInsight && (
                          <HighlightInsight text={section.highlightInsight} isDark={isDarkSection || section.theme === 'dark'} />
                        )}
                      </div>
                    </div>
                  </section>
                ))}

              </div>
            ) : (
              /* Fallback to original layout */
              <>
                <section className="mb-32 snap-start scroll-mt-40">
                  <div className={cn(
                    "relative overflow-hidden",
                    caseStudy.heroImageUrl?.endsWith('.gif') 
                      ? "bg-transparent p-0" 
                      : "bg-[#F3F3F3] rounded-[48px] p-4 md:p-8"
                  )}>
                    <Image 
                      src={caseStudy.heroImageUrl} 
                      alt="Project Mockup"
                      width={1400}
                      height={800}
                      priority
                      quality={75}
                      className={cn(
                        "w-full h-auto object-cover shadow-2xl",
                        caseStudy.heroImageUrl?.endsWith('.gif') ? "rounded-none" : "rounded-[32px]"
                      )}
                    />
                  </div>
                </section>

                <section id="problem" className="mb-32 snap-start scroll-mt-40">
                  <SectionHeader title="Problem" />
                  <div className="max-w-2xl">
                    <p className="font-sans text-[20px] md:text-[24px] font-medium leading-[1.5] text-black/80">
                      {caseStudy.problem}
                    </p>
                  </div>
                </section>

                <section id="process" className="mb-32 snap-start scroll-mt-40">
                  <SectionHeader title="Process" />
                  <div className="max-w-2xl space-y-8">
                    <p className="font-sans text-[18px] text-black/60 leading-relaxed italic border-l-2 border-black/5 pl-8 py-2">
                      {caseStudy.context}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                      <MetaBlock label="Role" value={caseStudy.role} />
                      <MetaBlock label="Team" value={caseStudy.team} />
                      <MetaBlock label="Timeline" value={caseStudy.timeline} />
                      <MetaBlock label="Scope" value={caseStudy.scope} />
                    </div>
                  </div>
                </section>

                <section id="iterations" className="mb-32 snap-start scroll-mt-40">
                  <SectionHeader title="Iterations" />
                  <div className="space-y-16">
                    {caseStudy.decisions?.map((decision: any, i: number) => (
                      <div key={i} className="bg-[#F9F9F9] rounded-[24px] p-8 md:p-12 border border-black/5">
                        <div className="label-mono text-[11px] font-bold text-black/30 mb-4 uppercase">Decision {i+1}</div>
                        <h3 className="font-sans font-bold text-[24px] mb-6 text-black tracking-tight">{decision.title}</h3>
                        <div className="space-y-6 max-w-2xl">
                          <p className="text-[16px] text-black/60 leading-relaxed"><strong className="text-black/80">Picked:</strong> {decision.picked}</p>
                          <p className="text-[16px] text-black/60 leading-relaxed"><strong className="text-black/80">Reason:</strong> {decision.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="solution" className="mb-32 snap-start scroll-mt-40">
                  <SectionHeader title="Solution" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {caseStudy.metrics?.map((metric: any, i: number) => (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="font-sans font-bold text-5xl md:text-6xl text-black tracking-tighter">
                          {metric.value}{metric.unit}
                        </div>
                        <div className="font-sans text-[15px] font-bold text-black/40 uppercase tracking-wider">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="summary" className="mb-32 snap-start scroll-mt-40">
                  <SectionHeader title="Summary" />
                  <div className="max-w-2xl space-y-8">
                    <ul className="space-y-6">
                      {caseStudy.learnings?.map((learning: string, i: number) => (
                        <li key={i} className="flex gap-4 items-start">
                          <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-1">
                            <Check size={12} className="text-black/40" />
                          </div>
                          <span className="text-[17px] text-black/60 leading-relaxed">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
      {caseStudy.summary && (
        <div id="summary" className="snap-start scroll-mt-40">
          <CaseStudySummary 
            title={caseStudy.summary.title}
            items={caseStudy.summary.items}
            reviews={caseStudy.summary.reviews}
            isDark={isDarkSection}
          />
        </div>
      )}
    </motion.div>
  );
}

function SystemLoop({ steps, isDark }: { steps: any[], isDark?: boolean }) {
  const stepCount = steps.length;
  const cycleDuration = 10;

  return (
    <div className="relative py-24 my-16 overflow-visible">
      <div className="relative">
        {/* Apple-style Base Path */}
        <div className={cn(
          "absolute top-[16px] left-0 right-0 h-[1px] z-0 opacity-40",
          isDark ? "bg-white/[0.05]" : "bg-black/[0.03]"
        )} />
        
        {/* Apple-style Light Path Progress */}
        <div className="absolute top-[16px] left-0 right-0 h-[1px] z-10 overflow-hidden">
          <motion.div
            animate={{ 
              x: ["-100%", "0%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: cycleDuration * 0.8, 
              repeat: Infinity, 
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.1, 0.9, 1],
              repeatDelay: cycleDuration * 0.2
            }}
            className={cn(
              "w-full h-full origin-left bg-gradient-to-r from-transparent via-blue-500/50 to-blue-400",
              isDark ? "via-blue-400/50 to-blue-300" : "via-blue-500/50 to-blue-600"
            )}
          />
        </div>

        <div className="relative flex justify-between gap-4 z-30 px-0">
          {steps.map((step, i) => {
            const label = typeof step === 'string' ? step : step.label;
            const badge = typeof step === 'object' ? step.badge : null;
            
            const nodeProgress = i / (stepCount - 1);
            const delay = nodeProgress * (cycleDuration * 0.8);

            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center group flex-1"
              >
                <div className="h-[40px] flex items-center justify-center mb-7 relative">
                  {/* Floating Reward Indicator (Gamification) */}
                  {badge && (
                    <motion.div
                      animate={{ 
                        y: [0, -50],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2.2, 
                        repeat: Infinity, 
                        times: [0, 0.15, 1],
                        delay: delay + 0.4,
                        ease: "easeOut"
                      }}
                      className={cn(
                        "absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none flex flex-col items-center",
                        badge.includes('pts') ? "text-amber-500" : "text-blue-500"
                      )}
                    >
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
                          i === 3 ? "flex items-center gap-1.5" : ""
                        )}>
                          {i === 0 ? (
                            <span className="text-[13px] font-black uppercase tracking-tighter bg-blue-500 text-white px-1.5 py-0.5 rounded-sm shadow-sm">FREE</span>
                          ) : i === 3 ? (
                            <><span className="text-[28px]">📈</span> <span className="text-[13px] font-black uppercase tracking-tighter text-blue-500">GROWTH</span></>
                          ) : i === 4 ? (
                            <span className="text-[32px]">🎟️</span>
                          ) : badge.includes('pts') ? (
                            <span className="text-[16px] font-black">{badge.split(' ')[0]}</span>
                          ) : (
                            <span className="text-[24px] leading-none">✓</span>
                          )}
                        </div>
                        {/* Pointer Triangle */}
                        <div className={cn(
                          "w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] -mt-0.5 opacity-60",
                          badge.includes('pts') ? "border-t-amber-500" : "border-t-blue-500"
                        )} />
                      </div>
                    </motion.div>
                  )}

                  <div className="relative">
                    {/* Success Burst Effect */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 3],
                        opacity: [0, 0, 0.2, 0, 0]
                      }}
                      transition={{ 
                        duration: cycleDuration, 
                        repeat: Infinity, 
                        times: [0, delay / cycleDuration, (delay + 0.3) / cycleDuration, (delay + 1) / cycleDuration, 1],
                        ease: "easeOut" 
                      }}
                      className="absolute inset-0 rounded-full bg-blue-500/40 blur-xl"
                    />

                    <motion.div 
                      animate={{ 
                        scale: [1, 2.2, 1],
                        opacity: [0, 0, 0.4, 0, 0]
                      }}
                      transition={{ 
                        duration: cycleDuration, 
                        repeat: Infinity, 
                        times: [0, delay / cycleDuration, (delay + 0.5) / cycleDuration, (delay + 1.5) / cycleDuration, 1],
                        ease: "easeOut" 
                      }}
                      className="absolute inset-0 rounded-full bg-blue-500/30 blur-md"
                    />

                    <motion.div 
                      animate={{ 
                        scale: [1, 1.25, 1],
                        borderColor: [
                          isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                          isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                          isDark ? "rgba(96,165,250,0.8)" : "rgba(59,130,246,0.8)",
                          isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                          isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"
                        ]
                      }}
                      transition={{ 
                        duration: cycleDuration, 
                        repeat: Infinity, 
                        times: [0, delay / cycleDuration, (delay + 0.5) / cycleDuration, (delay + 1.5) / cycleDuration, 1],
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className={cn(
                        "w-4 h-4 rounded-full border-[1.5px] shadow-sm relative z-10 transition-all duration-700",
                        isDark ? "bg-[#0A0A0A]" : "bg-white"
                      )} 
                    >
                      <motion.div 
                        animate={{
                          backgroundColor: [
                            "rgba(0,0,0,0)",
                            "rgba(0,0,0,0)",
                            isDark ? "rgba(96,165,250,1)" : "rgba(59,130,246,1)",
                            "rgba(0,0,0,0)",
                            "rgba(0,0,0,0)"
                          ],
                          boxShadow: [
                            "0 0 0px rgba(59,130,246,0)",
                            "0 0 0px rgba(59,130,246,0)",
                            isDark ? "0 0 15px rgba(96,165,250,0.6)" : "0 0 15px rgba(59,130,246,0.5)",
                            "0 0 0px rgba(59,130,246,0)",
                            "0 0 0px rgba(59,130,246,0)"
                          ]
                        }}
                        transition={{
                          duration: cycleDuration,
                          repeat: Infinity,
                          times: [0, delay / cycleDuration, (delay + 0.5) / cycleDuration, (delay + 1.5) / cycleDuration, 1],
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className="absolute inset-[2px] rounded-full" 
                      />
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                   <motion.h4 
                     animate={{
                       color: [
                         isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.7)",
                         isDark ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
                         isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.7)"
                       ]
                     }}
                     transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: cycleDuration - 1.5,
                        delay: delay,
                        ease: "easeInOut"
                     }}
                     className={cn(
                       "text-[13px] md:text-[14px] font-medium max-w-[130px] leading-snug font-sans tracking-tight transition-colors duration-500",
                       isDark ? "text-white/60" : "text-black/70"
                     )}
                   >
                     {label}
                   </motion.h4>

                   {badge && (
                     <motion.div
                       animate={{
                         scale: [1, 1.05, 1],
                         opacity: [0.6, 1, 0.6]
                       }}
                       transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: cycleDuration - 1.5,
                          delay: delay,
                          ease: "easeInOut"
                       }}
                       whileHover={{ scale: 1.05 }}
                     >
                       <CoinBadge value={badge} isDark={isDark} />
                     </motion.div>
                   )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CoinBadge({ value, isDark }: { value: string, isDark?: boolean }) {
  const isPoints = value.includes('pts');
  
  return (
    <div className={cn(
      "px-3 py-1 rounded-full flex items-center gap-2 border shadow-[0_2px_12px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-500",
      isDark 
        ? isPoints ? "bg-amber-400/25 border-amber-400/60" : "bg-blue-400/25 border-blue-400/60"
        : isPoints ? "bg-amber-400/15 border-amber-400/40" : "bg-blue-400/15 border-blue-400/40"
    )}>
      <div className={cn(
        "w-2 h-2 rounded-full",
        isPoints ? "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]" : "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
      )} />
      <span className={cn(
        "text-[10px] md:text-[11px] font-bold tracking-wide uppercase font-sans",
        isPoints ? "text-amber-700 dark:text-amber-400" : "text-blue-700 dark:text-blue-400"
      )}>
        {value}
      </span>
    </div>
  );
}

function HighlightInsight({ text, isDark }: { text: string, isDark?: boolean }) {
  return (
    <div className={cn(
      "my-20 py-16 border-y",
      isDark ? "border-white/5" : "border-black/5"
    )}>
      <p className={cn(
        "text-[20px] md:text-[24px] font-sans font-medium leading-[1.4] tracking-tight max-w-3xl",
        isDark ? "text-white/90" : "text-black/80"
      )}>
        {text}
      </p>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="font-sans font-bold text-[24px] md:text-[28px] text-black mb-6 tracking-tight">
      {title}
    </h2>
  );
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="label-mono text-[11px] text-black/30 font-bold uppercase tracking-wider">{label}</div>
      <div className="font-sans text-[16px] font-bold text-black/80">{value}</div>
    </div>
  );
}
