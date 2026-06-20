import { useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import firstShape from "../SVG/first shape.svg";
import secondShape from "../SVG/Second Shape.svg";
import thirdShape from "../SVG/Third shape.svg";
import fourthShape from "../SVG/4th shape.svg";
import scrollLogo from "../SVG/scroll down logo.svg";
import Preloader from "./Preloader";

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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleReady, setTitleReady] = useState(false);

  useGSAP(
    () => {
      if (!badgeRef.current) return;

      gsap.to(badgeRef.current.querySelector(".badge-text"), {
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
      if (!titleReady || !titleRef.current) return;

      const letters = titleRef.current.querySelectorAll(".hero-letter");

      animate(letters, {
        translateY: ["1.15em", "0em"],
        opacity: [0, 1],
        duration: 1400,
        delay: stagger(34),
        ease: "outExpo",
      });
    },
    { dependencies: [titleReady], scope: titleRef },
  );

  return (
    <>
      <Preloader onDone={() => setTitleReady(true)} />
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
                whileHover={{ y: -3, boxShadow: "8px 8px 0 var(--orange)" }}
                whileTap={{ y: 1, boxShadow: "3px 3px 0 var(--orange)" }}
              >
                {item}
              </motion.a>
            ))}
          </motion.nav>
        </motion.header>

        <section className="hero" aria-labelledby="hero-title">
          <motion.h1
            id="hero-title"
            className={`animated-title ${titleReady ? "is-ready" : ""}`}
            ref={titleRef}
            initial={false}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.25 }}
          >
            {titleLines.map((line, lineIndex) => (
              <span className="hero-title-line" key={line}>
                {line.split("").map((letter, index) => (
                  <span className="hero-letter" key={`${line}-${letter}-${index}`}>
                    {letter}
                  </span>
                ))}
                {lineIndex === titleLines.length - 1 ? (
                  <span className="hero-letter hero-dot">.</span>
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
              initial={false}
            >
              <motion.img
                className={`mark ${pillar.className ?? ""}`}
                src={pillar.image}
                alt=""
                aria-hidden="true"
                whileHover={{
                  rotate: index % 2 === 0 ? -3 : 3,
                  scale: 1.04,
                  transition: { duration: 0.25 },
                }}
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
    </>
  );
}

export default App;
