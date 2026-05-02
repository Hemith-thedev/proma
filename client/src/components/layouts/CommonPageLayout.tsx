import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react"; // Import Lucide Heart
import CommonPagesHeader from "../common/CommonPagesHeader";

// CSS for animations and Gradient logic
const AnimationStyles = () => (
  <style>{`
    @keyframes heartPulse {
      0% { transform: scale(1); filter: drop-shadow(0 0 50px hsl(270, 100%, 50%)); }
      50% { transform: scale(1.15); filter: drop-shadow(0 0 75px hsl(270, 100%, 50%)); }
      100% { transform: scale(1); filter: drop-shadow(0 0 50px hsl(270, 100%, 50%)); }
    }
  `}</style>
);

export default function CommonPageLayout({ page }: { page: React.ReactNode }) {
  const [isHeaderOpened, setIsHeaderOpenened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0);
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

  useEffect(() => {
    // Fade-in entry
    const entryTimer = setTimeout(() => setOverlayOpacity(1), 50);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1.5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setOverlayOpacity(0);
        setTimeout(() => setIsLoading(false), 800);
      }
      setLoadingPercentage(Math.round(progress));
    }, 30);

    return () => {
      clearTimeout(entryTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <AnimationStyles />
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: overlayOpacity,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: overlayOpacity > 0 ? "all" : "none",
          }}
          className="bg-black/30"
        >
          {/* SVG Gradient Definition */}
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <linearGradient
              id="heartGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "hsl(220, 100%, 50%)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "hsl(330, 100%, 50%)", stopOpacity: 1 }}
              />
            </linearGradient>
          </svg>

          <div style={{ position: "relative", display: "inline-block" }}>
            {/* Lucide Heart Icon with Gradient Fill */}
            <Heart
              size={120}
              strokeWidth={1.5}
              style={{
                fill: "url(#heartGradient)", // Linking to the SVG gradient above
                stroke: "url(#heartGradient)",
                animation: "heartPulse 1.5s ease-in-out infinite",
              }}
            />

            {/* Percentage Text in the center */}
            <div
              style={{
                position: "absolute",
                top: "55%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "1rem",
                fontWeight: "800",
                color: "#ffffff",
                letterSpacing: "1px",
                pointerEvents: "none",
              }}
            >
              {loadingPercentage}%
            </div>
          </div>
          <p
            style={{
              marginTop: "24px",
              color: "#666",
              fontSize: "0.9rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Loading Magic...
          </p>
        </div>

      {/* Main Content */}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 1s ease-in-out",
        }}
        className="flex flex-col justify-start items-center gap-20 min-h-screen min-w-full proma-scrollbar-element"
      >
        <CommonPagesHeader
          opened={isHeaderOpened}
          onclick={() => setIsHeaderOpenened((prev) => !prev)}
        />
        {page}
      </div>
    </>
  );
}
