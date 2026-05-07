"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";

interface TestimonialData {
  id: string;
  name: string;
  title: string;
  quote: string;
  photoUrl?: string | null;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
  index: number;
}

function Waveform() {
  return (
    <div className="flex items-center gap-[2px] h-3.5 px-2 py-1 bg-black/5 rounded-full">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          className="w-[1.5px] bg-[#2511CC] rounded-full"
          animate={{
            height: ["20%", "100%", "40%", "80%", "20%"],
          }}
          transition={{
            duration: 0.8 + (i * 0.1),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05
          }}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  // Safety first: handle missing names or titles
  const name = testimonial.name || "Anonymous";
  const quote = testimonial.quote || "No feedback provided.";
  const title = testimonial.title || "Colleague";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const activeGradients = [
    "from-[#2511CC] to-[#6049E7]", // Brand Blue to Indigo
    "from-[#3521FF] to-[#D3F8FF]", // Electric to Sky
    "from-[#FF5A1F] to-[#FFD4B8]", // Ember to Peach
    "from-[#1C00FF] to-[#8695F3]", // Deep Notch Blue to Soft Purple
    "from-[#6049E7] to-[#D3F8FF]"  // Indigo to Sky
  ];
  
  const activeGradient = activeGradients[index % activeGradients.length];
  const words = quote.split(" ");

  // Animation variants for the Karaoke effect and floating
  const containerVariants = {
    initial: { y: 0, scale: 1, rotate: 0 },
    hover: {
      y: [0, -10, 0],
      scale: [1, 1.015, 1],
      rotate: [0, 0.5, -0.5, 0],
      transition: {
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        staggerChildren: 0.07,
      }
    }
  };

  const wordVariants = {
    initial: {},
    hover: { 
      color: "rgba(0, 0, 0, 0.85)",
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: [0.3, 0.6, 0.3],
      transition: { 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <div className="relative group mb-6 break-inside-avoid">
      {/* Premium Apple-like Glow Effect - Pulse on Hover */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        whileHover="hover"
        className={`absolute -inset-8 bg-gradient-to-br ${activeGradient} blur-[80px] rounded-full z-0 pointer-events-none`}
      />

      <motion.div
        initial="initial"
        whileHover="hover"
        variants={containerVariants}
        suppressHydrationWarning
        className="rounded-[32px] md:rounded-[40px] p-8 md:p-10 flex flex-col bg-white border border-black/[0.04] relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default z-10"
      >
        {/* Vibrant Gradient Reveal on Hover - ULTRA SUBTLE */}
        <div className={`absolute inset-0 bg-gradient-to-br ${activeGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-in-out z-0`} />

        {/* Top Header: Avatar & Waveform */}
        <div className="flex items-center justify-between relative z-10">
          {testimonial.photoUrl ? (
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-[12px] md:rounded-[14px] overflow-hidden relative grayscale mix-blend-luminosity opacity-100 border-[0.5px] border-black/10 transition-all duration-700 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:scale-105 group-hover:border-black/5">
              <Image 
                src={testimonial.photoUrl} 
                alt={name} 
                fill
                className="object-cover transition-transform duration-700"
                sizes="60px"
              />
            </div>
          ) : (
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-[12px] md:rounded-[14px] bg-black/5 border-[0.5px] border-black/5 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/40 transition-all duration-700">
              <span className="text-[13px] md:text-[14px] font-bold text-black/30 group-hover:text-black/60 tracking-tight transition-colors duration-700">{initials}</span>
            </div>
          )}
          
          {/* Staggered Waveform */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Waveform />
          </div>
        </div>

        {/* Main Quote & Attribution */}
        <div className="mt-5 md:mt-7 relative z-10">
          <div className="font-sans text-[18px] md:text-[22px] leading-[1.4] tracking-tight font-bold flex flex-wrap gap-x-[0.25em] text-black/45 group-hover:text-black/[0.07] transition-colors duration-300">
            <motion.span variants={wordVariants} className="inline-block">&ldquo;</motion.span>
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block text-inherit"
              >
                {word}
              </motion.span>
            ))}
            <motion.span variants={wordVariants} className="inline-block">&rdquo;</motion.span>
          </div>
          <div className="mt-4 md:mt-6 border-t border-black/5 pt-4 transition-colors duration-700">
            <p className="font-sans font-medium text-[#2511CC] text-[15px] md:text-[16px] tracking-tight transition-colors duration-700">
              With {name}.
            </p>
            <p className="text-black/40 font-medium text-[13px] md:text-[14px] mt-1 tracking-tight transition-colors duration-700">
              {title}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


export function Testimonial({ 
  testimonials = []
}: { 
  testimonials?: TestimonialData[];
}) {
  return (
    <section id="testimonials" className="container-content py-24 md:py-32 border-t border-rule mt-12">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-12 md:mb-16">
        <div className="font-serif italic text-[#2511CC] text-[17px] md:text-[18px] mb-4 tracking-tight">Proof of Work</div>
        <h2 className="font-sans font-medium text-3xl md:text-4xl tracking-[-0.05em] text-black">
          Testimonials<span className="font-serif text-gradient-hero ml-1">.</span>
        </h2>
      </div>

      {/* CSS Columns Masonry Grid */}
      <div className="columns-1 md:columns-2 gap-6 w-full max-w-6xl mx-auto">
        {(testimonials || []).map((t, i) => (
          <TestimonialCard 
            key={t.id || i} 
            testimonial={t} 
            index={i} 
          />
        ))}
      </div>
    </section>
  );
}
