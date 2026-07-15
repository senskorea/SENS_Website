import VideoCaptionTrack, { CaptionBeat } from "./VideoCaptionTrack";

const organizerBeats: CaptionBeat[] = [
  { caption: "Describe your vision. SENS manifests it.", label: "The AI Forge" },
  { caption: "Saju, Archetypes, or your own logic.", label: "Custom Matching" },
  { caption: "Reward what matters to your sponsors.", label: "Rewards Vault" },
  { caption: "Your brand. Your colors. Your app.", label: "White-label" },
  { caption: "See every connection, in real time.", label: "Live Analytics" },
  { caption: "From vision to live event in minutes.", label: "The Outcome" },
];

const attendeeBeats: CaptionBeat[] = [
  { caption: "Scan a code. Step inside.", label: "Enter the Experience" },
  { caption: "Sorted by who you'd actually click with.", label: "Discovery Grid" },
  { caption: "The room points you toward your match.", label: "The Radar" },
  { caption: "A real handshake. A verified moment.", label: "Connect & Verify" },
  { caption: "Every connection earns you something.", label: "XP & Points" },
  { caption: "Redeem rewards from real brands.", label: "The Vault" },
];

const DemoSection = () => {
  return (
    <section id="demo" className="relative border-b border-border">
      {/* Section header */}
      <div className="pt-24 sm:pt-32 pb-4 relative">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-primary font-display font-bold text-xs tracking-[0.2em] uppercase mb-4">
            Demo
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            See SENS <span className="text-gradient-primary">in motion.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Two short walk-throughs — one for the team running the room, one for the people in it.
          </p>
        </div>
      </div>

      {/* Organizers */}
      <div className="py-16 sm:py-20 relative">
        <div className="container max-w-6xl mx-auto px-4">
          <VideoCaptionTrack
            videoSrc="/videos/organizer-experience.mp4"
            eyebrow="For Organisers"
            problemHeadline="Events are expensive. Connections are accidental."
            beats={organizerBeats}
            accent="organizer"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Attendees */}
      <div className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
        <div className="container max-w-6xl mx-auto px-4 relative">
          <VideoCaptionTrack
            videoSrc="/videos/attendee-experience.mp4"
            eyebrow="For Attendees"
            problemHeadline="200 people in the room. You'll meet 3."
            beats={attendeeBeats}
            accent="attendee"
            aspectRatio="16 / 9"
            maxWidthClass="max-w-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
