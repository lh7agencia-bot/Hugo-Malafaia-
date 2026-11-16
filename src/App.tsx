/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { BackToTopButton } from './components/BackToTopButton';
import { BookingAndContact } from './components/BookingAndContact';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OfficeGallery } from './components/OfficeGallery';
import { PracticeAreas } from './components/PracticeAreas';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SeoRuntime } from './components/SeoRuntime';
import { Testimonials } from './components/Testimonials';
import type { ThemeMode } from './components/ThemeToggle';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { PRACTICE_AREAS } from './data/officeData';

export default function App() {
  const [selectedArea, setSelectedArea] = useState<string>(PRACTICE_AREAS[0].title);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('hm-theme', theme);
    } catch {
      // ignore storage failure in private frames
    }
  }, [theme]);

  return (
    <MotionConfig reducedMotion="user">
      <SeoRuntime />
      <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#1A1A1A] dark:bg-[#1A1A1A] dark:text-[#F5F5F3] transition-colors duration-200">
        <ScrollProgressBar />
        <Header />
        <main className="flex-1">
          <Hero theme={theme} onThemeChange={setTheme} />
          <PracticeAreas onSelectArea={setSelectedArea} />
          <OfficeGallery />
          <Testimonials />
          <BookingAndContact selectedArea={selectedArea} />
          <FaqSection />
        </main>
        <Footer theme={theme} onThemeChange={setTheme} />
        <BackToTopButton />
        <WhatsAppFloatingButton />
      </div>
    </MotionConfig>
  );
}
