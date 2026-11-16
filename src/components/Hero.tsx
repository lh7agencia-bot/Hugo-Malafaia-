import { useRef } from 'react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { BUSINESS_INFO, HERO_PILLARS, buildWhatsAppUrl } from '../data/officeData';
import { ResilientImage } from './ResilientImage';
import { HairlineReveal, Reveal } from './Reveal';
import { ThemeMode, ThemeToggle } from './ThemeToggle';

interface HeroProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export function Hero({ theme, onThemeChange }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const imageParallaxScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.01]);

  const whatsappHref = buildWhatsAppUrl(
    'Olá, Dr. Hugo Malafaia! Gostaria de solicitar uma orientação jurídica.'
  );

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="scroll-mt-14 md:scroll-mt-18 bg-[#F7F7F5] text-[#1A1A1A] dark:bg-[#1A1A1A] dark:text-[#F5F5F3] border-b border-[#E2E2DE] dark:border-white/10 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <Reveal immediate yOffset={16} className="lg:col-span-7 flex flex-col justify-between gap-8 py-2">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  <span className="text-[#15803D] dark:text-[#2ECC71] font-semibold">
                    {BUSINESS_INFO.name}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{BUSINESS_INFO.niche}</span>
                  <span aria-hidden="true">·</span>
                  <span>Setor Bueno, Goiânia</span>
                </div>

                <ThemeToggle theme={theme} onChange={onThemeChange} />
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold leading-[1.08] tracking-tight text-[#1A1A1A] dark:text-[#F5F5F3] max-w-2xl">
                {BUSINESS_INFO.slogan}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-[65ch]">
                Atuação jurídica pautada pela técnica processual, análise rigorosa de provas e
                proximidade em cada decisão. Defendemos seus direitos e seu patrimônio com
                estratégia clara, atendimento presencial em Goiânia e consultoria online.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#agendamento"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#2ECC71] px-6 py-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[#27AE60] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
                >
                  Agendar Consulta
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-black/20 dark:border-white/20 px-5 py-3 text-sm font-medium text-[#1A1A1A] dark:text-[#F5F5F3] hover:border-[#15803D] dark:hover:border-[#2ECC71] hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
                >
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>

            <div className="border-t border-[#E2E2DE] dark:border-white/10 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors"
              >
                <MapPin
                  className="h-4 w-4 text-[#15803D] dark:text-[#2ECC71] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{BUSINESS_INFO.address}</span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 tabular-nums hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors sm:justify-end"
              >
                <Phone
                  className="h-4 w-4 text-[#15803D] dark:text-[#2ECC71] shrink-0"
                  aria-hidden="true"
                />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </Reveal>

          <Reveal immediate delay={0.1} yOffset={18} className="lg:col-span-5 flex">
            <div className="relative w-full aspect-[2/3] lg:aspect-auto lg:min-h-[520px] max-h-[600px] overflow-hidden rounded-xl border border-[#E2E2DE] dark:border-white/10 bg-[#EAEAE6] dark:bg-[#222222]">
              <motion.div
                style={{
                  y: shouldReduceMotion ? 0 : imageParallaxY,
                  scale: shouldReduceMotion ? 1 : imageParallaxScale,
                }}
                className="h-full w-full will-change-transform"
              >
                <ResilientImage
                  src="/images/escritorio-4.jpg"
                  alt="Hugo Malafaia advogado — Retrato profissional no escritório em Goiânia"
                  priority
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-lg font-semibold text-[#F5F5F3]">
                  Hugo Malafaia
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                  Advogado · Atendimento presencial e digital
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <HairlineReveal className="mt-12 lg:mt-16" />

        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HERO_PILLARS.map((pillar, idx) => (
            <Reveal key={pillar.index} delay={idx * 0.06} yOffset={16} className="space-y-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xs font-semibold tabular-nums text-[#15803D] dark:text-[#2ECC71]">
                  {pillar.index}.
                </span>
                <h2 className="text-base font-semibold text-[#1A1A1A] dark:text-[#F5F5F3]">
                  {pillar.title}
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
