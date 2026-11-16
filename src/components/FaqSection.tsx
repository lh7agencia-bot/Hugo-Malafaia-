import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FAQ_ITEMS, buildWhatsAppUrl } from '../data/officeData';
import { Reveal } from './Reveal';

export function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="scroll-mt-14 md:scroll-mt-18 bg-white text-[#1A1A1A] dark:bg-[#141414] dark:text-[#F5F5F3] py-16 lg:py-24 border-b border-[#E2E2DE] dark:border-white/10 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <Reveal className="lg:col-span-4 space-y-4">
            <p className="text-xs font-semibold tracking-wide text-[#15803D] dark:text-[#2ECC71]">
              Perguntas Frequentes
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#F5F5F3]">
              Dúvidas comuns antes do atendimento
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Esclarecimentos diretos sobre agendamento, documentação inicial, honorários e
              acompanhamento dos processos.
            </p>
            <div className="pt-2">
              <a
                href={buildWhatsAppUrl('Olá! Tenho uma dúvida sobre atendimento jurídico.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#1A1A1A] dark:bg-[#2ECC71] px-5 py-2.5 text-sm font-semibold text-[#F5F5F3] dark:text-[#1A1A1A] hover:bg-[#2ECC71] hover:text-[#1A1A1A] dark:hover:bg-[#27AE60] transition-colors duration-150"
              >
                Tirar dúvida pelo WhatsApp
              </a>
            </div>
          </Reveal>

          <div className="lg:col-span-8 divide-y divide-[#E2E2DE] dark:divide-white/10 border-y border-[#E2E2DE] dark:border-white/10">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const buttonId = `faq-button-${item.id}`;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-transparent"
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="flex w-full min-h-[56px] items-center justify-between gap-4 py-5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
                    >
                      <span className="flex items-baseline gap-3 text-base sm:text-lg font-semibold text-[#1A1A1A] dark:text-[#F5F5F3]">
                        <span className="text-xs font-semibold tabular-nums text-[#15803D] dark:text-[#2ECC71]">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span>{item.question}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#D4D4CE] dark:border-white/15 bg-[#F7F7F5] dark:bg-[#222222] text-[#1A1A1A] dark:text-[#F5F5F3]"
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="pb-6 pl-0 sm:pl-7 pr-4"
                      >
                        <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-[68ch]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
