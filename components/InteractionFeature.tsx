"use client";

import { motion } from "framer-motion";

export function InteractionFeature() {
  return (
    <section className="container-content py-24 md:py-32">
      <div className="max-w-[760px] text-left">
        {/* Main Claim */}
        <h2 className="font-sans font-semibold text-[28px] md:text-[36px] leading-[1.3] text-ink mb-1">
          Obsessed with{" "}
          <span className="inline-flex items-center align-middle mx-1.5">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-[28px] h-[28px] rounded-full bg-[#FF5C00] flex items-center justify-center relative shadow-sm"
              style={{ bottom: "3px" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]">
                <motion.path 
                  d="M5 13l4 4L19 7" 
                  stroke="white" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
              </svg>
            </motion.div>
          </span>
          {" "}what ships — <br className="hidden md:block" />
          not what wins design awards.
        </h2>

        {/* Supporting Line */}
        <p className="font-sans font-semibold text-[28px] md:text-[36px] leading-[1.3] text-ink-dim mb-6">
          Every screen measured, tested, and learned from.
        </p>

        {/* Keywords */}
        <div className="label-mono text-[11px] md:text-[12px] text-ink-faint tracking-[0.1em] uppercase">
          CONVERSION <span className="mx-2 md:mx-3 font-sans opacity-50 text-[16px] leading-none align-middle relative top-[-1px]">·</span> 
          RETENTION <span className="mx-2 md:mx-3 font-sans opacity-50 text-[16px] leading-none align-middle relative top-[-1px]">·</span> 
          ENGAGEMENT <span className="mx-2 md:mx-3 font-sans opacity-50 text-[16px] leading-none align-middle relative top-[-1px]">·</span> 
          GROWTH LOOPS
        </div>
      </div>
    </section>
  );
}
