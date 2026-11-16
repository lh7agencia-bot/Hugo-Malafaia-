import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/officeData';

export function WhatsAppFloatingButton() {
  const href = buildWhatsAppUrl(
    'Olá, Dr. Hugo Malafaia! Gostaria de falar com o escritório.'
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp com Hugo Malafaia advogado"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex h-12 w-12 sm:h-12 sm:w-auto items-center justify-center gap-2.5 rounded-full sm:rounded-lg bg-[#2ECC71] sm:px-4 text-sm font-semibold text-[#1A1A1A] shadow-lg shadow-black/40 hover:bg-[#27AE60] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
