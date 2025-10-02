import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const springOptions = { stiffness: 80, damping: 20, mass: 0.5 } as const;

export default function AuroraBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, springOptions);
  const y = useSpring(mouseY, springOptions);
  const glowX = useTransform(x, (v) => `${v}%`);
  const glowY = useTransform(y, (v) => `${v}%`);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 100;
      const ny = (e.clientY / window.innerHeight) * 100;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* radial glow that follows cursor */}
      <motion.div
        className="absolute size-[60vmax] rounded-full blur-[80px] opacity-40"
        style={{
          left: glowX,
          top: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle at center, rgba(59,130,246,0.25), rgba(147,51,234,0.18) 40%, rgba(236,72,153,0.12) 70%, transparent 75%)',
        }}
      />

      {/* layered aurora ribbons */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/3 left-0 right-0 h-[70vh] [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-r from-cyan-500/40 via-fuchsia-500/30 to-indigo-500/40 animate-[gradient_12s_linear_infinite] bg-[length:400%_400%]" />
        </div>
        <div className="absolute -bottom-1/3 left-0 right-0 h-[70vh] [mask-image:linear-gradient(to_top,black,transparent)]">
          <div className="absolute inset-0 blur-3xl opacity-40 bg-gradient-to-r from-emerald-400/30 via-sky-500/25 to-violet-500/35 animate-[gradient_16s_linear_infinite] bg-[length:400%_400%]" />
        </div>
      </div>
    </div>
  );
}


