import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PRACTICE_AREAS } from '../data/officeData';
import { EASE_OUT_EXPO, HairlineReveal, Reveal } from './Reveal';

interface PracticeAreasProps {
  onSelectArea: (areaTitle: string) => void;
}

export function PracticeAreas({ onSelectArea }: PracticeAreasProps) {
  const handleSelect = (areaTitle: string) => {
    onSelectArea(areaTitle);
    const el = document.getElementById('agendamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="atuacao"
      className="scroll-mt-14 md:scroll-mt-18 bg-white text-[#1A1A1A] dark:bg-[#1A1A1A] dark:text-[#F5F5F3] py-16 lg:py-24 border-b border-[#E2E2DE] dark:border-white/10 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#15803D] dark:text-[#2ECC71]">
              Áreas de Atuação
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#F5F5F3]">
              Defesa técnica estruturada para cada demanda
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
            Cada caso recebe estudo individualizado de provas, contratos e jurisprudência antes da
            adoção de qualquer medida extrajudicial ou judicial.
          </p>
        </Reveal>

        <HairlineReveal className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PRACTICE_AREAS.map((area, idx) => (
            <motion.article
              key={area.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: EASE_OUT_EXPO,
              }}
              className={`${area.spanClass} flex flex-col justify-between rounded-xl border border-[#E2E2DE] dark:border-white/10 bg-[#F7F7F5] dark:bg-[#222222] p-6 sm:p-8 transition-colors duration-150 hover:border-[#15803D]/50 dark:hover:border-[#2ECC71]/45`}
            >
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1A1A1A] dark:text-[#F5F5F3]">
                  <span className="text-[#15803D] dark:text-[#2ECC71] tabular-nums mr-2">
                    {area.number}.
                  </span>
                  {area.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-[65ch]">
                  {area.summary}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-[#E2E2DE] dark:border-white/10 pt-5">
                  {area.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-4 shrink-0 bg-[#15803D] dark:bg-[#2ECC71]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E2E2DE] dark:border-white/10">
                <button
                  type="button"
                  onClick={() => handleSelect(area.title)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#15803D] dark:text-[#2ECC71] hover:text-[#1A1A1A] dark:hover:text-[#F5F5F3] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ECC71] cursor-pointer"
                >
                  <span>Agendar consulta nesta área</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
