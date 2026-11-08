import SiteShell from "@/components/SiteShell";
import styles from "./franchise.module.css";
import businessStyles from "./business-model.module.css";

const BENEFITS = [
  {
    n: "01",
    title: "Wider Product Range",
    desc: "Access an extensive range of smartphones, tablets, wearables and accessories across every leading brand.",
  },
  {
    n: "02",
    title: "Higher Margins, No Targets",
    desc: "Earn stronger margins with no sales targets, so you can focus on steady, sustainable growth.",
  },
  {
    n: "03",
    title: "Multiple Finance Options",
    desc: "Offer customers easy, on-the-spot financing through multiple partners and schemes.",
  },
  {
    n: "04",
    title: "Marketing & Store Launch Support",
    desc: "Get hands-on support with tangible marketing activity and a complete store launch process.",
  },
  {
    n: "05",
    title: "Bulk Purchasing Power",
    desc: "Benefit from our bulk purchasing power, which brings you products at more affordable prices.",
  },
  {
    n: "06",
    title: "Built-In Brand Trust",
    desc: "Launch under a brand customers already know, backed by years of retail credibility.",
  },
];

const BUSINESS_MODEL_FORMATS = [
  "Jagyasi Mobile",
  "MM Mobile",
  "Phone Cafe",
  "Mobile Point",
];

const BUSINESS_MODEL_RETAIL_BRANDS = [
  "Apple",
  "Samsung",
  "vivo",
  "OPPO",
  "Xiaomi",
];

const BUSINESS_MODEL_ECOSYSTEM = [
  {
    title: "Mobiles",
    sub: "Smartphones & Devices",
    brands: "Apple \u2022 Samsung \u2022 vivo \u2022 OPPO \u2022 Xiaomi & more",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=70&auto=format&fit=crop",
    alt: "Smartphones on display",
  },
  {
    title: "Accessories",
    sub: "Connected Essentials",
    brands: "Cases \u2022 Chargers \u2022 Audio \u2022 Wearables",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=70&auto=format&fit=crop",
    alt: "Audio accessories",
  },
  {
    title: "Electronics",
    sub: "Beyond Smartphones",
    brands: "TVs \u2022 Laptops \u2022 Tablets \u2022 Consumer Electronics",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=70&auto=format&fit=crop",
    alt: "Consumer electronics",
  },
];

const BUSINESS_MODEL_CUSTOMER_STEPS = [
  {
    title: "Choice",
    desc: "Leading brands and full ranges to compare in person.",
  },
  {
    title: "Value",
    desc: "Fair prices, finance options and honest advice.",
  },
  {
    title: "Trust",
    desc: "Two decades of relationships behind every shelf.",
  },
];

export default function FranchisePage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className={styles.topSection}>
          <div className={styles.topContainer}>
            <p className={styles.eyebrow}>Why Partner With Us</p>
            <h1 className={styles.topTitle}>
              What We Offer Our Franchise Partners
            </h1>
          </div>
        </section>

        <section id="why-partner" className={styles.benefitsSection}>
          <div className={styles.benefitsContainer}>
            <div className={styles.leftSticky}>
              <p className={styles.eyebrow}>Partner Benefits</p>
              <h2 className={styles.leftTitle}>
                Build your future with our
                <br />
                <em>franchise</em>
              </h2>
            </div>
            <div className={styles.rightList}>
              {BENEFITS.map((b) => (
                <div key={b.n} className={styles.item}>
                  <span className={styles.num}>{b.n}</span>
                  <div>
                    <h3 className={styles.itemTitle}>{b.title}</h3>
                    <p className={styles.itemDesc}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.modelHeader}>
          <div className={styles.topContainer}>
            <p className={styles.eyebrow}>FOFO & COCO</p>
            <h2 className={styles.topTitle}>Our Business Model</h2>
          </div>
        </section>

        <section className={styles.modelGrid}>
          <div className={styles.modelContainer}>
            <div className={styles.modelCard}>
              <p className={styles.modelLabel}>FOFO</p>
              <h3 className={styles.modelCardTitle}>
                Franchise Owned, Franchise Operated
              </h3>
              <p className={styles.modelCardDesc}>
                Local entrepreneurs own and run the store under the Mahalaxmi
                Telecom Private Limited brand, backed by our systems, sourcing
                and support network.
              </p>
              <ul className={styles.modelPoints}>
                <li className={styles.modelPoint}>
                  Local ownership and investment
                </li>
                <li className={styles.modelPoint}>
                  Faster multi-city expansion
                </li>
                <li className={styles.modelPoint}>
                  Entrepreneur-driven growth
                </li>
              </ul>
            </div>
            <div className={styles.modelCard}>
              <p className={styles.modelLabel}>COCO</p>
              <h3 className={styles.modelCardTitle}>
                Company Owned, Company Operated
              </h3>
              <p className={styles.modelCardDesc}>
                Stores are directly owned and managed by Mahalaxmi Telecom
                Private Limited, ensuring full control over quality, service and
                customer experience, currently operating under the Jagyasi
                Mobile brand.
              </p>
              <ul className={styles.modelPoints}>
                <li className={styles.modelPoint}>Full quality control</li>
                <li className={styles.modelPoint}>
                  Consistent brand experience
                </li>
                <li className={styles.modelPoint}>
                  Direct management oversight
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.connectSection}>
          <div className={styles.connectContainer}>
            <p className={styles.eyebrow}>How It Connects</p>
            <div className={styles.stepsGrid}>
              <div className={styles.step}>
                <p className={styles.stepLabel}>Step 01</p>
                <h3 className={styles.stepTitle}>Company</h3>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.step}>
                <p className={styles.stepLabel}>Step 02</p>
                <h3 className={styles.stepTitle}>Brand</h3>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.step}>
                <p className={styles.stepLabel}>Step 03</p>
                <h3 className={styles.stepTitle}>Store</h3>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.step}>
                <p className={styles.stepLabel}>Step 04</p>
                <h3 className={styles.stepTitle}>Customer</h3>
                <div className={styles.stepLine} />
              </div>
            </div>
            <p className={styles.connectNote}>
              Mahalaxmi Telecom follows both FOFO and COCO models, powering all
              four brands: Jagyasi Mobile, MM Mobile, Phone CafÃ© and Mobile
              Point.
            </p>
          </div>
        </section>

        <section className={styles.planIntro}>
          <div className={styles.topContainer}>
            <p className={styles.eyebrow}>Partner With Us</p>
            <h2 className={styles.topTitle}>Store Franchise Plan</h2>
            <p
              style={{
                margin: "18px 0 0",
                color: "#6b6560",
                fontSize: "14px",
                lineHeight: 1.7,
                maxWidth: "620px",
              }}
            >
              A structured, transparent franchise plan built for entrepreneurs
              ready to grow with a trusted retail brand.
            </p>
          </div>
        </section>

        <section className={styles.planSection}>
          <div className={styles.planRows}>
            <div className={styles.planRow}>
              <div>
                <p className={styles.planRowEyebrow}>Store Size & Investment</p>
                <h3 className={styles.planValue}>{"\u20B915\u201350 Lakh"}</h3>
              </div>
              <p className={styles.planDesc}>
                Stores range from 300 to 1000 sq ft, with an investment of
                {" \u20B915 to \u20B950 lakh"} depending on the brand and store
                format.
              </p>
            </div>
            <div className={styles.planRow}>
              <div>
                <p className={styles.planRowEyebrow}>Operation & ROI</p>
                <h3 className={styles.planValue}>12{"\u2013"}15 Months</h3>
              </div>
              <p className={styles.planDesc}>
                Each store typically needs two to three employees. The payback
                period is 12 to 15 months, depending on sales volume.
              </p>
            </div>
            <div className={styles.planRow}>
              <div>
                <p className={styles.planRowEyebrow}>Infrastructure</p>
                <h3 className={styles.planValue}>Prime Location</h3>
              </div>
              <p className={styles.planDesc}>
                A prime, high foot-traffic location is required to ensure strong
                walk-in visibility and footfall.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.howSection}>
          <div className={styles.howContainer}>
            <div>
              <p className={styles.eyebrow}>How It Works</p>
              <h2 className={styles.howTitle}>
                Six steps from decision to open doors
              </h2>
              <div className={styles.timeline}>
                {[
                  [
                    "01",
                    "Choose Location",
                    "A prime, high foot-traffic location with strong walk-in visibility.",
                  ],
                  [
                    "02",
                    "Choose Store Format",
                    "Compact, standard or flagship, from 300 to 1000 sq ft.",
                  ],
                  [
                    "03",
                    "Store Setup",
                    "Infrastructure, fit-out and stock planning with our team.",
                  ],
                  [
                    "04",
                    "Launch",
                    "A complete store launch process with tangible marketing activity.",
                  ],
                  [
                    "05",
                    "Operate",
                    "Run with two to three employees and no imposed sales targets.",
                  ],
                  [
                    "06",
                    "Grow",
                    "Payback in 12 to 15 months depending on sales volume, then scale.",
                  ],
                ].map(([n, t, d]) => (
                  <div key={n} className={styles.stepRow}>
                    <span className={styles.stepDot} />
                    <p className={styles.stepEyebrow}>Step {n}</p>
                    <h3 className={styles.stepName}>{t}</h3>
                    <p className={styles.stepDesc}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.howImageWrap}>
              <img
                src="/page-section1/hero-store.jpg"
                alt="Premium store interior"
                className={styles.howImage}
              />
            </div>
          </div>
        </section>
        {/* Business model */}
        <div id="business-model">
          <section
            className={businessStyles.businessHeroSection}
            aria-labelledby="business-model-title"
          >
            <div className={businessStyles.businessContainer}>
              <p className={businessStyles.businessEyebrow}>Our Business Model</p>
              <h2 className={businessStyles.businessHeroTitle} id="business-model-title">
                A multi-brand, <span>multi-chain</span> retail company.
              </h2>
              <p className={businessStyles.businessHeroDesc}>
                Mahalaxmi Telecom Pvt. Ltd. is a multi-brand consumer
                electronics retail company operating through a growing network
                of company-owned and franchise-operated stores.
              </p>
              <p className={businessStyles.businessHeroTags}>
                COCO {"\u2022"} FOFO {"\u2022"} Multi-Brand {"\u2022"} Multi-Format
              </p>
            </div>
          </section>

          <section
            className={`${businessStyles.businessBlock} ${businessStyles.businessBlockFirst}`}
            aria-label="What we are"
          >
            <div className={businessStyles.businessContainer}>
              <p className={businessStyles.businessSectionLabel}>
                01 {"\u2014"} What we are
              </p>
              <div className={businessStyles.businessPillars}>
                <article className={businessStyles.businessPillar}>
                  <h2 className={businessStyles.businessPillarTitle}>
                    Multi-Brand Retail
                  </h2>
                  <p className={businessStyles.businessPillarDesc}>
                    Leading national and global brands under one roof.
                  </p>
                  <div className={businessStyles.businessChips}>
                    {BUSINESS_MODEL_RETAIL_BRANDS.map((brand) => (
                      <span className={businessStyles.businessChip} key={brand}>
                        {brand}
                      </span>
                    ))}
                  </div>
                </article>
                <article className={businessStyles.businessPillar}>
                  <h2 className={businessStyles.businessPillarTitle}>
                    Multi-Chain Network
                  </h2>
                  <p className={businessStyles.businessPillarDesc}>
                    One company. Multiple retail formats. One consistent
                    standard.
                  </p>
                  <div className={businessStyles.businessChips}>
                    {BUSINESS_MODEL_FORMATS.map((format) => (
                      <span className={businessStyles.businessChip} key={format}>
                        {format}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
              <div
                className={businessStyles.businessHierarchy}
                aria-label="Brand hierarchy"
              >
                <div className={businessStyles.businessHierarchyStep}>
                  <p
                    className={`${businessStyles.businessHierarchyName} ${businessStyles.businessHierarchyNameSerif}`}
                  >
                    Mahalaxmi Telecom Pvt. Ltd.
                  </p>
                  <p className={businessStyles.businessHierarchyRole}>The Company</p>
                </div>
                <span className={businessStyles.businessHierarchyArrow} aria-hidden="true">
                  {"\u2192"}
                </span>
                <div className={businessStyles.businessHierarchyStep}>
                  <p className={businessStyles.businessHierarchyName}>Jagyasi Mobiles</p>
                  <p className={businessStyles.businessHierarchyRole}>
                    Retail &amp; Franchise Brand
                  </p>
                </div>
                <span className={businessStyles.businessHierarchyArrow} aria-hidden="true">
                  {"\u2192"}
                </span>
                <div className={businessStyles.businessHierarchyStep}>
                  <p className={businessStyles.businessHierarchyName}>COCO / FOFO Stores</p>
                  <p className={businessStyles.businessHierarchyRole}>
                    The Store Network
                  </p>
                </div>
                <span className={businessStyles.businessHierarchyArrow} aria-hidden="true">
                  {"\u2192"}
                </span>
                <div className={businessStyles.businessHierarchyStep}>
                  <p className={businessStyles.businessHierarchyName}>
                    Apple {"\u2022"} Samsung {"\u2022"} OPPO 
                  </p>
                  <p className={businessStyles.businessHierarchyRole}>
                    Brands You Retail
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            className={businessStyles.businessBlock}
            aria-label="What we offer"
          >
            <div className={businessStyles.businessContainer}>
              <p className={businessStyles.businessSectionLabel}>
                02 {"\u2014"} What we offer
              </p>
              <h2 className={businessStyles.businessSectionTitle}>
                Our retail ecosystem.
              </h2>
              <div className={businessStyles.businessEcosystemGrid}>
                {BUSINESS_MODEL_ECOSYSTEM.map((card) => (
                  <article className={businessStyles.businessEcosystemCard} key={card.title}>
                    <div className={businessStyles.businessEcosystemMedia}>
                      <img src={card.image} alt={card.alt} loading="lazy" />
                    </div>
                    <div className={businessStyles.businessEcosystemBody}>
                      <h3 className={businessStyles.businessEcosystemTitle}>
                        {card.title}
                      </h3>
                      <p className={businessStyles.businessEcosystemSub}>{card.sub}</p>
                      <p className={businessStyles.businessEcosystemBrands}>
                        {card.brands}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className={`${businessStyles.businessBlock} ${businessStyles.businessBlockDark}`}
            aria-label="How we scale"
          >
            <div className={businessStyles.businessContainer}>
              <p className={businessStyles.businessSectionLabel}>
                03 {"\u2014"} How we scale
              </p>
              <h2 className={businessStyles.businessSectionTitleLight}>
                Central expertise, local entrepreneurship.
              </h2>
              <div className={businessStyles.businessScaleGrid}>
                <article className={businessStyles.businessScaleCard}>
                  <h3>Company-Owned Stores</h3>
                  <p>
                    Flagships run directly by Mahalaxmi Telecom {"\u2014"} the
                    standard-setters.
                  </p>
                </article>
                <article className={businessStyles.businessScaleCard}>
                  <h3>Franchise-Owned Stores</h3>
                  <p>
                    Entrepreneur-run stores carrying the standard into every
                    market.
                  </p>
                </article>
              </div>
              <p className={businessStyles.businessSharedLabel}>Shared Systems</p>
              <div className={businessStyles.businessChipsCenter}>
                {["Sourcing", "Operations", "Brand & Marketing"].map((item) => (
                  <span className={businessStyles.businessChipDark} key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <p className={businessStyles.businessScaleClose}>
                We combine central expertise with local entrepreneurship to
                build a scalable retail network.
              </p>
            </div>
          </section>

          <section
            className={businessStyles.businessBlock}
            aria-label="Built around the customer"
          >
            <div className={businessStyles.businessContainer}>
              <p className={businessStyles.businessSectionLabel}>
                04 {"\u2014"} What connects it all
              </p>
              <h2 className={businessStyles.businessSectionTitle}>
                Built around the customer.
              </h2>
              <p className={businessStyles.businessCustomerCopy}>
                From choosing the right device to financing, accessories and
                after-sales support, our retail network is designed around a
                seamless customer experience.
              </p>
              <div className={businessStyles.businessCustomerSteps}>
                {BUSINESS_MODEL_CUSTOMER_STEPS.map((step, index) => (
                  <div className={businessStyles.businessCustomerStep} key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                    {index < BUSINESS_MODEL_CUSTOMER_STEPS.length - 1 && (
                      <span
                        className={businessStyles.businessStepArrow}
                        aria-hidden="true"
                      >
                        {"\u2192"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <section className={styles.ctaDark}>
          <div className={styles.ctaDarkContainer}>
            <p className={styles.eyebrow} style={{ color: "#c19a5f" }}>
              Next Step
            </p>
            <h2 className={styles.ctaDarkTitle}>
              Start your franchise application
            </h2>
            <p className={styles.ctaDarkDesc}>
              Share your location and preferred format, and our team will walk
              you through the next steps.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "28px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/contact"
                style={{
                  background: "#c19a5f",
                  color: "#111",
                  padding: "12px 22px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Apply Now
              </a>
              <a
                href="/faq"
                style={{
                  border: "1px solid #3a2d24",
                  color: "#0e0e0e",
                  padding: "12px 22px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Read FAQs
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
