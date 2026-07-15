import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Phone, Mail, Linkedin, ChevronDown, Download, Calendar } from "lucide-react";
import portrait from "@/assets/paul-portrait.jpg";

const NAME = "Paul Conversy";
const TITLE = "Founder at SENS";
const ORG = "SENS";
const PHONE = "+82 10 8113 7787";
const EMAIL = "info@sensai.cc";
const WEBSITE = "https://sensai.cc";
const LINKEDIN = "https://linkedin.com/in/paulconversy";
const BOOKING = "https://calendar.app.google/ukQe5T1754RKVPedA";

const contactItems = [
  { key: "web", icon: Globe, label: "Website", value: "sensai.cc", href: WEBSITE },
  { key: "phone", icon: Phone, label: "Phone", value: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
  { key: "email", icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/paulconversy", href: LINKEDIN },
];

function buildVCard() {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${NAME}`,
    "N:Conversy;Paul;;;",
    `ORG:${ORG}`,
    `TITLE:Founder`,
    `TEL;TYPE=CELL:${PHONE.replace(/\s/g, "")}`,
    `EMAIL;TYPE=INTERNET:${EMAIL}`,
    `URL:${WEBSITE}`,
    `URL;TYPE=LinkedIn:${LINKEDIN}`,
    "ADR;TYPE=WORK:;;;Paris;;;France",
    "END:VCARD",
  ].join("\n");
}

function downloadVCard() {
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "paul-conversy.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Card() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Outfit',sans-serif] overflow-x-hidden">
      <Helmet>
        <title>Paul Conversy — Founder at SENS</title>
        <meta name="description" content="Paul Conversy — Founder at SENS. The Connection Layer for Live Events." />
      </Helmet>

      <div className="relative min-h-screen flex flex-col md:flex-row">
        {/* Portrait */}
        <div className="relative w-full md:w-1/2 h-[60vh] md:h-screen md:sticky md:top-0 overflow-hidden">
          <img
            src={portrait}
            alt="Paul Conversy portrait"
            width={1024}
            height={1536}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:hidden" />
          <div
            className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, #FF416C 0%, transparent 70%)" }}
          />
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: "linear-gradient(90deg,#FF416C,#FF6B35)" }}
            />
            <span className="font-logo text-sm tracking-[0.3em] uppercase">SENS</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 md:w-1/2 flex items-center justify-center px-6 py-10 md:py-16 md:px-12 -mt-24 md:mt-0 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 md:p-9 shadow-[0_20px_80px_-20px_rgba(255,65,108,0.35)]"
          >
            <div className="mb-6">
              <h1 className="font-logo font-extrabold text-4xl md:text-5xl leading-[1.05] tracking-tight">
                {NAME}
              </h1>
              <p className="mt-3 text-base md:text-lg text-white/80 leading-snug">
                {TITLE}.{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#FF416C,#FF6B35)" }}
                >
                  The Connection Layer for Live Events.
                </span>
              </p>
              <p className="mt-4 text-sm text-white/60 leading-relaxed">
                I build spatial AI engines that turn live events into dynamic, measurable networks.
                We power real-time compatibility and connections.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/40">
                Paris · Seoul · Busan
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={downloadVCard}
                className="group inline-flex items-center justify-center gap-2 h-12 rounded-full text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_-10px_rgba(255,65,108,0.7)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                style={{ backgroundImage: "linear-gradient(90deg,#FF416C 0%,#FF6B35 100%)" }}
              >
                <Download className="h-4 w-4" />
                Save Contact
              </button>
              <a
                href={BOOKING}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 rounded-full text-sm font-semibold tracking-wide border border-white/20 text-white/90 hover:border-white/40 hover:bg-white/5 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Book a Meeting
              </a>
            </div>

            {/* Accordions */}
            <div className="mt-6 flex flex-col gap-2">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const isOpen = open === item.key;
                return (
                  <div
                    key={item.key}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : item.key)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/[0.03] transition-colors"
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                        style={{
                          background: isOpen
                            ? "linear-gradient(90deg,#FF416C,#FF6B35)"
                            : "rgba(255,255,255,0.06)",
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-sm font-medium text-white/90">{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-white/50 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="block px-4 pb-4 pl-16 text-sm text-white/70 hover:text-white break-all"
                          >
                            {item.value}
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/30 text-center">
              Digital Card · v1.0
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}