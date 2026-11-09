"use client";

import { useEffect, useState, type ReactNode } from "react";

type SiteShellProps = {
  children: ReactNode;
  transparentOnTop?: boolean;
};

type NavEntry = {
  href: string;
  label: string;
};

const navigation: NavEntry[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/leadership", label: "Leadership" },
  { href: "/brands", label: "Brands" },
  { href: "/franchise", label: "Franchise" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/jagyasimobiles_offical?utm_source=ig_web_button_share_sheet&obrf=ZDNlZDc0MzIxNw==",
    viewBox: "0 0 24 24",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.4a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919604836936",
    viewBox: "0 0 24 24",
    path: "M12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 6L.2 24l6.3-1.6a11.9 11.9 0 005.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.9C23.9 5.3 18.6 0 12 0zm0 21.8h-.1a9.9 9.9 0 01-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.9 9.9 0 01-1.5-5.3c0-5.4 4.4-9.9 9.9-9.9a9.8 9.8 0 019.9 9.9c0 5.4-4.4 9.9-9.8 9.9zm5.4-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2-.2-.3 0-.5.2-.6l.9-1c.2-.2.2-.4.1-.6-.1-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.6h-.6c-.2 0-.6.2-.9.5-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.4c.2.2 2.3 3.5 5.5 4.9 1.5.7 2.2.7 3 .6.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4 0-.2-.2-.2-.5-.4z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/p/Mahalaxmi-Telecom-Pvt-Ltd-100063747265654/",
    viewBox: "0 0 24 24",
    path: "M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z",
  },
] as const;

export default function SiteShell({
  children,
  transparentOnTop = false,
}: SiteShellProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!transparentOnTop) {
      return;
    }

    const updateScrollState = () => setHasScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, [transparentOnTop]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const mobileQuery = window.matchMedia("(max-width: 860px)");
    const closeOnDesktop = () => {
      if (!mobileQuery.matches) setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";

    window.addEventListener("keydown", closeOnEscape);
    mobileQuery.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflowY = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      mobileQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  const headerClassName = [
    "site-top-header",
    transparentOnTop ? "navbar-transparent" : "",
    hasScrolled ? "navbar-scrolled" : "",
    menuOpen ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <a id="page-top" />

      <header id="site-top-header" className={headerClassName}>
        <div className="navbar-inner">
          <a
            href="/"
            className="brand-logo"
            id="brand-logo"
            aria-label="Mahalaxmi Telecom home"
          >
            <span className="brand-name">
              <img
                src="/mahalaxmi-logo-bg.png"
                alt=""
                className="brand-logo-mark"
              />
              <span className="brand-name-main">Mahalaxmi Telecom</span>
              <span className="brand-name-sub">Private Limited</span>
            </span>
          </a>

          <nav className="main-nav" id="main-nav" aria-label="Main navigation">
            <button
              type="button"
              className={`nav-toggle${menuOpen ? " open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-controls="nav-list"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="nav-toggle-bar" aria-hidden="true" />
              <span className="nav-toggle-bar" aria-hidden="true" />
              <span className="nav-toggle-bar" aria-hidden="true" />
            </button>
            <ul
              className={`nav-list${menuOpen ? " nav-open" : ""}`}
              id="nav-list"
            >
              {navigation.map((entry) => (
                <li className="nav-item" key={entry.href}>
                  <a
                    href={entry.href}
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
              <li className="nav-cta-item">
                <a
                  href="tel:+918484840984"
                  className="nav-cta-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Enquiry
                </a>
              </li>
            </ul>
          </nav>

          <a href="tel:+918484840984" className="nav-cta-btn" aria-label="Call for enquiry">
            <img
              src="/icons/call.svg"
              alt=""
              className="nav-cta-icon"
              aria-hidden="true"
            />
            <span>Enquiry</span>
          </a>
        </div>
      </header>

      {children}

      <section
        className="franchise-opportunity-banner"
        aria-labelledby="franchise-opportunity-title"
      >
        <div className="franchise-opportunity-content">
          <h2 id="franchise-opportunity-title">
            Build your future with our franchise
          </h2>
          <div className="franchise-opportunity-actions">
            <a href="/franchise" className="franchise-opportunity-primary">
              Explore Franchise Opportunity <span aria-hidden="true"></span>
            </a>
            <a href="/contact" className="franchise-opportunity-secondary">
              Contact Us <span aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </section>

      <footer id="site-footer" className="site-footer">
        <div className="container footer-container">
          <div className="footer-col footer-brand-col" id="footer-brand-col">
            <a
              href="/"
              className="footer-logo"
              aria-label="Mahalaxmi Telecom home"
            >
              <img
                src="/mahalaxmi-logo-bg.png"
                alt=""
                className="footer-logo-img"
                aria-hidden="true"
              />
              <span className="footer-logo-text">
                <span className="footer-logo-name">Mahalaxmi Telecom</span>
                <span className="footer-logo-sub">Private Limited</span>
              </span>
            </a>
            <p className="footer-brand-text">
              A trusted multi-brand mobile and accessory retail chain
              headquartered in Nandurbar, Maharashtra, backed by more than
              twenty years of telecom distribution experience.
            </p>
            <ul className="footer-brand-list" id="footer-brand-list">
              <li>
                <a href="/brands#store-jagyasi-mobile">Jagyasi Mobile</a>
              </li>
              <li>
                <a href="/brands#store-mm-mobile">MM Mobile</a>
              </li>
              <li>
                <a href="/brands#store-phone-cafe">Phone Café</a>
              </li>
              <li>
                <a href="/brands#store-mobile-point">Mobile Point</a>
              </li>
            </ul>
          </div>

          <div
            className="footer-col footer-links-col"
            id="footer-company-links"
          >
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-link-list">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/about#our-story">Our Story</a>
              </li>
              <li>
                <a href="/leadership#directors-message">Director&apos;s Message</a>
              </li>
              <li>
                <a href="/leadership">Leadership</a>
              </li>
              <li>
                <a href="/about#vision-mission">Vision &amp; Mission</a>
              </li>
            </ul>
          </div>

          <div
            className="footer-col footer-links-col"
            id="footer-franchise-links"
          >
            <h4 className="footer-col-title">Franchise</h4>
            <ul className="footer-link-list">
              <li>
                <a href="/franchise#why-partner">Why Partner With Us</a>
              </li>
              <li>
                <a href="/franchise">Store Franchise Plan</a>
              </li>
              <li>
                <a href="/faq">Franchise FAQs</a>
              </li>
            </ul>
          </div>

          <div
            className="footer-col footer-contact-col"
            id="footer-contact-col"
          >
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-contact-list">
              <li>
                Shop No. 420, Subhash Chowk, Mangal Gate Police Chowki,
                Nandurbar, Maharashtra 425412
              </li>
              <li>
                <a href="tel:+919604836936">+91 96048 36936</a>
              </li>
              <li>
                <a href="mailto:contact@mahalaxmitelecom.in">
                  contact@mahalaxmitelecom.in
                </a>
              </li>
            </ul>
            <ul className="footer-social-list" id="footer-social-list">
              {socialLinks.map(({ label, href, viewBox, path }) => (
                <li className="footer-social-item" key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      viewBox={viewBox}
                      className="social-icon"
                      aria-hidden="true"
                      fill="currentColor"
                    >
                      <path d={path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="footer-col footer-newsletter-col"
            id="footer-newsletter-col"
          >
            <h4 className="footer-col-title">Stay Updated</h4>
            <p className="footer-newsletter-text">
              Contact us to ask about franchise openings and store news.
            </p>
            <form
              className="footer-newsletter-form"
              id="footer-newsletter-form"
              action="/contact#enquiry-form"
              onSubmit={(event) => {
                event.preventDefault();
                const email = new FormData(event.currentTarget).get("newsletter-email");
                if (typeof email !== "string" || !email.trim()) return;
                window.location.assign(`/contact#enquiry-email=${encodeURIComponent(email.trim())}`);
              }}
            >
              <input
                className="newsletter-input"
                type="email"
                name="newsletter-email"
                aria-label="Your email address"
                autoComplete="email"
                placeholder="Your email address"
                required
              />
              <button className="newsletter-submit-btn" type="submit">
                Continue
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom" id="footer-bottom">
          <div className="container footer-bottom-inner">
            <p className="footer-copyright">
              &copy; <span id="footer-year">2026</span> Mahalaxmi Telecom
              Private Limited. All Rights Reserved.
            </p>
            <ul className="footer-legal-list">
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-and-conditions">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
