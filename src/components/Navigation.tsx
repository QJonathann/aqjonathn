"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "O mnie", href: "https://www.qjonathan.pl/o-mnie" },
    { name: "Aktualności", href: "https://www.qjonathan.pl/aktualnosci" },
    { name: "Poradniki", href: "https://www.qjonathan.pl/poradniki" },
    { name: "Materiały", href: "https://www.qjonathan.pl/materialy" },
    { name: "Gwarancja jakości", href: "https://www.qjonathan.pl/gwarancja-jakosci" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3 border-b border-border" 
          : "bg-white/80 backdrop-blur-xs py-4"
      )}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="https://www.qjonathan.pl/" className="flex items-center gap-3 group">
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-300">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground leading-tight">
                Korepetycje <span className="text-primary">Online</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
                Fizyka • Matematyka
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a href="https://www.qjonathan.pl/kontakt">
              <Button size="lg" className="rounded-xl px-8 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                Kontakt
              </Button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors bg-muted/50 rounded-lg"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <a href="https://www.qjonathan.pl/kontakt" className="w-full">
                <Button className="w-full py-6 text-lg font-bold rounded-xl mt-4">
                  Kontakt
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}