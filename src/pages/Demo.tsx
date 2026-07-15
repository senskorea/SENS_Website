import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import DemoSection from "@/components/DemoSection";
import FooterSectionV2 from "@/components/FooterSectionV2";

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Demo — SENS in motion</title>
        <meta
          name="description"
          content="Two short walk-throughs of SENS — one for organisers running the room, one for the attendees in it."
        />
        <link rel="canonical" href="https://www.sensai.cc/demo" />
        <meta property="og:title" content="Demo — SENS in motion" />
        <meta
          property="og:description"
          content="Two short walk-throughs of SENS — one for organisers running the room, one for the attendees in it."
        />
        <meta property="og:url" content="https://www.sensai.cc/demo" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main className="pt-16">
        <DemoSection />
      </main>
      <FooterSectionV2 />
    </div>
  );
};

export default Demo;