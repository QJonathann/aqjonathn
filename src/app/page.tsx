import { TutorInterface } from "@/components/TutorInterface";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-12 space-y-12">
        {/* AI Tutor Chat Interface */}
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