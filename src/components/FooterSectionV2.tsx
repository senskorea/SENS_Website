import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SensLogo } from "@/components/ui/SensLogo";

const FooterSectionV2 = () => {
  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      <div className="container relative max-w-4xl mx-auto text-center py-24 px-4">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Let's fill the <span className="text-gradient-primary">silence.</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          See what SENS looks like for your next event.
        </p>
        <Button variant="hero" size="lg" className="text-base px-10 py-6">
          Book a Demo
        </Button>
      </div>

      <div className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
          <div className="scale-[0.4] origin-left">
            <SensLogo />
          </div>
          <p className="text-sm text-muted-foreground">
            The connection layer for in-person events.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
            <Link to="/work-with-us" className="hover:text-foreground transition-colors">
              Work with us
            </Link>
            <span className="text-muted-foreground/40">·</span>
            <Link to="/collab" className="hover:text-foreground transition-colors">
              Investors
            </Link>
            <span className="text-muted-foreground/40">·</span>
            <Link to="/deck" className="hover:text-foreground transition-colors">
              Deck
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSectionV2;