import { useState } from 'react';
import { Scale } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F0F0EC] to-[#E4E4DE] dark:from-[#222222] dark:to-[#141414] border border-black/10 dark:border-white/10 p-6 text-center ${className}`}
      >
        <Scale
          className="h-8 w-8 text-[#15803D] dark:text-[#2ECC71] mb-3"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p className="font-display text-base text-[#1A1A1A] dark:text-[#F5F5F3]">
          Hugo Malafaia advogado
        </p>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
