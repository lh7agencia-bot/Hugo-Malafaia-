import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';

export function BackToTopButton() {
  const { scrollY, scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 420);
  });

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleScrollToTop}
          aria-label="Voltar ao início da página"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 inline-flex h-11 w-11 sm:h-12 sm:w-auto items-center justify-center gap-2 rounded-full sm:rounded-lg border border-black/15 dark:border-white/20 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md sm:px-3.5 text-sm font-medium text-[#1A1A1A] dark:text-[#F5F5F3] shadow-lg shadow-black/15 dark:shadow-black/40 hover:border-[#15803D] dark:hover:border-[#2ECC71] hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
        >
          <span className="relative inline-flex h-6 w-6 items-center justify-center shrink-0">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="absolute inset-0 h-6 w-6 -rotate-90"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.18"
                strokeWidth="2"
              />
              <motion.circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="#2ECC71"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: shouldReduceMotion ? scrollYProgress : smoothProgress }}
              />
            </svg>
            <ArrowUp className="h-3.5 w-3.5 relative z-10" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline whitespace-nowrap">Início</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
