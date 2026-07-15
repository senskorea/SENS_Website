import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

// ---------- Reusable Slide shell (mirrors Deck.tsx) ----------
type SlideProps = {
  number: number;
  total?: number;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  wide?: boolean;
};

const Slide = ({ number, total = 12, eyebrow, title, children, className = "", wide = false }: SlideProps) => (
  <section
    className={`relative min-h-screen snap-start flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-20 overflow-hidden print:min-h-0 print:break-after-page ${className}`}
  >
    <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-primary opacity-[0.06] blur-3xl print:hidden" />
    <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent opacity-[0.05] blur-3xl print:hidden" />
    <div className="pointer-events-none absolute -bottom-10 right-6 sm:right-16 font-display font-extrabold text-[18rem] leading-none text-foreground/[0.03] select-none print:hidden">
      {String(number).padStart(2, "0")}
    </div>
    <div className="absolute top-6 right-6 sm:top-10 sm:right-10 text-xs font-mono tracking-widest text-muted-foreground/60">
      {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
    <div className="absolute top-6 left-6 sm:top-10 sm:left-10 font-logo text-sm font-extrabold tracking-[0.2em] uppercase text-gradient-primary">
      SENS
    </div>
    <div className={`relative ${wide ? "max-w-6xl" : "max-w-4xl"} mx-auto w-full`}>
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
        className="text-base sm:text-lg leading-relaxed text-foreground/80 space-y-6"
      >
        {children}
      </motion.div>
    </div>
  </section>
);

const Kicker = ({ children }: { children: ReactNode }) => (
  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-2">{children}</div>
);

const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-border bg-card/40 p-6 print:break-inside-avoid ${className}`}>{children}</div>
);

const TOTAL = 12;

const AltDeck = () => {
  const handleDownload = async () => {
    const t = toast.loading("Packaging deck…");
    try {
      const doc = document.documentElement.cloneNode(true) as HTMLElement;
      doc.querySelectorAll("[data-deck-controls]").forEach((el) => el.remove());
      doc.querySelectorAll<HTMLElement>("*").forEach((el) => {
        const s = el.style;
        if (s.opacity && parseFloat(s.opacity) < 1) s.opacity = "1";
        if (s.transform && s.transform !== "none") s.transform = "none";
        if (s.visibility === "hidden") s.visibility = "visible";
      });
      doc.querySelectorAll<HTMLElement>("main").forEach((m) => {
        m.classList.remove("snap-y", "snap-mandatory", "h-screen", "overflow-y-auto");
        m.style.height = "auto";
        m.style.overflow = "visible";
      });
      doc.querySelectorAll<HTMLElement>("section").forEach((sec) => {
        sec.classList.remove("snap-start", "snap-always");
      });

      const imgs = Array.from(doc.querySelectorAll("img")) as HTMLImageElement[];
      await Promise.all(
        imgs.map(async (img) => {
          const src = img.getAttribute("src");
          if (!src || src.startsWith("data:")) return;
          try {
            const res = await fetch(src);
            const blob = await res.blob();
            const dataUrl: string = await new Promise((resolve, reject) => {
              const fr = new FileReader();
              fr.onload = () => resolve(fr.result as string);
              fr.onerror = reject;
              fr.readAsDataURL(blob);
            });
            img.setAttribute("src", dataUrl);
          } catch { /* noop */ }
        })
      );

      const links = Array.from(doc.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
      await Promise.all(
        links.map(async (link) => {
          const href = link.getAttribute("href");
          if (!href) return;
          try {
            const res = await fetch(href);
            const css = await res.text();
            const style = document.createElement("style");
            style.textContent = css;
            link.replaceWith(style);
          } catch { /* noop */ }
        })
      );

      const html = `<!doctype html>\n${doc.outerHTML}`;
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sens-altdeck-${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Deck downloaded", { id: t, description: "Self-contained HTML." });
    } catch {
      toast.error("Download failed — try again.", { id: t });
    }
  };

  return (
    <>
      <Helmet>
        <title>SENS — Alt Investor Deck</title>
        <meta name="robots" content="noindex,nofollow" />
        <style>{`@media print { @page { size: landscape; margin: 0; } body { background: white; } }`}</style>
      </Helmet>

      <main className="snap-y snap-mandatory h-screen overflow-y-auto bg-background text-foreground print:h-auto print:overflow-visible">
        <div data-deck-controls className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 print:hidden">
          <Button onClick={handleDownload} size="sm" variant="outline" className="shadow-lg backdrop-blur bg-card/80">
            <Download className="w-3.5 h-3.5 mr-2" /> Download HTML
          </Button>
        </div>

        {/* 01 — Cover */}
        <Slide
          number={1}
          total={TOTAL}
          eyebrow="Investor Deck · 2026"
          title={<><span className="text-gradient-primary">SENS</span></>}
        >
          <p className="text-2xl sm:text-3xl font-semibold text-foreground">IRL connection platform</p>
          <p className="text-base text-muted-foreground">Investor Deck · 2026</p>
        </Slide>

        {/* 02 — Team */}
        <Slide number={2} total={TOTAL} eyebrow="The Team" title="Our Founders" wide>
          <div className="grid md:grid-cols-3 gap-5">
            <Card>
              <Kicker>CEO</Kicker>
              <h3 className="font-display text-2xl font-bold mb-3">Carlos Robles</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li>Ex-McKinsey & Company Management Consultant specializing in data-driven strategy alignment, organizational transformation, and structural insights.</li>
                <li>Peking University ('23) Bachelor's in International Political Economy (awarded the Chinese Government Scholarship) and Universidad APEC Bachelor of Engineering in Software Engineering.</li>
                <li>Hyper-fluent in English and Chinese (HSK 6), with high-intermediate Korean fluency (TOPIK II Level 4) embedded in local market entry operations.</li>
                <li>Deep-tech builder actively engineering modular network applications, decentralized payment structures, and agent-based geospatial simulation models.</li>
              </ul>
            </Card>
            <Card>
              <Kicker>CMO</Kicker>
              <h3 className="font-display text-2xl font-bold mb-3">Paul Conversy</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li>Expert in large-scale event facilitation.</li>
                <li>10+ years working alongside major regional convention hubs like BEXCO, orchestrating ecosystem milestones, Disney operations, and guiding cross-border EU R&D consortiums.</li>
              </ul>
            </Card>
            <Card>
              <Kicker>CPO</Kicker>
              <h3 className="font-display text-2xl font-bold mb-3">Khaled Shaaban</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li>Ex-VP of Product Design at Chase UK (JPMorgan).</li>
                <li>Expert in designing highly scalable, intuitive, and frictionless transaction layers built for millions of concurrent active users.</li>
              </ul>
            </Card>
          </div>
          <div className="pt-4">
            <Kicker>Board of Advisors</Kicker>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <Card><strong>Ariel Wagner</strong><div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">Gamification & Growth</div></Card>
              <Card><strong>Paul Edwards MBE</strong><div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">Strategic Partnerships</div></Card>
              <Card><strong>Sangsoo Chong</strong><div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">Creative & PR Strategy</div></Card>
            </div>
          </div>
        </Slide>

        {/* 03 — Problem & Solution */}
        <Slide number={3} total={TOTAL} eyebrow="The Problem vs. The Solution" title="Wasted ROI. Invisible Walls." wide>
          <Card>
            <Kicker>1. The Core Disconnect: Wasted Networking ROI</Kicker>
            <p><em>The Metric:</em> <strong>61% of delegates</strong> state that networking and relationship building are their primary motivation for attending professional events.</p>
            <p className="mt-2"><em>The Leak:</em> Current event matchmaking is broken—overall industry retention rates sit <strong>below 32%</strong>, and <strong>88% of physical connections (business cards, paper trails) completely leak</strong> within a single week because finding high-value peers is left to unguided proximity.</p>
            <p className="mt-2"><em>SENS Resolution:</em> SENS transforms unguided rooms into high-ROI spaces by instantly surfacing targeted compatibility vectors via <strong>Algorithmic AI Matching Grids</strong>.</p>
          </Card>
          <Card>
            <Kicker>2. The Invisible Wall: Approach Friction</Kicker>
            <p><em>The Metric:</em> <strong>16% of attendees</strong> experience severe approach friction and networking anxiety, directly limiting room engagement performance.</p>
            <p className="mt-2"><em>SENS Resolution:</em> SENS removes initiation friction by structuring room interactions. On-demand AI engines feed contextual icebreakers to attendees, while <strong>verified physical handshakes</strong> automatically secure downloadable digital follow-up trails.</p>
          </Card>
        </Slide>

        {/* 04 — App Experience */}
        <Slide number={4} total={TOTAL} eyebrow="The App Experience" title="Match, connect, and get gifts." wide>
          <p className="text-sm font-mono uppercase tracking-[0.18em] text-muted-foreground">SENS end users are able to match, connect and get gifts through their connections.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["Step 1 · Provide Information", "End users quickly input profile criteria right inside a fluid mobile web canvas (sensai.cc)."],
              ["Step 2 · AI Surfaces the Best Matches", "AI maps profiles out instantly, loading precise match hierarchies directly on active user grids."],
              ["Step 3 · Visually Identify Social Clusters", "Attendees visualize structural social groups and coordinate positioning on smart radar maps."],
              ["Step 4 · Leverage AI for Ice Breaking", `Granular AI engines feed contextual talking points ("What's something you knew at 18 that you've forgotten?") to safely shatter micro-anxieties.`],
              ["Step 5 · Receive Rewards for Every Connection", "Handshakes automatically unlock corporate vouchers, promotional perks, and corporate sponsor merchandise embedded directly into the platform connection reward loop."],
            ].map(([k, v]) => (
              <Card key={k}>
                <Kicker>{k}</Kicker>
                <p className="text-sm">{v}</p>
              </Card>
            ))}
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Footnote: Soon to be patented granular matching (e.g., "I want to meet someone in the field of solar panels").</p>
        </Slide>

        {/* 05 (skipped per copy) — keep numbering aligned with copy: jump to slide 6 */}
        {/* 06 — Case Studies (rendered as slide #5 in deck of 12 to preserve TOTAL) */}
        <Slide number={5} total={TOTAL} eyebrow="Case Studies" title="Ecosystem Validation: Regional Startup Pilots" wide>
          <Card>
            <Kicker>The Frame</Kicker>
            <p>We utilized dense, high-activity startup ecosystems, regional tech community networks, and focused business gatherings in Busan to stress-test our core psychological loops and behavioral volume validation algorithms.</p>
          </Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ["9.5 / 10", "Average Participant Satisfaction Index"],
              ["100%", "“Would Attend Again” Rate"],
              ["7+", "Verified, high-value professional connections per attendee room"],
              ["+300%", "Foot traffic acceleration in initial hosting venues"],
            ].map(([n, l]) => (
              <Card key={l}>
                <div className="font-display text-3xl font-extrabold text-gradient-primary">{n}</div>
                <p className="text-xs mt-2 text-muted-foreground">{l}</p>
              </Card>
            ))}
          </div>
          <Card>
            <Kicker>Qualitative Traction Feedback</Kicker>
            <p className="text-sm italic">"SENS platform added immediate structural value to our regional startup gathering, organizing the clusters and streamlining matches based on interests. It made room navigation completely frictionless."</p>
            <p className="text-xs mt-1 text-muted-foreground">— Ecosystem Partner (Busan Tech Mixer / Host)</p>
            <p className="text-sm italic mt-4">"SENS completely kept the room from getting dull, turning interactive connection requests into real-time matches instantly. It automated the follow-up process seamlessly."</p>
            <p className="text-xs mt-1 text-muted-foreground">— Verified Founder (Seoul Pilot Showcase)</p>
          </Card>
        </Slide>

        {/* 07 — Competitive Matrix */}
        <Slide number={6} total={TOTAL} eyebrow="Market Positioning" title="Unique Competitor Edge" wide>
          <p className="text-base text-muted-foreground">Breaking the "Invisible Wall" via real-time spatial and psychological orchestration.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border border-border rounded-lg">
              <thead className="bg-card/60">
                <tr>
                  <th className="text-left p-3 border-b border-border">Evaluation Metric</th>
                  <th className="text-left p-3 border-b border-border">🔺 SENS Platform</th>
                  <th className="text-left p-3 border-b border-border">🏢 Legacy Apps (Whova, etc.)</th>
                  <th className="text-left p-3 border-b border-border">👤 Traditional Methods</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Discovery Vector", "Algorithmic AI Matching Grids — Instant mutual compatibility sorting.", "Static Directory Listings — Passive, manual list scrolling.", "Blind Luck / Proximity — Sifting through a dense room."],
                  ["In-Room Navigation", "Visual Social Radars & Coordinates — Live, decay-mapped cluster tracking.", "In-App Text Chat Only — Disconnected from physical space.", "Unassisted Searching — Awkward wandering and badge-staring."],
                  ["Interaction Friction", "Gamified Psychological Reinforcement — Contextual AI icebreakers melt anxiety.", "None — Approaching is left 100% to the user.", "Severe Social Anxiety — 16% of attendees experience paralysis."],
                  ["Post-Event Value", "Frictionless Connection Trails — One-click exportable CRM downloads.", "Weak Integration — App uninstalled immediately after event.", "High Loss Track — 88% of cards lost in 1 week."],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border last:border-0">
                    <td className="p-3 font-semibold align-top">{row[0]}</td>
                    <td className="p-3 align-top">{row[1]}</td>
                    <td className="p-3 align-top text-muted-foreground">{row[2]}</td>
                    <td className="p-3 align-top text-muted-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Slide>

        {/* 08 — Market Size */}
        <Slide number={7} total={TOTAL} eyebrow="Market Opportunity" title="Sizing the Addressable Opportunity" wide>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <Kicker>TAM</Kicker>
              <div className="font-display text-3xl font-extrabold text-gradient-primary">$1.89B</div>
              <p className="text-sm mt-2">Global B2B & academic event software market (~540,000 qualifying events worldwide × $3,500 ACV benchmark).</p>
            </Card>
            <Card>
              <Kicker>SAM</Kicker>
              <div className="font-display text-3xl font-extrabold text-gradient-primary">$1.41B</div>
              <p className="text-sm mt-2">Premium, networking-led event hubs across SENS priority regions (APAC, Europe, North America).</p>
            </Card>
            <Card>
              <Kicker>SOM</Kicker>
              <div className="font-display text-3xl font-extrabold text-gradient-primary">$28.3M</div>
              <p className="text-sm mt-2">SENS 3-year capture goal (~2% penetration of the SAM, heavily weighted toward South Korea and APAC deep-tech hubs).</p>
            </Card>
          </div>
          <Card>
            <Kicker>Launch Focus · South Korea</Kicker>
            <p><strong>Regional SAM:</strong> $24.5M (KRW 32.8B)</p>
            <p className="mt-1"><strong>Ecosystem Nodes:</strong> ~7,000 major annual events spanning COEX (Seoul), BEXCO (Busan), KINTEX (Gyeonggi), and Ezpmp.</p>
          </Card>
          <Card>
            <Kicker>Strategic Takeaway</Kicker>
            <p>Content-driven event budgets have collapsed because content can be consumed anywhere. Post-pandemic premium spend has aggregated completely onto one variable: deterministic, high-value physical matchmaking. SENS is built explicitly for this premium shift.</p>
          </Card>
        </Slide>

        {/* 09 — Growth & Roadmap */}
        <Slide number={8} total={TOTAL} eyebrow="Business Plan" title="The SENS Milestone & Financial Roadmap" wide>
          {[
            {
              title: "Phase 1 · Pilot & Hardening (Months 1–4)",
              focus: "Harden core AI matching loops, deploy advanced privacy guardrails, and polish the self-serve white-label organizer configuration dashboard.",
              milestone: "Transition early Busan startup network and tech mixer pilot data into 3–5 premium B2B proof-of-concept events.",
              arr: "$0 ARR (purely focused on non-revenue validation and user satisfaction metrics).",
            },
            {
              title: "Phase 2 · Commercial Launch & TIPS Triggers (Months 5–9)",
              focus: "Roll out tiered event-based SaaS licensing and enterprise branding add-ons.",
              milestone: "Scale from local hubs to premier venues across South Korea, targeting 10–15 commercial B2B conferences or investor matchmaking summits. Trigger and unlock the ₩500M TIPS non-dilutive government R&D matching grant by securing our ₩100M+ lead institutional accelerator investment.",
              arr: "$35K ARR (based on our conservative $3,500 ACV benchmark across initial paid cohorts).",
            },
            {
              title: "Phase 3 · Scale & Region Expansion (Months 10–14)",
              focus: "Deploy automated pipeline customer onboarding and roll out the multi-event 'Contact Passport' network effect feature.",
              milestone: "Secure 25+ recurring corporate or agency accounts; activate cross-border pilot pipelines into secondary APAC tech hubs (e.g., Singapore, Tokyo).",
              arr: "Crossing the $100K ARR (₩135M) Threshold, establishing strong baseline traction metrics to trigger a standard institutional Seed round.",
            },
          ].map((p) => (
            <Card key={p.title}>
              <Kicker>{p.title}</Kicker>
              <p className="text-sm"><strong>Operational Focus:</strong> {p.focus}</p>
              <p className="text-sm mt-2"><strong>Traction Milestone:</strong> {p.milestone}</p>
              <p className="text-sm mt-2"><strong>Financial Run-rate:</strong> {p.arr}</p>
            </Card>
          ))}
        </Slide>

        {/* 10 — Business Plan & Monetization */}
        <Slide number={9} total={TOTAL} eyebrow="Monetization Strategy" title="B2B Scale & Revenue Architecture" wide>
          {[
            ["Tiered B2B SaaS Licensing", "Scalable platform access fees priced dynamically according to live event attendance and active room metrics. Highly predictable recurring revenue model."],
            ["High-Margin White-Label Customization", "SENS utilizes a single, unified codebase. Because branding assets, AI criteria, and matchmaking logic live inside an administrative configurator, a completely customized enterprise environment can be deployed in under 10 minutes without writing a single line of new code. This guarantees standard SaaS gross margins of 80%+."],
            ["Automated Corporate Giveaway & Voucher Pipelines", "Turns standard event giveaways into an operational revenue driver. Corporate sponsors pay a premium to anchor their vouchers, promotional perks, and premium merchandise directly into the SENS connection reward loop—incentivizing verified B2B interactions while tracking sponsor ROI dynamically."],
            ["Go-To-Market Vector", "Capitalizing on current momentum within the Busan Startup Ecosystem (Casual Tech Mixers, Startup Networks, and Innovation Showcases) to seamlessly bridge our deployment pipeline straight into premium corporate enterprise assemblies, global conventions, and cross-border tech summits."],
          ].map(([k, v]) => (
            <Card key={k}>
              <Kicker>{k}</Kicker>
              <p className="text-sm">{v}</p>
            </Card>
          ))}
        </Slide>

        {/* 11 — Investment Ask */}
        <Slide number={10} total={TOTAL} eyebrow="Financial Runway" title="The Pre-Seed Ask" wide>
          <Card>
            <Kicker>Target Raise</Kicker>
            <div className="font-display text-3xl font-extrabold text-gradient-primary">₩200M (~$150K USD via a localized K-SAFE structure)</div>
          </Card>
          <Card>
            <Kicker>Capital Allocation Pool</Kicker>
            <ul className="space-y-2 text-sm">
              <li><strong>50% Enterprise B2B Acquisition:</strong> Funding direct enterprise business development pipelines, commercial contract acquisition, and on-site deployment buffers for premium corporate event agencies and brand activation operators.</li>
              <li><strong>30% AI & Core Engineering:</strong> Hardening underlying algorithmic proximity matching clusters, expanding server capabilities, and finalizing the modular plug-and-play organizer panel.</li>
              <li><strong>20% Local Operational Runway:</strong> Managing administrative overhead, legal compliance parameters, infrastructure scaling, and pilot coordination buffers.</li>
            </ul>
          </Card>
          <Card>
            <Kicker>Target Pipeline Enterprise Partnerships</Kicker>
            <p className="text-sm mb-3">This aggressive commercial runway directly funds the business development pipeline to pitch, integrate, and deploy our white-label connection layer to top-tier event agencies handling flagship corporate activations for Samsung, Hyundai, and CJ Group, including:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li><strong>W Korea</strong> (Global corporate activation and DMC lead)</li>
              <li><strong>JellyPlan</strong> (MICE specialist for international B2B exhibitions)</li>
              <li><strong>Encore Event Technologies</strong> (Corporate audio-visual and hybrid environment production lead)</li>
              <li><strong>Venue Network Vectors:</strong> Direct integration inside premium management spaces at <strong>COEX</strong>, <strong>BEXCO</strong>, and <strong>KINTEX</strong>.</li>
            </ol>
          </Card>
        </Slide>

        {/* 12 — References */}
        <Slide number={11} total={TOTAL} eyebrow="Appendix" title="References & Data Verification" wide>
          {[
            ["SENS Internal Core Infrastructure & Event Operations", "Direct source for South Korean launch milestones, BEXCO/COEX ecosystem mapping, regional Pre-Seed ask parameters, and the strategic 3-Phase TIPS execution roadmap."],
            ["SENS Pitch Deck (Initial Structure & Asset Transcript)", "Primary asset repository containing historical founder pedigrees, baseline competitive evaluation matrices, pilot test survey outcomes (9.5/10 index, 7+ connection metrics), user interaction screens, and core behavioral problem statements."],
            ["Global MICE Industry & Corporate Networking Performance Metrics", "Compiled compilation referencing cross-border delegation indicators (Gitnux Enterprise Metrics / VisitBritain Context) establishing the 61% primary networking intent standard."],
            ["Enterprise Event Matchmaking Software Valuations", "Industry pricing indexes tracking tier architecture and scaling benchmarks ($1,000 to $100,000+ framework scaling) across legacy platforms (Whova, Grip, Swapcard, Brella)."],
            ["South Korea Startup Funding & TIPS Compliance Directives", "Regulatory frameworks mapping out Pre-Seed AC/VC ticket ranges, RCPS deal structures, and the formal ₩100M+ private investment requirements to trigger matching TIPS non-dilutive R&D grants."],
            ["South Korean Enterprise Agency Mapping Bureau", "Market positioning verification for top-tier PCO and DMC corporate planners (W Korea, JellyPlan, Encore Event Technologies) executing flagship conglomerate activations."],
          ].map(([k, v]) => (
            <Card key={k}>
              <Kicker>{k}</Kicker>
              <p className="text-sm"><strong>Data Scope:</strong> {v}</p>
            </Card>
          ))}
        </Slide>

        {/* 12 — Closing */}
        <Slide
          number={12}
          total={TOTAL}
          eyebrow="Thank you"
          title={<>Let's build the <span className="text-gradient-primary">connection layer.</span></>}
        >
          <p>info@sensai.cc · sensai.cc · Seoul, South Korea</p>
        </Slide>
      </main>
    </>
  );
};

export default AltDeck;