import { useState, useEffect, useRef, useCallback } from "react";

const BRANDS = ["Samsung", "Louis Vuitton", "Hyundai", "Chanel", "CJ Group"];
const AVATARS = ["K-Pop Idols", "Fashion Icons", "Racing Legends", "Parisian Artists", "K-Drama Stars"];
const STRATEGIES = ["Tech Interests", "Style Preferences", "Travel Destinations", "Creative Taste", "Favourite Films"];
const ICEBREAKERS = ["Innovation Challenges", "Design Challenges", "Road Trip Trivia", "Fragrance Pairing", "Scene Re-enactments"];

const COLUMNS = [
  { label: "Brand", items: BRANDS },
  { label: "AI Avatars", items: AVATARS },
  { label: "Matching Strategy", items: STRATEGIES },
  { label: "Icebreaker Style", items: ICEBREAKERS },
];

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 5;
const RADIUS = (ITEM_HEIGHT * VISIBLE_ITEMS) / Math.PI;

interface PickerColumnProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  label: string;
  isLast: boolean;
}

const PickerColumn = ({ items, selectedIndex, onSelect, label, isLast }: PickerColumnProps) => {
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startAngle = useRef(0);
  const currentAngle = useRef(selectedIndex * (360 / items.length));
  const wheelRef = useRef<HTMLDivElement>(null);
  const anglePerItem = 360 / items.length;

  useEffect(() => {
    currentAngle.current = selectedIndex * anglePerItem;
    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
      wheelRef.current.style.transform = `rotateX(${-currentAngle.current}deg)`;
    }
  }, [selectedIndex, anglePerItem]);

  const snapToNearest = useCallback((angle: number) => {
    const snapped = Math.round(angle / anglePerItem) * anglePerItem;
    let idx = ((snapped / anglePerItem) % items.length + items.length) % items.length;
    idx = Math.round(idx);
    onSelect(idx);
  }, [anglePerItem, items.length, onSelect]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startAngle.current = currentAngle.current;
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaY = e.clientY - startY.current;
    const deltaAngle = (deltaY / ITEM_HEIGHT) * anglePerItem;
    currentAngle.current = startAngle.current - deltaAngle;
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotateX(${-currentAngle.current}deg)`;
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    snapToNearest(currentAngle.current);
  };

  return (
    <div
      className={`flex-1 relative h-full cursor-grab active:cursor-grabbing select-none ${!isLast ? "border-r border-border" : ""}`}
      style={{ perspective: "1000px", touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="listbox"
      aria-label={`Select ${label}`}
      aria-activedescendant={`picker-${label}-${selectedIndex}`}
      tabIndex={0}
    >
      <div className="absolute top-0 left-0 w-full text-center pt-2 z-20">
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">{label}</span>
      </div>
      <div
        ref={wheelRef}
        className="absolute top-1/2 left-0 w-full pointer-events-none"
        style={{
          height: ITEM_HEIGHT,
          marginTop: -ITEM_HEIGHT / 2,
          transformStyle: "preserve-3d",
          transform: `rotateX(${-currentAngle.current}deg)`,
        }}
      >
        {items.map((item, i) => {
          const angle = i * anglePerItem;
          const isActive = i === selectedIndex;
          return (
            <div
              key={item}
              id={`picker-${label}-${i}`}
              role="option"
              aria-selected={isActive}
              className={`absolute top-0 left-0 w-full flex items-center justify-center text-center px-3 transition-colors duration-200 ${
                isActive ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
              style={{
                height: ITEM_HEIGHT,
                backfaceVisibility: "hidden",
                transform: `rotateX(${angle}deg) translateZ(${RADIUS}px)`,
                fontSize: "14px",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EventPicker = () => {
  const [indices, setIndices] = useState([0, 0, 0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isPaused) return;
    const intervals = COLUMNS.map((col, colIdx) => {
      const delay = 2000 + colIdx * 700;
      return setInterval(() => {
        setIndices((prev) => {
          const next = [...prev];
          next[colIdx] = (next[colIdx] + 1) % col.items.length;
          return next;
        });
      }, delay);
    });
    return () => intervals.forEach(clearInterval);
  }, [isPaused]);

  const handleSelect = (colIdx: number, itemIdx: number) => {
    setIsPaused(true);
    setIndices((prev) => {
      const next = [...prev];
      next[colIdx] = itemIdx;
      return next;
    });
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setIsPaused(false), 5000);
  };

  const brand = BRANDS[indices[0]];
  const avatars = AVATARS[indices[1]].toLowerCase();
  const strategy = STRATEGIES[indices[2]].toLowerCase();

  return (
    <div className="w-full">
      {/* Dynamic headline */}
      <div className="text-center mb-8 min-h-[80px] flex items-center justify-center">
        <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-snug tracking-tight text-foreground max-w-2xl mx-auto">
          An event for{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
            {brand}
          </span>
          , with AI avatars of{" "}
          <span className="text-foreground/80">{avatars}</span> using{" "}
          <span className="text-foreground/80">{strategy}</span> to match attendees.
        </p>
      </div>

      {/* Picker wheel */}
      <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8 max-w-3xl mx-auto">
        <div
          className="relative overflow-hidden mx-auto"
          style={{
            height: ITEM_HEIGHT * VISIBLE_ITEMS,
            maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          }}
        >
          {/* Selection overlay */}
          <div
            className="absolute left-0 w-full z-10 pointer-events-none border-y border-border/40"
            style={{
              top: "50%",
              height: ITEM_HEIGHT,
              marginTop: -ITEM_HEIGHT / 2,
              background: "hsl(var(--muted) / 0.3)",
            }}
          />
          <div className="flex h-full">
            {COLUMNS.map((col, i) => (
              <PickerColumn
                key={col.label}
                label={col.label}
                items={col.items}
                selectedIndex={indices[i]}
                onSelect={(idx) => handleSelect(i, idx)}
                isLast={i === COLUMNS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPicker;
