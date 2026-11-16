import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 inset-x-0 z-50 h-[3px] bg-transparent"
    >
      <motion.div
        style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress }}
        className="h-full w-full origin-left bg-[#2ECC71]"
      />
    </div>
  );
}
