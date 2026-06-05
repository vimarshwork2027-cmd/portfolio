"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  "/images/photography/WhatsApp Image 2026-02-01 at 11.07.56.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.07.57.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.07.58.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.07.59.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.00.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.02.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.03.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.04.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.05.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.06 (1).jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.06.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.07 (1).jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.07.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.08.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.09.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.10 (1).jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.10.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.11.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.12 (1).jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.12.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.13 (1).jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.13.jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.14 (1).jpeg",
  "/images/photography/WhatsApp Image 2026-02-01 at 11.08.14.jpeg",
];

export function PhotographySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { 
    amount: 0.1, 
    margin: "0px 0px -20% 0px" 
  });

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setDirection(1);
    setSelectedIndex((prev) => (prev !== null && prev < PHOTOS.length - 1 ? prev + 1 : 0));
  }, [selectedIndex]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setDirection(-1);
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : PHOTOS.length - 1));
  }, [selectedIndex]);

  // Animation variants for premium sliding feel
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.4 },
    scale: { duration: 0.4 }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Use scroll progress to create a "sticky" background transition
  const bgOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.18, 0.75, 0.92],
    [0, 1, 1, 0]
  );

  // Handle theme switching based on scroll progress for more precision
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      if (v > 0.15 && v < 0.85) {
        document.body.setAttribute("data-theme", "dark");
      } else {
        document.body.setAttribute("data-theme", "light");
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedIndex]);

  const selectedImage = selectedIndex !== null ? PHOTOS[selectedIndex] : null;

  return (
    <section 
      ref={containerRef}
      id="photography" 
      className="relative min-h-[120vh] py-32 md:py-48 overflow-visible mt-24"
    >
      {/* Cinematic Background Layer */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black" style={{ height: '15%' }} />
        <div className="absolute inset-0 bg-black" style={{ top: '15%' }} />
      </motion.div>

      <div className="container-content relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto mb-16 md:mb-24"
        >
          <div className="font-serif italic text-ink/60 text-[17px] md:text-[18px] mb-4 tracking-tight transition-colors duration-500">
            Photography
          </div>
          <h2 className="font-sans font-medium text-3xl md:text-4xl tracking-[-0.05em] text-ink transition-colors duration-500">
            And hey, I love <span className="font-serif italic">photography.</span>
          </h2>
        </motion.div>

        {/* Pinterest-style Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6 max-w-6xl mx-auto">
          {PHOTOS.map((src, i) => (
            <PhotoCard key={i} src={src} index={i} onClick={() => {
              setDirection(0);
              setSelectedIndex(i);
            }} />
          ))}
        </div>
      </div>

      {/* Full-screen Lightbox */}
      <AnimatePresence initial={false} custom={direction}>
        {selectedIndex !== null && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full z-[210]"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </motion.button>

            {/* Navigation Sliders */}
            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-[210]"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-[210]"
              onClick={handleNext}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <motion.div
              key={selectedIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="relative max-w-full max-h-full overflow-hidden rounded-[20px] md:rounded-[32px] shadow-2xl shadow-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage} 
                alt="Selected photography"
                width={1600}
                height={1200}
                quality={80}
                className="w-full h-auto max-h-[85vh] md:max-h-[90vh] object-contain select-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Glows for Dark Mode */}
      <div className={cn(
        "absolute inset-0 pointer-events-none transition-opacity duration-1000",
        isInView ? "opacity-40" : "opacity-0"
      )}>
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>
    </section>
  );
}

function PhotoCard({ src, index, onClick }: { src: string, index: number, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: (index % 4) * 0.1, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="break-inside-avoid relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-[24px] md:rounded-[32px] bg-black/5 aspect-auto border border-white/5 transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-purple-500/10">
        <Image
          src={src}
          alt={`Photography ${index + 1}`}
          width={800}
          height={1000}
          quality={70}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

