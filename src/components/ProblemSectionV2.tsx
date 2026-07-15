import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
const beat1 = { url: "/assets/story-v2/act-1.jpeg" };
const beat2 = { url: "/assets/story-v2/act-2.jpeg" };
const beat3 = { url: "/assets/story-v2/act-3.jpeg" };

const panels = [
  { label: "01", caption: "200 people. One room. Nobody talking.", image: beat1.url, alt: "A crowded event room — everyone isolated" },
  { label: "02", caption: "Everyone wants to connect. No one makes the move.", image: beat2.url, alt: "Standing alone at the event" },
  { label: "03", caption: "The event ends. The right introductions never happened.", image: beat3.url, alt: "Attendees leaving the venue with no new connections" },
];

const stats = [
  { figure: "<30%", body: "of attendees leave with a high-value connection — though 70–80% came primarily to network." },
  { figure: "51%", body: "of attendees say networking quality — not content — decides whether they return next year." },
  { figure: "15%", body: "of organisers rate their networking experience as “very effective.” Down from 46% a year ago." },
];

const ProblemSectionV2 = () => {
  return (
    <section id="problem" className="py-24 sm:py-32 relative border-b border-border">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="container relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-4">
            The Problem
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            The Room Is <span className="text-gradient-primary">Full.</span> Nobody's <span className="text-gradient-primary">Talking.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Networking is the #1 reason people attend — and the part every event quietly fails at.
          </p>
        </div>

        {/* Comic strip — three problem beats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-14">
          {panels.map((panel, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={panel.image}
                  alt={panel.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                <span className="absolute top-3 left-3 font-display font-bold text-[10px] tracking-[0.25em] uppercase text-primary bg-background/85 backdrop-blur-sm px-2 py-1 rounded">
                  {panel.label}
                </span>
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="font-display font-semibold text-sm sm:text-base leading-snug text-foreground">
                  {panel.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Three-stat strip */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-14">
          {stats.map((s, i) => (
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
            Events sell connection. No software has ever owned it.
          </p>
          <div className="pt-2">
            <Link
              to="/story"
              className="inline-flex items-center gap-2 font-display font-semibold text-primary hover:text-primary/80 transition-colors text-sm tracking-wide"
            >
              Step inside the full story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSectionV2;