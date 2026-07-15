import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingDown, Handshake, Clock } from "lucide-react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

const tiles = [
  {
    label: "Fewer drop-offs next year",
    value: 30000,
    sub: "Keep ~25 more attendees coming back — at a $1,200 ticket.",
    icon: TrendingDown,
    metric: "Repeat-attendance lift",
    pct: 5,
    pctLabel: "+5%",
  },
  {
    label: "Sponsors pay more, happily",
    value: 12000,
    sub: "Proof of who met whom lifts sponsor renewals by ~10%.",
    icon: Handshake,
    metric: "Sponsor renewal lift",
    pct: 10,
    pctLabel: "+10%",
  },
  {
    label: "Hours your team gets back",
    value: 2000,
    sub: "40 hours of coordinator time no longer spent stitching intros.",
    icon: Clock,
    metric: "Coordinator hours saved",
    pct: 40,
    pctLabel: "40 hrs",
  },
];

const formatUsd = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;

const Counter = ({ to, active }: { to: number; active: boolean }) => {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const controls = animate(mv, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [active, to, mv]);

  return <span>{formatUsd(display)}</span>;
};

// horizontal bar that fills based on pct (0-100, where 100 = full bar)
const Bar = ({ pct, active, delay = 0 }: { pct: number; active: boolean; delay?: number }) => {
  // normalize: cap at 50 for visual fill ceiling so 40hrs reads as ~80% full
  const fill = Math.min(100, (pct / 50) * 100);
  return (
    <div className="relative h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={active ? { width: `${fill}%` } : { width: 0 }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/70"
      />
    </div>
  );
};

const RoiStripSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="roi" className="py-24 sm:py-32 relative border-b border-border bg-card">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="container relative max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-4">
            The Math
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Lower churn. Happier sponsors. <span className="text-gradient-primary">~$44,000 a year back.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            What one recurring 500-person conference gets back from a connection layer that actually works — at a $1,200 ticket.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-background border border-border rounded-2xl p-8 text-left flex flex-col gap-4 hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <tile.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display font-bold text-sm text-primary">
                  {tile.pctLabel}
                </span>
              </div>
              <p className="text-xs font-display font-bold tracking-[0.2em] uppercase text-primary">
                {tile.label}
              </p>
              <p className="font-display font-extrabold text-4xl sm:text-5xl text-gradient-primary leading-none">
                <Counter to={tile.value} active={inView} />
              </p>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-display font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    {tile.metric}
                  </span>
                </div>
                <Bar pct={tile.pct} active={inView} delay={0.3 + i * 0.12} />
              </div>
              <p className="text-sm text-muted-foreground">{tile.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          {/* Visual total: stacked contribution bar */}
          <div className="max-w-2xl mx-auto bg-background border border-border rounded-2xl p-6 mb-6">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-xs font-display font-bold tracking-[0.2em] uppercase text-muted-foreground">
                Back in your budget
              </span>
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-gradient-primary">
                <Counter to={44000} active={inView} /> <span className="text-sm text-muted-foreground font-semibold">/ yr</span>
              </span>
            </div>
            <div className="relative h-3 rounded-full overflow-hidden bg-muted flex">
              {tiles.map((tile, i) => {
                const pct = (tile.value / 44000) * 100;
                return (
                  <motion.div
                    key={tile.label}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={
                      i === 0
                        ? "h-full bg-primary"
                        : i === 1
                        ? "h-full bg-primary/75"
                        : "h-full bg-primary/50"
                    }
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-3 text-[10px] font-display font-bold tracking-[0.15em] uppercase text-muted-foreground">
              {tiles.map((tile) => (
                <span key={tile.label} className="flex-1 text-center first:text-left last:text-right">
                  {formatUsd(tile.value)}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Link
              to="/whitepaper#roi"
              className="inline-flex items-center gap-2 font-display font-semibold text-primary hover:text-primary/80 transition-colors text-sm tracking-wide"
            >
              See the full math in the whitepaper
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoiStripSection;