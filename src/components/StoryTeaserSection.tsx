import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
const act1 = { url: "/assets/story-v2/act-1.jpeg" };
const act3 = { url: "/assets/story-v2/act-3.jpeg" };
const act5 = { url: "/assets/story-v2/act-5.mp4" };
const act6 = { url: "/assets/story-v2/act-6.jpeg" };
const radarAsset = { url: "/assets/app/radar.png" };
const icebreakerAsset = { url: "/assets/app/icebreaker.png" };

type Beat = {
  eyebrow: string;
  headline: string;
  bg: string;
  alt: string;
  video?: boolean;
  overlay?: { src: string; alt: string };
};

const beats: Beat[] = [
  {
    eyebrow: "Act I",
    headline: "200 people. One room. Nobody talking.",
    bg: act1.url,
    alt: "A woman alone on her phone in a crowded conference hall",
  },
  {
    eyebrow: "Act III",
    headline: "A live radar points you toward the right person.",
    bg: act3.url,
    alt: "A single person highlighted on a green radar",
    overlay: { src: radarAsset.url, alt: "SENS radar view" },
  },
  {
    eyebrow: "Act V",
    headline: "The signal lands. The match is made.",
    bg: act5.url,
    alt: "A coral connection forming across the room",
    video: true,
  },
  {
    eyebrow: "Act VI",
    headline: "A shared icebreaker. A reason to walk over.",
    bg: act6.url,
    alt: "Two attendees meeting and shaking hands",
    overlay: { src: icebreakerAsset.url, alt: "SENS icebreaker prompt" },
  },
];

const StoryTeaserSection = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % beats.length), 2400);
    return () => clearInterval(id);
  }, [paused]);

  const beat = beats[index];

  return (
    <section
      id="story-teaser"
      className="relative bg-white"
      aria-label="Story preview"
    >
      <div className="container max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-3">
            Interactive · 2 minutes
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Step inside a SENS event.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            A scroll-driven walk-through of how SENS turns 200 strangers in a room into a verified network.
          </p>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden border border-border shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] aspect-[16/10] sm:aspect-[16/9] bg-white cursor-pointer group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onClick={() => navigate("/story")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate("/story")}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              {beat.video ? (
                <video
                  src={beat.bg}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover animate-[kenBurnsZoomIn_12s_ease-in-out_infinite_alternate]"
                />
              ) : (
                <img
                  src={beat.bg}
                  alt={beat.alt}
                  className="w-full h-full object-cover animate-[kenBurnsZoomIn_12s_ease-in-out_infinite_alternate]"
                />
              )}
              <div className="absolute inset-0 shadow-[inset_0_0_140px_40px_rgba(255,255,255,0.55)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />

              {beat.overlay && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    src={beat.overlay.src}
                    alt={beat.overlay.alt}
                    className="max-h-[55%] w-auto drop-shadow-[0_20px_40px_rgba(15,23,42,0.35)]"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Caption card */}
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center px-4 pointer-events-none">
            <div className="w-full max-w-xl bg-white/95 backdrop-blur-md border border-slate-200 rounded-md px-6 py-4 text-center shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
              <p className="text-primary font-display font-bold text-[10px] sm:text-xs tracking-[0.35em] uppercase mb-1.5">
                {beat.eyebrow}
              </p>
              <p className="font-display text-sm sm:text-lg font-bold text-foreground leading-snug">
                {beat.headline}
              </p>
            </div>
          </div>

          {/* Play affordance */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 text-primary fill-primary" />
          </div>

          {/* Progress dots */}
          <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col gap-2 z-10">
            {beats.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Show beat ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === index ? "bg-primary scale-150" : "bg-slate-400/70 hover:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="hero"
            size="lg"
            className="text-base px-8 py-6"
            onClick={() => navigate("/story")}
          >
            Step inside the story <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <p className="text-sm text-muted-foreground">8 acts · scroll-driven · no sign-up</p>
        </div>
      </div>
    </section>
  );
};

export default StoryTeaserSection;