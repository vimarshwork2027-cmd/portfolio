"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Copy, Check, Linkedin, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer({ 
  email, 
  socials = [] 
}: { 
  email?: string; 
  socials?: any[]; 
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.body.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const [copiedEmail, setCopiedEmail] = useState(false);

  if (isDashboard) return null;

  const isDark = theme === "dark";

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <motion.footer 
      animate={{ 
        backgroundColor: isDark ? "#000000" : "#ffffff",
      }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="pt-12 pb-12 font-sans antialiased relative overflow-hidden border-t border-black/[0.04]"
    >
      <div 
        className={cn(
          "absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000",
          isDark ? "opacity-10" : "opacity-20"
        )}
        style={{ 
          backgroundImage: `radial-gradient(${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to top, black, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent 80%)'
        }}
      />

      {/* Hero-style Central Glow */}
      <div className="absolute bottom-[-300px] inset-x-0 flex justify-center pointer-events-none z-[1] overflow-visible">
        <div className="relative w-[800px] h-[400px] flex justify-center">
          <motion.div 
            animate={{
              scale: [1, 1.1, 1],
              opacity: isDark ? [0.05, 0.1, 0.05] : [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[600px] h-[600px] bg-accent blur-[150px] rounded-full bottom-0 opacity-10" 
          />
        </div>
      </div>

      <div className="container-content relative z-20">
        {/* Main Collaboration Card */}
        <motion.div 
          animate={{
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.8)",
            borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.04)",
            boxShadow: isDark ? "0 48px 96px -32px rgba(0,0,0,0.5)" : "0 48px 96px -32px rgba(0,0,0,0.06)"
          }}
          className="backdrop-blur-3xl rounded-[40px] md:rounded-[64px] p-8 md:p-16 border flex flex-col items-center text-center relative overflow-hidden mb-8 max-w-5xl mx-auto transition-all duration-1000"
        >
          {/* Cursors */}
          <motion.div 
            animate={{ y: [-8, 8, -8], x: [-4, 4, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[8%] md:left-[12%] hidden md:block z-30"
          >
            <div className="flex flex-col items-start gap-0.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
                <path d="M5.5 3.5L18.5 12L11.5 13.5L5.5 20.5V3.5Z" fill="#A855F7" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <div className="bg-[#A855F7] text-white px-3 py-1.5 rounded-r-full rounded-bl-full text-[12px] font-bold shadow-xl shadow-purple-500/20 translate-x-3 -translate-y-1">
                Vimarsh Tiwari
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [8, -8, 8], x: [4, -4, 4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[25%] right-[8%] md:right-[12%] hidden md:block z-30"
          >
            <div className="flex flex-col items-start gap-0.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
                <path d="M5.5 3.5L18.5 12L11.5 13.5L5.5 20.5V3.5Z" fill="#EF4444" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <div className="bg-[#EF4444] text-white px-4 py-1.5 rounded-r-full rounded-bl-full text-[13px] font-bold shadow-xl shadow-red-500/20 translate-x-3 -translate-y-1">
                You
              </div>
            </div>
          </motion.div>

          <motion.h2 
            animate={{ color: isDark ? "#ffffff" : "#000000" }}
            className="font-sans text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1.1] tracking-[-0.05em] font-medium mb-4 transition-colors duration-1000"
          >
            Let’s <span className="text-accent italic font-serif px-1">Collaborate</span> Together
          </motion.h2>
          
          <motion.p 
            animate={{ color: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)" }}
            className="text-[17px] md:text-[20px] font-medium max-w-none mb-10 leading-relaxed transition-colors duration-1000"
          >
            If you're building something interesting, I'd love to work together.
          </motion.p>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <motion.button 
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCopy(email || "")}
              animate={{
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
                color: isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.03)"
              }}
              className="pl-7 pr-3 py-2.5 rounded-full flex items-center gap-6 transition-all font-bold text-[14px] group border shadow-sm relative"
            >
              <span>{email}</span>
              <motion.div 
                animate={{
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 1)",
                  color: isDark ? "#ffffff" : "#000000"
                }}
                className="p-2 rounded-full shadow-sm transition-all duration-300"
              >
                {copiedEmail ? <Check size={14} className="text-success" /> : <Copy size={14} />}
              </motion.div>
            </motion.button>

            <motion.div whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale:0.97 }}>
              <Link 
                href="/about" 
                className="bg-accent text-white px-7 py-2.5 rounded-full font-bold text-[14px] shadow-[0_4px_16px_rgba(78,85,240,0.2)] transition-all duration-200 block relative overflow-hidden group"
              >
                <span className="relative z-10">More about me</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 px-4 md:px-8 text-[13px] font-medium border-t border-black/[0.04]">
          <motion.div 
            animate={{ color: isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)" }}
            className="flex flex-col md:flex-row items-center gap-3 md:gap-6 transition-colors duration-1000"
          >
            <div className="font-sans">© {new Date().getFullYear()} Vimarsh Tiwari</div>
            <div className={cn("hidden md:block w-[1px] h-4", isDark ? "bg-white/10" : "bg-black/[0.08]")} />
            <div className="font-sans">Created at odd hours, patched today, re-imagined tomorrow.</div>
          </motion.div>

          <div className="flex items-center gap-8">
            <motion.a 
              animate={{ color: isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.3)" }}
              whileHover={{ scale: 1.1, color: isDark ? "#ffffff" : "#000000" }}
              href="https://linkedin.com/in/vimarsh" target="_blank"
              className="transition-all"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a 
              animate={{ color: isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.3)" }}
              whileHover={{ scale: 1.1, color: isDark ? "#ffffff" : "#000000" }}
              href="https://instagram.com/vimarsh" target="_blank"
              className="transition-all"
            >
              <Instagram size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
