"use client";

import { useEffect, useRef, useState } from "react";
import SiteShell from "@/components/SiteShell";
import {
  TeamDrawer,
  type TeamMember,
} from "@/components/ui/information-drawer";
import styles from "./leadership.module.css";

const DIRECTORS = [
  {
    id: "PJ",
    slug: "pradip-jagyasi",
    name: "Pradip Jagyasi",
    role: "CEO & Co-Founder",
    bio: "Sets the company’s overall vision and strategy, and leads growth, brand partnerships and franchise expansion across Maharashtra and beyond.",
    photo: "/images/leadership/Pradip.png",
    active: true,
    content:
      "<p>Pradip sets the company’s overall vision and strategy, leading growth, brand partnerships and franchise expansion across Maharashtra and beyond. Every store format - from flagship to neighbourhood retail point - carries his standard of honest advice and hands-on customer experience.</p><p>He comes from more than two decades on the distribution side of telecom, where long-standing relationships with national and global mobile brands were built shelf by shelf. That sourcing strength is what lets every outlet retail with confidence on price, warranty and range.</p>",
  },
  {
    id: "GJ",
    slug: "gautam-jagyasi",
    name: "Gautam Jagyasi",
    role: "Managing Director",
    bio: "",
    photo: "/images/leadership/Gautam.png",
    active: false,
    content:
      "<p>Gautam runs day-to-day operations across the retail network - store rollouts, staffing, inventory flow and the operating rhythm that keeps every outlet consistent.</p><p>His focus is execution at scale: opening new stores without diluting service quality, and making sure each format runs on the same Mahalaxmi Telecom playbook.</p>",
  },
  {
    id: "NW",
    slug: "nilesh-wadhwani",
    name: "Nilesh Wadhwani",
    role: "Whole-Time Director",
    bio: "",
    photo: "/images/leadership/Nilesh.png",
    active: false,
    content:
      "<p>Nilesh oversees finance, commercial discipline and the sourcing engine behind the shelves - the bulk purchasing power and brand relationships built over twenty years of distribution.</p><p>His mandate is simple: better prices for partners, healthy margins for stores, and a supply chain that never leaves a fast-moving product out of stock.</p>",
  },
  {
    id: "KJ",
    slug: "kapil-jagyasi",
    name: "Kapil Jagyasi",
    role: "Whole-Time Director",
    bio: "",
    photo: "/images/leadership/Kapil.png",
    active: false,
    content:
      "<p>Kapil leads brand partnerships and marketing - from national-device launches to the store-level campaigns and launch support every new franchise receives.</p><p>He owns the look, voice and visibility of the network, so a customer walking into any of the four formats instantly recognises the same trusted standard.</p>",
  },
  {
    id: "VJ",
    slug: "vijay-jagyasi",
    name: "Vijay Jagyasi",
    role: "Whole-Time Director",
    bio: "",
    photo: "/images/leadership/Vijay.png",
    active: false,
    content:
      "<p>Vijay champions franchise partner success - onboarding, training, finance options and the ongoing support that turns a new store into a thriving local business.</p><p>From site selection to grand opening and beyond, his team stands behind every partner with hands-on guidance, not just a brand board.</p>",
  },
];

const TEAM: TeamMember[] = DIRECTORS.map((d) => ({
  id: d.id,
  slug: d.slug,
  title: d.name,
  content: d.content,
  featuredImage: d.photo,
  teams: { designation: d.role },
}));

export default function LeadershipPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const boardSectionRef = useRef<HTMLElement>(null);
  const stripScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = boardSectionRef.current;
    const scroller = stripScrollRef.current;
    if (!section || !scroller) return;
    const stickyContainer = scroller.parentElement;
    if (!stickyContainer) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let animationFrame = 0;
    let journeyStart = 0;
    let horizontalTravel = 0;
    let pinnedTravel = 0;
    let pinTop = 0;

    const resetPinnedStyles = () => {
      scroller.style.removeProperty("position");
      scroller.style.removeProperty("top");
      scroller.style.removeProperty("left");
      scroller.style.removeProperty("width");
      scroller.style.removeProperty("z-index");
    };

    const updateHorizontalPosition = () => {
      animationFrame = 0;
      if (!mobileQuery.matches || horizontalTravel <= 0) return;

      const elapsed = window.scrollY - journeyStart;
      const progress = Math.min(horizontalTravel, Math.max(0, elapsed));

      if (elapsed <= 0) {
        resetPinnedStyles();
      } else if (elapsed < pinnedTravel) {
        const pinRect = stickyContainer.getBoundingClientRect();
        scroller.style.position = "fixed";
        scroller.style.top = `${pinTop}px`;
        scroller.style.left = `${pinRect.left}px`;
        scroller.style.width = `${stickyContainer.clientWidth}px`;
        scroller.style.zIndex = "2";
      } else {
        scroller.style.position = "absolute";
        scroller.style.top = `${pinnedTravel}px`;
        scroller.style.left = "0";
        scroller.style.width = "100%";
        scroller.style.zIndex = "2";
      }

      if (Math.abs(scroller.scrollLeft - progress) > 0.5) {
        scroller.scrollLeft = progress;
      }
    };

    const requestPositionUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateHorizontalPosition);
    };

    const measureJourney = () => {
      if (!mobileQuery.matches) {
        horizontalTravel = 0;
        section.style.removeProperty("--board-scroll-distance");
        section.style.removeProperty("--board-card-height");
        resetPinnedStyles();
        scroller.scrollLeft = 0;
        return;
      }

      horizontalTravel = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      pinnedTravel = horizontalTravel + Math.round(window.innerHeight * 0.65);
      section.style.setProperty(
        "--board-scroll-distance",
        `${pinnedTravel}px`,
      );
      section.style.setProperty("--board-card-height", `${scroller.offsetHeight}px`);

      let offsetWithinSection = 0;
      let currentElement: HTMLElement | null = stickyContainer;
      while (currentElement && currentElement !== section) {
        offsetWithinSection += currentElement.offsetTop;
        currentElement = currentElement.offsetParent as HTMLElement | null;
      }

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      pinTop =
        Number.parseFloat(
          window
            .getComputedStyle(section)
            .getPropertyValue("--board-pin-top"),
        ) || 0;
      journeyStart = sectionTop + offsetWithinSection - pinTop;
      requestPositionUpdate();
    };

    const resizeObserver = new ResizeObserver(measureJourney);
    resizeObserver.observe(section);
    resizeObserver.observe(scroller);
    mobileQuery.addEventListener("change", measureJourney);
    window.addEventListener("scroll", requestPositionUpdate, { passive: true });
    window.addEventListener("resize", measureJourney, { passive: true });
    measureJourney();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mobileQuery.removeEventListener("change", measureJourney);
      window.removeEventListener("scroll", requestPositionUpdate);
      window.removeEventListener("resize", measureJourney);
      section.style.removeProperty("--board-scroll-distance");
      section.style.removeProperty("--board-card-height");
      resetPinnedStyles();
    };
  }, []);

  const openProfile = (id: string) => {
    const member = TEAM.find((t) => t.id === id);
    if (!member) return;
    setSelected(member);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelected(null);
  };

  return (
    <SiteShell>
      <main id="main-content">
        <section className={styles.topSection}>
          <div className={styles.topContainer}>
            <p className={styles.eyebrow}>Leadership</p>
            <h1 className={styles.topTitle}>
              The people behind{" "}
              <span className={styles.topTitleGold}>every store</span>.
            </h1>
            <p className={styles.topIntro}>
              A leadership team drawn from two decades of telecom distribution,
              now focused on building a premium retail chain. Select any profile
              to read more.
            </p>
          </div>
        </section>

        
        <section
          id="directors-message"
          className={styles.messageSection}
          aria-label="Message from the CEO"
        >
          <div className={styles.messageContainer}>
            <div className={styles.messageCopy}>
              <p className={styles.eyebrow}>Director&apos;s Message</p>
              <h2 className={styles.messageName}>Pradip Jagyasi</h2>
              <p className={styles.messageRole}>
                CEO &amp; Co-Founder <span aria-hidden="true">✦</span>
              </p>
              <blockquote className={styles.messageQuote}>
                Throughout my career, I have learned that the most valuable
                <em> investment</em> we make is not financial. Our greatest
                return is the <em>power of the connections</em> we forge and the{" "}
                <em>network</em> we build.
              </blockquote>
              <p className={styles.messageSign}>
                Mahalaxmi Telecom Private Limited
              </p>
            </div>
            <div className={styles.messageMedia}>
              {/* <span className={styles.messageInitial} aria-hidden="true">
                Pradip
              </span> */}
              <img
                src="/images/leadership/CEO.png"
                alt="Pradip Jagyasi, CEO & Co-Founder"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section
          className={styles.gautamSection}
          aria-labelledby="gautam-message-title"
        >
          <div className={styles.gautamContainer}>
            <div className={styles.gautamMedia}>
              <img
                src="/images/leadership/Director.png"
                alt="Gautam Jagyasi, Managing Director"
                loading="eager"
                fetchPriority="auto"
              />
            </div>

            <div className={styles.gautamCopy}>
              <h2 id="gautam-message-title" className={styles.gautamName}>
                Gautam Jagyasi
              </h2>
              <div className={styles.gautamMeta}>
                <p className={styles.gautamRole}>Managing Director</p>
                <p className={styles.gautamPerspective}>
                  Leadership perspective
                </p>
              </div>
              <blockquote className={styles.gautamQuote}>
                A vision becomes meaningful only when it is{" "}
                <em>delivered consistently</em>-through every store, every team,
                and every <em>customer experience</em>.
              </blockquote>
              <p className={styles.gautamStatement}>
                We grow by turning ambition into a{" "}
                <strong>dependable operating standard</strong>: disciplined
                execution, empowered teams, and the same{" "}
                <strong>trusted experience</strong> wherever our customers meet
                us.
              </p>
              <p className={styles.gautamSign}>
                Mahalaxmi Telecom Private Limited
              </p>
            </div>
          </div>
        </section>



        <section ref={boardSectionRef} className={styles.boardSection}>
          <div className={styles.boardContainer}>
            <p className={styles.eyebrow}>Board & Leadership</p>
            <h2 className={styles.boardTitle}>Five directors, one shared standard of retail.</h2>

            <div className={styles.stripPin}>
              <div ref={stripScrollRef} className={styles.stripScroll}>
                <div className={styles.strip}>
                <div className={styles.headRow}>
                  {DIRECTORS.map(d => (
                    <div key={d.id} className={styles.headCell}>
                      <h3 className={styles.cardName}>{d.name}</h3>
                      <p className={styles.cardRole}>{d.role}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.photoRow}>
                  {DIRECTORS.map(d => (
                    <div
                      key={d.id}
                      className={styles.photoCell}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${d.name} profile`}
                      onClick={() => openProfile(d.id)}
                      onKeyDown={(event) => {
                        if (event.key !== 'Enter' && event.key !== ' ') return;
                        event.preventDefault();
                        openProfile(d.id);
                      }}
                    >
                      <img
                        src={d.photo}
                        alt={`${d.name}, ${d.role}`}
                        loading="lazy"
                        fetchPriority="low"
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.footRow}>
                  {DIRECTORS.map(d => (
                    <div key={d.id} className={styles.footCell}>
                      <a
                        href="#"
                        onClick={(event) => { event.preventDefault(); openProfile(d.id); }}
                        className={styles.cardLink}
                      >&mdash; Profile</a>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* <section
          aria-label="Leadership team"
          style={{
            width: "min(100% - 64px, 1280px)",
            margin: "0 auto",
            padding: "72px 0",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "stretch",
              minWidth: "1060px",
            }}
          >

            <div
              style={{
                flex: "1 1 0",
                minWidth: "244px",
                padding: "32px 28px",
                background: "#fffdfa",
                border: "1px solid #e8e2d6",
                borderRadius: "14px",
                boxSizing: "border-box",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#c19a5f",
                  fontSize: "25px",
                  fontWeight: 700,
                }}
              >
                Kapil Jagyasi
              </h3>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "#8a8580",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "1.6px",
                  textTransform: "uppercase",
                }}
              >
                Whole-Time Director
              </p>
              <p
                style={{
                  margin: "16px 0 0",
                  color: "#6b6560",
                  fontSize: "12.5px",
                  lineHeight: 1.65,
                }}
              >
                Kapil jagyasi is the Whole-Time Director trains the team of
                Mahalaxmi Telecom Private Limited.
              </p>
            </div>
            <div
              style={{
                flex: "1 1 0",
                minWidth: "244px",
                padding: "32px 28px",
                background: "#fffdfa",
                border: "1px solid #e8e2d6",
                borderRadius: "14px",
                boxSizing: "border-box",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#c19a5f",
                  fontSize: "25px",
                  fontWeight: 700,
                }}
              >
                Vijay Jagyasi
              </h3>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "#8a8580",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "1.6px",
                  textTransform: "uppercase",
                }}
              >
                Whole-Time Director
              </p>
              <p
                style={{
                  margin: "16px 0 0",
                  color: "#6b6560",
                  fontSize: "12.5px",
                  lineHeight: 1.65,
                }}
              >
                Vijay Jagyasi is the Whole-Time Director manages the logistics
                of Mahalaxmi Telecom Private Limited.
              </p>
            </div>
            <div
              style={{
                flex: "1 1 0",
                minWidth: "244px",
                padding: "32px 28px",
                background: "#fffdfa",
                border: "1px solid #e8e2d6",
                borderRadius: "14px",
                boxSizing: "border-box",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#c19a5f",
                  fontSize: "25px",
                  fontWeight: 700,
                }}
              >
                Nilesh Wadhwani
              </h3>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "#8a8580",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "1.6px",
                  textTransform: "uppercase",
                }}
              >
                Whole-Time Director
              </p>
              <p
                style={{
                  margin: "16px 0 0",
                  color: "#6b6560",
                  fontSize: "12.5px",
                  lineHeight: 1.65,
                }}
              >
                Nilesh Wadhwani is the Whole-Time Director manages the clients
                of Mahalaxmi Telecom Private Limited.
              </p>
            </div>
          </div>
        </section> */}

      </main>

      <TeamDrawer
        open={drawerOpen}
        member={selected}
        teams={TEAM}
        onClose={closeDrawer}
        backgroundColor="#fffdfa"
        textColor="#14100a"
        overlayOpacity={0.35}
      />
    </SiteShell>
  );
}
