"use client";
import SiteShell from "@/components/SiteShell";
import styles from "./brands.module.css";
import ParallaxStripSlider from "@/components/ui/parallax-strip-slider";
import {
  CoverflowCarousel,
  type CoverflowSlide,
} from "@/components/ui/CoverflowCarousel";
import Image from "next/image";
import { useState } from "react";

const STORE_TESTIMONIALS = [
  {
    name: "Jagyasi Mobile",
    role: "Flagship Format - JM",
    message:
      "Our flagship, company-operated format focused on full-range mobile retail and premium in-store experience.",
    image: "/images/brands/store-formats/Jagyasi%20Mobile.webp",
  },
  {
    name: "MM Mobile",
    role: "Standard Format - MM",
    message:
      "A standard-format store built for consistent, everyday mobile and accessory retail.",
    image: "/images/brands/store-formats/MM%20mobile.webp",
  },
  {
    name: "Phone Café",
    role: "Compact Format - PC",
    message:
      "A compact, neighbourhood-friendly format for accessible mobile shopping.",
    image: "/images/brands/store-formats/Phone%20Cafe.webp",
  },
  {
    name: "Mobile Point",
    role: "Emerging-Market Format - MP",
    message:
      "A focused retail point for devices and accessories in emerging markets.",
    image: "/images/brands/store-formats/Mobile%20Point.webp",
  },
];

const PARTNER_BRANDS: CoverflowSlide[] = [
  {
    name: "Apple",
    logo: "/images/brands/partner-logos/apple.svg",
    color: "#111111",
    kind: "svg",
    symbol: true,
  },
  {
    name: "Samsung",
    logo: "/images/brands/partner-logos/samsung.svg",
    color: "#1428a0",
    kind: "svg",
  },
  {
    name: "Xiaomi",
    logo: "/images/brands/partner-logos/xiaomi.svg",
    color: "#ff6900",
    kind: "svg",
    symbol: true,
  },
  {
    name: "OPPO",
    logo: "/images/brands/partner-logos/oppo.svg",
    color: "#006b3f",
    kind: "svg",
  },
  {
    name: "Motorola",
    logo: "/images/brands/partner-logos/motorola.svg",
    color: "#111111",
    kind: "svg",
    symbol: true,
  },
  {
    name: "vivo",
    logo: "/images/brands/partner-logos/vivo.svg",
    color: "#415fff",
    kind: "svg",
  },
  {
    name: "Noise",
    logo: "/images/brands/partner-logos/Noise.jpg.webp",
    kind: "image",
    treatment: "invert-blend",
  },
  {
    name: "realme",
    logo: "/images/brands/partner-logos/Realme-1.jpg.webp",
    kind: "image",
    treatment: "banner",
  },
  {
    name: "Nothing",
    logo: "/images/brands/partner-logos/Nothing-1.jpg.webp",
    kind: "image",
    treatment: "blend",
  },
  {
    name: "OnePlus",
    logo: "/images/brands/partner-logos/oneplus.svg",
    color: "#f5010c",
    kind: "svg",
    symbol: true,
  },
  {
    name: "AI+",
    logo: "/images/brands/partner-logos/aiplus.webp",
    kind: "image",
    treatment: "ai-plus",
  },
  {
    name: "itel",
    logo: "/images/brands/partner-logos/itel.svg",
    kind: "image",
    treatment: "wide",
  },
  {
    name: "boAt",
    logo: "/images/brands/partner-logos/boat-wordmark.svg",
    kind: "image",
    treatment: "wide",
  },
  {
    name: "Google Pixel",
    logo: "/images/brands/partner-logos/google-pixel.svg",
    kind: "image",
    treatment: "pixel-stack",
  },
];

const CATEGORIES = [
  {
    id: "smartphones",
    name: "Smartphones",
    desc: "The latest devices, ready to experience in person.",
    image: "/images/brands/categories/Smartphones.webp",
  },
  {
    id: "tablets",
    name: "Tablets",
    desc: "For work, learning and everything between.",
    image: "/images/brands/categories/Tablet.webp",
  },
  {
    id: "wearables",
    name: "Wearables",
    desc: "Connected technology that moves with you.",
    image: "/images/brands/categories/Watches.webp",
  },
  {
    id: "accessories",
    name: "Accessories",
    desc: "The essentials that complete every device.",
    image: "/images/brands/categories/Accessories.webp",
  },
  {
    id: "electronics",
    name: "Electronics",
    desc: "Smart devices and lifestyle technology for every space.",
    image: "/images/brands/categories/Electornics.webp",
  },
  {
    id: "tvs",
    name: "TVs",
    desc: "Immersive screens and smart entertainment for every home.",
    image: "/images/brands/categories/TV.webp",
  },
];

export default function BrandsPage() {
  const [showAllCategories, setShowAllCategories] = useState(false);
  return (
    <SiteShell transparentOnTop>
      <main id="main-content">
        <div id="store-formats">
          <ParallaxStripSlider
            slides={STORE_TESTIMONIALS.map((store) => ({
              src: store.image,
              title: store.name,
              anchor: `store-${store.name
                .toLowerCase()
                .replace(/ café$/, "-cafe")
                .replace(/\s+/g, "-")}`,
              chapter: store.role,
              description: store.message,
            }))}
          />
        </div>

        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <p className={styles.heroEyebrow}>Our Brands</p>
            <h1 className={styles.heroTitle}>
              Four retail formats,{" "}
              <span className={styles.heroTitleGold}>one standard</span> of
              trust.
            </h1>
            <p className={styles.heroIntro}>
              Jagyasi Mobile, MM Mobile, Phone Café and Mobile Point are the
              four retail formats of Mahalaxmi Telecom. Each is built for a
              different market and store size, with the same sourcing strength,
              service quality and brand credibility.
            </p>
          </div>
        </section>

        <section
          id="brand-partners"
          className={styles.partnersSection}
          aria-labelledby="partners-title"
        >
          <div className={styles.partnersContainer}>
            <p className={styles.partnersEyebrow}>Our Authorized Partners</p>
            <h2 className={styles.partnersTitle} id="partners-title">
              Trusted names, <span>closer to home.</span>
            </h2>
            <p className={styles.partnersIntro}>
              Explore the mobile and technology brands available across our
              retail network.
            </p>
          </div>
          <CoverflowCarousel slides={PARTNER_BRANDS} />
        </section>

        <section
          id="retail-categories"
          className={styles.categoriesSection}
          aria-labelledby="categories-title"
        >
          <div className={styles.categoriesContainer}>
            <div className={styles.categoriesHeader}>
              <div>
                <h2 id="categories-title" className={styles.categoriesTitle}>
                  Technology for
                  <br />
                  <em>everyday life.</em>
                </h2>
                <p className={styles.categoriesIntro}>
                  Discover devices and connected essentials across our retail
                  formats.
                </p>
              </div>
              <button
                type="button"
                className={styles.categoriesToggle}
                aria-expanded={showAllCategories}
                aria-controls="category-grid"
                onClick={() => setShowAllCategories((value) => !value)}
              >
                {showAllCategories
                  ? "Show fewer categories"
                  : "View every category"}
                <span aria-hidden="true">{showAllCategories ? "↖" : "↗"}</span>
              </button>
            </div>
            <div id="category-grid" className={styles.categoriesGrid}>
              {CATEGORIES.slice(
                0,
                showAllCategories ? CATEGORIES.length : 4,
              ).map((category, index) => (
                <article
                  key={category.id}
                  className={`${styles.categoryCard}${index >= 4 ? ` ${styles.categoryCardExtra}` : ""}`}
                >
                  <div className={styles.categoryImageWrap}>
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes={
                        index >= 4
                          ? "(max-width: 700px) 100vw, 50vw"
                          : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                      }
                      className={styles.categoryImage}
                    />
                  </div>
                  <div className={styles.categoryBody}>
                    <h3>{category.name}</h3>
                    <p>{category.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <p className={styles.ctaEyebrow}>Next Step</p>
            <h2 className={styles.ctaTitle}>
              Open a store under one of our trusted formats.
            </h2>
            <p className={styles.ctaIntro}>
              Choose the format that fits your market, from a compact Phone Café
              to a flagship Jagyasi Mobile store.
            </p>
            <div className={styles.ctaActions}>
              <a href="/contact" className={styles.ctaPrimary}>
                Contact Us
              </a>
              
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
