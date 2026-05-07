"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface StatItemProps {
  label: string;
  value: string;
  unit?: string;
  description: string;
  plusColor?: boolean;
}

function StatItem({ label, value, unit, description, plusColor }: StatItemProps) {
  const isRole = label === "ROLE" || label === "ROLE NAME";
  
  return (
    <div className="flex flex-col py-4 md:py-0">
      <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.15em] font-semibold text-[#86868B] mb-2">
        {label}
      </span>
      
      <div className="flex items-baseline mb-[6px]">
        <span className={isRole ? "font-sans font-bold text-[24px] md:text-[28px] tracking-tight text-[#1D1D1F] leading-[1.2]" : "font-sans font-bold text-[44px] md:text-[56px] tracking-tighter text-[#1D1D1F] leading-none"}>
          {value}
        </span>
        {unit && (
          <span className="font-sans font-bold text-[28px] md:text-[36px] tracking-tighter text-[#1D1D1F] ml-[2px]">
            {unit}
          </span>
        )}
      </div>

      <p className="font-sans text-[14px] md:text-[15px] font-medium tracking-tight text-[#86868B] leading-[1.4] max-w-[200px]">
        {description}
      </p>
    </div>
  );
}

export function StatStrip({ stats = [] }: { stats?: any[] }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
  };

  // Resolve DB mapping (Source -> Description)
  const displayStats = stats && stats.length > 0 ? stats.map(s => ({
    label: s.label,
    value: s.value,
    unit: s.unit,
    description: s.source || s.description || "",
    plusColor: s.plusColor || s.value?.startsWith("+")
  })) : [
    {
      label: "ROLE",
      value: "Product Designer",
      description: "Available for new opportunities",
    },
    {
      label: "USERS",
      value: "20",
      unit: "M",
      description: "Reach across scale products",
    },
    {
      label: "CITIES",
      value: "40,000",
      unit: "+",
      description: "Global product footprint",
    },
    {
      label: "IMPACT",
      value: "+26",
      unit: "%",
      description: "Average conversion lift",
      plusColor: true,
    }
  ];

  return (
    <section className="w-full max-w-[1080px] mx-auto py-16 md:py-24 border-t border-[#E5E5EA] px-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
      >
        {displayStats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <StatItem {...stat} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

