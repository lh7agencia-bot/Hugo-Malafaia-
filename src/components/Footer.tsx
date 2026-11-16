import { MapPin, Phone } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/officeData';
import { Reveal } from './Reveal';
import { ThemeMode, ThemeToggle } from './ThemeToggle';

interface FooterProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export function Footer({ theme, onThemeChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#EFEFEB] text-neutral-700 dark:bg-[#121212] dark:text-neutral-300 py-12 lg:py-16 transition-colors duration-200">
      <Reveal yOffset={16} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#DCDCD6] dark:border-white/10">
          <div className="md:col-span-5 space-y-3">
            <a
              href="#inicio"
              className="inline-block font-display text-xl font-semibold text-[#1A1A1A] dark:text-[#F5F5F3]"
            >
              {BUSINESS_INFO.name}
            </a>
            <p className="text-sm text-[#15803D] dark:text-[#2ECC71] font-medium">
              {BUSINESS_INFO.slogan}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              Atendimento jurídico estratégico com atuação presencial em Goiânia e consultoria
              online.
            </p>
            <div className="pt-2">
              <ThemeToggle theme={theme} onChange={onThemeChange} />
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold tracking-wide text-[#1A1A1A] dark:text-[#F5F5F3]">
              Navegação
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#atuacao"
                  className="hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors"
                >
                  Áreas de Atuação
                </a>
              </li>
              <li>
                <a
                  href="#escritorio"
                  className="hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors"
                >
                  O Escritório
                </a>
              </li>
              <li>
                <a
                  href="#depoimentos"
                  className="hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors"
                >
                  Depoimentos
                </a>
              </li>
              <li>
                <a
                  href="#agendamento"
                  className="hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors"
                >
                  Agendamento Online
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors"
                >
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-semibold tracking-wide text-[#1A1A1A] dark:text-[#F5F5F3]">
              Localização &amp; Contato
            </h2>
            <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
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
                href={buildWhatsAppUrl('Olá, Dr. Hugo Malafaia! Gostaria de agendar uma consulta.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 tabular-nums hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors"
              >
                <Phone
                  className="h-4 w-4 text-[#15803D] dark:text-[#2ECC71] shrink-0"
                  aria-hidden="true"
                />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <p className="text-xs text-neutral-500">{BUSINESS_INFO.hours}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {currentYear} {BUSINESS_INFO.name}. Todos os direitos reservados.
          </p>
          <p>Goiânia · Goiás</p>
        </div>
      </Reveal>
    </footer>
  );
}
