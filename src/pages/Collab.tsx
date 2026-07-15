import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Download,
  Target,
  Users,
  Wallet,
  Check,
  Radar,
  Gamepad2,
  Database,
  MessageCircle,
  TrendingUp,
  Trophy,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
const deckAsset = { url: "/assets/sens-pitch-deck.pdf" };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.section
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    variants={fadeUp}
    className={`max-w-3xl mx-auto px-4 py-16 ${className}`}
  >
    {children}
  </motion.section>
);

const SectionTitle = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-3">
      {eyebrow}
    </p>
    <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
      {children}
    </h2>
  </div>
);

const CollapsibleSection = ({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className={`max-w-3xl mx-auto px-4 py-6 ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full text-left flex items-center justify-between gap-4 group border border-border rounded-xl px-5 py-4 bg-card/40 hover:bg-card/70 transition-colors"
      >
        <div className="min-w-0">
          <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-1">
            {eyebrow}
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-foreground truncate">
            {title}
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">
          <span className="hidden sm:inline">{open ? "Show less" : "Learn more"}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="pt-8">{children}</div>
      </motion.div>
    </motion.section>
  );
};

const Collab = () => {
  const investorMailto =
    "mailto:info@sensai.cc?subject=SENS%20Investor%20Inquiry&body=Hi%20SENS%20team%2C%0A%0AI%27d%20like%20to%20learn%20more%20about%20the%20pre-seed%20round.";
  const mailto = investorMailto;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Invest in SENS — $250K Pre-Seed</title>
        <meta
          name="description"
          content="SENS is raising a $250K pre-seed to scale AI-driven IRL networking for professional events across APAC."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.sensai.cc/collab" />
      </Helmet>

      {/* Top bar */}
      <header className="border-b border-border/60">
        <div className="container max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="font-logo text-lg font-extrabold tracking-[0.15em] uppercase text-gradient-primary"
          >
            SENS
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-60" />
        <div className="relative max-w-3xl mx-auto px-4 pt-16 pb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-6"
          >
            Pre-Seed · $250K Open · TIPS-Eligible
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            AI-driven <span className="text-gradient-primary">IRL networking</span> for professional events.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A proprietary Spatial AI Engine that helps people connect with the right people, at the right time, in the right context — turning interactions into lasting opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="hero" size="lg" className="text-base px-8 py-6">
              <a href={deckAsset.url} download="sens-pitch-deck.pdf">
                <Download className="w-4 h-4" /> Download the deck
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="lg" className="text-base px-8 py-6">
              <Link to="/whitepaper">Read the whitepaper</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <CollapsibleSection eyebrow="02 · Team" title="The team behind SENS.">
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            {
              name: "Carlos Robles",
              role: "Chief Executive Officer",
              bio: "Former McKinsey consultant and startup ecosystem builder. Founder, Origins Network.",
            },
            {
              name: "Paul Conversy",
              role: "Chief Product Officer",
              bio: "Former strategist at Disney, Dentsu, and MADSTARS. Founder, InsightMatches.",
            },
          ].map((p) => (
            <div key={p.name} className="border border-border rounded-xl p-6 bg-card/40">
              <h3 className="font-display text-lg font-bold text-foreground">{p.name}</h3>
              <p className="text-primary text-xs font-bold tracking-[0.15em] uppercase mt-1 mb-3">{p.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.bio}</p>
            </div>
          ))}
        </div>
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">Advisors</p>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {[
            ["Ariel Wagner", "Gamification & Growth"],
            ["Khaled Shaaban", "Product & UX Design"],
            ["Paul Edwards MBE", "Strategic Partnerships"],
            ["Sangsoo Chong", "Creative & PR Strategy"],
          ].map(([n, r]) => (
            <li key={n} className="flex justify-between border-b border-border/40 py-2">
              <span className="text-foreground font-medium">{n}</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Problem */}
      <CollapsibleSection eyebrow="03 · The Problem" title="The networking disconnect.">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "Don't know WHO to approach",
              stats: [
                ["> 70%", "of professionals attend events primarily to network"],
                ["< 3%", "conversion rate from connection to business lead"],
              ] as [string, string][],
            },
            {
              title: "Don't know HOW to approach",
              stats: [
                ["60%", "of attendees report some networking anxiety"],
                ["88%", "of business cards discarded within a week"],
              ] as [string, string][],
            },
          ].map((c) => (
            <div key={c.title} className="border border-border rounded-xl p-6 bg-card/40">
              <h3 className="font-display text-base font-bold mb-4 text-foreground">{c.title}</h3>
              <div className="space-y-3">
                {c.stats.map(([n, l]) => (
                  <div key={l}>
                    <p className="font-display text-2xl font-extrabold text-gradient-primary">{n}</p>
                    <p className="text-sm text-muted-foreground leading-snug">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Solution */}
      <CollapsibleSection eyebrow="04 · The Solution" title="A Spatial AI Engine that surfaces the right people.">
        <p className="text-muted-foreground mb-6 leading-relaxed">
          We match attendees on shared business goals, then keep conversations flowing with themed AI ice-breakers — turning crowded rooms into curated introductions.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Target, title: "Smart Matching", body: "8+ meaningful connections per attendee — 3× the industry average." },
            { icon: Gamepad2, title: "Ice Breakers & Rewards", body: "Themed AI prompts and tokens redeemable for prizes keep momentum high." },
            { icon: Radar, title: "Radar View", body: "Spatial AI mapping via indoor GPS or social clusters to find your matches in the room." },
            { icon: Database, title: "Data & Analytics", body: "Exportable connections improve follow-up; behavioral data powers organizer dashboards." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="border border-border rounded-xl p-6 bg-card/40">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-bold mb-2 text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Flywheel */}
      <CollapsibleSection eyebrow="05 · Why It Compounds" title="The mutual incentive flywheel.">
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Real-time spatial matching and gamified connections remove networking friction, raise attendee satisfaction, and generate a proprietary behavioral data loop no competitor can replicate.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Users, title: "The Attendee Pull", body: "Drives SENS usage at every event and continuously trains our Spatial AI matching engine." },
            { icon: TrendingUp, title: "The Organizer Payoff", body: "Captures live, physical behavioral data — engagement metrics organizers have never had access to." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="border border-border rounded-xl p-6 bg-card/40">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-bold mb-2 text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Market */}
      <CollapsibleSection eyebrow="06 · Market Size" title="Events are shifting toward networking.">
        <div className="space-y-3 mb-8">
          {[
            { tag: "TAM", value: "$1.05B", sub: "300,000 mid-sized professional events (100–5,000 attendees) — global MICE software spend." },
            { tag: "SAM", value: "$29.4M", sub: "8,400 premium mid-sized events at venues across KR, JP, SG, HK." },
            { tag: "SOM", value: "$1.76M", sub: "504 events — 3-year capture at 20% penetration of premier South Korean venue ecosystems." },
          ].map((m) => (
            <div key={m.tag} className="border border-border rounded-xl p-5 bg-card/40 flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase w-12 flex-shrink-0">{m.tag}</span>
              <span className="font-display text-2xl font-extrabold text-foreground w-28 flex-shrink-0">{m.value}</span>
              <span className="text-sm text-muted-foreground leading-snug flex-1 min-w-[200px]">{m.sub}</span>
            </div>
          ))}
        </div>
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">Why now</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "88% of marketers plan to increase investment in event technology.",
            "35% of organizers are prioritizing matchmaking activities.",
            "50% of meeting professionals are already integrating AI across the meetings journey.",
            "Budgets are shifting from entertainment-based networking to curated matching experiences.",
          ].map((l) => (
            <li key={l} className="flex gap-3"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span>{l}</span></li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Competition */}
      <CollapsibleSection eyebrow="07 · Competition" title="Active Intelligence × IRL Spatial Context.">
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Competitors map across two axes: Passive ↔ Active Intelligence, and Virtual ↔ IRL Spatial context. SENS sits alone in the top-right quadrant.
        </p>
        <div className="relative max-w-md mx-auto aspect-square">
          {/* Axis labels (outside the chart) */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground whitespace-nowrap">
            Active Intelligence ↑
          </span>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground whitespace-nowrap">
            ↓ Passive
          </span>
          <span className="absolute top-1/2 -left-2 -translate-x-full -translate-y-1/2 text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground whitespace-nowrap">
            ← Virtual
          </span>
          <span className="absolute top-1/2 -right-2 translate-x-full -translate-y-1/2 text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground whitespace-nowrap">
            IRL →
          </span>

          {/* Chart box */}
          <div className="absolute inset-x-10 inset-y-6 border border-border rounded-xl bg-card/40 overflow-hidden">
            {/* Crosshair */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-border/50" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border/50" />

            {/* Competitor dots */}
            {[
              { name: "Whova", left: "18%", top: "62%" },
              { name: "Cvent", left: "30%", top: "78%" },
              { name: "Brella", left: "62%", top: "38%" },
              { name: "Grip", left: "70%", top: "55%" },
            ].map((c) => (
              <div key={c.name} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1" style={{ left: c.left, top: c.top }}>
                <span className="w-2 h-2 rounded-full bg-muted-foreground/70" />
                <span className="text-[11px] text-muted-foreground whitespace-nowrap">{c.name}</span>
              </div>
            ))}

            {/* SENS marker */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1" style={{ left: "78%", top: "18%" }}>
              <span className="w-3 h-3 rounded-full bg-gradient-primary ring-4 ring-primary/20" />
              <span className="font-display text-xs font-extrabold text-gradient-primary px-2 py-0.5 rounded bg-primary/10 whitespace-nowrap">SENS</span>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Traction */}
      <CollapsibleSection eyebrow="08 · Traction" title="Built with real users. Validated at real events.">
        <p className="text-muted-foreground italic mb-6 leading-relaxed">
          "We launched early, listened closely, and iterated fast. The response has been incredible."
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            ["9.5/10", "Average satisfaction"],
            ["100%", "Would attend again"],
            ["8+", "Connections / guest"],
            ["+300%", "Traffic at venue"],
          ].map(([n, l]) => (
            <div key={l} className="border border-border rounded-xl p-5 bg-card/40 text-center">
              <p className="font-display text-2xl font-extrabold text-gradient-primary">{n}</p>
              <p className="text-xs text-muted-foreground leading-snug mt-1">{l}</p>
            </div>
          ))}
        </div>
        <div className="border border-border rounded-xl p-6 bg-card/40 flex gap-4">
          <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "The MBTI inclusion and the points feature really encouraged us to connect with new people — it felt natural, not forced."
            </p>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-foreground mt-3">Ade Balogun · Pilot attendee</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Roadmap */}
      <CollapsibleSection eyebrow="09 · Roadmap" title="Validate. Commercialise. Unlock funding.">
        <div className="space-y-4">
          {[
            {
              phase: "Phase 1 · Months 1-4",
              title: "Pilot validation",
              focus: "Fine-tune the Spatial AI Engine and build security & privacy guard-rails.",
              milestone: "3-5 structured B2B proof-of-concept events at BEXCO and COEX.",
              target: "$0 ARR",
            },
            {
              phase: "Phase 2 · Months 5-9",
              title: "Commercial launch & TIPS application",
              focus: "Tiered SaaS licensing to premier Korean venues.",
              milestone: "$250K pre-seed unlocks the TIPS R&D grant. 10-15 paid commercial conferences.",
              target: "$35K ARR",
            },
            {
              phase: "Phase 3 · Months 10-14",
              title: "APAC expansion",
              focus: 'Automated onboarding & the multi-event "Contact Passport."',
              milestone: "25+ recurring accounts; Tokyo, Singapore and Hong Kong pilots.",
              target: "$100K ARR · Seed trigger",
            },
          ].map((p) => (
            <div key={p.phase} className="border border-border rounded-xl p-6 bg-card/40">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase">{p.phase}</p>
                <p className="font-display text-sm font-extrabold text-foreground">{p.target}</p>
              </div>
              <h3 className="font-display text-lg font-bold mb-2 text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-1"><span className="text-foreground font-semibold">Focus —</span> {p.focus}</p>
              <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-foreground font-semibold">Milestone —</span> {p.milestone}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* The Ask */}
      <CollapsibleSection eyebrow="10 · The Ask" title="Funding our path to scale.">
        <div className="space-y-4">
          <div className="border border-primary/40 rounded-2xl p-8 bg-card/60 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-glow opacity-20" />
            <div className="relative">
              <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-3">Initial Ask · Pre-Seed · Now</p>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display text-3xl font-extrabold text-foreground">$250,000 USD</p>
                  <p className="text-sm text-muted-foreground">14-month runway · TIPS R&D match trigger</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A focused pre-seed round that instantly unlocks our non-dilutive government TIPS funding match. Validates our $3,500 ACV model and launches our initial APAC pilots.
              </p>
            </div>
          </div>
          <div className="border border-border rounded-2xl p-8 bg-card/40">
            <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-3">Institutional Trigger · Seed · Month 14</p>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-foreground">$1,000,000 USD</p>
                <p className="text-sm text-muted-foreground">Triggered at $150K ARR · 25+ recurring accounts</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Scales the multi-event "Contact Passport" across secondary APAC tech hubs — Tokyo, Singapore and beyond.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Contact */}
      <Section className="pb-32">
        <div className="relative overflow-hidden rounded-2xl border border-border p-10 text-center bg-card">
          <div className="absolute inset-0 bg-gradient-glow opacity-30" />
          <div className="relative">
            <SectionTitle eyebrow="11 · Contact">Let's talk.</SectionTitle>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              <a href={mailto} className="text-foreground font-medium hover:text-primary transition-colors">info@sensai.cc</a>
              <span className="mx-2 text-muted-foreground/50">·</span>
              <a href="https://www.sensai.cc" className="text-foreground font-medium hover:text-primary transition-colors">www.sensai.cc</a>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="hero" size="lg" className="text-base px-8 py-6">
                <a href={deckAsset.url} download="sens-pitch-deck.pdf">
                  <Download className="w-4 h-4" /> Download the deck
                </a>
              </Button>
              <Button asChild variant="heroOutline" size="lg" className="text-base px-8 py-6">
                <a href={mailto}>
                  <Mail className="w-4 h-4" /> Email the founder
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8">
        <div className="container max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© SENS</span>
          <span>This page is shared by invitation. Not a solicitation of securities.</span>
        </div>
      </footer>
    </div>
  );
};

export default Collab;