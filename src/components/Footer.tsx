import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-card/50 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-primary-foreground rotate-45" />
              </div>
              <span className="text-2xl font-black italic uppercase tracking-tighter">
                Cosmic<span className="text-primary/50">Gutter</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed font-medium">
              Precision dispatching and logistics management. Built for
              high-performance fleet operations and real-time scheduling.
            </p>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
              Resources
            </h4>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <a
                  href="https://radar.weather.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <div className="w-1 h-1 bg-blue-500 rounded-full" /> Local
                  Radar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <div className="w-1 h-1 bg-amber-500 rounded-full" /> Crew
                  Safety
                </a>
              </li>
            </ul>
          </div>

          {/* System Status */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
              System
            </h4>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase text-emerald-600">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
            © {currentYear} CosmicGutter Technologies Inc.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[11px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[11px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
            >
              Terms
            </a>
            <div className="h-4 w-px bg-border" />
            <div className="flex gap-2">
              <div className="w-1 h-1 rounded-full bg-primary/20" />
              <div className="w-1 h-1 rounded-full bg-primary/40" />
              <div className="w-1 h-1 rounded-full bg-primary/60" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
