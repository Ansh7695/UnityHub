"use client";

import { useCallback, useState, useEffect } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { useTheme } from "next-themes";

export function ParticlesBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {}, []);

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : true;
  // Black lines in sun (light) mode, vibrant orange/warm lines in dark mode
  const lineColor = isDark ? "#f97316" : "#000000";
  const particleColor = isDark ? "#f97316" : "#000000";
  const lineOpacity = isDark ? 0.4 : 0.6;

  return (
    <Particles
      key={isDark ? "dark-particles" : "light-particles"}
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 180,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: lineColor,
            distance: 140,
            enable: true,
            opacity: lineOpacity,
            width: 1.5,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 75,
          },
          opacity: {
            value: isDark ? 0.5 : 0.7,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 pointer-events-none"
    />
  );
}