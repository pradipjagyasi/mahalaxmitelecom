'use client';

import { useEffect, useRef, useState } from 'react';

import { LOADING_LOGO_BASE64 } from './loading-logo-base64';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  /** 0-100 download progress driven by the asset preloader. */
  progress: number;
  error?: string;
  onComplete?: () => void;
  onContinue?: () => void;
}

const MIN_VISIBLE_MS = 900;
const FADE_MS = 700;

export default function LoadingScreen({ progress, error, onComplete, onContinue }: LoadingScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const doneRef = useRef(false);
  const mountedAtRef = useRef(Date.now());
  const retryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (error) retryRef.current?.focus();
  }, [error]);

  useEffect(() => {
    if (!error || !onContinue) return;
    const timer = window.setTimeout(onContinue, 2000);
    return () => window.clearTimeout(timer);
  }, [error, onContinue]);

  useEffect(() => {
    if (progress < 100 || error || doneRef.current) return;
    doneRef.current = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elapsed = Date.now() - mountedAtRef.current;
    const holdFor = Math.max(250, MIN_VISIBLE_MS - elapsed);
    let fadeId: number | undefined;
    const holdId = window.setTimeout(() => {
      setIsFadingOut(true);
      fadeId = window.setTimeout(() => onComplete?.(), reducedMotion ? 0 : FADE_MS);
    }, holdFor);

    return () => {
      window.clearTimeout(holdId);
      if (fadeId) window.clearTimeout(fadeId);
      doneRef.current = false;
    };
  }, [progress, error, onComplete]);

  const pct = Math.max(0, Math.min(100, Math.floor(progress)));

  return (
    <div
      className={`${styles.screen}${isFadingOut ? ` ${styles.screenFading}` : ''}`}
      role={error ? 'alert' : 'status'}
      aria-live={error ? 'assertive' : 'polite'}
      aria-busy={!error && pct < 100}
      aria-label={error ? 'Homepage loading failed' : 'Preparing the Mahalaxmi Telecom homepage'}
    >
      <noscript><style>{`.${styles.screen}{display:none}`}</style></noscript>
      <div className={styles.brandLockup}>
        <img
          src={LOADING_LOGO_BASE64}
          alt=""
          width={110}
          height={110}
          className={styles.logo}
          aria-hidden="true"
        />
        <div className={styles.brandText}>
          <p className={styles.brandName}>Mahalaxmi Telecom</p>
          <p className={styles.brandLegal}>Private Limited</p>
        </div>
      </div>

      <div className={styles.loadingPanel}>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label="Preparing the homepage"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-valuetext={error ? `Preparation stopped at ${pct} percent` : `${pct} percent prepared`}
        >
          <span className={styles.progressFill} style={{ transform: `scaleX(${pct / 100})` }} />
        </div>

        <div className={styles.progressMeta} aria-hidden="true">
          <span>{error ? 'Load error' : pct === 100 ? 'Ready' : 'Loading'}</span>
          <span className={styles.progressNumber}>{pct}%</span>
        </div>

        {error && (
          <div className={styles.errorBlock}>
            <p>{error}</p>
            <button
              ref={retryRef}
              type="button"
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              Retry loading
            </button>
            {onContinue && (
              <button type="button" onClick={onContinue} className={styles.retryButton}>
                Continue to website
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
