import { useEffect, useRef, useState } from 'react';
import { Check, Copy, ExternalLink, Maximize2, MapPin, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { BUSINESS_INFO, OFFICE_PHOTOS, OfficePhoto } from '../data/officeData';
import { ResilientImage } from './ResilientImage';
import { HairlineReveal, Reveal } from './Reveal';

export function OfficeGallery() {
  const galleryRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });
  const parallaxEven = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const parallaxOdd = useTransform(scrollYProgress, [0, 1], [14, -14]);

  const [selectedPhoto, setSelectedPhoto] = useState<OfficePhoto | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      ref={galleryRef}
      id="escritorio"
      className="scroll-mt-14 md:scroll-mt-18 bg-[#F7F7F5] text-[#1A1A1A] dark:bg-[#141414] dark:text-[#F5F5F3] py-16 lg:py-24 border-b border-[#E2E2DE] dark:border-white/10 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-8">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#15803D] dark:text-[#2ECC71]">
              O Escritório · Setor Bueno, Goiânia
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#F5F5F3]">
              Estrutura reservada e atendimento pessoal
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
            <div className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
              <MapPin
                className="h-4 w-4 text-[#15803D] dark:text-[#2ECC71] mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>{BUSINESS_INFO.address}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-[#1A1A1A] px-3.5 py-2 text-xs font-medium text-[#1A1A1A] dark:text-[#F5F5F3] hover:border-[#15803D] dark:hover:border-[#2ECC71] hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors whitespace-nowrap shrink-0"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Abrir no Google Maps
              </a>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-[#1A1A1A] px-3.5 py-2 text-xs font-medium text-[#1A1A1A] dark:text-[#F5F5F3] hover:border-[#15803D] dark:hover:border-[#2ECC71] hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check
                      className="h-3.5 w-3.5 text-[#15803D] dark:text-[#2ECC71]"
                      aria-hidden="true"
                    />
                    <span className="text-[#15803D] dark:text-[#2ECC71]">Endereço copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copiar endereço</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Reveal>

        <HairlineReveal className="mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {OFFICE_PHOTOS.map((photo, idx) => (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-xl border border-[#E2E2DE] dark:border-white/10 bg-white dark:bg-[#1A1A1A] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                aria-label={`Ampliar foto: ${photo.alt}`}
                className="relative block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
              >
                <div className={`w-full overflow-hidden bg-[#EAEAE6] dark:bg-[#222222] ${photo.aspectClass}`}>
                  <motion.div
                    style={{
                      y: shouldReduceMotion ? 0 : idx % 2 === 0 ? parallaxEven : parallaxOdd,
                    }}
                    className="h-full w-full scale-[1.07] will-change-transform"
                  >
                    <ResilientImage
                      src={photo.src}
                      alt={photo.alt}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </motion.div>
                </div>
                <span className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#1A1A1A]/80 text-[#F5F5F3] border border-white/15 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
              <figcaption className="p-4 text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 border-t border-[#E2E2DE] dark:border-white/10">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-xl border border-white/15 bg-[#1A1A1A] overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
                <p className="text-sm font-medium text-[#F5F5F3] truncate">{selectedPhoto.caption}</p>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Fechar visualização da foto"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/15 text-[#F5F5F3] hover:border-[#2ECC71] hover:text-[#2ECC71] transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-center bg-[#121212] p-4 max-h-[80vh]">
                <ResilientImage
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="max-h-[70vh] w-auto max-w-full rounded-md object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
