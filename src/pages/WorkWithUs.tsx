import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Target,
  Users,
  Radar,
  Database,
  Calendar,
  MapPin,
  Sparkles,
  Handshake,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RoiStripSection from "@/components/RoiStripSection";

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

const partnerMailto =
  "mailto:info@sensai.cc?subject=SENS%20Event%20Partnership&body=Hi%20SENS%20team%2C%0A%0AI%27d%20like%20to%20explore%20piloting%20SENS%20at%20an%20upcoming%20event.";

const WorkWithUs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Work with SENS — Pilot AI networking at your next event</title>
        <meta
          name="description"
          content="Partner with SENS to pilot AI-driven IRL networking at your venue, conference, or corporate event. 8+ connections per attendee, 9.5/10 satisfaction."
        />
        <link rel="canonical" href="https://www.sensai.cc/work-with-us" />
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
            Pilot Programme · Open for KR · JP · SG · HK
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Turn your next event into a <span className="text-gradient-primary">networking moment</span> people talk about.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We partner with venues, conference organizers, and corporate event teams to pilot SENS on-site — delivering 8+ meaningful connections per attendee and a 9.5/10 satisfaction score.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="hero" size="lg" className="text-base px-8 py-6">
              <a href={partnerMailto}>
                <Handshake className="w-4 h-4" /> Partner with us
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="lg" className="text-base px-8 py-6">
              <a href={partnerMailto}>
                <Mail className="w-4 h-4" /> info@sensai.cc
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="lg" className="text-base px-8 py-6">
              <Link to="/whitepaper">
                <FileText className="w-4 h-4" /> Read the whitepaper
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Section>
        <SectionTitle eyebrow="01 · Who we partner with">Built for the teams behind unforgettable events.</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: MapPin, title: "Venues", body: "Premier convention centres and venues like BEXCO, COEX and beyond — differentiate your space with a built-in networking layer." },
            { icon: Calendar, title: "Conference organizers", body: "Trade shows, summits, and professional conferences (100–5,000 attendees) looking to lift satisfaction and re-attendance." },
            { icon: Users, title: "Corporate event teams", body: "Brand activations, partner summits, and internal kick-offs that need measurable networking outcomes." },
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
      </Section>

      <Section>
        <SectionTitle eyebrow="02 · Why pilot SENS">Measurable outcomes, no app store, no friction.</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Target, title: "8+ connections / guest", body: "3× the industry average — attendees leave with a roster, not a stack of business cards." },
            { icon: Sparkles, title: "9.5/10 satisfaction", body: "Validated at live pilots; 100% of attendees said they would attend again." },
            { icon: Radar, title: "Spatial radar in the room", body: "Indoor positioning and social clusters surface your best matches in real time — web-first, no app store." },
            { icon: Database, title: "Organizer dashboard", body: "Live engagement metrics, exportable connection data, and behavioural insights you've never had access to." },
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
      </Section>

      <Section>
        <SectionTitle eyebrow="03 · The pilot offer">How a SENS pilot works.</SectionTitle>
        <div className="space-y-3">
          {[
            { step: "01", title: "Scoping call", body: "30 minutes to align on event format, attendee profile, and success metrics." },
            { step: "02", title: "On-site setup", body: "We handle the tech — QR-based onboarding, themed AI ice-breakers, and a live organizer dashboard." },
            { step: "03", title: "Post-event report", body: "Engagement metrics, exportable connection CSV, and an attendee NPS breakdown within 72 hours." },
          ].map((s) => (
            <div key={s.step} className="border border-border rounded-xl p-5 bg-card/40 flex gap-5 items-start">
              <span className="font-display text-2xl font-extrabold text-gradient-primary flex-shrink-0 w-10">{s.step}</span>
              <div>
                <h3 className="font-display text-base font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* The Math — ROI for organizers */}
      <RoiStripSection />

      {/* Contact */}
      <Section className="pb-32">
        <div className="relative overflow-hidden rounded-2xl border border-border p-10 text-center bg-card">
          <div className="absolute inset-0 bg-gradient-glow opacity-30" />
          <div className="relative">
            <SectionTitle eyebrow="04 · Contact">Let's talk.</SectionTitle>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              <a href={partnerMailto} className="text-foreground font-medium hover:text-primary transition-colors">info@sensai.cc</a>
              <span className="mx-2 text-muted-foreground/50">·</span>
              <a href="https://www.sensai.cc" className="text-foreground font-medium hover:text-primary transition-colors">www.sensai.cc</a>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="hero" size="lg" className="text-base px-8 py-6">
                <a href={partnerMailto}>
                  <Handshake className="w-4 h-4" /> Partner with us
                </a>
              </Button>
              <Button asChild variant="heroOutline" size="lg" className="text-base px-8 py-6">
                <a href={partnerMailto}>
                  <Mail className="w-4 h-4" /> Email us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8">
        <div className="container max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© SENS</span>
          <span>Pilot programme · contact us for terms.</span>
        </div>
      </footer>
    </div>
  );
};

export default WorkWithUs;