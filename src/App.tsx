import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";

import firstShape from "../SVG/first shape.svg";
import secondShape from "../SVG/Second Shape.svg";
import thirdShape from "../SVG/Third shape.svg";
import fourthShape from "../SVG/4th shape.svg";
import scrollLogo from "../SVG/scroll down logo.svg";
import Preloader from "./Preloader";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const navItems = ["about", "portfolio", "contact"];

const pillars = [
  { label: "Crafting Brands", image: firstShape, className: "mark-one" },
  { label: "Coding Experiences", image: secondShape },
  { label: "Driving Impact", image: thirdShape },
  { label: "Building Systems", image: fourthShape },
];

const titleLines = ["Kaushal", "Prajapati"];

function App() {
  const badgeRef = useRef<HTMLAnchorElement>(null);
  const aboutBadgeRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleReady, setTitleReady] = useState(false);
  const [titleSettled, setTitleSettled] = useState(false);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.35,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    return () => smoother.kill();
  }, []);

  useGSAP(
    () => {
      const badgeTexts = [
        badgeRef.current?.querySelector(".badge-text"),
        aboutBadgeRef.current?.querySelector(".badge-text"),
      ].filter(Boolean);

      if (badgeTexts.length === 0) return;

      gsap.to(badgeTexts, {
        rotate: 360,
        duration: 16,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    },
    { scope: badgeRef },
  );

  useGSAP(
    () => {
      if (!aboutRef.current) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(aboutRef.current, { backgroundColor: "var(--orange)" });
        gsap.set(".hello-title", { opacity: 1, y: 0, color: "var(--ink)" });
        gsap.set(".hello-orb", { opacity: 0, scale: 1, xPercent: -50, yPercent: 0 });
        gsap.set(".hello-badge", { opacity: 0, scale: 0.85 });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1.2,
          pin: false,
          anticipatePin: 1,
        },
      });

      timeline
        .set(aboutRef.current, { backgroundColor: "var(--orange)" })
        .set(".hello-title", {
          opacity: 0,
          y: -70,
          filter: "blur(0px)",
          color: "var(--ink)",
          zIndex: 5,
        })
        .set(".hello-orb", { opacity: 0, scale: 1, xPercent: -50, yPercent: 0 })
        .set(".hello-badge", { opacity: 0, scale: 0.85 })
        .to(".hello-title", {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        }, 0.35);

      return () => timeline.kill();
    },
    { scope: aboutRef },
  );

  useGSAP(
    () => {
      if (!titleReady || !titleRef.current) return;

      const titleLines = titleRef.current.querySelectorAll(".hero-title-line");

      animate(titleLines, {
        translateY: ["1.15em", "0em"],
        opacity: [0, 1],
        duration: 1400,
        delay: stagger(120),
        ease: "outExpo",
      });
    },
    { dependencies: [titleReady], scope: titleRef },
  );

  useEffect(() => {
    if (!titleReady) return;

    const settleTimer = window.setTimeout(() => {
      setTitleSettled(true);
    }, 2300);

    return () => window.clearTimeout(settleTimer);
  }, [titleReady]);

  return (
    <>
      <Preloader onDone={() => setTitleReady(true)} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="landing" id="top">
            <motion.header className="topbar" aria-label="Primary">
              <motion.p className="descriptor">
                Brand Designer <span>&amp;</span> Creative Developer<span>.</span>
              </motion.p>

              <motion.nav className="nav-links">
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    whileTap={{ y: 1, boxShadow: "3px 3px 0 var(--orange)" }}
                  >
                    <span>{item}</span>
                  </motion.a>
                ))}
              </motion.nav>
            </motion.header>

            <section className="hero" aria-labelledby="hero-title">
              <motion.h1
                id="hero-title"
                className={`animated-title ${titleReady ? "is-ready" : ""} ${
                  titleSettled ? "is-settled" : ""
                }`}
                ref={titleRef}
                initial={false}
              >
                {titleLines.map((line, lineIndex) => (
                  <span className="hero-title-line" key={line}>
                    {line}
                    {lineIndex === titleLines.length - 1 ? (
                      <span className="hero-dot">.</span>
                    ) : null}
                  </span>
                ))}
              </motion.h1>
            </section>

            <section className="pillars" aria-label="Portfolio focus areas">
              {pillars.map((pillar, index) => (
                <motion.article
                  className="pillar"
                  key={pillar.label}
                  initial={{ opacity: 0, x: -34, filter: "blur(10px)" }}
                  animate={
                    titleSettled
                      ? { opacity: 1, x: 0, filter: "blur(0px)" }
                      : { opacity: 0, x: -34, filter: "blur(10px)" }
                  }
                  transition={{
                    duration: 1.25,
                    delay: index * 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.img
                    className={`mark ${pillar.className ?? ""}`}
                    src={pillar.image}
                    alt=""
                    aria-hidden="true"
                  />
                  <h2>{pillar.label}</h2>
                </motion.article>
              ))}
            </section>

            <motion.a
              className="scroll-badge"
              href="#portfolio"
              aria-label="Scroll down to see more work"
              ref={badgeRef}
              initial={false}
              whileHover={{ scale: 1.08 }}
            >
              <svg className="badge-text" viewBox="0 0 125 125" aria-hidden="true">
                <defs>
                  <path
                    id="badge-circle"
                    d="M 62.5,62.5 m -51,0 a 51,51 0 1,1 102,0 a 51,51 0 1,1 -102,0"
                  />
                </defs>
                <text>
                  <textPath href="#badge-circle" startOffset="0%">
                    SCROLL DOWN TO SEE MORE WORK -
                  </textPath>
                </text>
              </svg>
              <img className="badge-core" src={scrollLogo} alt="" aria-hidden="true" />
            </motion.a>
          </main>

          <section className="hello-section" id="about" ref={aboutRef}>
            <h2 className="hello-title">
              <span>Hello</span>
              <span className="hello-exclamation">
                !
                <span className="hello-orb" aria-hidden="true" />
              </span>
            </h2>

            <a
              className="scroll-badge hello-badge"
              href="#portfolio"
              aria-label="Scroll down to see more work"
              ref={aboutBadgeRef}
            >
              <svg className="badge-text" viewBox="0 0 125 125" aria-hidden="true">
                <defs>
                  <path
                    id="about-badge-circle"
                    d="M 62.5,62.5 m -51,0 a 51,51 0 1,1 102,0 a 51,51 0 1,1 -102,0"
                  />
                </defs>
                <text>
                  <textPath href="#about-badge-circle" startOffset="0%">
                    SCROLL DOWN TO SEE MORE WORK -
                  </textPath>
                </text>
              </svg>
              <img className="badge-core" src={scrollLogo} alt="" aria-hidden="true" />
            </a>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
