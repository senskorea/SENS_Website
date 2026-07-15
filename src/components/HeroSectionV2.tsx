import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const trustPills = [
  "No app store",
  "Web-first",
  "Verified in-person",
  "GDPR-aligned",
];

const HeroSectionV2 = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-card">
      <div className="absolute inset-0 bg-gradient-glow" />

      <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
        <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
          The Connection Layer
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
          Turn Every Room<br />
          Into a <span className="text-gradient-primary">Network.</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
          Locate. Meet. Connect. The three-step workflow every event sells — and the one no software has owned. Until now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
          <Button
            variant="hero"
            size="lg"
            className="text-base px-8 py-6"
            onClick={() => navigate("/story")}
          >
            Step inside the story
          </Button>
          <Button
            variant="heroOutline"
            size="lg"
            className="text-base px-8 py-6"
            onClick={() => navigate("/work-with-us")}
          >
            Work with us
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-base px-8 py-6"
            onClick={() => navigate("/collab")}
          >
            For investors
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 animate-fade-up opacity-0" style={{ animationDelay: "1s" }}>
          {trustPills.map((pill) => (
            <span
              key={pill}
              className="text-[11px] font-medium tracking-wide text-muted-foreground bg-background/60 backdrop-blur-sm border border-border rounded-full px-3 py-1"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionV2;