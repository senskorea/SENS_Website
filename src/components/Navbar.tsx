import { Button } from "@/components/ui/button";
import { NavLink, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const links = [
  { to: "/story", label: "What it is" },
  { to: "/demo", label: "Demo" },
  { to: "/work-with-us", label: "Event organisers" },
  { to: "/collab", label: "Investors" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors ${
    isActive
      ? "text-foreground font-semibold"
      : "text-muted-foreground hover:text-foreground"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-logo text-xl font-extrabold tracking-[0.15em] uppercase text-gradient-primary"
        >
          SENS
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild variant="hero" size="sm">
            <Link to="/work-with-us">Work with us</Link>
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-muted/50"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-6 pt-8">
              <span className="font-logo text-xl font-extrabold tracking-[0.15em] uppercase text-gradient-primary">
                SENS
              </span>
              <div className="flex flex-col gap-4">
                {links.map((l) => (
                  <SheetClose asChild key={l.to}>
                    <NavLink to={l.to} className={linkClass}>
                      {l.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </div>
              <Button asChild variant="hero" size="lg" className="mt-2">
                <Link to="/work-with-us" onClick={() => setOpen(false)}>
                  Work with us
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
