'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import styles from './parallax-strip-slider.module.css';

const AUTOPLAY_INTERVAL = 6000;
const CACHE_NAME = 'mahalaxmi-store-formats-v1';
const STORAGE_KEY = 'mahalaxmi_store_slider_last_index';

export type ParallaxStripSlide = {
  src: string;
  title: string;
  anchor?: string;
  chapter?: string;
  description?: string;
};

export type ParallaxStripSliderProps = {
  slides: ParallaxStripSlide[];
  className?: string;
  autoplay?: boolean;
  accentColor?: string;
};

/**
 * Preload and cache all slider images into browser memory and Cache Storage API
 * so slides load instantly upon navigation and page refresh.
 */
async function cacheStoreImages(slides: ParallaxStripSlide[]) {
  if (typeof window === 'undefined') return;

  // 1. In-memory image preload
  slides.forEach((slide) => {
    const img = new Image();
    img.src = slide.src;
  });

  // 2. Persistent Browser Cache Storage
  if ('caches' in window) {
    try {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(
        slides.map(async (slide) => {
          try {
            const hasMatch = await cache.match(slide.src);
            if (!hasMatch) {
              await cache.add(slide.src);
            }
          } catch {
            // Silently fallback if individual asset fetch fails
          }
        })
      );
    } catch {
      // In case Cache API is restricted in private browsing
    }
  }
}

const slideVariants: Variants = {
  enter: (direction: 'next' | 'prev') => ({
    x: direction === 'next' ? '100%' : '-100%',
    opacity: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 },
      opacity: { duration: 0.35, ease: 'easeOut' as const },
    },
  },
  exit: (direction: 'next' | 'prev') => ({
    x: direction === 'next' ? '-100%' : '100%',
    opacity: 0.92,
    transition: {
      x: { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 },
      opacity: { duration: 0.35, ease: 'easeOut' as const },
    },
  }),
};

export default function ParallaxStripSlider({
  slides,
  className = '',
  autoplay = true,
  accentColor = '#bd884e',
}: ParallaxStripSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const appliedHashRef = useRef<string | null>(null);
  const total = slides.length;

  // Restore exact last viewed slide from localStorage & warm up browser image cache
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < total) {
          setCurrent(parsed);
        }
      }
    } catch {
      // localStorage may be disabled
    }
    setIsReady(true);
    cacheStoreImages(slides);
  }, [slides, total]);

  useEffect(() => {
    const selectHashSlide = () => {
      const hash = window.location.hash.slice(1);
      if (!hash || appliedHashRef.current === hash) return;

      const index = slides.findIndex((slide) => slide.anchor === hash);
      if (index >= 0) {
        appliedHashRef.current = hash;
        setDirection('next');
        setCurrent(index);
      }
    };

    selectHashSlide();
    window.addEventListener('hashchange', selectHashSlide);
    return () => window.removeEventListener('hashchange', selectHashSlide);
  }, [slides]);

  // Persist current slide index whenever it changes
  useEffect(() => {
    if (!isReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, String(current));
    } catch {
      // localStorage may be full or blocked
    }
  }, [current, isReady]);

  const goTo = useCallback(
    (index: number, newDirection: 'next' | 'prev') => {
      setDirection(newDirection);
      setCurrent(index);
      try {
        localStorage.setItem(STORAGE_KEY, String(index));
      } catch {}
    },
    []
  );

  const next = useCallback(() => {
    if (total < 2) return;
    goTo((current + 1) % total, 'next');
  }, [current, goTo, total]);

  const previous = useCallback(() => {
    if (total < 2) return;
    goTo((current - 1 + total) % total, 'prev');
  }, [current, goTo, total]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused || total < 2) return;
    const timer = setInterval(() => {
      next();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [autoplay, isPaused, next, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') previous();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, previous]);

  if (!slides.length) return null;
  const active = slides[current];

  return (
    <div
      className={`${styles.slider} ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Store formats showcase"
    >
      {/* Sliding Images Track */}
      <div className={styles.slideTrack}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={isReady ? slideVariants : undefined}
            initial="enter"
            animate="center"
            exit="exit"
            className={styles.slide}
          >
            <img
              src={active.src}
              alt={active.title}
              draggable={false}
              loading="eager"
              fetchPriority="high"
              className={styles.slideImage}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Base subtle ambient darkening */}
      <div className={styles.baseOverlay} aria-hidden="true" />

      {/* Left-side soft-grey gradient mask for text legibility */}
      <div className={styles.leftGradientMask} aria-hidden="true" />

      {/* Left Circular Arrow Button (White circle, black arrow, centered at edge) */}
      {total > 1 && (
        <button
          type="button"
          onClick={previous}
          aria-label="Previous store format"
          className={`${styles.navButton} ${styles.prevButton}`}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Right Circular Arrow Button (White circle, black arrow, centered at edge) */}
      {total > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Next store format"
          className={`${styles.navButton} ${styles.nextButton}`}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Slide Captions */}
      <div className={styles.caption}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={styles.captionInner}
          >
            {active.chapter && (
              <span className={styles.chapter}>{active.chapter}</span>
            )}
            <div className={styles.details}>
              <h2 className={styles.title}>{active.title}</h2>
              {active.description && (
                <p className={styles.description}>{active.description}</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <span className={styles.counter}>
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
