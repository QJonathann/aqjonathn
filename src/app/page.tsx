import { TutorInterface } from "@/components/TutorInterface";
import { Sparkles, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-12">
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

      <footer className="pt-12 pb-8 text-center text-sm text-muted-foreground font-body opacity-60 border-t border-border/50">
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Wsparcie AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Edukacja 2.0</span>
          </div>
        </div>
        <p>© {new Date().getFullYear()} Korepetycje Online. Twoja droga do sukcesu.</p>
      </footer>
    </main>
  );
}
