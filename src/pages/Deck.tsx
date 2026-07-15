import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Copy,
  LayoutGrid,
  Radar,
  Network,
  QrCode,
  Hand,
  MousePointerClick,
  HelpCircle,
  Sparkles,
  Image as ImageIcon,
  Rocket,
  Wrench,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
const deckAsset = { url: "/assets/sens-pitch-deck.pdf" };

// qbstyles-rendered charts (light theme, brand-recoloured)
import DeckConfigPicker from "@/components/deck/DeckConfigPicker";

// ---------- Small inline helpers ----------
const ScreenshotSlot = ({ label, aspect = "aspect-[9/16]" }: { label: string; aspect?: string }) => (
  <div className={`relative w-full ${aspect} rounded-xl border border-dashed border-border bg-card/30 flex flex-col items-center justify-center text-muted-foreground/70 print:break-inside-avoid`}>
    <ImageIcon className="w-6 h-6 mb-2 opacity-50" />
    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-center px-3">{label}</span>
  </div>
);

const ResearchPrompt = ({ prompt }: { prompt: string }) => {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success("Prompt copied");
    } catch {
      toast.error("Copy failed");
    }
  };
  return (
    <div className="relative rounded-2xl border border-border bg-card/40 p-6 sm:p-8 print:break-inside-avoid">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Research prompt · paste into your AI</div>
        <Button onClick={copy} size="sm" variant="outline" className="print:hidden">
          <Copy className="w-3.5 h-3.5 mr-2" /> Copy
        </Button>
      </div>
      <p className="text-base sm:text-lg leading-relaxed text-foreground/80 whitespace-pre-line font-mono">
        {prompt}
      </p>
    </div>
  );
};

// ---------- Reusable Slide shell ----------
type SlideProps = {
  number: number;
  total?: number;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
};

export const Slide = ({ number, total = 12, eyebrow, title, children, className = "" }: SlideProps) => (
  <section
    className={`relative min-h-screen snap-start flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-20 overflow-hidden print:min-h-0 print:break-after-page ${className}`}
  >
    {/* decorative gradient orb */}
    <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-primary opacity-[0.06] blur-3xl print:hidden" />
    <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent opacity-[0.05] blur-3xl print:hidden" />
    {/* oversized slide number watermark */}
    <div className="pointer-events-none absolute -bottom-10 right-6 sm:right-16 font-display font-extrabold text-[18rem] leading-none text-foreground/[0.03] select-none print:hidden">
      {String(number).padStart(2, "0")}
    </div>
    <div className="absolute top-6 right-6 sm:top-10 sm:right-10 text-xs font-mono tracking-widest text-muted-foreground/60">
      {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
    <div className="absolute top-6 left-6 sm:top-10 sm:left-10 font-logo text-sm font-extrabold tracking-[0.2em] uppercase text-gradient-primary">
      SENS
    </div>
    <div className="relative max-w-4xl mx-auto w-full">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-primary mb-6"
        >
          <span className="inline-block w-8 h-px bg-gradient-primary" />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-10"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-xl sm:text-2xl leading-relaxed text-foreground/80 space-y-6"
      >
        {children}
      </motion.div>
    </div>
  </section>
);

// ---------- Page ----------
const Deck = () => {
  const confirmDownload = () => {
    toast.success("PDF deck download started");
  };

  return (
    <>
      <Helmet>
        <title>SENS — Pitch Deck</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://www.sensai.cc/deck" />
        <style>{`@media print { @page { size: landscape; margin: 0; } body { background: white; } }`}</style>
      </Helmet>

      <main className="snap-y snap-mandatory h-screen overflow-y-auto bg-background text-foreground print:h-auto print:overflow-visible">
        {/* Floating download button */}
        <div
          data-deck-controls
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 print:hidden"
        >
          <Button
            asChild
            size="sm"
            variant="outline"
            className="shadow-lg backdrop-blur bg-card/80"
          >
            <a href={deckAsset.url} download="sens-pitch-deck.pdf" onClick={confirmDownload}>
              <Download className="w-3.5 h-3.5 mr-2" /> Download PDF
            </a>
          </Button>
        </div>

        {/* 01 — Title */}
        <Slide
          number={1}
          eyebrow="Investor Deck · 2026"
          title={
            <>
              AI-driven IRL networking for{" "}
              <span className="text-gradient-primary">professional events.</span>
            </>
          }
        >
          <p>We help people connect with the right people, at the right time, in the right context.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {[
              { t: "Understands", d: "AI understands who you are and who you need." },
              { t: "Matches", d: "Surfaces matches at the perfect moment in the event." },
              { t: "Compounds", d: "Turns interactions into lasting opportunities." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-card/40 p-5">
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-2">{c.t}</div>
                <p className="text-sm text-foreground/80 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="pt-6 text-base text-muted-foreground">
            <p>Founder · info@sensai.cc · sensai.cc · Seoul, South Korea</p>
          </div>
        </Slide>

        {/* 02 — Problem */}
        <Slide
          number={2}
          eyebrow="The problem"
          title={<>The networking <span className="text-gradient-primary">disconnect.</span></>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 print:break-inside-avoid">
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3">Do not know WHO to approach</div>
              <div className="space-y-4">
                <div>
                  <div className="font-display font-extrabold text-3xl text-gradient-primary">70–80%</div>
                  <p className="text-sm text-foreground/80">of professionals attend events primarily to network.</p>
                </div>
                <div>
                  <div className="font-display font-extrabold text-3xl text-gradient-primary">2–3%</div>
                  <p className="text-sm text-foreground/80">attendee-to-lead conversion rate.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3">Do not know HOW to approach</div>
              <div className="space-y-4">
                <div>
                  <div className="font-display font-extrabold text-3xl text-gradient-primary">60%</div>
                  <p className="text-sm text-foreground/80">of attendees report some level of networking anxiety.</p>
                </div>
                <div>
                  <div className="font-display font-extrabold text-3xl text-gradient-primary">88%</div>
                  <p className="text-sm text-foreground/80">of business cards are discarded within a week.</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* 03 — Solution */}
        <Slide
          number={3}
          eyebrow="The solution"
          title={<>A real-time connection layer for <span className="text-gradient-primary">live events.</span></>}
        >
          <ul className="space-y-4 list-none">
            <li>— <strong>Zero-install entry.</strong> One QR poster. Runs instantly in any mobile browser — no app store, no onboarding drag.</li>
            <li>— <strong>Three-view discovery.</strong> A ranked Grid, a Spatial Radar (zone anchors, not fake indoor GPS), and a Relational Radar showing the live connection graph.</li>
            <li>— <strong>Verified physical handshakes.</strong> Four organiser-configurable modes: QR Scan, Sync Tap, Tap-to-Confirm, Quiz Verify.</li>
            <li>— <strong>Ask SENS AI concierge.</strong> On-demand assistant + curated icebreaker pool so a hesitant attendee always has something to say.</li>
          </ul>
          <p className="pt-2 text-base text-muted-foreground italic">
            "SENS replaces passive, screen-heavy event networking with deterministic, real-world matching that ends in a verified handshake."
          </p>
        </Slide>

        {/* 04 — Product · Discovery */}
        <Slide
          number={4}
          eyebrow="Product · Discovery"
          title={<>Three ways to see <span className="text-gradient-primary">who's in the room.</span></>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 print:break-inside-avoid">
            {[
              { icon: LayoutGrid, t: "Grid", d: "Ranked photo cards of attendees sorted by mutual compatibility — professional focus, goals, interests." },
              { icon: Radar, t: "Spatial Radar", d: "Honest indoor positioning via printable zone-anchor QR posters. Check-ins decay ~1%/min so stale pins fade." },
              { icon: Network, t: "Relational Radar", d: "Live graph of who connected with whom — no location data needed. Maps the room's social fabric in real time." },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.t} className="rounded-2xl border border-border bg-card/40 p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="font-display font-bold text-base">{v.t}</div>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{v.d}</p>
                  <ScreenshotSlot label={`${v.t} screenshot`} />
                </div>
              );
            })}
          </div>
          <p className="pt-2 text-center text-sm text-muted-foreground">
            Organisers pick which views to expose per event. Both Radar modes are opt-in.
          </p>
        </Slide>

        {/* 05 — Product · Verify & Connect */}
        <Slide
          number={5}
          eyebrow="Product · Verify & Connect"
          title={<>A connection only counts when <span className="text-gradient-primary">two people shake hands.</span></>}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 print:break-inside-avoid">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: QrCode, t: "QR Scan", d: "Strongest signal. Both parties present & mutually consent." },
                { icon: Hand, t: "Sync Tap", d: "Both tap within a 1s window. Lighter friction, still mutual." },
                { icon: MousePointerClick, t: "Tap-to-Confirm", d: "Single tap. Lowest friction — casual mixers." },
                { icon: HelpCircle, t: "Quiz Verify", d: "Organiser-defined identity quiz. High-trust contexts." },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.t} className="rounded-xl border border-border bg-card/40 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-primary" />
                      <div className="font-display font-bold text-sm">{m.t}</div>
                    </div>
                    <p className="text-xs text-foreground/70 leading-relaxed">{m.d}</p>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl border border-border bg-card/40 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="font-display font-bold text-base">Ask SENS</div>
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Conversational concierge. <em>"Who here has supply-chain experience in LATAM?"</em> — surfaces matches and offers a ready icebreaker.
              </p>
              <ScreenshotSlot label="Ask SENS screenshot" aspect="aspect-[4/5]" />
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Every verified handshake exports to CSV / CRM and lands in the organiser's anonymised graph.
          </p>
        </Slide>

        {/* 06 — Product · Configurable */}
        <Slide
          number={6}
          eyebrow="Product · Configurable"
          title={<>One engine. <span className="text-gradient-primary">Configured per event.</span></>}
        >
          <DeckConfigPicker />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:break-inside-avoid">
            {["Organiser panel · brand", "Matching strategy", "Icebreaker library", "Attendee preview"].map((c) => (
              <ScreenshotSlot key={c} label={c} aspect="aspect-[4/3]" />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Same codebase. Brand, audience, matching logic, and verification mode — configured, not rebuilt.
          </p>
        </Slide>

        {/* 07 — Market (research-prompt placeholder) */}
        <Slide
          number={7}
          eyebrow="Market"
          title={<>Market size &amp; <span className="text-gradient-primary">timing.</span></>}
        >
          <p className="text-base text-muted-foreground">
            Bottom-up sizing on ~540,000 qualifying business events per year (100–5,000 attendees)
            at a $3,500 ACV benchmark for mid-market event software. Category CAGR · 19–22%.
          </p>

          {/* TAM → SAM → SOM funnel */}
          <div className="space-y-3 print:break-inside-avoid">
            {[
              {
                tag: "TAM",
                amount: "$1.89B",
                label: "Global B2B & academic event software",
                detail: "~540,000 qualifying events worldwide × $3,500 ACV",
                width: "w-full",
              },
              {
                tag: "SAM",
                amount: "$1.41B",
                label: "APAC + Europe + North America",
                detail: "~405,000 qualifying events across SENS priority regions",
                width: "w-[88%]",
              },
              {
                tag: "SOM",
                amount: "$28.3M",
                label: "SENS 3-year target",
                detail: "~2% of SAM, weighted to Korea & APAC capture",
                width: "w-[55%]",
              },
            ].map((row) => (
              <div
                key={row.tag}
                className={`${row.width} mx-auto rounded-2xl border border-border bg-card/50 px-5 py-4 flex items-center gap-5`}
              >
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary w-12 shrink-0">
                  {row.tag}
                </div>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-gradient-primary w-32 shrink-0">
                  {row.amount}
                </div>
                <div className="text-sm sm:text-base text-foreground/85 leading-snug">
                  <div className="font-semibold">{row.label}</div>
                  <div className="text-muted-foreground text-[13px]">{row.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Korea breakout */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.06] to-transparent p-6 print:break-inside-avoid">
            <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-1">
                  Launch market · South Korea
                </div>
                <div className="text-xl font-display font-bold">
                  Dense, tech-forward, centralised MICE ecosystem.
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-display font-extrabold text-gradient-primary">$24.5M</div>
                <div className="text-[11px] text-muted-foreground">SENS SAM · KRW 32.8B</div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 text-sm">
              <div className="rounded-xl bg-background/60 border border-border p-3">
                <div className="text-xs text-muted-foreground">MICE industry size</div>
                <div className="font-semibold">₩5.8T <span className="text-muted-foreground font-normal">(~$4.35B)</span></div>
              </div>
              <div className="rounded-xl bg-background/60 border border-border p-3">
                <div className="text-xs text-muted-foreground">Qualifying events / yr</div>
                <div className="font-semibold">~7,000</div>
              </div>
              <div className="rounded-xl bg-background/60 border border-border p-3 col-span-2 sm:col-span-1">
                <div className="text-xs text-muted-foreground">Sources</div>
                <div className="font-semibold text-[13px]">KTO · Korea MICE Bureau · Seoul Conv. Bureau</div>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Top 5 Korean organisers & venues
              </div>
              <div className="flex flex-wrap gap-2 text-[13px]">
                {[
                  "COEX",
                  "BEXCO",
                  "KINTEX",
                  "Informa Markets Korea",
                  "Ezpmp 이즈피엠피",
                ].map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 rounded-full bg-background/70 border border-border font-medium"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SAM by region */}
          <div className="rounded-2xl border border-border bg-card/40 overflow-hidden print:break-inside-avoid">
            <div className="px-5 py-3 border-b border-border flex items-baseline justify-between">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                SAM by region · Korea-first, APAC-next
              </div>
              <div className="text-xs text-muted-foreground">Total SAM · $1.417B · ~405k events</div>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-card/60 text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-semibold">Region</th>
                  <th className="px-4 py-2 font-semibold">Events / yr</th>
                  <th className="px-4 py-2 font-semibold">Regional SAM</th>
                  <th className="px-4 py-2 font-semibold">Strategic context</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["South Korea", "7,000", "$24.5M", "Launch market — hyper-dense, localised networking needs.", true],
                  ["Rest of APAC", "108,000", "$378.0M", "Singapore, Japan, Australia — fast-growing tech & investor hubs.", false],
                  ["Europe", "130,000", "$455.0M", "High volume of academic symposia and fragmented regional summits.", false],
                  ["North America", "160,000", "$560.0M", "High-ACV mature market, dense competitive landscape.", false],
                ].map(([region, events, sam, ctx, hl]) => (
                  <tr key={region as string} className={`border-t border-border ${hl ? "bg-primary/[0.04]" : ""}`}>
                    <td className={`px-4 py-3 font-semibold ${hl ? "text-primary" : ""}`}>{region}</td>
                    <td className="px-4 py-3 font-mono">{events}</td>
                    <td className="px-4 py-3 font-mono font-semibold">{sam}</td>
                    <td className="px-4 py-3 text-foreground/75 text-[13px]">{ctx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SAM by event type */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 print:break-inside-avoid">
            {[
              ["Conferences & Summits", "45%", "$637.5M", "Multi-track commercial events; networking-led ROI."],
              ["B2B / Investor Matchmaking", "25%", "$354.3M", "Speed networking, pre-scheduled 1:1s — precision matching."],
              ["Academic Symposia", "15%", "$212.6M", "Research collaboration, peer-finding, university × industry."],
              ["Corporate Retreats", "15%", "$212.6M", "Enterprise internal events, cross-departmental connection."],
            ].map(([name, share, value, note]) => (
              <div key={name} className="rounded-xl border border-border bg-card/40 p-4">
                <div className="flex items-baseline justify-between mb-1">
                  <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{share}</div>
                  <div className="text-sm font-mono font-semibold text-primary">{value}</div>
                </div>
                <div className="font-semibold text-sm mb-1">{name}</div>
                <div className="text-[12px] text-muted-foreground leading-snug">{note}</div>
              </div>
            ))}
          </div>

          {/* Competitive benchmarks */}
          <div className="print:break-inside-avoid">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3">
              Competitive benchmarks · mid-to-enterprise networking
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  name: "Whova",
                  rev: "$25–45M",
                  acv: "$1.5k–4.5k",
                  scope: "30,000+ events",
                  note: "Dominant in lower-mid academic & community conferences; product-led, self-serve.",
                },
                {
                  name: "Swapcard",
                  rev: "$30–50M",
                  acv: "$8k–25k+",
                  scope: "1,500+ enterprises",
                  note: "AI matchmaking for large commercial B2B exhibitions; annual platform licenses.",
                },
                {
                  name: "Grip",
                  rev: "$15–25M",
                  acv: "$12k–40k+",
                  scope: "100s of organisers",
                  note: "Enterprise “engagement engine” — precision AI matchmaking, lead-gen led.",
                },
              ].map((c) => (
                <div key={c.name} className="rounded-xl border border-border bg-card/40 p-4">
                  <div className="font-display font-bold text-lg mb-2">{c.name}</div>
                  <div className="space-y-1 text-[13px] mb-2">
                    <div className="flex justify-between"><span className="text-muted-foreground">Revenue</span><span className="font-mono font-semibold">{c.rev}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">ACV</span><span className="font-mono font-semibold">{c.acv}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Scope</span><span className="font-mono">{c.scope}</span></div>
                  </div>
                  <div className="text-[12px] text-muted-foreground leading-snug border-t border-border pt-2">{c.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Demand drivers */}
          <div className="rounded-2xl border border-border bg-card/30 p-5 print:break-inside-avoid">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-2">
              Why now · tech momentum
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              {[
                { n: "88%", d: "of marketers plan to increase investment in event technology to upgrade their stacks." },
                { n: "35%", d: "of organisers are specifically prioritising AI-powered attendee–sponsor matchmaking." },
                { n: "50%", d: "of meeting professionals are already integrating AI throughout the meetings journey." },
              ].map((s) => (
                <div key={s.n} className="rounded-xl border border-border bg-background/60 p-4">
                  <div className="font-display font-extrabold text-2xl text-gradient-primary mb-1">{s.n}</div>
                  <p className="text-[13px] text-foreground/80 leading-snug">{s.d}</p>
                </div>
              ))}
            </div>
            <p className="text-[14px] leading-relaxed text-foreground/80">
              Organisers are shifting budgets away from manual planning and into AI-powered matchmaking tools to simplify execution.
              <span className="block text-xs text-muted-foreground mt-2 font-mono">
                Sources: Bizzabo, Eventbrite Pulse, Statista, Allied Market Research.
              </span>
            </p>
          </div>
        </Slide>

        {/* 08 — Competition */}
        <Slide
          number={8}
          eyebrow="Competition"
          title={<>SENS vs. <span className="text-gradient-primary">legacy event apps.</span></>}
        >
          <div className="overflow-x-auto rounded-2xl border border-border bg-card/40 print:break-inside-avoid">
            <table className="w-full text-sm">
              <thead className="bg-card/60">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 font-semibold">Legacy event apps<br /><span className="font-mono text-[10px] text-muted-foreground">Whova · Cvent · Bizzabo</span></th>
                  <th className="px-4 py-3 font-semibold text-primary">SENS</th>
                </tr>
              </thead>
              <tbody className="text-foreground/80">
                {[
                  ["Discovery", "Static alphabetical lists", "Real-time behavioural recommendation engine"],
                  ["Access", "App Store download friction", "Frictionless web app — scan & go"],
                  ["Navigation", "Text chat only", "Visual radar maps"],
                  ["Approaching", "Entirely unassisted", "AI icebreakers & gamified rewards"],
                  ["Results", "2–3 average connections", "7+ meaningful connections"],
                  ["Post-event", "Value lost after the event", "Secure contacts saved forever"],
                ].map(([f, a, c]) => (
                  <tr key={f} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{f}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a}</td>
                    <td className="px-4 py-3">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-base italic text-muted-foreground">
            Legacy apps optimise for logistics. SENS owns the moment of physical interaction — and the proprietary behavioural data it generates.
          </p>
        </Slide>

        {/* 09 — Traction / Status */}
        <Slide
          number={9}
          eyebrow="Why it compounds"
          title={<>The mutual incentive <span className="text-gradient-primary">flywheel.</span></>}
        >
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.06] to-transparent p-6 print:break-inside-avoid">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3">Core loop</div>
            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
              AI matches &amp; gamified rewards <span className="text-primary">➔</span> high attendee engagement <span className="text-primary">➔</span> generates a proprietary behavioural &amp; connection data loop. The data loop sharpens the matches, which deepens the technical moat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 print:break-inside-avoid">
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3">The attendee pull</div>
              <ul className="space-y-2 text-sm text-foreground/80 list-none">
                <li>— Reduces social anxiety with a reason to walk over.</li>
                <li>— Drives continuous, repeat in-app usage during the event.</li>
                <li>— Tokenised rewards convert micro-actions into status &amp; perks.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3">The organiser payoff</div>
              <ul className="space-y-2 text-sm text-foreground/80 list-none">
                <li>— Proves event ROI with verified connection data.</li>
                <li>— Boosts year-over-year ticket retention.</li>
                <li>— Behavioural insights feed into the next event&rsquo;s programming.</li>
              </ul>
            </div>
          </div>
        </Slide>

        {/* 10 — Business model (research-prompt placeholder) */}
        <Slide
          number={10}
          eyebrow="Business model"
          title={<>Per-event flat fee, <span className="text-gradient-primary">disguised as service.</span></>}
        >
          <p className="text-lg text-muted-foreground">
            Korean enterprise procurement treats pure software as a commodity. SENS prices as a hardened per-event flat fee, paired with a luxury operational bundle that clears chaebol procurement and PCO budgets.
          </p>

          {/* Pricing matrix */}
          <div className="rounded-2xl border border-border bg-card/40 overflow-hidden print:break-inside-avoid">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Recalibrated event pricing matrix</div>
              <div className="text-xs text-muted-foreground">Per-event flat · USD / KRW</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {[
                {
                  size: "200 attendees",
                  kind: "Small summit / retreat",
                  usd: "$900 – $1,200",
                  krw: "₩1.2M – ₩1.6M",
                  reality: "Max a mid-level marketing manager approves on a corporate card without triggering a formal tender.",
                },
                {
                  size: "800 attendees",
                  kind: "Standard conference",
                  usd: "$2,600 – $3,400",
                  krw: "₩3.5M – ₩4.5M",
                  reality: "Requires formal quote & tax invoice (Segeum Gyesanseo). Direct head-to-head with Event-us bundles.",
                },
                {
                  size: "2,500 attendees",
                  kind: "Large-scale expo",
                  usd: "$6,000 – $7,500",
                  krw: "₩8M – ₩10M",
                  reality: "Executive sign-off. Must prove networking layer holds 2,000 concurrent users during keynote.",
                },
              ].map((t) => (
                <div key={t.size} className="p-6 space-y-3">
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">{t.kind}</div>
                  <div className="font-display font-bold text-xl">{t.size}</div>
                  <div className="font-display font-extrabold text-2xl text-gradient-primary">{t.usd}</div>
                  <div className="text-sm text-foreground/70">{t.krw}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/60">{t.reality}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Korean procurement truths + local floor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 print:break-inside-avoid">
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3">Korean procurement truths</div>
              <ul className="space-y-2 text-sm text-foreground/80 list-none">
                <li>— Software viewed as commodity — expected free with hardware, catering, or agency mgmt.</li>
                <li>— Chaebol Gyeryak: 40% &ldquo;partnership discount&rdquo;, 90-day net terms via promissory note.</li>
                <li>— Sold via PCO / agency, not direct. If &gt;3–5% of event production budget, you&rsquo;re cut.</li>
                <li>— Per-head pricing rejected — finance teams require predictable flat fees.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3">Local price floor</div>
              <ul className="space-y-2 text-sm text-foreground/80 list-none">
                <li>— <span className="font-semibold">Event-us (이벤터스):</span> ₩0 – ₩500K for basic webinars / check-in; upsells via kiosks, badges, on-site staff.</li>
                <li>— <span className="font-semibold">Festa (페스타):</span> nominal flat fees or ticketing transaction cuts.</li>
                <li>— Western benchmarks (Whova, Swapcard: $3.5K – $15K+) do not transfer. Premium must be justified operationally, not as software margin.</li>
              </ul>
            </div>
          </div>

          {/* Upsell tier */}
          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-6 print:break-inside-avoid">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-1">Upsell tier · the only one that matters</div>
                <div className="font-display font-bold text-xl">SENS Concierge Protocol</div>
              </div>
              <div className="font-display font-extrabold text-2xl text-gradient-primary">+₩3M – ₩5M / event</div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Reframes SENS from &ldquo;expensive software&rdquo; to &ldquo;elite hospitality tech service.&rdquo; Clears procurement because it reads as operational headcount and specialised consulting — line items chaebol budgets already accept.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  t: "On-site command station",
                  v: "Two bi-lingual Networking Coordinators on a physical dashboard at the technical booth. Manual VIP rematches resolved within 60 seconds.",
                },
                {
                  t: "White-glove VIP pre-boarding",
                  v: "Top 10% of attendees are onboarded and pre-matched by hand before doors open.",
                },
                {
                  t: "Executive ROI report",
                  v: "Presentation-ready PDF the organiser pastes straight into their VP report — proof of connections made.",
                },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="font-display font-semibold text-sm mb-2">{x.t}</div>
                  <div className="text-xs text-foreground/70 leading-relaxed">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* 11 — Roadmap */}
        <Slide
          number={11}
          eyebrow="Roadmap"
          title={<>A 14-month path to <span className="text-gradient-primary">validate, monetise, unlock TIPS.</span></>}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 print:break-inside-avoid">
            {[
              {
                phase: "Phase 1 · Months 1–4",
                name: "Pilot validation",
                focus: "Harden core AI matching loops & privacy guardrails.",
                milestone: "3–5 structured B2B proof-of-concept events.",
                metric: "$0 ARR",
                sub: "9.5/10 satisfaction · 7+ connections",
              },
              {
                phase: "Phase 2 · Months 5–9",
                name: "Commercial launch & TIPS",
                focus: "Tiered SaaS licensing to premier Korean venues.",
                milestone: "₩100M angel unlocks ₩500M–₩800M TIPS R&D grant.",
                metric: "$35K ARR",
                sub: "10–15 paid commercial conferences",
              },
              {
                phase: "Phase 3 · Months 10–14",
                name: "APAC expansion",
                focus: "Automated onboarding & multi-event Contact Passport.",
                milestone: "25+ recurring accounts; Tokyo & Singapore pilots.",
                metric: "$100K ARR",
                sub: "Triggers institutional Seed",
              },
            ].map((p) => (
              <div key={p.phase} className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col gap-3">
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">{p.phase}</div>
                <div className="font-display font-bold text-lg">{p.name}</div>
                <div className="text-sm text-foreground/80"><span className="text-muted-foreground">Focus · </span>{p.focus}</div>
                <div className="text-sm text-foreground/80"><span className="text-muted-foreground">Milestone · </span>{p.milestone}</div>
                <div className="pt-3 border-t border-border/60">
                  <div className="font-display font-extrabold text-2xl text-gradient-primary">{p.metric}</div>
                  <div className="text-xs text-muted-foreground">{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Slide>

        {/* 12 — Ask */}
        <Slide
          number={12}
          eyebrow="The ask"
          title={<>₩100M angel. <span className="text-gradient-primary">8× non-dilutive multiplier.</span></>}
        >
          <p className="text-lg text-muted-foreground">
            A focused angel round whose strict prerequisite unlocks our government-backed funding match, and a 14-month runway to hit institutional Seed metrics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Briefcase,
                amount: "01",
                bucket: "The initial ask",
                v: "₩100M KRW — a focused angel round. The strict prerequisite required to unlock our government funding match.",
              },
              {
                icon: Wrench,
                amount: "02",
                bucket: "The multiplier · 8×",
                v: "₩100M ➔ up to ₩800M. This check instantly unlocks up to ₩800M in non-dilutive TIPS R&D grants via our Busan regional quota.",
              },
              {
                icon: Rocket,
                amount: "03",
                bucket: "The Seed Round trigger",
                v: "$100K ARR — the institutional milestone. A 14-month runway to validate our $3,500 ACV model, expand across APAC, and hit Seed metrics.",
              },
            ].map((u) => {
              const Icon = u.icon;
              return (
                <div key={u.bucket} className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-display font-extrabold text-2xl text-gradient-primary">{u.amount}</div>
                  </div>
                  <div className="font-display font-bold text-lg mb-2">{u.bucket}</div>
                  <div className="text-sm text-foreground/70 leading-relaxed">{u.v}</div>
                </div>
              );
            })}
          </div>
          <div className="pt-8 flex flex-wrap items-center gap-6">
            <a
              href="mailto:info@sensai.cc?subject=SENS%20Investor%20Inquiry"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition print:hidden"
            >
              <Mail className="w-4 h-4" /> info@sensai.cc
            </a>
            <span className="text-base text-muted-foreground">sensai.cc · whitepaper v1.0</span>
          </div>
        </Slide>
      </main>
    </>
  );
};

export default Deck;