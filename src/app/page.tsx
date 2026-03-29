import { TutorInterface } from "@/components/TutorInterface";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* --- NAGŁÓWEK --- */}
<header className="w-full bg-white/80 backdrop-blur-md border-b border-border/50 py-4 px-4 sticky top-0 z-50 shadow-sm/50">        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo (kieruje na stronę główną) */}
          <a href="https://www.qjonathan.pl" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg md:text-xl font-bold text-slate-800 leading-tight">
                Korepetycje <span className="text-blue-600">Online</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
                Fizyka • Matematyka
              </span>
            </div>
          </a>

          {/* Nawigacja (ukryta na bardzo małych ekranach, widoczna na większych) */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="https://www.qjonathan.pl/o-mnie" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">O mnie</a>
            <a href="https://www.qjonathan.pl/aktualnosci" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Aktualności</a>
            <a href="https://www.qjonathan.pl/poradniki" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Poradniki</a>
            <a href="https://www.qjonathan.pl/materialy" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Materiały</a>
            <a href="https://www.qjonathan.pl/gwarancja-jakosci" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Gwarancja jakości</a>
            <a href="https://www.qjonathan.pl/kontakt" className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all">
              Kontakt
            </a>
          </div>

          {/* Przycisk kontaktu dla urządzeń mobilnych */}
          <div className="lg:hidden flex items-center">
             <a href="https://www.qjonathan.pl/kontakt" className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors">
              Kontakt
            </a>
          </div>

        </div>
      </header>

      {/* --- GŁÓWNA ZAWARTOŚĆ --- */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-12 space-y-12">
        <section className="animate-fade-in">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Twój Inteligentny <span className="text-primary">Korepetytor</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Zadawaj pytania, proś o wyjaśnienia lub generuj zadania do ćwiczeń w czasie rzeczywistym.
            </p>
          </div>
          <TutorInterface />
        </section>
      </main>

      {/* --- STOPKA --- */}
      <footer className="w-full bg-[#0b1120] text-white py-10 px-4 mt-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <GraduationCap className="w-7 h-7 text-blue-400" />
                <span className="text-lg font-semibold">Korepetycje Online</span>
              </div>
              <p className="text-slate-400 text-sm">Korepetycje z fizyki i matematyki</p>
            </div>

            <div className="text-center">
              <h4 className="font-semibold mb-4 text-white">Kontakt</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-400">
                <a href="tel:+48796305827" className="hover:text-white transition-colors">
                  +48 796 305 827
                </a>
                <a href="mailto:contact.qjonathan@gmail.com" className="hover:text-white transition-colors">
                  contact.qjonathan@gmail.com
                </a>
              </div>
            </div>

            <div className="text-center">
              <h4 className="font-semibold mb-4 text-white">Zasady i bezpieczeństwo</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-400">
                <a href="https://www.qjonathan.pl/warunki-swiadczenia-uslug" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Warunki świadczenia usług
                </a>
                <a href="https://www.qjonathan.pl/polityka-prywatnosci" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Polityka prywatności
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/60 pt-6 text-center">
            <p className="text-sm text-slate-500">
              © 2026 qJonathan.pl Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}