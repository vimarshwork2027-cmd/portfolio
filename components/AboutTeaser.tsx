"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Pegboard } from "./Pegboard";

export function AboutTeaser({ 
  aboutCopy, 
  buckets = [], 
  standaloneItems = [] 
}: { 
  aboutCopy: string;
  buckets?: any[];
  standaloneItems?: any[];
}) {
  const words = aboutCopy.split(" ");

  // Animation variants for the Karaoke effect
  const containerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.02,
      }
    }
  };

  const wordVariants = {
    initial: { opacity: 0.5 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="container-content py-24 md:py-32 border-t border-rule bg-bg-subtle/50">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start mb-16 md:mb-24">
        <div className="lg:w-5/12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-serif italic text-[#2511CC] text-[17px] md:text-[18px] mb-6 tracking-tight">About</div>
            <h2 className="font-sans font-medium text-display-md tracking-[-0.04em] text-ink leading-[1.1]">
              Designer obsessed with what <span className="font-serif text-gradient-hero">moves the number.</span>
            </h2>
          </motion.div>
        </div>
        
        <div className="flex-1 max-w-[600px]">
          <motion.div
            initial="initial"
            whileHover="hover"
            animate="initial"
            variants={containerVariants}
            className="flex flex-col"
          >
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-ink mb-10 flex flex-wrap gap-x-[0.35em]"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-10 pt-2"
            >
              <Link 
                href="/about" 
                className="flex items-center gap-2 text-ink-dim font-bold text-[14px] tracking-tight transition-all hover:text-ink group"
              >
                Read my full story
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

            </motion.div>
          </motion.div>
        </div>
      </div>


      {/* Interactive Pegboard */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Pegboard buckets={buckets} standaloneItems={standaloneItems} />
      </motion.div>
    </section>
  );
}

