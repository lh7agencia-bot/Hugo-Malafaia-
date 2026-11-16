import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { BUSINESS_INFO } from '../data/officeData';

const NAV_ITEMS = [
  { id: 'atuacao', label: 'Atuação', href: '#atuacao' },
  { id: 'escritorio', label: 'Escritório', href: '#escritorio' },
  { id: 'depoimentos', label: 'Depoimentos', href: '#depoimentos' },
  { id: 'faq', label: 'Dúvidas', href: '#faq' },
  { id: 'contato', label: 'Contato', href: '#contato' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24);
  });

  useEffect(() => {
    const sectionIds = ['inicio', ...NAV_ITEMS.map((n) => n.id)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const topId = visible[0].target.id;
          setActiveId(topId === 'inicio' ? '' : topId);
        }
      },
      {
        rootMargin: '-28% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-200 backdrop-blur-md ${
        isScrolled
          ? 'border-[#D4D4CE] dark:border-white/15 bg-[#F7F7F5]/98 dark:bg-[#1A1A1A]/98 shadow-sm shadow-black/5 dark:shadow-black/30'
          : 'border-[#E2E2DE] dark:border-white/10 bg-[#F7F7F5]/90 dark:bg-[#1A1A1A]/90'
      }`}
    >
      <div className="mx-auto flex h-14 md:h-18 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#F5F5F3] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ECC71]"
        >
          {BUSINESS_INFO.name}
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-300"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative whitespace-nowrap shrink-0 py-1.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ECC71] ${
                  isActive
                    ? 'text-[#1A1A1A] dark:text-[#F5F5F3] font-semibold'
                    : 'hover:text-[#1A1A1A] dark:hover:text-[#F5F5F3]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-x-0 -bottom-px h-[2px] bg-[#15803D] dark:bg-[#2ECC71]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#agendamento"
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#2ECC71] px-4 py-2 text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:bg-[#27AE60] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
          >
            Agendar Consulta
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-md border border-black/15 dark:border-white/15 text-[#1A1A1A] dark:text-[#F5F5F3] hover:border-[#2ECC71] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-[#E2E2DE] dark:border-white/10 bg-[#F7F7F5] dark:bg-[#1A1A1A] px-4 py-4 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-black/5 dark:bg-white/5 text-[#15803D] dark:text-[#2ECC71] font-semibold'
                    : 'text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#15803D] dark:hover:text-[#2ECC71]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href="#agendamento"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-[#2ECC71] px-4 py-2.5 text-sm font-semibold text-[#1A1A1A] hover:bg-[#27AE60] transition-colors"
            >
              Agendar Consulta
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
