import { Layers, Cpu, Fingerprint, Compass } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import EventPicker from "./EventPicker";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const features = [
  {
    icon: Layers,
    title: "White-label by Default",
    description: "Your brand, your rules. Custom colours, logos, and copy — guests see your event, not a vendor.",
  },
  {
    icon: Cpu,
    title: "Proprietary Spatial AI Engine",
    description: "Real-time matching tuned to shared business goals — returning hundreds of candidates in milliseconds. Profiles stay inside your tenant.",
  },
  {
    icon: Fingerprint,
    title: "Four Verification Modes",
    description: "QR scan, Sync Tap, Tap-to-Confirm, or Quiz Verify — plus gamified tokens that turn handshakes into prizes.",
  },
  {
    icon: Compass,
    title: "Four Location Modes",
    description: "Indoor GPS, GPS + QR zone anchors, BLE-hardware fidelity, or pure social-cluster graphs — pick what fits the venue and the room.",
  },
];

const OrganizerSectionV2 = () => {
  return (
    <section id="organizers" className="py-24 sm:py-32 relative border-b border-border">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-4">
            For Event Organisers
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Design How People <span className="text-gradient-primary">Meet.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Full control over who meets whom, how, and why — with proof it worked.
          </p>
        </div>

        <div className="mb-16">
          <EventPicker />
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {features.map((feature) => (
              <CarouselItem
                key={feature.title}
                className="pl-4 basis-full sm:basis-1/2"
              >
                <div className="group bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300 shadow-card h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default OrganizerSectionV2;