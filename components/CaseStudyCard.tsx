"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function CaseStudyCard({
  caseStudy,
  index,
  isFeatured = false,
  variant = "default",
}: {
  caseStudy: any;
  index: number;
  isFeatured?: boolean;
  variant?: "default" | "small";
}) {
  const isComingSoon = caseStudy?.status === "coming-soon";
  const isNDA = caseStudy?.status === "nda";
  const isLocked = isComingSoon || isNDA;
  const isSmall = variant === "small";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      <Link
        href={isLocked ? "#" : `/${caseStudy?.slug || ""}`}
        className={cn(
          "group block w-full h-full relative transition-all duration-500",
          isLocked ? "cursor-default" : "cursor-pointer active:scale-[0.98]"
        )}
      >
        {/* Image Container */}
        <div 
          className={cn(
            "relative w-full overflow-hidden transition-transform duration-700 ease-out-expo group-hover:scale-[1.01] rounded-[24px] mb-5",
            isSmall ? "aspect-video" : "aspect-[16/9]"
          )}
          style={{ backgroundColor: caseStudy.bgColor || "#F1EFE8" }}
        >
          {caseStudy.heroImageUrl ? (
            <img 
              src={caseStudy.heroImageUrl} 
              alt={caseStudy.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/5">
              <span className="text-black/10 font-medium tracking-tight">
                [{caseStudy.id}]
              </span>
            </div>
          )}


        </div>

        {/* Content Section */}
        <div className="px-1">
          {/* Title */}
          <h3 className="font-bold text-ink text-[18px] md:text-[20px] leading-tight tracking-[-0.01em] mb-1 transition-colors duration-300">
            {caseStudy.title}
          </h3>

          {/* Metadata */}
          <div className="text-[13px] md:text-[14px] font-medium text-ink-ghost mb-5">
            {caseStudy.date} {caseStudy.tools && <span> &middot; {caseStudy.tools}</span>}
          </div>

          {/* Action Button */}
          <div className="flex items-center">
            {isLocked ? (
              <div className="px-5 py-2.5 bg-black/[0.05] text-ink-ghost rounded-full text-[13px] font-bold flex items-center gap-2">
                {isNDA && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                )}
                {isNDA ? "Under NDA" : "Coming soon"}
              </div>
            ) : (
              <div className="bg-black text-white px-5 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-2.5 transition-all duration-500 group-hover:gap-3.5 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] active:scale-[0.97]">
                {caseStudy.buttonLabel || "Read case study"}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:translate-x-0.5">
                  <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
