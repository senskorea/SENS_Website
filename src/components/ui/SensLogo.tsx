import { cn } from "@/lib/utils";

export const SensLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("sens-logo-container horizontal", className)}>
      <div className="logo-mark">
        <div className="logo-bar"></div>
        <div className="logo-bar"></div>
        <div className="logo-bar"></div>
        <div className="logo-bar"></div>
        <div className="logo-bar"></div>
      </div>
      <div className="logo-wordmark">Sens</div>
    </div>
  );
};
