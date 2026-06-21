import { useEffect, useState } from "react";

const CIRCUMFERENCE = 198.5;
const MIN_LOAD_TIME = 6000;
const EXIT_TIME = 1300;

type PreloaderProps = {
  onDone?: () => void;
};

function Preloader({ onDone }: PreloaderProps) {
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let pageLoaded = document.readyState === "complete";
    let minDelayPassed = false;
    let exitTimer: number | undefined;
    let removeTimer: number | undefined;

    const tryHide = () => {
      if (!pageLoaded || !minDelayPassed) return;

      exitTimer = window.setTimeout(() => {
        setExiting(true);
        onDone?.();
        removeTimer = window.setTimeout(() => {
          setRemoved(true);
        }, EXIT_TIME);
      }, 150);
    };

    const minDelayTimer = window.setTimeout(() => {
      minDelayPassed = true;
      tryHide();
    }, MIN_LOAD_TIME);

    const loadHandler = () => {
      pageLoaded = true;
      tryHide();
    };

    if (pageLoaded) {
      tryHide();
    } else {
      window.addEventListener("load", loadHandler, { once: true });
    }

    return () => {
      window.removeEventListener("load", loadHandler);
      window.clearTimeout(minDelayTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
    };
  }, [onDone]);

  if (removed) return null;

  return (
    <div
      className={`preloader ${exiting ? "exit" : ""}`}
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      <svg className="preloader-icon" viewBox="0 0 68.21 68.21" role="img">
        <title>Loading</title>
        <circle cx="34.1" cy="34.1" r="34.1" fill="#f8f8f6" />
        <circle
          className="preloader-arc"
          cx="34.1"
          cy="34.1"
          r="31.6"
          fill="none"
          stroke="#f05323"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
        <g className="preloader-blades" fill="#f05323">
          <path d="M35.92,47.93c0,.9-.72,1.63-1.62,1.63h.08c.9,0,1.63-.73,1.63-1.63v-3.92c-.06.15-.09.33-.09.51v3.41ZM34.38,20.23h-.08c.9,0,1.62.73,1.62,1.61v10.95c0,.18.03.36.09.51v-11.46c0-.88-.73-1.61-1.63-1.61Z" />
          <path d="M31.48,21.84c0-.88.73-1.61,1.62-1.61h-.09c-.88,0-1.61.73-1.61,1.61v3.9c.06-.15.08-.31.08-.48v-3.42ZM31.48,47.93v-10.93c0-.17-.02-.33-.08-.48v11.41c0,.9.73,1.63,1.61,1.63h.09c-.89,0-1.62-.73-1.62-1.63Z" />
          <path d="M47.6,46.84c.95,1.04.23,2.72-1.19,2.72h-1.67c-.46,0-.92-.21-1.21-.57l-4.76-5.51c-.85-1-2.4-.59-2.76.53-.06.15-.09.33-.09.51v3.41c0,.9-.72,1.63-1.62,1.63h-1.2c-.89,0-1.62-.73-1.62-1.63v-10.93c0-.17-.02-.33-.08-.48-.34-1.16-1.93-1.59-2.77-.56l-3.14,3.78-1.46,1.75c-.29.36-.76.59-1.23.59h-1.81c-1.41,0-2.15-1.68-1.2-2.72l1.87-2.03,1.92-2.1.63-.67,2.15-2.34c.57-.61.57-1.56,0-2.18l-6.55-7.09c-.97-1.04-.23-2.72,1.18-2.72h1.66c.48,0,.92.21,1.23.56l4.76,5.52c.86,1.02,2.42.59,2.76-.57.06-.15.08-.31.08-.48v-3.42c0-.88.73-1.61,1.62-1.61h1.2c.9,0,1.62.73,1.62,1.61v10.95c0,.18.03.36.09.51.36,1.14,1.92,1.55,2.77.51l3.14-3.77,1.44-1.74c.31-.36.76-.58,1.24-.58h1.82c1.41,0,2.15,1.68,1.2,2.72l-1.89,2.04-1.91,2.08-.62.67-2.15,2.33c-.57.62-.57,1.56,0,2.18v.02s6.56,7.08,6.56,7.08Z" />
        </g>
      </svg>
    </div>
  );
}

export default Preloader;
