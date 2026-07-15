"use client";
import { cn } from "@/lib/utils";
import { motion, MotionValue } from "framer-motion";
import React from "react";

const transition = {
  duration: 0,
  ease: "linear" as const,
};

export const ScrollSignalEffect = ({
  pathLengths,
  title,
  description,
  className,
}: {
  pathLengths: MotionValue<number>[];
  title?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("sticky top-80", className)}>
      <p className="font-display text-lg sm:text-2xl md:text-4xl lg:text-7xl font-extrabold tracking-tight text-center text-foreground">
        {title || (
          <>
            What if no one had to <span className="text-gradient-primary">break the ice?</span>
          </>
        )}
      </p>
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center max-w-xl mx-auto mt-4">
        {description ||
          "Imagine a room where every stranger already has a reason to talk."}
      </p>

      <div className="w-full h-[600px] -mt-12 md:-mt-20 [mask-image:linear-gradient(to_bottom,transparent_10%,white_30%,white_70%,transparent_90%)]">
        <svg
          width="1440"
          height="600"
          viewBox="0 0 1440 600"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-full h-full"
        >
          <defs>
            {/* Brand gradient coral → orange */}
            <linearGradient id="sensGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF416C" />
              <stop offset="100%" stopColor="#FF6B35" />
            </linearGradient>
            <linearGradient id="sensGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#FF416C" />
            </linearGradient>
            <linearGradient id="sensGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF416C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF9068" />
            </linearGradient>
            <linearGradient id="sensGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9068" />
              <stop offset="100%" stopColor="#FF416C" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="sensGrad5" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF416C" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.5" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="signalGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>

          {/* Background glow paths */}
          <motion.path
            d="M0 300 Q 200 180, 400 260 T 800 220 T 1200 280 T 1440 300"
            stroke="url(#sensGrad1)"
            strokeWidth="3"
            fill="none"
            filter="url(#signalGlow)"
            style={{ pathLength: pathLengths[0], opacity: 0.3 }}
            transition={transition}
          />
          <motion.path
            d="M0 300 Q 240 360, 480 310 T 960 340 T 1440 300"
            stroke="url(#sensGrad2)"
            strokeWidth="3"
            fill="none"
            filter="url(#signalGlow)"
            style={{ pathLength: pathLengths[1], opacity: 0.3 }}
            transition={transition}
          />
          <motion.path
            d="M0 300 Q 180 220, 360 270 T 720 200 T 1080 260 T 1440 300"
            stroke="url(#sensGrad3)"
            strokeWidth="2"
            fill="none"
            filter="url(#signalGlow)"
            style={{ pathLength: pathLengths[2], opacity: 0.2 }}
            transition={transition}
          />
          <motion.path
            d="M0 300 Q 280 380, 560 330 T 1120 360 T 1440 300"
            stroke="url(#sensGrad4)"
            strokeWidth="2"
            fill="none"
            filter="url(#signalGlow)"
            style={{ pathLength: pathLengths[3], opacity: 0.2 }}
            transition={transition}
          />
          <motion.path
            d="M0 300 Q 360 240, 720 280 T 1440 300"
            stroke="url(#sensGrad5)"
            strokeWidth="2"
            fill="none"
            filter="url(#signalGlow)"
            style={{ pathLength: pathLengths[4], opacity: 0.15 }}
            transition={transition}
          />

          {/* Main sharp paths */}
          <motion.path
            d="M0 300 Q 200 180, 400 260 T 800 220 T 1200 280 T 1440 300"
            stroke="url(#sensGrad1)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: pathLengths[0] }}
            transition={transition}
          />
          <motion.path
            d="M0 300 Q 240 360, 480 310 T 960 340 T 1440 300"
            stroke="url(#sensGrad2)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: pathLengths[1] }}
            transition={transition}
          />
          <motion.path
            d="M0 300 Q 180 220, 360 270 T 720 200 T 1080 260 T 1440 300"
            stroke="url(#sensGrad3)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: pathLengths[2] }}
            transition={transition}
          />
          <motion.path
            d="M0 300 Q 280 380, 560 330 T 1120 360 T 1440 300"
            stroke="url(#sensGrad4)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: pathLengths[3] }}
            transition={transition}
          />
          <motion.path
            d="M0 300 Q 360 240, 720 280 T 1440 300"
            stroke="url(#sensGrad5)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: pathLengths[4] }}
            transition={transition}
          />
        </svg>
      </div>
    </div>
  );
};
