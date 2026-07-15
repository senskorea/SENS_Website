import { Check, Wrench } from "lucide-react";

const shipping = [
  "Event-scoped profiles by default",
  "Anonymised organiser analytics — no movement traces",
  "Ephemeral location data with auto-decay",
  "GDPR / CCPA aligned, HTTPS-only, per-event tenant isolation",
];

const developing = [
  "Per-user radar visibility — go dark with one tap",
  "Block and report on every profile",
  "Configurable post-event retention windows",
];

const VisionSectionV2 = () => {
  return (
    <section id="vision" className="py-24 sm:py-32 relative border-b border-border">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-4">
            Privacy by Design
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Powerful Tools Need <span className="text-gradient-primary">Deliberate Limits.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Real-time visibility into who's in a room is a capability. So is restraint.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">Shipping in v1</h3>
            </div>
            <ul className="space-y-3">
              {shipping.map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                  <span className="text-primary mt-1.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">In Active Development</h3>
            </div>
            <ul className="space-y-3">
              {developing.map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                  <span className="text-primary mt-1.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-foreground font-display font-semibold text-lg sm:text-xl">
          Designed before scale, not retrofitted after.
        </p>
      </div>
    </section>
  );
};

export default VisionSectionV2;