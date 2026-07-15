import { motion } from "framer-motion";

const SignalMark = () => (
  <div className="flex items-end gap-[3px] h-8">
    {[0.4, 0.65, 1, 0.65, 0.4].map((h, i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full bg-gradient-to-t from-primary to-accent"
        initial={{ height: 0 }}
        animate={{ height: `${h * 100}%` }}
        transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease: "easeOut" }}
      />
    ))}
  </div>
);

const SensLaunchBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#050508]">
      {/* Gradient glow */}
      <div className="absolute inset-0 opacity-40" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(345 100% 63% / 0.15), transparent)"
      }} />
      <div className="absolute inset-0 opacity-30" style={{
        background: "radial-gradient(ellipse 40% 60% at 70% 40%, hsl(20 100% 60% / 0.1), transparent)"
      }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(hsl(345 100% 63% / 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(345 100% 63% / 0.3) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 sm:py-24 lg:py-28 max-w-5xl mx-auto min-h-[400px]">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70">
            Now Live
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50" />
        </motion.div>

        {/* Signal mark */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <SignalMark />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Introducing{" "}
          <span className="text-gradient-primary">SENS</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed mb-10 font-sans"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          The social infrastructure that turns every room into a network.
          Walk in a stranger. Leave with a story.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="https://spark-human-flow.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-primary text-white font-display font-semibold text-sm tracking-wide hover:shadow-[0_4px_20px_rgba(255,65,108,0.35)] transition-shadow duration-300"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          Discover SENS
          <span className="text-white/70">→</span>
        </motion.a>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default SensLaunchBanner;
