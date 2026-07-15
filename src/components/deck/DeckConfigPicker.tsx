import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BRANDS = ["Samsung", "Louis Vuitton", "Hyundai", "Chanel", "CJ Group"];
const AVATARS = ["K-Pop Idols", "Fashion Icons", "Racing Legends", "Parisian Artists", "K-Drama Stars"];
const STRATEGIES = ["Tech Interests", "Style Preferences", "Travel Destinations", "Creative Taste", "Favourite Films"];
const ICEBREAKERS = ["Innovation Challenges", "Design Challenges", "Road Trip Trivia", "Fragrance Pairing", "Scene Re-enactments"];

const COLUMNS = [
  { label: "Brand", items: BRANDS },
  { label: "AI Avatars", items: AVATARS },
  { label: "Matching", items: STRATEGIES },
  { label: "Icebreaker", items: ICEBREAKERS },
];

// Horizontal tree geometry (desktop)
const ROW_H = 36; // height of each leaf row
const HEADER_OFFSET = 44; // column header + gap before first leaf
const COL_HEIGHT = HEADER_OFFSET + 5 * ROW_H; // 224px
const centerY = (idx: number) => HEADER_OFFSET + idx * ROW_H + ROW_H / 2;

const Connector = ({
  fromIdx,
  toIdx,
}: {
  fromIdx: number;
  toIdx: number;
}) => {
  const yFrom = centerY(fromIdx);
  const yTo = centerY(toIdx);
  const yTop = Math.min(yFrom, yTo);
  const yHeight = Math.max(1, Math.abs(yTo - yFrom));
  return (
    <div
      className="relative w-10 shrink-0"
      style={{ height: COL_HEIGHT }}
      aria-hidden
    >
      {/* left horizontal stub */}
      <motion.div
        className="absolute left-0 h-px bg-primary"
        style={{ width: "50%" }}
        animate={{ top: yFrom }}
        transition={{ duration: 0.3 }}
      />
      {/* vertical bridge */}
      <motion.div
        className="absolute w-px bg-primary"
        style={{ left: "calc(50% - 0.5px)" }}
        animate={{ top: yTop, height: yHeight }}
        transition={{ duration: 0.3 }}
      />
      {/* right horizontal stub */}
      <motion.div
        className="absolute right-0 h-px bg-primary"
        style={{ width: "50%" }}
        animate={{ top: yTo }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

const HorizontalTree = ({
  indices,
  onSelect,
}: {
  indices: number[];
  onSelect: (colIdx: number, itemIdx: number) => void;
}) => {
  return (
    <div className="hidden md:flex items-start justify-center gap-0 overflow-x-auto">
      {/* Root */}
      <div
        className="relative shrink-0 w-24"
        style={{ height: COL_HEIGHT }}
      >
        <motion.div
          className="absolute left-0 right-2 flex items-center justify-center"
          animate={{ top: centerY(indices[0]) - 18 }}
          transition={{ duration: 0.3 }}
          style={{ height: 36 }}
        >
          <div
            className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-sm whitespace-nowrap"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Event
          </div>
        </motion.div>
      </div>

      {COLUMNS.map((col, colIdx) => (
        <div key={col.label} className="flex items-start shrink-0">
          {/* connector from previous column (or root) into this column */}
          <Connector
            fromIdx={colIdx === 0 ? indices[0] : indices[colIdx - 1]}
            toIdx={indices[colIdx]}
          />

          {/* column: header + 5 leaves */}
          <div
            className="flex flex-col items-stretch shrink-0"
            style={{ height: COL_HEIGHT }}
          >
            <div className="h-8 mb-3 flex items-center justify-center">
              <div className="px-3 py-1 rounded-md border border-border bg-background text-[11px] font-semibold uppercase tracking-wide text-foreground whitespace-nowrap">
                {col.label}
              </div>
            </div>
            <div className="flex flex-col">
              {col.items.map((item, leafIdx) => {
                const isActive = indices[colIdx] === leafIdx;
                return (
                  <button
                    key={item}
                    onClick={() => onSelect(colIdx, leafIdx)}
                    style={{ height: ROW_H }}
                    className="flex items-center justify-center px-1 group"
                  >
                    <div
                      className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors w-full text-center ${
                        isActive
                          ? "bg-primary/10 border border-primary/40 text-foreground font-semibold"
                          : "border border-transparent text-muted-foreground/70 group-hover:text-foreground"
                      }`}
                    >
                      {item}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DeckConfigPicker = () => {
  const [indices, setIndices] = useState([0, 0, 0, 0]);

  const handleSelect = (colIdx: number, itemIdx: number) => {
    setIndices((prev) => {
      const next = [...prev];
      next[colIdx] = itemIdx;
      return next;
    });
  };

  const brand = BRANDS[indices[0]];
  const avatars = AVATARS[indices[1]].toLowerCase();
  const strategy = STRATEGIES[indices[2]].toLowerCase();
  const icebreaker = ICEBREAKERS[indices[3]].toLowerCase();

  const longest = (arr: string[]) =>
    arr.reduce((a, b) => (a.length >= b.length ? a : b));

  const AnimatedWord = ({
    value,
    reserve,
    gradient = false,
    muted = false,
  }: {
    value: string;
    reserve: string;
    gradient?: boolean;
    muted?: boolean;
  }) => (
    <span className="relative inline-grid align-baseline">
      {/* invisible sizer — reserves width of the longest option */}
      <span
        aria-hidden
        className="invisible whitespace-nowrap col-start-1 row-start-1"
      >
        {reserve}
      </span>
      <span className="col-start-1 row-start-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`whitespace-nowrap ${
              gradient
                ? "bg-clip-text text-transparent font-bold"
                : muted
                ? "text-foreground/80"
                : ""
            }`}
            style={
              gradient
                ? { backgroundImage: "var(--gradient-primary)" }
                : undefined
            }
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Natural sentence headline */}
      <div className="mb-6 min-h-[120px] flex items-center justify-center">
        <p className="text-center font-display text-lg sm:text-xl md:text-2xl font-bold leading-snug tracking-tight text-foreground max-w-2xl mx-auto">
          An event for{" "}
          <AnimatedWord value={brand} reserve={longest(BRANDS)} gradient />
          , with AI avatars of{" "}
          <AnimatedWord
            value={avatars}
            reserve={longest(AVATARS).toLowerCase()}
            muted
          />
          {" "}using{" "}
          <AnimatedWord
            value={strategy}
            reserve={longest(STRATEGIES).toLowerCase()}
            muted
          />
          {" "}to match attendees through{" "}
          <AnimatedWord
            value={icebreaker}
            reserve={longest(ICEBREAKERS).toLowerCase()}
            muted
          />.
        </p>
      </div>

      {/* Decision tree */}
      <div className="bg-card rounded-2xl shadow-card border border-border p-5 sm:p-8">
        {/* Desktop: horizontal Root → 4 sequential columns */}
        <HorizontalTree indices={indices} onSelect={handleSelect} />

        {/* Mobile: vertical stacked tree */}
        <div className="md:hidden flex flex-col gap-5">
          <div className="self-center">
            <div
              className="px-4 py-2 rounded-full text-sm font-semibold text-white"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Event
            </div>
          </div>
          {COLUMNS.map((col, colIdx) => (
            <div key={col.label} className="flex flex-col items-center gap-2">
              <div className="h-4 w-px bg-border" />
              <div className="px-3 py-1.5 rounded-md border border-border bg-background text-xs font-semibold">
                {col.label}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {col.items.map((item, leafIdx) => {
                  const isActive = indices[colIdx] === leafIdx;
                  return (
                    <button
                      key={item}
                      onClick={() => handleSelect(colIdx, leafIdx)}
                      className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap ${
                        isActive
                          ? "bg-primary/10 border border-primary/40 text-foreground font-semibold"
                          : "border border-border text-muted-foreground"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeckConfigPicker;