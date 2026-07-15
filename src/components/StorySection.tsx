import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

import scene1 from "@/assets/story/scene-1.png";
import scene2 from "@/assets/story/scene-2.png";
import scene4 from "@/assets/story/scene-4.png";
import scene4b from "@/assets/story/scene-4b.png";
import scene5 from "@/assets/story/scene-5.png";
import scene6 from "@/assets/story/scene-6.png";
import scene6b from "@/assets/story/scene-6b.png";
import sceneRadar from "@/assets/story/scene-radar.png";
import sceneCsv from "@/assets/story/scene-csv.png";

interface BeatData {
  eyebrow: string;
  headline: string;
  fact: string;
  image: { src: string; alt: string };
  kenBurns: "zoom-in" | "zoom-out" | "pan-left" | "pan-right";
}

const beats: BeatData[] = [
  {
    eyebrow: "Act I",
    headline: "200 people. One room. Nobody talking.",
    fact: "The average attendee meets just 3 people at an event",
    kenBurns: "zoom-in",
    image: { src: scene1, alt: "A crowded event room — everyone isolated" },
  },
  {
    eyebrow: "Act II",
    headline: "Everyone wants to connect. No one makes the move.",
    fact: "Organisers can fully customise the experience — themes, prompts & matching criteria",
    kenBurns: "pan-right",
    image: { src: scene2, alt: "Standing alone at the event" },
  },
  {
    eyebrow: "Act III",
    headline: "What if the room already knew who you should meet?",
    fact: "SENS // AI matches based on goals, interests & organiser-defined criteria",
    kenBurns: "zoom-out",
    image: { src: scene4, alt: "A signal arc connecting two people" },
  },
  {
    eyebrow: "Act IV",
    headline: "AI algorithmically identifies your best match based on personality metrics & shared business goals.",
    fact: "SENS // Matching engine weighs intent, expertise & chemistry in real time",
    kenBurns: "pan-right",
    image: { src: scene4b, alt: "Glowing data arc connecting two matched attendees across a crowd" },
  },
  {
    eyebrow: "Act V",
    headline: "Our radar view points you toward your best matches in the room.",
    fact: "SENS // Live radar UI directs you to the right person — no awkward search",
    kenBurns: "zoom-out",
    image: { src: sceneRadar, alt: "Phone showing a glowing radar interface with directional arrows in a crowded venue" },
  },
  {
    eyebrow: "Act VI",
    headline: "A shared ice breaker. A reason to walk over. A hello.",
    fact: "SENS // Every intro starts with a prompt only the two of you share",
    kenBurns: "zoom-out",
    image: { src: scene5, alt: "Two people having a genuine conversation" },
  },
  {
    eyebrow: "Act VII",
    headline: "Every connection you make earns tokens & rewards. Connection, gamified.",
    fact: "SENS // Tokens, perks & unlockable experiences for every meaningful meet",
    kenBurns: "zoom-out",
    image: { src: scene6b, alt: "A phone showing a glowing reward token at an event" },
  },
  {
    eyebrow: "Act VIII",
    headline: "Same 200 people. Now a network — downloadable as a CSV.",
    fact: "SENS // Export every verified connection as CSV — your network, your data, forever",
    kenBurns: "zoom-out",
    image: { src: sceneCsv, alt: "Laptop screen showing a CSV of contacts with a glowing download button" },
  },
];

const kenBurnsStyles: Record<string, string> = {
  "zoom-in": "animate-[kenBurnsZoomIn_12s_ease-in-out_infinite_alternate]",
  "zoom-out": "animate-[kenBurnsZoomOut_12s_ease-in-out_infinite_alternate]",
  "pan-left": "animate-[kenBurnsPanLeft_14s_ease-in-out_infinite_alternate]",
  "pan-right": "animate-[kenBurnsPanRight_14s_ease-in-out_infinite_alternate]",
};

const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const startAudio = useCallback(() => {
    if (audioStarted) return;
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/story-soundtrack.m4a");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }
    audioRef.current.play().then(() => setAudioStarted(true)).catch(() => {});
  }, [audioStarted]);

  useEffect(() => {
    const handlePlayStory = () => startAudio();
    window.addEventListener("play-story", handlePlayStory);
    return () => window.removeEventListener("play-story", handlePlayStory);
  }, [startAudio]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && audioRef.current) {
          audioRef.current.pause();
          setAudioStarted(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const beatCount = beats.length;
  const seg = 1 / beatCount;

  const letterboxH = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <div id="story" ref={containerRef} className="relative h-[800vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050508]">
        {/* Letterbox bars */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-20 bg-[#050508]"
          style={{ height: useTransform(letterboxH, [0, 1], ["0vh", "7vh"]) }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20 bg-[#050508]"
          style={{ height: useTransform(letterboxH, [0, 1], ["0vh", "7vh"]) }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 z-30 pointer-events-none opacity-[0.025] mix-blend-overlay"
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
          const opacityLast = useTransform(scrollYProgress, [start, start + 0.06, 1], [0, 1, 1]);
          const opacity = isLast ? opacityLast : opacityDefault;

          const textYDefault = useTransform(
            scrollYProgress,
            [start, start + 0.07, start + seg - 0.05, start + seg],
            [isFirst ? 0 : 30, 0, 0, -20]
          );
          const textYLast = useTransform(scrollYProgress, [start, start + 0.07, 1], [30, 0, 0]);
          const textY = isLast ? textYLast : textYDefault;

          const factOpacity = useTransform(scrollYProgress, [start + 0.08, start + seg * 0.5], [0, 1]);

          const kb = kenBurnsStyles[beat.kenBurns];

          return (
            <motion.div key={i} className="absolute inset-0" style={{ opacity }}>
              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={beat.image.src}
                  alt={beat.image.alt}
                  className={`w-full h-full object-cover ${kb}`}
                />
                <div className="absolute inset-0 shadow-[inset_0_0_120px_30px_rgba(0,0,0,0.6)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/30 to-transparent" />
              </div>

              {/* HUD fact — top-left */}
              <motion.div
                className="absolute top-[9vh] left-4 sm:left-8 z-10 max-w-xs sm:max-w-sm"
                style={{ opacity: factOpacity }}
              >
                <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/50 leading-relaxed">
                  {beat.fact}
                </p>
              </motion.div>

              {/* Narration — bottom-center */}
              <motion.div
                className="absolute bottom-[9vh] left-0 right-0 z-10 flex justify-center px-4 sm:px-8"
                style={{ y: textY }}
              >
                <div className="w-full max-w-2xl">
                  <div className="relative bg-gradient-to-b from-[#0c0c14]/80 to-[#08080f]/95 backdrop-blur-md border border-white/[0.08] rounded-md px-6 py-4 sm:px-10 sm:py-6 text-center">
                    <div className="absolute top-0 left-8 right-8 sm:left-12 sm:right-12 h-px bg-gradient-to-r from-transparent via-[hsl(345,100%,63%)] to-transparent opacity-50" />

                    <p className="text-[hsl(345,100%,63%)]/70 font-display font-bold text-[10px] sm:text-xs tracking-[0.35em] uppercase mb-1.5 sm:mb-2">
                      {beat.eyebrow}
                    </p>
                    <p className="font-display text-base sm:text-xl lg:text-2xl font-bold text-white/95 leading-snug tracking-tight">
                      {beat.headline}
                    </p>

                    {isLast && (
                      <Button
                        variant="hero"
                        size="lg"
                        className="mt-4 text-base px-8 py-6"
                        onClick={() => window.open("mailto:hello@sens.app", "_blank")}
                      >
                        Book a Demo
                      </Button>
                    )}

                    <div className="absolute bottom-0 left-8 right-8 sm:left-12 sm:right-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
            const dotScale = useTransform(scrollYProgress, [ds, ds + 0.04, ds + seg - 0.04, ds + seg], [0.6, 1, 1, 0.6]);
            const dotOpacity = useTransform(scrollYProgress, [ds, ds + 0.04, ds + seg - 0.04, ds + seg], [0.2, 1, 1, 0.2]);
            return (
              <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[hsl(345,100%,63%)]" style={{ opacity: dotOpacity, scale: dotScale }} />
            );
          })}
        </div>

        {/* Audio toggle */}
        {audioStarted && (
          <button
            onClick={toggleMute}
            className="absolute bottom-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all text-[11px] font-medium tracking-wide"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isMuted ? "Unmute" : "Mute"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default StorySection;
