"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface SummaryItem {
  title: string;
  description: string;
  image: string;
}

interface Review {
  text: string;
  stars: number;
  date: string;
  author?: string;
}

interface CaseStudySummaryProps {
  title: string;
  items: SummaryItem[];
  reviews?: Review[];
  isDark?: boolean;
}

export function CaseStudySummary({ title, items, reviews, isDark }: CaseStudySummaryProps) {
  return (
    <section className={cn(
      "py-24 md:py-32 border-t border-rule/50 mt-12 w-screen relative left-1/2 -translate-x-1/2",
      isDark ? "bg-[#0A0A0B] text-white" : "bg-[#F8F8F8] text-black"
    )}>
      <div className="container-content">
        <h2 className={cn(
          "font-sans font-medium text-3xl md:text-4xl text-center mb-16 tracking-tight",
          isDark ? "text-white" : "text-black/90"
        )}>
          {title}
        </h2>

        {/* 3-Column Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <div key={i} className={cn(
              "flex flex-col items-center text-center group p-8 rounded-[32px] transition-all duration-500 hover:translate-y-[-4px]",
              isDark ? "bg-white/5 border border-white/10" : "bg-white border border-black/5 shadow-sm"
            )}>
              <div className="relative w-full aspect-square mb-8 overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className={cn(
                "font-sans font-bold text-[20px] mb-3 tracking-tight",
                isDark ? "text-white/90" : "text-black/90"
              )}>
                {item.title}
              </h3>
              <p className={cn(
                "font-sans text-[15px] leading-relaxed",
                isDark ? "text-white/60" : "text-black/60"
              )}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        {reviews && reviews.length > 0 && (
          <div className={cn(
            "rounded-[48px] p-8 md:p-16",
            isDark ? "bg-white/5 border border-white/10" : "bg-[#F3F3F3]"
          )}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {reviews.map((review, i) => (
                <div key={i} className="space-y-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(review.stars)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFB800">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className={cn(
                    "font-sans text-[16px] md:text-[18px] leading-relaxed",
                    isDark ? "text-white/80" : "text-black/80"
                  )}>
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className={cn(
                      "font-sans text-[14px] font-medium",
                      isDark ? "text-white/40" : "text-black/40"
                    )}>
                      {review.date} • {review.author || "Play Store Review"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
