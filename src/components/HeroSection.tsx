import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── 3D Model ───────────────────────────────────────────────────────────────
const Model = ({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) => {
  const { scene } = useGLTF("/model_hero.glb");
  const groupRef = useRef<THREE.Group>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
    groupRef.current.rotation.y = rotateY.get();
  });

  return <primitive ref={groupRef} object={scene} scale={16} />;
};

// Preload for faster first paint
useGLTF.preload("/model_hero.glb");

// ── Hero Section ──────────────────────────────────────────────────────────
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen spotlight-glow grain-overlay overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* ── LAMHE REGISTER — top right ── */}
      <motion.div
        className="absolute top-24 right-6 md:right-16 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.2, duration: 0.7 }}
      >
        <button
          onClick={() => scrollTo("ilhaam")}
          className="relative overflow-hidden rounded-sm shadow-2xl group"
          style={{
            background: "linear-gradient(145deg, #f5e6c0, #e8d49a, #d4b86a, #e8d49a, #f5e6c0)",
            border: "2px solid #9a7a3a",
            boxShadow: "0 4px 24px rgba(180,140,40,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
          }}
        >
          {/* paper grain */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
          {/* corner marks */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t border-l" style={{ borderColor: "#9a7a3a" }} />
          <div className="absolute top-1 right-1 w-3 h-3 border-t border-r" style={{ borderColor: "#9a7a3a" }} />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l" style={{ borderColor: "#9a7a3a" }} />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r" style={{ borderColor: "#9a7a3a" }} />
          <div className="relative px-5 py-3 text-center">
            <p className="font-body text-[9px] tracking-[0.4em] uppercase mb-0.5" style={{ color: "#6b4f1a" }}>
              Register Now
            </p>
            <p className="font-heading text-lg font-bold italic leading-tight" style={{ color: "#3d2a08" }}>
              Lamhe
            </p>
            <p className="font-body text-[9px] tracking-wider mt-0.5" style={{ color: "#6b4f1a" }}>
              Stage Play · 15 Apr 2026
            </p>
          </div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(157,120,50,0.1)" }}
          />
        </button>
      </motion.div>

      {/* ── 3D MODEL — centered ── */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1.4 }}
      >
        {/* Ambient glow behind model */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(232,180,34,0.07) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
          }}
        />
        <Canvas
          camera={{ position: [0, -1, 7], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 4]} intensity={4} color="#e8b422" />
          <pointLight position={[-3, -2, 3]} intensity={2.5} color="#3b82f6" />
          <directionalLight position={[0, 5, -3]} intensity={0.6} />
          <Suspense fallback={null}>
            <Model sectionRef={sectionRef} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </motion.div>

      {/* ── LEFT TEXT ── */}
      <motion.div
        className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 z-20 max-w-xs"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
      >
        <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-body mb-3">
          Abhivyakti Presents
        </p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4">
          The Stage<br />
          <span className="text-gradient-electric">Awaits</span>
        </h2>
        <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
          Where silence speaks, stories breathe, and every spotlight illuminates a new world.
        </p>
        <motion.button
          onClick={() => scrollTo("ilhaam")}
          className="px-5 py-2 font-body text-xs tracking-widest uppercase border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-sm"
          whileHover={{ scale: 1.04 }}
        >
          Explore Events
        </motion.button>
      </motion.div>

      {/* ── SCROLL HINT ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5, duration: 0.6 }}
      >
       
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
