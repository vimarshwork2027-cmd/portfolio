"use client";

import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface FooterProps {
  email: string;
  socials: any[];
}

export function Footer({ email, socials }: FooterProps) {
  const linkedin = socials.find(s => s.label.toLowerCase().includes('linkedin'))?.href;
  const twitter = socials.find(s => s.label.toLowerCase().includes('twitter') || s.label.toLowerCase().includes('x'))?.href;
  const instagram = socials.find(s => s.label.toLowerCase().includes('instagram'))?.href;
  const medium = socials.find(s => s.label.toLowerCase().includes('medium'))?.href;

  const bubbleRef = useRef<HTMLDivElement>(null);
  const isBubbleInView = useInView(bubbleRef, { once: true, amount: 0.5 });
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isBubbleInView) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1500); // Show typing dots for 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, [isBubbleInView]);

  return (
    <footer className="bg-[#F8F8F8] pt-16 md:pt-20 pb-24 md:pb-32 border-t border-black/5 relative overflow-hidden transition-colors duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]">
      <div className="container-content relative z-10 max-w-4xl mx-auto">
        
        {/* Heading */}
        <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-tight text-black/80 mb-10">
          Let&apos;s have coffee?
        </h2>

        {/* Message Card */}
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-8 md:p-12 mb-16 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-black/[0.02]">
          <div className="flex flex-col gap-6 max-w-md">
            {/* Bubble 1 */}
            {/* Bubble 1 */}
            <div ref={bubbleRef} className="flex items-start gap-3 origin-bottom-left min-h-[60px]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isBubbleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mt-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              >
                <Image src="/images/about/about.JPG" alt="Vimarsh" fill quality={100} sizes="40px" className="object-cover" />
              </motion.div>
              
              {isBubbleInView && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="bg-[#F2F2F7] text-black/80 px-5 py-3 rounded-[20px] rounded-tl-[4px] text-[15px] md:text-[16px] font-medium leading-snug shadow-sm min-h-[48px] min-w-[70px] flex items-center justify-center overflow-hidden"
                >
                  {isTyping && (
                    <div className="flex items-center gap-[5px] px-2 py-1">
                      <motion.div className="w-1.5 h-1.5 bg-black/40 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }} />
                      <motion.div className="w-1.5 h-1.5 bg-black/40 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} />
                      <motion.div className="w-1.5 h-1.5 bg-black/40 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
                    </div>
                  )}
                  {!isTyping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      Want to work together, or just say hi?
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>


          </div>
        </div>

        {/* Info Table */}
        <div className="flex flex-col w-full mb-24">
          {/* Mail Row */}
          <div className="flex justify-between items-center py-6 border-b border-black/[0.06]">
            <span className="text-[14px] md:text-[15px] text-black/40 font-medium">Mail</span>
            <Link href={`mailto:${email}`} className="text-[14px] md:text-[15px] text-black/80 font-medium hover:text-black transition-colors">
              {email}
            </Link>
          </div>

          {/* Socials Row */}
          <div className="flex justify-between items-center py-6 border-b border-black/[0.06]">
            <span className="text-[14px] md:text-[15px] text-black/40 font-medium">Socials</span>
            <div className="flex items-center gap-2 text-[14px] md:text-[15px] text-black/80 font-medium">
              {linkedin && <Link href={linkedin} target="_blank" className="hover:text-black transition-colors underline decoration-black/10 underline-offset-4">LinkedIn</Link>}
              {(linkedin && (twitter || instagram)) && <span className="text-black/20 mx-1">·</span>}
              {twitter && <Link href={twitter} target="_blank" className="hover:text-black transition-colors underline decoration-black/10 underline-offset-4">Twitter</Link>}
              {(!twitter && instagram) && <Link href={instagram} target="_blank" className="hover:text-black transition-colors underline decoration-black/10 underline-offset-4">Instagram</Link>}
            </div>
          </div>



          {/* Resume Row */}
          <div className="flex justify-between items-center py-6 border-b border-black/[0.06]">
            <span className="text-[14px] md:text-[15px] text-black/40 font-medium">Resume</span>
            <div className="flex items-center gap-2 text-[14px] md:text-[15px] text-black/80 font-medium">
              <Link href="/images/about/Vimarsh's_Resume.pdf" target="_blank" className="hover:text-black transition-colors underline decoration-black/10 underline-offset-4 flex items-center gap-1">
                View PDF <span className="text-[12px]">↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Credit Line */}
        <div className="text-center">
          <p className="text-[13px] md:text-[14px] text-black/30 font-medium">
            Designed by Vimarsh. Built with <span>Next.js</span> and <span>Claude</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
