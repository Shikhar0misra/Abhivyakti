import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useLayoutEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import streetPlay from "@/assets/street-play.jpg";
import shortFilm from "@/assets/short-film.jpg";
import stagePlay from "@/assets/stage-play.jpg";
import stageSpotlight from "@/assets/stage-spotlight.jpg";

const galleryItems = [
  { title: "Riha", subtitle: "Street Play", image: streetPlay },
  { title: "Short Film Festival", subtitle: "Cinema", image: shortFilm },
  { title: "Akshara", subtitle: "Theatre Performances", image: stagePlay },
  { title: "Ilhaam", subtitle: "The Grand Event", image: stageSpotlight },
];

const EventGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [sectionHeight, setSectionHeight] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);
  // Manual override: if user drags/arrows, we offset the scroll-driven x
  const [manualOffset, setManualOffset] = useState(0);

  const CARD_WIDTH_VW = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.38, 560) : 480;
  const GAP = 24;
  const MAX_MANUAL = 0; // will be set after measure

  useLayoutEffect(() => {
    const calculate = () => {
      if (!innerRef.current) return;
      const totalWidth = innerRef.current.scrollWidth;
      const screenWidth = window.innerWidth;
      const distance = Math.max(totalWidth - screenWidth, 0);
      setScrollDistance(distance);
      setSectionHeight(distance + window.innerHeight);
    };
    setTimeout(calculate, 300);
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scroll-driven X from page scroll
  const scrollX = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  // Combined X = scrollX + manualOffset (clamped in render)
  const maxManual = scrollDistance;

  const nudge = useCallback((direction: 1 | -1) => {
    setManualOffset((prev) => {
      const next = prev + direction * (CARD_WIDTH_VW + GAP);
      return Math.max(-maxManual * 0.3, Math.min(maxManual * 0.3, next));
    });
    // Reset after 3s so scroll-driven takes back over
    setTimeout(() => setManualOffset(0), 3000);
  }, [CARD_WIDTH_VW, maxManual]);

  // Drag support
  const dragStartX = useRef<number | null>(null);
  const dragStartOffset = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragStartOffset.current = manualOffset;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = dragStartX.current - e.clientX;
    const next = dragStartOffset.current + delta * 0.6;
    setManualOffset(Math.max(-maxManual * 0.4, Math.min(maxManual * 0.4, next)));
  };
  const onPointerUp = () => { dragStartX.current = null; };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden grain-overlay"
      style={{ height: sectionHeight || "200vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Header */}
        <div className="absolute top-20 left-6 z-20 max-w-xl pointer-events-none">
          <motion.h2
            className="font-heading text-4xl md:text-6xl font-bold text-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Event Gallery
          </motion.h2>
          <p className="text-muted-foreground font-body text-sm mt-2">
            Scroll or drag to explore →
          </p>
        </div>

        {/* Arrow buttons */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {[{ dir: -1 as const, icon: ChevronLeft }, { dir: 1 as const, icon: ChevronRight }].map(({ dir, icon: Icon }) => (
            <button
              key={dir}
              onClick={() => nudge(dir)}
              className="w-10 h-10 rounded-full border border-border bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        {/* Draggable gallery track */}
        <motion.div
          ref={containerRef}
          className="flex gap-6 px-6 h-full items-center cursor-grab active:cursor-grabbing"
          style={{ x: scrollX }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div ref={innerRef} className="flex gap-6 items-center">
            {/* Spacer so first card isn't hidden behind header text */}
            <div className="flex-shrink-0 w-2 md:w-8" />

            {galleryItems.map((item, i) => (
              <motion.div
                key={item.title}
                className="relative flex-shrink-0 w-[72vw] md:w-[46vw] lg:w-[38vw] aspect-video rounded-lg overflow-hidden group"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ pointerEvents: "none" }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-300 font-body text-sm">{item.subtitle}</p>
                </div>
                {/* Card number */}
                <div className="absolute top-4 right-4 text-white/40 font-heading text-xs tracking-widest">
                  0{i + 1}
                </div>
              </motion.div>
            ))}

            <div className="flex-shrink-0 w-16" />
          </div>
        </motion.div>

        {/* Progress dots */}
        <div className="absolute bottom-10 right-6 z-20 flex flex-col gap-1.5">
          {galleryItems.map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full transition-all duration-300"
              style={{
                height: 20,
                background: "hsl(var(--primary) / 0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventGallery;
