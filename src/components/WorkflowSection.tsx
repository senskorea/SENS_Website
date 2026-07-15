import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
const beat4 = { url: "/assets/story-v2/act-4.jpeg" };
const beat6 = { url: "/assets/story-v2/act-6.jpeg" };
const beat7 = { url: "/assets/story-v2/act-7.png" };
const radarShot = { url: "/assets/app/radar.png" };
const icebreakerShot = { url: "/assets/app/icebreaker.png" };
const rewardsShot = { url: "/assets/app/rewards.png" };

const panels = [
  {
    label: "04",
    verb: "Locate",
    caption: "A live radar points you to the best matches in the room based on mutual business goals.",
    image: beat4.url,
    alt: "Spatial radar surfacing nearby matches",
    appShot: radarShot.url,
    appAlt: "SENS radar screen showing nearby matches",
  },
  {
    label: "05",
    verb: "Meet",
    caption: "SENS generates themed icebreakers to help keep conversation flowing.",
    image: beat6.url,
    alt: "Two attendees meeting with an icebreaker prompt",
    appShot: icebreakerShot.url,
    appAlt: "SENS icebreaker prompt on phone",
  },
  {
    label: "06",
    verb: "Connect",
    caption: "Save connections as .csv resulting in better business outcomes.",
    image: beat7.url,
    alt: "Verified connection — a network forms",
    appShot: rewardsShot.url,
    appAlt: "SENS rewards screen for verified connection",
  },
];

const proof = [
  { figure: "3×", body: "more high-value introductions per attendee, vs. self-serve networking." },
  { figure: "100%", body: "of connections verified — both sides confirm, both sides remember." },
  { figure: "0", body: "swiping, searching, or sign-ups. Scan a code and you're inside." },
];

const WorkflowSection = () => {
  return (
    <section id="workflow" className="py-24 sm:py-32 relative border-b border-border">
      <div className="absolute inset-0 bg-gradient-glow opacity-40" />
      <div className="container relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-4">
            The Solution
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Locate. Meet. <span className="text-gradient-primary">Connect.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Three steps every event promises. SENS is the first software that owns all three — picking up exactly where the problem leaves off.
          </p>
        </div>

        {/* Comic strip — three solution beats, mirroring the problem grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-14">
          {panels.map((panel, i) => (
            <motion.figure
              key={panel.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={panel.image}
                  alt={panel.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 font-display font-bold text-[10px] tracking-[0.25em] uppercase text-primary bg-background/85 backdrop-blur-sm px-2 py-1 rounded">
                  {panel.label} · {panel.verb}
                </span>
                {/* Floating app screenshot (already framed as a phone) */}
                <motion.img
                  src={panel.appShot}
                  alt={panel.appAlt}
                  loading="lazy"
                  initial={{ opacity: 0, y: 30, rotate: -4 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -6 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-6 right-3 sm:right-4 w-[38%] max-w-[150px] h-auto object-contain drop-shadow-2xl group-hover:rotate-0 group-hover:-translate-y-1 transition-transform duration-500"
                />
              </div>
              <figcaption className="bg-card p-5 sm:p-6 pt-7 border-t border-border">
                <p className="font-display font-semibold text-sm sm:text-base leading-snug text-foreground">
                  {panel.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Proof strip */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-14">
          {proof.map((s, i) => (
            <motion.div
              key={s.figure}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-sm"
            >
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-gradient-primary leading-none mb-3">
                {s.figure}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
          <p className="text-foreground font-semibold text-lg sm:text-xl">
            One layer. Three steps. Every connection verified.
          </p>
          <div className="pt-2">
            <Link
              to="/story"
              className="inline-flex items-center gap-2 font-display font-semibold text-primary hover:text-primary/80 transition-colors text-sm tracking-wide"
            >
              See the full journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;