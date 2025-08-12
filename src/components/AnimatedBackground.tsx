import React from "react";

/**
 * AnimatedBackground - a visually rich background with animated gradient,
 * SVG overlays, noise, and CSS particles.
 * - Respects user motion preferences.
 */
const AnimatedBackground: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true" role="presentation">
    {/* Mesh Gradient */}
    <div
      className="absolute inset-0 animate-bg-mesh opacity-90"
      style={{
        background:
          "radial-gradient(ellipse 75% 55% at 60% 20%, #d1eef6 45%, #a3def0 65%, transparent 100%), radial-gradient(circle at 80% 85%, #029abf 0%, #6ecce5 55%, #ebf8fa 180%)",
        filter: "blur(0px)",
        zIndex: 0,
      }}
      aria-hidden="true"
    />

    {/* SVG Islamic Geometric Overlay */}
    <svg
      className="absolute left-0 top-0 w-full h-full opacity-10 dark:opacity-20"
      aria-hidden="true"
      viewBox="0 0 1200 320"
      fill="none"
      preserveAspectRatio="none"
      role="presentation"
    >
      <defs>
        <pattern
          id="pattern"
          width="120"
          height="140"
          patternUnits="userSpaceOnUse"
        >
          <g stroke="#029abf" strokeWidth="1.8" opacity="0.7">
            <polygon points="60,15 105,105 15,105" />
            <polygon points="60,105 15,15 105,15" />
          </g>
        </pattern>
      </defs>
      <rect width="1200" height="320" fill="url(#pattern)" />
    </svg>

    {/* CSS Noise */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22f%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%222%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23f)%22/></svg>') repeat",
        opacity: 0.10,
        zIndex: 1,
      }}
      aria-hidden="true"
    />

    {/* CSS-only particles */}
    <style>
      {`
        @media (prefers-reduced-motion: no-preference) {
          .particle-anim::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            animation: floatingParticles 10s linear infinite;
            box-shadow:
              20vw 10vh 1px 1px #6ecce5,
              40vw 60vh 2px 2px #26b6da,
              70vw 22vh 1.2px 2px #a3def0,
              55vw 40vh 0.8px 2px #029abf,
              10vw 70vh 1.5px 2px #0c3340;
          }

          @keyframes floatingParticles {
            to {
              box-shadow:
                21vw 12vh 1px 1px #6ecce5,
                39vw 65vh 2px 2px #26b6da,
                75vw 25vh 1.2px 2px #a3def0,
                50vw 38vh 0.8px 2px #029abf,
                15vw 72vh 1.5px 2px #0c3340;
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle-anim::before {
            animation: none !important;
          }
        }
      `}
    </style>
    <div className="particle-anim absolute inset-0" />
  </div>
);

export default AnimatedBackground;
