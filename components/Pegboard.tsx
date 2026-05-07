"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface PegItem {
  id: string;
  type: string;
  src?: string | null;
  spineSrc?: string | null;
  width?: number;
  height?: number;
  thickness?: number;
  color?: string | null;
  text?: string | null;
  label?: string | null;
  icons?: string[];
  x: number;
  y: number;
  rotate: number;
  bucketId?: string | null;
}
interface Folder {
  id: string;
  label: string;
  icons: string[];
  x: number;
  y: number;
  rotate: number;
  fontFamily: string;
  items: PegItem[];
}

/* ─── Spring config ─── */
const SPRING = { type: "spring" as const, stiffness: 260, damping: 26 };

/* ─── 3D Metallic Pin ─── */
function Pin3D() {
  return (
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
      <div
        className="w-4 h-4 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #ffffff 0%, #e8e8ea 40%, #b8b8bc 70%, #98989d 100%)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.9)",
        }}
      />
    </div>
  );
}

/* ─── Draggable Item Wrapper ─── */
function DraggableItem({
  x, y, w = 150, h = 150, rotate = 0, zIndex = 30, constraintsRef, onDragEnd, children,
}: {
  x: number; y: number; w?: number; h?: number; rotate?: number; zIndex?: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  onDragEnd?: (newX: number, newY: number) => void;
  children: React.ReactNode;
}) {
  const [dragging, setDragging] = useState(false);
  const boardWidth = 1040;
  const boardHeight = 660;
  const padding = 24;

  // Use motion values to manually reset the transform after drag
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  return (
    <motion.div
      drag
      style={{ 
        left: x, 
        top: y, 
        x: mvX, 
        y: mvY,
        width: w, 
        height: h, 
        rotate: dragging ? 0 : rotate, 
        zIndex 
      }}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={() => setDragging(true)}
      onDragEnd={(_, info) => {
        setDragging(false);
        if (onDragEnd) {
          const rect = constraintsRef.current?.getBoundingClientRect();
          const currentWidth = rect?.width || boardWidth;
          const currentHeight = rect?.height || boardHeight;
          
          // Calculate where it WOULD be
          const rawX = x + info.offset.x;
          const rawY = y + info.offset.y;

          // STRICT CLAMPING: If dropped outside, stick it to the border
          const clampedX = Math.max(padding, Math.min(currentWidth - padding - w, rawX));
          const clampedY = Math.max(padding, Math.min(currentHeight - padding - h, rawY));
          
          // Reset the motion values so the 'left/top' can take over cleanly
          mvX.set(0);
          mvY.set(0);

          onDragEnd(clampedX, clampedY);
        }
      }}
      whileDrag={{
        zIndex: 200,
      }}
      whileHover={{
        scale: 1.02,
      }}
      transition={SPRING}
      className="absolute cursor-grab active:cursor-grabbing"
    >
      {children}
    </motion.div>
  );
}

/* ─── 3D Shelf ─── */

/* ─── 3D BOOK ITEM ─── */
function BookItem({ 
  frontImage, 
  spineImage, 
  label,
  width = 140, 
  height = 200, 
  thickness = 32,
  color = "#2A2A2A"
}: { 
  frontImage: string; 
  spineImage?: string | null; 
  label?: string | null;
  width?: number; 
  height?: number; 
  thickness?: number;
  color?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Contrast logic for light spines (e.g. Steve Jobs book)
  const isLight = color?.toLowerCase() === "#ffffff" || color?.toLowerCase() === "white";
  const textColor = isLight ? "text-black/60" : "text-white/70";

  return (
    <div 
      className="relative"
      style={{ 
        width: isHovered ? width : thickness, 
        height,
        perspective: "2000px",
        transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: isHovered ? 50 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{ 
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
        }}
        initial={false}
        animate={{
          rotateY: isHovered ? 0 : -90,
          rotateX: isHovered ? 2 : 0,
          z: isHovered ? 120 : 0,
          y: isHovered ? [0, -4, 0] : 0, // Gentle floating cycle
          scale: isHovered ? 1.12 : 1,
        }}
        transition={{
          rotateY: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
          z: { type: "spring", stiffness: 200, damping: 25 },
          y: isHovered ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : { type: "spring" },
          default: { type: "spring", stiffness: 150, damping: 20 }
        }}
      >
        {/* Front Cover */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-r-[4px] overflow-hidden bg-white"
          style={{
            transform: `translateZ(${thickness / 2}px)`,
            boxShadow: isHovered 
              ? "50px 50px 100px rgba(0,0,0,0.4), inset 0 0 50px rgba(255,255,255,0.2)" 
              : "none",
          }}
        >
          <Image
            src={frontImage}
            alt={label || "Book"}
            fill
            className="object-cover"
            sizes={`${width}px`}
            priority
          />
          {/* Dynamic Light Sweep */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
          {/* Depth Detail */}
          <div className="absolute left-0 top-0 bottom-0 w-[10px] bg-black/30 blur-[3px]" />
        </div>

        {/* Realistic Spine */}
        <div
          className="absolute inset-0 h-full backface-hidden flex flex-col items-center justify-between py-6 px-1.5"
          style={{
            width: thickness,
            backgroundColor: color,
            transform: `rotateY(90deg) translateZ(${thickness / 2}px)`,
            left: -thickness / 2,
            backgroundImage: isLight 
              ? "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.05) 100%)"
              : "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.2) 100%)",
            boxShadow: isLight 
              ? "inset 0 0 8px rgba(0,0,0,0.1), 1px 0 3px rgba(0,0,0,0.1)"
              : "inset 0 0 20px rgba(0,0,0,0.4)",
          }}
        >
          {/* Top/Bottom Decorative Lines */}
          <div className={cn("w-full h-[1px] shrink-0", isLight ? "bg-black/10" : "bg-white/20")} />
          
          <div className="flex-1 w-full flex items-center justify-center overflow-hidden py-2">
            <span 
              className={cn("font-sans font-bold text-[9px] uppercase tracking-[0.25em] whitespace-nowrap select-none", textColor)}
              style={{ 
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                opacity: isHovered ? 0 : 1,
                transition: "opacity 0.2s ease",
                maxHeight: "150px", // Limit height to prevent overflow
                overflow: "hidden",
                textOverflow: "ellipsis",
                maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
              }}
            >
              {label}
            </span>
          </div>

          <div className={cn("w-full h-[1px] shrink-0", isLight ? "bg-black/10" : "bg-white/20")} />
        </div>

        {/* Top Page Stack */}
        <div
          className="absolute top-0 bg-[#FDFDFD]"
          style={{
            width,
            height: thickness,
            transform: `rotateX(90deg) translateZ(${thickness / 2}px)`,
            backgroundImage: "repeating-linear-gradient(90deg, #EBEBEB 0px, #EBEBEB 1px, transparent 1px, transparent 4px)",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Bookshelf / Shelf System ─── */
function ShelfComponent({
  shelf, x, y, constraintsRef, onDragEnd,
}: {
  shelf: Folder; x: number; y: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  onDragEnd: (newX: number, newY: number) => void;
}) {
  const items = shelf.items;

  return (
    <DraggableItem
      x={x} y={y} w={440} h={260} rotate={shelf.rotate}
      zIndex={40}
      constraintsRef={constraintsRef}
      onDragEnd={onDragEnd}
    >
      <div className="relative flex flex-col items-center group w-[440px]">
        {/* ─ Objects / Books — resting on shelf ─ */}
        <div 
          className="absolute inset-x-0 flex items-end justify-center gap-1.5 px-4 pointer-events-none"
          style={{ bottom: items[0]?.type === "book" ? 28 : -40 }}
        >
          {items.map((item, idx) => {
            if (item.type === "book") {
              return (
                <div key={item.id} className="pointer-events-auto">
                  <BookItem
                    label={item.label}
                    frontImage={item.src || ""}
                    spineImage={item.spineSrc || item.src || ""}
                    width={item.width || 140}
                    height={item.height || 200}
                    thickness={item.thickness || 32}
                    color={item.color || undefined}
                  />
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="pointer-events-auto flex flex-col items-center"
                style={{ zIndex: 10 + idx }}
              >
                <div className="relative w-[800px] h-[180px] transition-transform hover:scale-110 duration-500 ease-out">
                  {item.src && (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.src}
                        alt={item.label || ""}
                        fill
                        className="object-contain pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ─ Shelf base — Hyper Realistic 3D Slab ─ */}
        <div
          className="relative w-[440px] h-[30px] rounded-[14px] bg-white transition-all duration-500 group-hover:-translate-y-1"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #F5F5F7 30%, #E2E2E5 100%)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: `
              0 1px 1px rgba(0,0,0,0.05),
              0 4px 8px rgba(0,0,0,0.05),
              0 12px 24px rgba(0,0,0,0.1),
              0 30px 60px -15px rgba(0,0,0,0.15)
            `,
          }}
        >
          {/* Top Bevel Highlight */}
          <div className="absolute inset-x-3 top-[1px] h-[1px] bg-white/90 rounded-full blur-[0.5px]" />
          
          {/* Front Face Vertical Gradient Overlay */}
          <div className="absolute inset-0 rounded-[14px] opacity-20 pointer-events-none" 
               style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.1) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.1) 100%)" }} />

          {/* Bottom Shadow Lip */}
          <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/[0.08] rounded-full blur-[4px]" />
        </div>
      </div>
    </DraggableItem>
  );
}

/* ─── 3D Cylindrical Bin / Folder ─── */
function FolderComponent({
  folder, x, y, constraintsRef, onDragEnd,
}: {
  folder: Folder; x: number; y: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  onDragEnd: (newX: number, newY: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const items = folder.items;

  // Use shelf view for shelf-like labels
  if (folder.label.toLowerCase().includes("list") || folder.label.toLowerCase().includes("reference")) {
    return <ShelfComponent shelf={folder} x={x} y={y} constraintsRef={constraintsRef} onDragEnd={onDragEnd} />;
  }

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* ─ Expanded background glass pill ─ */}
      <motion.div
        className="absolute rounded-[24px] pointer-events-none"
        initial={false}
        animate={{
          left: isOpen ? x - 16 : x,
          top: isOpen ? y - 16 : y,
          width: isOpen ? 120 + items.length * 110 + 40 : 0,
          height: isOpen ? 140 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={SPRING}
        style={{
          zIndex: 4,
          background: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.6), 0 4px 12px rgba(0,0,0,0.04)",
        }}
      />

      {/* ─ Expanded items — horizontal strip ─ */}
      {items.map((item, idx) => {
        const expandedX = x + 120 + idx * 110;
        const expandedY = y + 4;
        const stackedX = x + 15 + idx * 4;
        const stackedY = y - 20 - idx * 6;

        return (
          <motion.div
            key={item.id}
            className="absolute pointer-events-none"
            initial={false}
            animate={{
              left: isOpen ? expandedX : stackedX,
              top: isOpen ? expandedY : stackedY,
              rotate: isOpen ? 0 : (idx - 1) * 8,
              scale: isOpen ? 1 : 0.55,
              opacity: isOpen ? 1 : 0.5,
              zIndex: isOpen ? 90 + idx : 10 - idx,
            }}
            transition={{
              ...SPRING,
              delay: isOpen ? idx * 0.06 : 0,
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                "bg-white border border-black/[0.04] flex items-center justify-center transition-all duration-300",
                isOpen ? "w-[80px] h-[80px] rounded-[22px] shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
                       : "w-[50px] h-[50px] rounded-[16px] shadow-[0_3px_8px_rgba(0,0,0,0.05)]"
              )}>
                <span className={cn("select-none", isOpen ? "text-[36px]" : "text-[22px]")}>
                  {item.icons?.[0]}
                </span>
              </div>
              {isOpen && item.label && (
                <span className="text-[9px] font-sans font-bold text-ink/40 uppercase tracking-[0.2em]">
                  {item.label}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* ─ Folder bin itself — 3D cylindrical look ─ */}
      <DraggableItem
        x={x} y={y} w={100} h={140} rotate={folder.rotate}
        zIndex={isOpen ? 95 : 40}
        constraintsRef={constraintsRef}
        onDragEnd={onDragEnd}
      >
        <div className="relative flex flex-col items-center">
          <Pin3D />
          {/* Cylinder body */}
          <div
            className={cn(
              "relative w-[100px] h-[100px] rounded-[32px] flex items-center justify-center border border-black/[0.04] transition-all duration-300 overflow-visible",
              isOpen
                ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
                : "bg-white shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
            )}
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #F8F8FA 100%)",
            }}
          >
            <div className="flex gap-0.5">
              {folder.icons.map((icon, i) => (
                <span key={i} className="text-[28px] select-none">{icon}</span>
              ))}
            </div>
          </div>
          {/* Label below */}
          <div className="mt-3">
            <span className="text-[10px] font-sans font-bold text-ink/30 uppercase tracking-[0.35em]">
              {folder.label}
            </span>
          </div>
        </div>
      </DraggableItem>
    </div>
  );
}

/* ─── PEGBOARD CONTAINER ─── */
export function Pegboard({
  buckets = [],
  standaloneItems = [],
}: {
  buckets?: Folder[];
  standaloneItems?: PegItem[];
}) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const init: Record<string, { x: number; y: number }> = {};
    standaloneItems.forEach((i) => (init[i.id] = { x: i.x, y: i.y }));
    buckets.forEach((b) => (init[b.id] = { x: b.x, y: b.y }));
    return init;
  });

  const updatePos = useCallback((id: string, x: number, y: number) => {
    setPositions((prev) => ({ ...prev, [id]: { x, y } }));
  }, []);

  const [scale, setScale] = useState(1);
  const baseWidth = 1040;
  const baseHeight = 660;
  const mobileHeight = 580;

  useEffect(() => {
    if (!constraintsRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (width < baseWidth) {
        // Even more aggressive scaling for mobile to keep elements small
        setScale(width / (baseWidth + 100)); 
      } else {
        setScale(1);
      }
    });

    observer.observe(constraintsRef.current.parentElement!);
    return () => observer.disconnect();
  }, []);

  const currentBoardHeight = scale < 1 ? mobileHeight : baseHeight;

  // Mobile Gallery Component
  const MobileGallery = () => (
    <div className="w-full px-4 space-y-8 md:hidden">
      <div className="grid grid-cols-2 gap-6">
        {standaloneItems.map((item) => (
          <div key={item.id} className="relative flex flex-col items-center">
            {item.type === "polaroid" && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full aspect-[4/5] overflow-hidden rounded-[24px] border border-black/[0.04] shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
                  <div className="relative w-full h-full">
                    {item.src && (
                      <Image
                        src={item.src}
                        alt={item.label || ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 300px"
                      />
                    )}
                  </div>
                </div>
                {item.label && (
                  <div className="text-center mt-3">
                    <span className="text-[9px] font-sans font-bold text-ink/30 uppercase tracking-[0.15em]">
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            )}
            {item.type === "ticket" && (
              <div className="w-full flex items-center justify-center h-full">
                <div className="bg-white rounded-[16px] border border-black/[0.05] px-4 h-[54px] w-full flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <span className="font-sans font-black text-ink text-[14px] tracking-tight text-center">
                    {item.text}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (!mounted) return (
    <div className="w-full py-12 flex flex-col items-center px-4">
      <div className="relative w-full max-w-[1040px] h-[300px] md:h-[660px] rounded-[32px] bg-[#F5F5F7] border border-black/[0.04] animate-pulse" />
    </div>
  );

  return (
    <div className="w-full py-6 md:py-12 flex flex-col items-center">
      
      {/* Mobile View */}
      <MobileGallery />

      {/* Desktop View */}
      <div 
        className="hidden md:block relative origin-top"
        style={{ 
          width: baseWidth, 
          height: currentBoardHeight, 
          transform: `scale(${scale})`,
          marginBottom: -(currentBoardHeight * (1 - scale))
        }}
      >
        <div
          ref={constraintsRef}
          className="relative w-full h-full rounded-[32px] select-none"
          style={{
            backgroundColor: "#F5F5F7",
            backgroundImage: `radial-gradient(ellipse 4px 10px at center, #DDDDE0 100%, transparent 0)`,
            backgroundSize: "40px 40px",
            boxShadow: "0 50px 100px -30px rgba(0,0,0,0.12), inset 0 2px 6px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.04)",
            zIndex: 1,
          }}
        >
          {/* ─── Standalone items ─── */}
          {standaloneItems.map((item) => {
            const pos = positions[item.id] ?? { x: item.x, y: item.y };
            return (
              <DraggableItem
                key={item.id}
                x={pos.x} y={pos.y} 
                w={item.type === "polaroid" ? 160 : 200}
                h={item.type === "polaroid" ? 210 : 60}
                rotate={item.rotate}
                constraintsRef={constraintsRef}
                onDragEnd={(nx, ny) => updatePos(item.id, nx, ny)}
              >
                <div className="relative group w-full h-full">
                  {/* ── Polaroid ── */}
                  {item.type === "polaroid" && (
                    <div className="flex flex-col items-center w-full">
                      <Pin3D />
                      <div className="overflow-hidden rounded-[14px] border border-white/60 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
                        <div className="relative w-[150px] h-[170px] md:w-[160px] md:h-[180px]">
                          {item.src && (
                            <Image
                              src={item.src}
                              alt={item.label || ""}
                              fill
                              className="object-cover pointer-events-none"
                              sizes="180px"
                              draggable={false}
                            />
                          )}
                        </div>
                      </div>
                      {item.label && (
                        <div className="text-center mt-2">
                          <span className="text-[9px] font-sans font-bold text-ink/30 uppercase tracking-[0.2em]">
                            {item.label}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Ticket ── */}
                  {item.type === "ticket" && (
                    <div className="w-full h-full flex flex-col items-center">
                      <Pin3D />
                      <div className="bg-white rounded-[16px] border border-black/[0.03] px-6 h-[54px] w-full flex items-center justify-center gap-4 transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
                        {item.text?.split(" ").map((part, i) => (
                          <span key={i} className="font-sans font-black text-ink text-[18px] tracking-tight">
                            {part}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </DraggableItem>
            );
          })}

          {/* ─── Folders ─── */}
          {buckets.map((folder) => {
            const pos = positions[folder.id] ?? { x: folder.x, y: folder.y };
            return (
              <FolderComponent
                key={folder.id}
                folder={folder}
                x={pos.x} y={pos.y}
                constraintsRef={constraintsRef}
                onDragEnd={(nx, ny) => updatePos(folder.id, nx, ny)}
              />
            );
          })}
        </div>
      </div>

      <p className="mt-8 font-sans text-[13px] text-ink/40 tracking-tight hidden md:block">
        Try Moving Things :)
      </p>
    </div>
  );
}
