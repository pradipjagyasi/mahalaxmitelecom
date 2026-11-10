"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteShell from "@/components/SiteShell";
import { InfiniteSlider } from "@/components/InfiniteSlider";
import ScrollFlythrough from "@/components/ScrollFlythrough";
import { Typewriter } from "@/components/ui/typewriter-text";
import LoadingScreen from "@/components/ui/LoadingScreen";
import {
  preloadHomepageAssets,
} from "@/lib/asset-loader";
import styles from "./page.module.css";

const heroImages = [
  "/images/home/hero/hero-1-v1.webp",
  "/images/home/hero/hero-2-v1.webp",
  "/images/home/hero/hero-3-v1.webp",
  "/images/home/hero/hero-4-v1.webp",
  "/images/home/hero/hero-5-v1.webp",
  "/images/home/hero/hero-6-v1.webp",
  "/images/home/hero/hero-7-v1.webp",
  "/images/home/hero/hero-8-v1.webp",
];

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=70&auto=format&fit=crop`;

const suppliedUnsplashPhotos: Record<string, string> = {
  "a-flat-screen-tv-sitting-on-top-of-a-white-cabinet-Sd87V72cJEU":
    "1646861039459-fd9e3aabf3fb",
  "a-pair-of-headphones-sitting-on-top-of-a-table-q7ZfVmvB49c":
    "1599855129764-f4cc28295202",
  "black-over-ear-headphones-with-glowing-blue-light-B9XOTzqICkY":
    "1778257911549-d83c1698bde9",
  "gray-bose-headphones-apple-watch-and-iphone-on-white-and-black-surface-LqRu6efHc44":
    "1550029402-8280f657d8d1",
  "space-gray-iphone-x-turned-on-beside-apple-airpods-and-charging-case-TYlNlvtTuGU":
    "1550029402-8ea9bfe19f04",
  "turned-on-flat-screen-television-EOQhsfFBhRk":
    "1560169897-fc0cdbdfa4d5",
  "cricket-match-playing-on-a-television-screen-at-night-atYOJOI8_Iw":
    "1757778796965-97bae5b4411c",
  "television-screen-with-streaming-app-icons-qDLLP0yP7FU":
    "1593359677879-a4bb92f829d1",
  "black-and-white-headphones-on-white-table-6V5vTuoeCZg":
    "1563237602-b68d2dfb3f3b",
  "a-computer-mouse-with-a-blue-light-dQiqWGj847c":
    "1668649176554-3ad841a780d0",
};

const unsplashDownload = (photo: string) =>
  unsplash(suppliedUnsplashPhotos[photo] ?? photo);

const HOMEPAGE_VISITED_KEY = "mahalaxmi-homepage-ready-v1";

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    try {
      if (localStorage.getItem(HOMEPAGE_VISITED_KEY) === "true") {
        setRevealed(true);
        return () => { cancelled = true; };
      }
    } catch {
      // Storage may be disabled; use the first-visit loader in that case.
    }
    // Never let a stalled asset keep the homepage hidden indefinitely.
    const fallbackTimer = window.setTimeout(() => {
      if (!cancelled) {
        cancelled = true;
        setRevealed(true);
      }
    }, 12_000);
    void preloadHomepageAssets((progress) => {
      if (!cancelled) setLoadProgress(progress);
    }).then(() => {
      window.clearTimeout(fallbackTimer);
    }).catch((error) => {
      if (!cancelled) {
        console.error("Homepage asset preload failed.", error);
        setLoadError(
          "Some content is taking longer to load. You can continue to the website.",
        );
      }
    });
    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  const handleLoadingComplete = useCallback(() => {
    try {
      localStorage.setItem(HOMEPAGE_VISITED_KEY, "true");
    } catch {
      // The homepage remains usable even if storage is unavailable.
    }
    setRevealed(true);
  }, []);

  return (
    <>
      {!revealed && (
        <LoadingScreen
          progress={loadProgress}
          error={loadError ?? undefined}
          onComplete={handleLoadingComplete}
          onContinue={() => setRevealed(true)}
        />
      )}
        <SiteShell transparentOnTop>
          <main id="main-content">
          <section id="hero" className={styles.heroSection}>
            <HeroBackground />
            <div className={`container ${styles.heroContainer}`}>
              <div className={styles.heroContent}>
                <p className={styles.heroEyebrow}>
                  Trusted Multi-Brand Mobile &amp; Accessory Retail Chain
                </p>
                <h1 className={styles.heroTitle}>
                  <TypewriterHero />
                </h1>
                <p className={styles.heroSubtitle}>
                  Mahalaxmi Telecom Private Limited is a Nandurbar-headquartered
                  retail group built on more than twenty years of telecom
                  distribution experience. Through four retail formats, Jagyasi
                  Mobile, MM Mobile, Phone Cafe and Mobile Point, we bring the
                  latest smartphones, tablets, wearables and accessories to
                  customers across Maharashtra, while opening the same trusted
                  brand to entrepreneurs through our Retail Store Chain
                  Franchise Model.
                </p>
                <div className={styles.heroActions}>
                  <a
                    href="/franchise"
                    className={`${styles.heroButton} ${styles.heroButtonPrimary}`}
                  >
                    Explore Franchise Opportunity
                  </a>
                  <a
                    href="/brands"
                    className={`${styles.heroButton} ${styles.heroButtonSecondary}`}
                  >
                    Explore Our Brands
                  </a>
                </div>
                <p className={styles.heroTagline} id="hero-tagline">
                  Build your future with our franchise
                </p>
              </div>
            </div>
            <div className={styles.heroStats} id="hero-stats">
              <div className={`container ${styles.heroStatsInner}`}>
                <div className={styles.statItem} id="stat-years">
                  <span className={styles.statNumber}>20+</span>
                  <span className={styles.statLabel}>
                    Years as a Trusted Distribution Partner
                  </span>
                </div>
                <div className={styles.statItem} id="stat-brands">
                  <span className={styles.statNumber}>4</span>
                  <span className={styles.statLabel}>
                    Retail Store Brands Under One Roof
                  </span>
                </div>
                <div className={styles.statItem} id="stat-partners">
                  <span className={styles.statNumber}>10+</span>
                  <span className={styles.statLabel}>
                    Authorized National &amp; Global Mobile Brands
                  </span>
                </div>
                <div className={styles.statItem} id="stat-target">
                  <span className={styles.statNumber}>200+</span>
                  <span className={styles.statLabel}>
                    Franchise Stores Planned Across Maharashtra
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section id="retail-categories" className={styles.categoriesSection}>
            <div className={styles.categoriesContainer}>
              <div className={styles.categoriesCopy}>
                <p className={styles.categoriesEyebrow}>What We Retail</p>
                <h2 className={styles.categoriesTitle}>
                  Every category,
                  <br />
                  every leading brand.
                </h2>

                <div className={styles.categoryList}>
                  <CategoryRow title="Smartphones">
                    The latest devices from every major mobile brand, ready to
                    test in-store.
                  </CategoryRow>
                  <CategoryRow title="Tablets">
                    A curated range for work, study and entertainment.
                  </CategoryRow>
                  <CategoryRow title="Wearables">
                    Smartwatches and fitness bands from trusted names.
                  </CategoryRow>
                  <CategoryRow title="Accessories">
                    Cases, chargers, audio and everyday mobile essentials.
                  </CategoryRow>
                  <CategoryRow title="Electronics">
                    Additional gadgets and lifestyle electronics by store
                    format.
                  </CategoryRow>
                </div>
              </div>

              <div className={styles.categoriesMedia}>
                {/* Col 1 — down (speed A) */}
                <InfiniteSlider direction="vertical" gap={8} duration={30}>
                  {[
                    {
                      src: unsplash("1511707171634-5f897ff02aa9"),
                      alt: "Smartphone in hand",
                    },
                    {
                      src: unsplashDownload(
                        "a-flat-screen-tv-sitting-on-top-of-a-white-cabinet-Sd87V72cJEU",
                      ),
                      alt: "Flat-screen TV on a white cabinet",
                    },
                    {
                      src: unsplash("1598327105666-5b89351aff97"),
                      alt: "Latest smartphone",
                    },
                    {
                      src: unsplashDownload(
                        "a-pair-of-headphones-sitting-on-top-of-a-table-q7ZfVmvB49c",
                      ),
                      alt: "Headphones on a table",
                    },
                    {
                      src: unsplash("1546868871-7041f2a55e12"),
                      alt: "Smartwatch on wrist",
                    },
                    {
                      src: unsplash("1592750475338-74b7b21085ab"),
                      alt: "Smartphone close-up",
                    },
                    {
                      src: unsplash("1505740420928-5e560c06d30e"),
                      alt: "Headphones on display",
                    },
                    {
                      src: unsplashDownload(
                        "a-computer-mouse-with-a-blue-light-dQiqWGj847c",
                      ),
                      alt: "Computer mouse with blue light",
                    },
                  ].map(({ src, alt }) => (
                    <img
                      key={src}
                      src={src}
                      alt={alt}
                      className={styles.sliderImg}
                    />
                  ))}
                </InfiniteSlider>
                {/* Col 2 — up (speed B) */}
                <InfiniteSlider
                  direction="vertical"
                  reverse
                  gap={8}
                  duration={24}
                >
                  {[
                    {
                      src: unsplash("1583394838336-acd977736f90"),
                      alt: "Audio accessories",
                    },
                    {
                      src: unsplash("1544244015-0df4b3ffc6b0"),
                      alt: "Tablet with stylus",
                    },
                    {
                      src: unsplashDownload(
                        "turned-on-flat-screen-television-EOQhsfFBhRk",
                      ),
                      alt: "Flat-screen television",
                    },
                    {
                      src: unsplash("1579586337278-3befd40fd17a"),
                      alt: "Smartwatch",
                    },
                    {
                      src: unsplash("1606220945770-b5b6c2c55bf1"),
                      alt: "Wireless earbuds",
                    },
                    {
                      src: unsplashDownload(
                        "gray-bose-headphones-apple-watch-and-iphone-on-white-and-black-surface-LqRu6efHc44",
                      ),
                      alt: "Headphones, smartwatch and iPhone",
                    },
                    {
                      src: unsplashDownload(
                        "space-gray-iphone-x-turned-on-beside-apple-airpods-and-charging-case-TYlNlvtTuGU",
                      ),
                      alt: "iPhone and AirPods",
                    },
                  ].map(({ src, alt }) => (
                    <img
                      key={src}
                      src={src}
                      alt={alt}
                      className={styles.sliderImg}
                    />
                  ))}
                </InfiniteSlider>
                {/* Col 3 — down (speed A, same as col 1) */}
                <InfiniteSlider direction="vertical" gap={8} duration={30}>
                  {[
                    {
                      src: unsplash("1508685096489-7aacd43bd3b1"),
                      alt: "Wearable on wrist",
                    },
                    {
                      src: unsplash("1519389950473-47ba0277781c"),
                      alt: "Latest gadgets",
                    },
                    {
                      src: unsplash("1434493789847-2f02dc6ca35d"),
                      alt: "Smartwatch series",
                    },
                    {
                      src: unsplash("1590658268037-6bf12165a8df"),
                      alt: "Earbuds case",
                    },
                    {
                      src: unsplashDownload(
                        "black-over-ear-headphones-with-glowing-blue-light-B9XOTzqICkY",
                      ),
                      alt: "Black headphones with blue light",
                    },
                    {
                      src: unsplash("1510557880182-3d4d3cba35a5"),
                      alt: "Smartphone display",
                    },
                    {
                      src: unsplashDownload(
                        "cricket-match-playing-on-a-television-screen-at-night-atYOJOI8_Iw",
                      ),
                      alt: "Cricket match on a television screen",
                    },
                  ].map(({ src, alt }) => (
                    <img
                      key={src}
                      src={src}
                      alt={alt}
                      className={styles.sliderImg}
                    />
                  ))}
                </InfiniteSlider>
                {/* Col 4 — up (speed B, same as col 2) */}
                <InfiniteSlider
                  direction="vertical"
                  reverse
                  gap={8}
                  duration={24}
                >
                  {[
                    {
                      src: unsplash("1580910051074-3eb694886505"),
                      alt: "Smartphone on desk",
                    },
                    {
                      src: unsplash("1561154464-82e9adf32764"),
                      alt: "Tablet range",
                    },
                    {
                      src: unsplash("1498049794561-7780e7231661"),
                      alt: "Electronics desk",
                    },
                    {
                      src: unsplash("1550009158-9ebf69173e03"),
                      alt: "Gaming gadgets",
                    },
                    {
                      src: unsplash("1601784551446-20c9e07cdbdb"),
                      alt: "Phone with accessories",
                    },
                    {
                      src: unsplashDownload(
                        "television-screen-with-streaming-app-icons-qDLLP0yP7FU",
                      ),
                      alt: "Television with streaming apps",
                    },
                    {
                      src: unsplashDownload(
                        "black-and-white-headphones-on-white-table-6V5vTuoeCZg",
                      ),
                      alt: "Black and white headphones",
                    },
                  ].map(({ src, alt }) => (
                    <img
                      key={src}
                      src={src}
                      alt={alt}
                      className={styles.sliderImg}
                    />
                  ))}
                </InfiniteSlider>
              </div>
            </div>
          </section>

          <section id="authorized-partners" className={styles.partnersSection}>
            <div className={styles.partnersIntro}>
              <p className={styles.partnersEyebrow}>Our Authorized Partners</p>
              <p className={styles.partnersDescription}>
                We proudly retail devices from the industry&apos;s most
                recognized names.
              </p>
            </div>

            <div
              className={styles.marqueeViewport}
              aria-label="Authorized mobile brand partners"
            >
              <div className={styles.marqueeTrack}>
                <BrandGroup />
                <BrandGroup ariaHidden />
              </div>
            </div>
          </section>

          <section id="who-we-are" className={styles.aboutSection}>
            <div className={styles.aboutContainer}>
              <div className={styles.aboutCopy}>
                <p className={styles.aboutEyebrow}>Who We Are</p>
                <h2 className={styles.aboutTitle}>
                  A physical-first retail chain for a digital lifestyle.
                </h2>
                <p className={styles.aboutIntro}>
                  Customers test every device in person before they buy, guided
                  by teams trained to give honest advice. Behind each shelf sits
                  two decades of brand relationships built on the distribution
                  side of the telecom industry.
                </p>

                <div className={styles.aboutHighlights}>
                  <div className={styles.aboutHighlight}>
                    <h3>Physical-first retail</h3>
                    <p>
                      Hands-on testing of every device, every visit, before you
                      buy.
                    </p>
                  </div>
                  <div className={styles.aboutHighlight}>
                    <h3>Multi-city presence</h3>
                    <p>
                      Stores across Metro, Mini Metro and Tier 1 to Tier 3
                      towns.
                    </p>
                  </div>
                  <div className={styles.aboutHighlight}>
                    <h3>Distribution-grade sourcing</h3>
                    <p>
                      Two decades of brand relationships behind every shelf.
                    </p>
                  </div>
                  <div className={styles.aboutHighlight}>
                    <h3>Four brands, one standard</h3>
                    <p>
                      Consistent quality and service across every store format.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.aboutMedia} id="about-zero-frame">
                {/* The old frame-000.webp still is retained in asset-loader.ts
                    for recovery, but is not loaded in the active video flow. */}
                <img
                  src="/images/home/flythrough/poster-desktop.webp"
                  alt="Jagyasi Mobiles storefront powered by Mahalaxmi Telecom"
                />
              </div>
            </div>
            <ScrollFlythrough takeover enabled={revealed} />
          </section>
          </main>
          <StoreOutletBrandsSection />
          <WhyPartnerSection />
          <VisionAndOpportunitySection />
        </SiteShell>
    </>
  );
}

const partnerBrands = [
  ["nothing", "Nothing"],
  ["noise", "Noise"],
  ["apple", "Apple"],
  ["samsung", "Samsung"],
  ["xiaomi", "Xiaomi"],
  ["vivo", "Vivo"],
  ["oppo", "Oppo"],
  ["motorola", "Motorola"],
  ["realme", "Realme"],
];

const partnerBenefits = [
  [
    "Wider Product Range",
    "Access an extensive range of smartphones, tablets, wearables and accessories across every leading brand.",
  ],
  [
    "Higher Margins, No Targets",
    "Earn stronger margins with no sales targets, so you can focus on steady, sustainable growth.",
  ],
  [
    "Multiple Finance Options",
    "Offer customers easy, on-the-spot financing through multiple partners and schemes.",
  ],
  [
    "Marketing & Store Launch Support",
    "Get hands-on support with tangible marketing activity and a complete store launch process.",
  ],
  [
    "Bulk Purchasing Power",
    "Benefit from our bulk purchasing power, which brings you products at more affordable prices.",
  ],
  [
    "Built-In Brand Trust",
    "Launch under a brand customers already know, backed by years of retail credibility.",
  ],
];

const outletBrands = [
  {
    id: "jm",
    initials: "JM",
    name: "Jagyasi Mobile",
    description:
      "Our flagship, company-operated format focused on full-range mobile retail and premium in-store experience.",
    image: "/images/home/store-formats/Jagyasi%20Mobile.webp",
  },
  {
    id: "mm",
    initials: "MM",
    name: "MM Mobile",
    description:
      "A standard-format store built for consistent, everyday mobile and accessory retail.",
    image: "/images/home/store-formats/MM%20mobile.webp",
  },
  {
    id: "pc",
    initials: "PC",
    name: "Phone Cafe",
    description:
      "A compact, neighbourhood-friendly format for accessible mobile shopping.",
    image: "/images/home/store-formats/Phone%20Cafe.webp",
  },
  {
    id: "mp",
    initials: "MP",
    name: "Mobile Point",
    description:
      "A focused retail point for devices and accessories in emerging markets.",
    image: "/images/home/store-formats/Mobile%20Point.webp",
  },
];

const OUTLET_AUTO_PLAY = 3200;
const OUTLET_TOUCH_PAUSE = 10_000;
const OUTLET_ITEM_HEIGHT = 68;

function wrapIndex(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function StoreOutletBrandsSection() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTouchLayout, setIsTouchLayout] = useState(false);
  const [isTouchPaused, setIsTouchPaused] = useState(false);
  const touchPauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = outletBrands.length;
  const currentIndex = ((step % count) + count) % count;

  const nextStep = useCallback(() => setStep((s) => s + 1), []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1100px)");
    const updateLayout = () => {
      setIsTouchLayout(media.matches);
      if (media.matches) setIsPaused(false);
      if (!media.matches) {
        if (touchPauseTimer.current) clearTimeout(touchPauseTimer.current);
        touchPauseTimer.current = null;
        setIsTouchPaused(false);
      }
    };
    updateLayout();
    media.addEventListener("change", updateLayout);
    return () => {
      media.removeEventListener("change", updateLayout);
      if (touchPauseTimer.current) clearTimeout(touchPauseTimer.current);
    };
  }, []);

  const pauseForTouch = useCallback(() => {
    if (!window.matchMedia("(max-width: 1100px)").matches) return;
    setIsTouchPaused(true);
    if (touchPauseTimer.current) clearTimeout(touchPauseTimer.current);
    touchPauseTimer.current = setTimeout(() => {
      touchPauseTimer.current = null;
      setIsTouchPaused(false);
    }, OUTLET_TOUCH_PAUSE);
  }, []);

  useEffect(() => {
    if (isPaused || isTouchPaused) return;
    const id = setInterval(nextStep, OUTLET_AUTO_PLAY);
    return () => clearInterval(id);
  }, [nextStep, isPaused, isTouchPaused]);

  const handleChipClick = (index: number) => {
    pauseForTouch();
    const diff = (index - currentIndex + count) % count;
    if (diff > 0) setStep((s) => s + diff);
  };

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    let d = diff;
    if (diff > count / 2) d -= count;
    if (diff < -count / 2) d += count;
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  return (
    <section id="store-outlet-brands" className={styles.outletBrandsSection}>
      <div className={styles.outletBrandsContainer}>
        {/* Intro header */}
        <div className={styles.outletBrandsIntro}>
          <p className={styles.outletBrandsEyebrow}>Our Store Outlet Brands</p>
          <h2 className={styles.outletBrandsTitle}>
            One Company, Four Retail Formats
          </h2>
          <p className={styles.outletBrandsDescription}>
            A network of physical stores specializing in smartphones, tablets,
            wearables and accessories. Each brand carries its own identity in
            the market while running on the same Mahalaxmi Telecom standards of
            sourcing, service and support.
          </p>
        </div>

        {/* Carousel */}
        <div className={styles.outletCarousel}>
          {/* Left — scrolling chip selector */}
          <div className={styles.outletCarouselLeft}>
            <div className={styles.outletChipFadeTop} aria-hidden="true" />
            <div className={styles.outletChipFadeBottom} aria-hidden="true" />
            <div className={styles.outletChipTrack}>
              {outletBrands.map((brand, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrapped = wrapIndex(-(count / 2), count / 2, distance);

                return (
                  <motion.div
                    key={brand.id}
                    style={{
                      height: OUTLET_ITEM_HEIGHT,
                      position: "absolute",
                      width: "100%",
                    }}
                    animate={{
                      y: wrapped * OUTLET_ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrapped) * 0.28,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 22,
                      mass: 1,
                    }}
                    className={styles.outletChipRow}
                  >
                    <button
                      onClick={() => handleChipClick(index)}
                      onPointerDown={pauseForTouch}
                      onMouseEnter={() => {
                        if (!isTouchLayout) setIsPaused(true);
                      }}
                      onMouseLeave={() => {
                        if (!isTouchLayout) setIsPaused(false);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`${styles.outletChip} ${isActive ? styles.outletChipActive : styles.outletChipIdle}`}
                    >
                      {/* Initials badge */}
                      <span
                        className={`${styles.outletChipBadge} ${isActive ? styles.outletChipBadgeActive : styles.outletChipBadgeIdle}`}
                      >
                        {brand.initials}
                      </span>
                      <span className={styles.outletChipLabel}>
                        {brand.name}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — animated image cards */}
          <div className={styles.outletCarouselRight}>
            <div className={styles.outletCardStage}>
              {outletBrands.map((brand, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={brand.id}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -110 : isNext ? 110 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.84 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.38 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    }}
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    drag={isTouchLayout && isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.3}
                    dragMomentum={false}
                    onPointerDown={pauseForTouch}
                    onPointerMove={(event) => {
                      if (event.buttons) pauseForTouch();
                    }}
                    onPointerUp={pauseForTouch}
                    onPointerCancel={pauseForTouch}
                    onDragEnd={(_, info) => {
                      pauseForTouch();
                      if (
                        Math.abs(info.offset.x) > 45 ||
                        Math.abs(info.velocity.x) > 400
                      ) {
                        const direction =
                          Math.abs(info.offset.x) > 45
                            ? info.offset.x
                            : info.velocity.x;
                        setStep((s) => s + (direction < 0 ? 1 : -1));
                      }
                    }}
                    className={styles.outletCard}
                  >
                    <img
                      src={brand.image}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className={styles.outletCardBackdrop}
                    />
                    <img
                      src={brand.image}
                      alt={brand.name}
                      draggable={false}
                      className={`${styles.outletCardImg} ${isActive ? styles.outletCardImgActive : styles.outletCardImgDim}`}
                    />

                    {/* Active overlay */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={styles.outletCardOverlay}
                        >
                          <span className={styles.outletCardTag}>
                            {index + 1} · {brand.name}
                          </span>
                          <p className={styles.outletCardDesc}>
                            {brand.description}
                          </p>
                          <a href="/brands" className={styles.outletCardLink}>
                            View Brand <span aria-hidden="true">→</span>
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Live dot */}
                    <div
                      className={`${styles.outletCardLive} ${isActive ? styles.outletCardLiveVisible : styles.outletCardLiveHidden}`}
                    >
                      <span className={styles.outletCardLiveDot} />
                      <span className={styles.outletCardLiveLabel}>
                        Our Brand
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyPartnerSection() {
  const [visibleBenefits, setVisibleBenefits] = useState<number[]>([]);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(
      "[data-partner-benefit]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.partnerBenefit,
            );
            setVisibleBenefits((current) =>
              current.includes(index) ? current : [...current, index],
            );
          }
        });
      },
      { threshold: 0.2 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-partner-home" className={styles.whyPartnerSection}>
      <div className={styles.whyPartnerContainer}>
        <div className={styles.whyPartnerIntro}>
          <div className={styles.whyPartnerSticky}>
            <p className={styles.whyPartnerEyebrow}>Why Partner With Us</p>
            <h2 className={styles.whyPartnerTitle}>
              What We Offer Our Franchise Partners
            </h2>
            <a href="/franchise#why-partner" className={styles.whyPartnerLink}>
              Why Partner With Us <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </div>

        <div className={styles.whyPartnerList}>
          {partnerBenefits.map(([title, description], index) => (
            <article
              className={`${styles.whyPartnerItem} ${visibleBenefits.includes(index) ? styles.whyPartnerItemVisible : ""}`}
              data-partner-benefit={index}
              key={title}
            >
              <span className={styles.whyPartnerNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionAndOpportunitySection() {
  return (
    <>
      <section id="vision-home" className={styles.visionHomeSection}>
        <div className={styles.visionHomeContainer}>
          <p className={styles.visionHomeEyebrow}>Vision</p>
          <h2 className={styles.visionHomeTitle}>
            To become the most trusted multi-brand mobile and accessory retail
            chain in <em>India.</em>
          </h2>
          <p className={styles.visionHomeDescription}>
            Offering innovative products, seamless shopping experiences and
            lasting customer relationships, across every store we open and every
            partner we work with.
          </p>
          <a href="/about#vision-mission" className={styles.visionHomeLink}>
            Vision &amp; Mission <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </section>
    </>
  );
}

function BrandGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className={styles.brandGroup} aria-hidden={ariaHidden}>
      {partnerBrands.map(([brand, label]) => (
        <div
          className={styles.brandItem}
          key={`${brand}-${ariaHidden ? "copy" : "original"}`}
        >
          <span className={styles.brandName}>{label}</span>
        </div>
      ))}
      <span className={styles.brandMore}>&amp; Many More</span>
    </div>
  );
}

function CategoryRow({ title, children }: { title: string; children: string }) {
  return (
    <div className={styles.categoryRow}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

const HERO_LINE_1 = "Two Decades of Telecom Trust.";
const HERO_LINES_2 = [
  "One Growing Retail Family.",
  "Your partner in long-term growth.",
  "Let's build the future together.",
];
const HERO_SPEED = 45;

function TypewriterHero() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
    }
  }, []);

  if (reduced) {
    return (
      <span aria-label={`${HERO_LINE_1} ${HERO_LINES_2[0]}`} role="text">
        <span aria-hidden="true">{HERO_LINE_1}</span>
        <br />
        <span className={styles.heroTitleAccent} aria-hidden="true">
          {HERO_LINES_2[0]}
        </span>
      </span>
    );
  }

  return (
    <span aria-label={`${HERO_LINE_1} ${HERO_LINES_2.join(" ")}`} role="text">
      <span aria-hidden="true">{HERO_LINE_1}</span>
      <br />
      <span className={styles.heroTitleAccent} aria-hidden="true">
        {HERO_LINES_2.map((line) => (
          <span key={line} className={styles.heroTitleReserve}>
            {line}
          </span>
        ))}
        <span className={styles.heroTitleAnimated}>
          <Typewriter
            text={HERO_LINES_2}
            speed={HERO_SPEED}
            loop
            deleteSpeed={25}
            delay={2000}
          />
        </span>
      </span>
    </span>
  );
}

function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroImages.length);
    }, 8_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.heroBg} id="hero-bg" aria-hidden="true">
      {heroImages.map((image, imageIndex) => (
        <img
          key={image}
          src={image}
          alt=""
          className={
            imageIndex === activeIndex
              ? styles.heroImageActive
              : styles.heroImage
          }
        />
      ))}
    </div>
  );
}
