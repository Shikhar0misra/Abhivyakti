import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import theatreMasks from "@/assets/theatre-masks.png";

const OpeningAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"masks" | "split" | "done">("masks");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("split"), 2200);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-hidden">

        {/* LEFT CURTAIN */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0 0, 52% 0, 48% 100%, 0 100%)",
            background: "linear-gradient(160deg, #2a0a0a 0%, #6b1010 40%, #3d0808 70%, #1a0404 100%)",
          }}
          animate={phase === "split" ? { x: "-105%", skewX: "-3deg" } : {}}
          transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
        >
          {[15, 30, 45, 60, 75].map((pct) => (
            <div key={pct} className="absolute top-0 bottom-0 w-px" style={{
              left: `${pct}%`,
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.45) 70%, transparent)",
            }} />
          ))}
          <div className="absolute top-0 bottom-0 right-0 w-2" style={{
            background: "linear-gradient(to right, transparent, #c8960c, #e8b422, #c8960c, transparent)",
          }} />
        </motion.div>

        {/* RIGHT CURTAIN */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(52% 0, 100% 0, 100% 100%, 48% 100%)",
            background: "linear-gradient(200deg, #1a0404 0%, #3d0808 30%, #6b1010 60%, #2a0a0a 100%)",
          }}
          animate={phase === "split" ? { x: "105%", skewX: "3deg" } : {}}
          transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
        >
          {[20, 35, 50, 65, 80].map((pct) => (
            <div key={pct} className="absolute top-0 bottom-0 w-px" style={{
              left: `${pct}%`,
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.45) 70%, transparent)",
            }} />
          ))}
          <div className="absolute top-0 bottom-0 left-0 w-2" style={{
            background: "linear-gradient(to left, transparent, #c8960c, #e8b422, #c8960c, transparent)",
          }} />
        </motion.div>

        {/* TOP VALANCE */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-14 z-10"
          style={{
            background: "linear-gradient(to bottom, #150303, #5a0e0e, #150303)",
            borderBottom: "3px solid #c8960c",
            boxShadow: "0 4px 24px rgba(200,150,12,0.5)",
          }}
          animate={phase === "split" ? { opacity: 0, y: -80 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* LOGO */}
        <AnimatePresence>
          {phase === "masks" && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute w-72 h-72 rounded-full" style={{
                background: "radial-gradient(ellipse, rgba(232,180,34,0.18) 0%, transparent 70%)",
                filter: "blur(24px)",
              }} />
              <motion.img
                src={theatreMasks}
                alt="Theatre Masks"
                className="w-28 h-28 md:w-44 md:h-44 mb-5 relative z-10 drop-shadow-2xl"
                animate={{ scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <motion.h1
                className="font-heading text-3xl md:text-5xl font-bold tracking-wider relative z-10"
                style={{ color: "#e8d5a3", textShadow: "0 0 40px rgba(232,180,34,0.6), 0 2px 8px rgba(0,0,0,0.9)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                Abhivyakti
              </motion.h1>
              <motion.p
                className="text-sm md:text-base mt-2 tracking-[0.35em] uppercase relative z-10"
                style={{ color: "#c8960c" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                Drama Society
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CENTER SEAM FLASH */}
        <motion.div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 z-30"
          style={{ background: "linear-gradient(to bottom, transparent, #e8b422 20%, #fff8e0 50%, #e8b422 80%, transparent)" }}
          initial={{ opacity: 0 }}
          animate={phase === "split" ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </div>
    </AnimatePresence>
  );
};

export default OpeningAnimation;
