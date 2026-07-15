import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CaptionBeat {
  caption: string;
  label: string;
}

interface VideoCaptionTrackProps {
  videoSrc: string;
  poster?: string;
  eyebrow: string;
  problemHeadline: string;
  beats: CaptionBeat[];
  /** ms per beat */
  beatDuration?: number;
  accent?: "organizer" | "attendee";
  /** CSS aspect-ratio string, e.g. "760 / 1212" or "16 / 9" */
  aspectRatio?: string;
  /** Max width tailwind classes for the video frame */
  maxWidthClass?: string;
}

const VideoCaptionTrack = ({
  videoSrc,
  poster,
  eyebrow,
  problemHeadline,
  beats,
  beatDuration = 4500,
  accent = "organizer",
  aspectRatio = "760 / 1212",
  maxWidthClass = "max-w-[360px] sm:max-w-[420px]",
}: VideoCaptionTrackProps) => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number>(Date.now());
  const rafRef = useRef<number>();

  useEffect(() => {
    startRef.current = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(elapsed / beatDuration, 1);
      setProgress(p);
      if (p >= 1) {
        setActive((a) => (a + 1) % beats.length);
        startRef.current = Date.now();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [beats.length, beatDuration]);

  const handleJump = (i: number) => {
    setActive(i);
    setProgress(0);
    startRef.current = Date.now();
  };

  const beat = beats[active];
  const total = String(beats.length).padStart(2, "0");
  const idx = String(active + 1).padStart(2, "0");

  return (
    <div className="w-full">
      {/* Eyebrow + problem headline */}
      <div className="text-center mb-10 max-w-3xl mx-auto px-4">
        <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-4">
          {eyebrow}
        </p>
        <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
          {problemHeadline}
        </h3>
      </div>

      {/* Video — portrait 760x1212 */}
      <div className={`relative mx-auto rounded-2xl overflow-hidden shadow-lg border border-border bg-black w-full ${maxWidthClass}`} style={{ aspectRatio }}>
        <video
          src={videoSrc}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          controls
          preload="metadata"
          className="w-full h-full object-contain bg-black"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
      </div>

      {/* Caption track */}
      <div className="max-w-3xl mx-auto mt-8 px-4">
        {/* Chapter dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {beats.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Jump to beat ${i + 1}`}
              onClick={() => handleJump(i)}
              className="group relative h-2 rounded-full transition-all duration-300"
              style={{ width: i === active ? 28 : 8 }}
            >
              <span
                className={`absolute inset-0 rounded-full transition-colors ${
                  i === active
                    ? "bg-gradient-primary"
                    : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Caption */}
        <div className="relative h-20 sm:h-16 flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight"
            >
              {beat.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="relative h-px w-full bg-border overflow-hidden mt-2">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-primary"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0 }}
          />
        </div>

        {/* Index + label */}
        <div className="flex items-center justify-center gap-3 mt-4 font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
          <span>{idx} / {total}</span>
          <span className="h-px w-6 bg-border" />
          <AnimatePresence mode="wait">
            <motion.span
              key={`label-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={accent === "organizer" ? "text-primary/80" : "text-accent/80"}
            >
              {beat.label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VideoCaptionTrack;
