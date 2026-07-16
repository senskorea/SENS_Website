import { X } from "lucide-react";

interface EventBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

const EventBanner = ({ isVisible, onClose }: EventBannerProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-primary text-primary-foreground">
      <div className="container relative flex items-center justify-center min-h-[40px] px-8 py-2">
        <a 
          href="https://luma.com/b0vqlnzn" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <span className="animate-pulse">🔴</span>
          Experience SENS live in Seoul. Apply for Solo Vibing (Aug 1) &rarr;
        </a>
        <button 
          onClick={onClose}
          className="absolute right-4 p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EventBanner;
