import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSectionV2 from "@/components/HeroSectionV2";
import StoryTeaserSection from "@/components/StoryTeaserSection";
import ProblemSectionV2 from "@/components/ProblemSectionV2";
import WorkflowSection from "@/components/WorkflowSection";
import OrganizerSectionV2 from "@/components/OrganizerSectionV2";
import FooterSectionV2 from "@/components/FooterSectionV2";

const IndexV2 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>SENS — The Connection Layer for In-Person Events</title>
        <meta
          name="description"
          content="SENS is the connection layer for in-person events. Locate, meet, and verify the right people — no app store, no GPS theatre."
        />
        <link rel="canonical" href="https://www.sensai.cc/" />
        <meta property="og:title" content="SENS — The Connection Layer for In-Person Events" />
        <meta
          property="og:description"
          content="SENS is the connection layer for in-person events. Locate, meet, and verify the right people — no app store, no GPS theatre."
        />
        <meta property="og:url" content="https://www.sensai.cc/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SENS",
          url: "https://www.sensai.cc/",
          logo: "https://www.sensai.cc/favicon.ico",
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SENS",
          url: "https://www.sensai.cc/",
        })}</script>
      </Helmet>
      <Navbar />
      <HeroSectionV2 />
      <StoryTeaserSection />
      <ProblemSectionV2 />
      <WorkflowSection />
      <OrganizerSectionV2 />
      <FooterSectionV2 />
    </div>
  );
};

export default IndexV2;