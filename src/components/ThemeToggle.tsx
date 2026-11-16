import { Moon, Sun } from 'lucide-react';

export type ThemeMode = 'dark' | 'light';

interface ThemeToggleProps {
  theme: ThemeMode;
  onChange: (theme: ThemeMode) => void;
}

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Alternar modo de visualização"
      className="inline-flex items-center gap-1 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-[#222222] p-1"
    >
      <button
        type="button"
        onClick={() => onChange('light')}
        aria-pressed={theme === 'light'}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
          theme === 'light'
            ? 'bg-[#1A1A1A] text-[#F5F5F3]'
            : 'text-neutral-600 dark:text-neutral-300 hover:text-[#1A1A1A] dark:hover:text-white'
        }`}
      >
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Claro</span>
      </button>
      <button
        type="button"
        onClick={() => onChange('dark')}
        aria-pressed={theme === 'dark'}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
          theme === 'dark'
            ? 'bg-[#2ECC71] text-[#1A1A1A] font-semibold'
            : 'text-neutral-600 dark:text-neutral-300 hover:text-[#1A1A1A] dark:hover:text-white'
        }`}
      >
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Escuro</span>
      </button>
    </div>
  );
}
