"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Sparkles, User, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export function Nav({ statusText }: { statusText?: string }) {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [theme, setTheme] = useState("light");
  const [logoHover, setLogoHover] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id], div[id='work'], div[id='about'], div[id='experiments'], div[id='photography']");
      let currentSection = "";
      
      sections.forEach((section) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop;
        if (window.scrollY >= sectionTop - window.innerHeight / 3) {
          currentSection = "#" + element.getAttribute("id");
        }
      });
      
      if (window.scrollY < 200) {
        currentSection = "";
      }
      
      setIsScrolled(window.scrollY > 250);
      
      setActiveHash((prev) => {
        if (prev !== currentSection) return currentSection;
        return prev;
      });
    };
    
    handleHashChange();
    handleScroll();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Theme observer
    const observer = new MutationObserver(() => {
      const currentTheme = document.body.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navItems = [
    { label: "Work", href: "/#work", icon: Briefcase },
    { label: "Playground", href: "/#experiments", icon: Sparkles },
    { label: "Photography", href: "/#photography", icon: Camera },
    { label: "About", href: "/#about", icon: User },
  ];

  const isDashboard = pathname?.startsWith("/dashboard");
  if (isDashboard) return null;

  const isDark = theme === "dark";

  return (
    <>
      {/* Top Nav */}
      <div className="fixed top-6 md:top-8 left-0 right-0 z-[100] flex justify-center px-2 md:px-4 font-sans">
        <motion.nav
          aria-label="Primary"
          animate={{
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.8)",
            borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.06)"
          }}
          className="backdrop-blur-3xl border rounded-full p-1 md:p-1.5 flex items-center gap-0 md:gap-1.5 transition-all duration-500 overflow-x-auto no-scrollbar max-w-[calc(100vw-16px)]"
        >
          <Link href="/" className={cn(
            "flex items-center pl-2 md:pl-4 pr-1 md:pr-3 group focus:outline-none shrink-0 mr-0 md:mr-1 transition-colors duration-500 h-[36px] md:h-[40px]"
          )}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          >
            <motion.div
               animate={{ width: isScrolled ? 24 : 0, opacity: isScrolled ? 1 : 0, marginRight: isScrolled ? 6 : 0 }}
               className="overflow-hidden rounded-full shrink-0 flex items-center justify-center bg-black/5 hidden md:flex"
               transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
               <Image src="/images/about/about.JPG" alt="Vimarsh" width={24} height={24} className="min-w-[24px] object-cover object-[center_90%] scale-[1.5]" />
            </motion.div>
            
            <motion.div 
              animate={{ color: isDark ? "#ffffff" : "#000000" }}
              className="font-bold text-[12px] md:text-[14px] tracking-tight flex items-center"
            >
              V
              <div className={cn("overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] whitespace-nowrap hidden md:block", logoHover ? "max-w-[70px] opacity-100" : "max-w-0 opacity-0")}>
                IMARSH&nbsp;
              </div>
              T
              <div className={cn("overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] whitespace-nowrap hidden md:block", logoHover ? "max-w-[50px] opacity-100" : "max-w-0 opacity-0")}>
                IWARI
              </div>
            </motion.div>
          </Link>

          <div 
            className="flex items-center gap-0.5 md:gap-1.5 pr-1 shrink-0"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navItems.map((item) => {
              const isWork = item.label === "Work";
              const isAbout = item.label === "About";
              const isExperiments = item.label === "Playground";
              const isPhotography = item.label === "Photography";

              const isActive = (isWork && activeHash === "#work") ||
                               (isAbout && activeHash === "#about") ||
                               (isExperiments && activeHash === "#experiments") ||
                               (isPhotography && activeHash === "#photography");

              const isPillVisible = hoveredTab !== null ? hoveredTab === item.label : isActive;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredTab(item.label)}
                  className="relative group focus:outline-none px-3 md:px-5 py-2 md:py-2.5 rounded-full flex items-center justify-center shrink-0"
                >
                  {isPillVisible && (
                    <motion.div
                      layoutId="desktopNavPill"
                      className={cn(
                        "absolute inset-0 rounded-full z-0",
                        isDark ? "bg-white/10 border border-white/20" : "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-black/[0.04]"
                      )}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                  <motion.span
                    animate={item.label === "Playground" ? {
                      rotate: [0, -5, 5, -5, 5, 0],
                      transition: { duration: 0.6, repeat: Infinity, repeatDelay: 30, ease: "easeInOut" }
                    } : {}}
                    className={cn(
                      "relative z-10 text-[11px] md:text-[13px] font-medium tracking-[0.01em] transition-colors duration-300 block origin-center",
                      isPillVisible 
                        ? (isDark ? "text-white" : "text-black") 
                        : (isDark ? "text-white/60 group-hover:text-white/90" : "text-black/60 group-hover:text-black/90")
                    )}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      </div>
    </>
  );
}
