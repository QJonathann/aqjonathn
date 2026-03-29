import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Pencil, Sparkles } from "lucide-react";

interface ResultCardProps {
  content: string;
  type: "explanation" | "practice";
}

export function ResultCard({ content, type }: ResultCardProps) {
  return (
    <Card className="border-none shadow-2xl ring-1 ring-secondary/20 bg-white rounded-2xl overflow-hidden animate-fade-in">
      <CardHeader className="bg-secondary/5 border-b border-secondary/10 px-8 py-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-headline font-bold flex items-center gap-2 text-secondary">
            {type === "explanation" ? (
              <>
                <Lightbulb className="w-5 h-5" />
                Explanation
              </>
            ) : (
              <>
                <Pencil className="w-5 h-5" />
                Practice Problem
              </>
            )}
          </CardTitle>
          <div className="px-3 py-1 bg-white rounded-full border border-secondary/20 text-[10px] font-bold uppercase tracking-wider text-secondary/80 flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" />
            AI Generated
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="prose prose-slate max-w-none font-body text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground italic">
            Focus on your goals. We'll handle the complexity.
          </p>
          <div className="flex gap-2">
             {/* Future actions like 'Copy' or 'Save' could go here */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
