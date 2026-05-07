"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Sparkles, User, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    // Theme observer
    const observer = new MutationObserver(() => {
      const currentTheme = document.body.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, []);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Work", href: "/#work", icon: Briefcase },
    { label: "About", href: "/about", icon: User },
    { label: "Playground", href: "/experiments", icon: Sparkles },
    { label: "Photography", href: "/photography", icon: Camera },
  ];

  const isDashboard = pathname?.startsWith("/dashboard");
  if (isDashboard) return null;

  const isDark = theme === "dark";

  return (
    <>
      {/* Desktop Top Nav */}
      <div className="fixed top-8 left-0 right-0 z-[100] hidden md:flex justify-center px-4 font-sans">
        <motion.nav
          aria-label="Primary"
          animate={{
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.7)",
            borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.04)"
          }}
          className="backdrop-blur-2xl border rounded-full px-2 py-2 flex items-center gap-2 transition-all duration-500"
        >
          <Link href="/" className={cn(
            "flex items-center px-5 group focus:outline-none shrink-0 border-r mr-1 transition-colors duration-500",
            isDark ? "border-white/10" : "border-black/[0.05]"
          )}>
            <motion.span 
              animate={{ color: isDark ? "#ffffff" : "#000000" }}
              className="font-extrabold text-[15px] tracking-tighter transition-transform group-hover:scale-105"
            >
              VT
            </motion.span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isWork = item.href === "/#work";
              const isHome = item.href === "/";
              const isActive = isWork 
                ? (pathname === "/" && activeHash === "#work")
                : isHome
                  ? (pathname === "/" && !activeHash)
                  : pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative group focus:outline-none"
                >
                  <motion.div
                    animate={{
                      color: isActive 
                        ? (isDark ? "#ffffff" : "#000000") 
                        : (isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"),
                      backgroundColor: isActive 
                        ? (isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 1)") 
                        : "rgba(0, 0, 0, 0)"
                    }}
                    className={cn(
                      "px-6 py-2.5 text-[14px] font-bold transition-all duration-300 rounded-full",
                      isActive && !isDark && "shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-black/[0.08]",
                      isActive && isDark && "border border-white/20",
                      !isActive && (isDark ? "hover:bg-white/10" : "hover:bg-black/[0.03]")
                    )}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-12 left-0 right-0 z-[100] flex md:hidden justify-center px-6 font-sans">
        <motion.nav 
          animate={{
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(249, 249, 249, 0.8)",
            borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
          }}
          className="w-full max-w-[440px] backdrop-blur-3xl border shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] rounded-[40px] p-2 flex items-center justify-between gap-1 overflow-hidden relative transition-all duration-500"
        >
          {navItems.filter(item => item.label !== "Work").map((item) => {
            const isHome = item.href === "/";
            const isActive = isHome
                ? (pathname === "/" && !activeHash)
                : pathname === item.href;
            const Icon = item.icon;
            
            return (
              <motion.div key={item.label} className="flex-1" whileTap={{ scale: 0.9 }}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex flex-col items-center justify-center py-2.5 px-1 gap-1 transition-all duration-500 rounded-[32px] outline-none",
                    isActive 
                      ? (isDark ? "text-white" : "text-black") 
                      : (isDark ? "text-white/40" : "text-black/30")
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabMobile"
                      animate={{
                        backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 1)",
                        borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.05)"
                      }}
                      className="absolute inset-0 shadow-sm border rounded-[28px]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <motion.div
                    animate={{ 
                      scale: isActive ? [1, 1.15, 1] : 1,
                      y: isActive ? [0, -2, 0] : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, duration: 0.4 }}
                    className="relative z-10"
                  >
                    <Icon 
                      size={22} 
                      strokeWidth={isActive ? 2.5 : 2}
                      fill={isActive ? "currentColor" : "none"}
                      className="transition-all duration-300"
                    />
                  </motion.div>
                  
                  <span className={cn(
                    "relative z-10 text-[10px] font-bold tracking-tight transition-all duration-300",
                    isActive ? "opacity-100 translate-y-0" : "opacity-60 translate-y-[1px]"
                  )}>
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
}
