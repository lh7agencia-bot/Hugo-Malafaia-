import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/officeData';
import { EASE_OUT_EXPO, HairlineReveal, Reveal } from './Reveal';

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="scroll-mt-14 md:scroll-mt-18 bg-white text-[#1A1A1A] dark:bg-[#1A1A1A] dark:text-[#F5F5F3] py-16 lg:py-24 border-b border-[#E2E2DE] dark:border-white/10 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#15803D] dark:text-[#2ECC71]">
              Depoimentos de Clientes
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#F5F5F3]">
              Confiança construída com clareza e resultado
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
            Relatos de clientes atendidos de forma presencial no Setor Bueno e por consultoria
            digital.
          </p>
        </Reveal>

        <HairlineReveal className="mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: EASE_OUT_EXPO,
              }}
              className="flex flex-col justify-between rounded-xl border border-[#E2E2DE] dark:border-white/10 bg-[#F7F7F5] dark:bg-[#222222] p-6 sm:p-8 transition-colors duration-150 hover:border-[#15803D]/50 dark:hover:border-[#2ECC71]/45"
            >
              <div>
                <div
                  className="flex items-center gap-1"
                  aria-label={`Avaliação: ${item.rating} de 5 estrelas`}
                >
                  {Array.from({ length: item.rating }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="h-4 w-4 fill-[#2ECC71] text-[#1E8449] dark:text-[#2ECC71]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 text-sm sm:text-base leading-relaxed text-[#262626] dark:text-neutral-200 max-w-[65ch]">
                  “{item.text}”
                </blockquote>
              </div>

              <footer className="mt-6 pt-4 border-t border-[#E2E2DE] dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                <span className="font-semibold text-[#1A1A1A] dark:text-[#F5F5F3]">
                  {item.name}
                </span>
                <span className="text-neutral-600 dark:text-neutral-400">{item.context}</span>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
