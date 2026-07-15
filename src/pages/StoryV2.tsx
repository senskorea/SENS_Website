import { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const radarAsset = { url: "/assets/app/radar.png" };
const icebreakerAsset = { url: "/assets/app/icebreaker.png" };
const act1 = { url: "/assets/story-v2/act-1.jpeg" };
const act2 = { url: "/assets/story-v2/act-2.jpeg" };
const act3 = { url: "/assets/story-v2/act-3.jpeg" };
const act4 = { url: "/assets/story-v2/act-4.jpeg" };
const act5 = { url: "/assets/story-v2/act-5.mp4" };
const act6 = { url: "/assets/story-v2/act-6.jpeg" };
const act7 = { url: "/assets/story-v2/act-7.png" };
const act8 = { url: "/assets/story-v2/act-8.png" };

/* ---------------- Beat data ---------------- */

type Beat = {
  eyebrow: string;
  headline: string;
  fact: string;
  bg: string;
  alt: string;
  video?: boolean;
  overlay?: { src: string; alt: string };
  kenBurns: "zoom-in" | "zoom-out" | "pan-left" | "pan-right";
};

const beats: Beat[] = [
  {
    eyebrow: "Act I",
    headline: "200 people. One room. Nobody talking.",
    fact: "The average attendee meets just 3 people at an event",
    kenBurns: "zoom-in",
    bg: act1.url,
    alt: "A woman alone on her phone in a crowded conference hall",
  },
  {
    eyebrow: "Act II",
    headline: "Everyone wants to connect. No one makes the move.",
    fact: "70–80% of professionals attend to network. Only 2–3% leave with a real lead.",
    kenBurns: "pan-right",
    bg: act2.url,
    alt: "A woman hesitating on her phone surrounded by people",
  },
  {
    eyebrow: "Act III",
    headline: "A live radar points you toward the right person in the room.",
    fact: "SENS // Live radar UI directs you to the right person — no awkward search",
    kenBurns: "zoom-out",
    bg: act3.url,
    alt: "A single person highlighted on a green radar in a crowded room",
    overlay: { src: radarAsset.url, alt: "SENS radar view on iPhone" },
  },
  {
    eyebrow: "Act IV",
    headline: "AI identifies your best match — by personality and shared goals.",
    fact: "SENS // Matching engine weighs intent, expertise & chemistry in real time",
    kenBurns: "pan-right",
    bg: act4.url,
    alt: "A coral arc connecting two matched people across the room",
  },
  {
    eyebrow: "Act V",
    headline: "The signal lands. The match is made.",
    fact: "SENS // A coral spark crosses the room — both of you see it at the same moment",
    kenBurns: "zoom-in",
    bg: act5.url,
    alt: "An animated coral connection forming across the room",
    video: true,
  },
  {
    eyebrow: "Act VI",
    headline: "A shared icebreaker. A reason to walk over.",
    fact: "SENS // Every intro starts with a prompt only the two of you share",
    kenBurns: "zoom-out",
    bg: act6.url,
    alt: "Two attendees meeting and shaking hands",
    overlay: { src: icebreakerAsset.url, alt: "SENS icebreaker prompt on iPhone" },
  },
  {
    eyebrow: "Act VII",
    headline: "Every verified meet earns rewards.",
    fact: "SENS // Tokens, perks & event-day prizes for every meaningful meet",
    kenBurns: "zoom-out",
    bg: act7.url,
    alt: "A celebrating attendee surrounded by coins, trophies and stars",
  },
  {
    eyebrow: "Act VIII",
    headline: "Every connection — saved as a CSV. Follow-up, made effortless.",
    fact: "SENS // Export every verified meet as a CSV — clean follow-ups, no lost cards",
    kenBurns: "zoom-out",
    bg: act8.url,
    alt: "An attendee reviewing her exported network",
  },
];

const kenBurnsStyles: Record<string, string> = {
  "zoom-in": "animate-[kenBurnsZoomIn_12s_ease-in-out_infinite_alternate]",
  "zoom-out": "animate-[kenBurnsZoomOut_12s_ease-in-out_infinite_alternate]",
  "pan-left": "animate-[kenBurnsPanLeft_14s_ease-in-out_infinite_alternate]",
  "pan-right": "animate-[kenBurnsPanRight_14s_ease-in-out_infinite_alternate]",
};

/* ---------------- Page ---------------- */

const StoryV2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const beatCount = beats.length;
  const seg = 1 / beatCount;

  const letterboxH = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Helmet>
        <title>How SENS works — SENS</title>
        <meta
          name="description"
          content="A cinematic scroll-through of how SENS turns 200 strangers in a room into a verified network."
        />
        <link rel="canonical" href="https://www.sensai.cc/story" />
        <meta property="og:title" content="How SENS works — SENS" />
        <meta
          property="og:description"
          content="A cinematic scroll-through of how SENS turns 200 strangers in a room into a verified network."
        />
        <meta property="og:url" content="https://www.sensai.cc/story" />
        <meta property="og:type" content="article" />
      </Helmet>

      <Link
        to="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white transition-all text-[11px] font-medium tracking-wide shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </Link>

      <div id="story" ref={containerRef} className="relative h-[800vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
          {/* Letterbox bars */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-20 bg-white"
            style={{ height: useTransform(letterboxH, [0, 1], ["0vh", "7vh"]) }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-20 bg-white"
            style={{ height: useTransform(letterboxH, [0, 1], ["0vh", "7vh"]) }}
          />

          {/* Film grain — very subtle for light theme */}
          <div
            className="absolute inset-0 z-30 pointer-events-none opacity-[0.04] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {beats.map((beat, i) => {
            const start = i * seg;
            const isLast = i === beatCount - 1;
            const isFirst = i === 0;

            const opacityDefault = useTransform(
              scrollYProgress,
              [start, start + 0.05, start + seg - 0.05, start + seg],
              [isFirst ? 1 : 0, 1, 1, 0]
            );
            const opacityLast = useTransform(
              scrollYProgress,
              [start, start + 0.06, 1],
              [0, 1, 1]
            );
            const opacity = isLast ? opacityLast : opacityDefault;

            const textYDefault = useTransform(
              scrollYProgress,
              [start, start + 0.07, start + seg - 0.05, start + seg],
              [isFirst ? 0 : 30, 0, 0, -20]
            );
            const textYLast = useTransform(
              scrollYProgress,
              [start, start + 0.07, 1],
              [30, 0, 0]
            );
            const textY = isLast ? textYLast : textYDefault;

            const factOpacity = useTransform(
              scrollYProgress,
              [start + 0.08, start + seg * 0.5],
              [0, 1]
            );

            const kb = kenBurnsStyles[beat.kenBurns];

            return (
              <motion.div key={i} className="absolute inset-0" style={{ opacity }}>
                {/* Background scene */}
                <div className="relative w-full h-full overflow-hidden">
                  {beat.video ? (
                    <video
                      src={beat.bg}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`w-full h-full object-cover ${kb}`}
                    />
                  ) : (
                    <img
                      src={beat.bg}
                      alt={beat.alt}
                      className={`w-full h-full object-cover ${kb}`}
                    />
                  )}
                  {/* Soft white vignette so text breathes */}
                  <div className="absolute inset-0 shadow-[inset_0_0_140px_40px_rgba(255,255,255,0.55)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent" />
                </div>

                {/* Optional phone overlay (app screenshot) */}
                {beat.overlay && (
                  <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
                    <img
                      src={beat.overlay.src}
                      alt={beat.overlay.alt}
                      className="max-h-[58vh] w-auto drop-shadow-[0_30px_60px_rgba(15,23,42,0.35)]"
                    />
                  </div>
                )}

                {/* HUD fact — top-left */}
                <motion.div
                  className="absolute top-[9vh] left-4 sm:left-8 z-10 max-w-xs sm:max-w-sm"
                  style={{ opacity: factOpacity }}
                >
                  <div className="inline-block bg-white/90 backdrop-blur-md border border-slate-200 rounded-md px-3 py-2 shadow-sm">
                    <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-slate-800 leading-relaxed">
                      {beat.fact}
                    </p>
                  </div>
                </motion.div>

                {/* Narration — bottom-center */}
                <motion.div
                  className="absolute bottom-[9vh] left-0 right-0 z-10 flex justify-center px-4 sm:px-8"
                  style={{ y: textY }}
                >
                  <div className="w-full max-w-2xl">
                    <div className="relative bg-white/95 backdrop-blur-md border border-slate-200 rounded-md px-6 py-4 sm:px-10 sm:py-6 text-center shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
                      <div className="absolute top-0 left-8 right-8 sm:left-12 sm:right-12 h-px bg-gradient-to-r from-transparent via-[hsl(345,100%,63%)] to-transparent opacity-70" />

                      <p className="text-[hsl(345,100%,63%)] font-display font-bold text-[10px] sm:text-xs tracking-[0.35em] uppercase mb-1.5 sm:mb-2">
                        {beat.eyebrow}
                      </p>
                      <p className="font-display text-base sm:text-xl lg:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
                        {beat.headline}
                      </p>

                      {isLast && (
                        <Button
                          size="lg"
                          className="mt-4 text-base px-8 py-6 rounded-full bg-[hsl(345,100%,63%)] text-white hover:opacity-90"
                          onClick={() => window.open("mailto:hello@sens.app", "_blank")}
                        >
                          Book a Demo
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}

                      <div className="absolute bottom-0 left-8 right-8 sm:left-12 sm:right-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Act dots */}
          <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-10">
            {beats.map((_, i) => {
              const ds = i * seg;
              const dotScale = useTransform(
                scrollYProgress,
                [ds, ds + 0.04, ds + seg - 0.04, ds + seg],
                [0.6, 1, 1, 0.6]
              );
              const dotOpacity = useTransform(
                scrollYProgress,
                [ds, ds + 0.04, ds + seg - 0.04, ds + seg],
                [0.25, 1, 1, 0.25]
              );
              return (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[hsl(345,100%,63%)]"
                  style={{ opacity: dotOpacity, scale: dotScale }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryV2;