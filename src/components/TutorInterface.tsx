"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Loader2, 
  Send, 
  Atom, 
  User, 
  Bot, 
  Sparkles,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateConceptExplanation } from "@/ai/flows/generate-concept-explanation";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "explanation" | "contact";
  subject?: string;
};

export function TutorInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("Mathematics");
  const [requestType, setRequestType] = useState<"explanation" | "contact">("explanation");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      // W obu przypadkach używamy flow wyjaśnienia, ale z różnym kontekstem
      const res = await generateConceptExplanation({
        subject,
        concept: requestType === "contact" ? "Zapytanie ogólne/Kontakt" : "Wyjaśnienie zagadnienia",
        question: currentInput,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: res.explanation,
        type: requestType,
        subject,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to get response", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[650px] w-full border rounded-[2rem] overflow-hidden bg-white shadow-2xl ring-1 ring-border/50">
      {/* Chat Header / Settings */}
      <div className="p-4 border-b bg-slate-50/80 backdrop-blur-sm flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-border/50 shadow-sm">
            <Atom className="w-4 h-4 text-primary" />
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-[140px] h-7 border-none shadow-none focus:ring-0 text-sm font-semibold p-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Matematyka</SelectItem>
                <SelectItem value="Physics">Fizyka</SelectItem>
                <SelectItem value="Chemistry">Chemia</SelectItem>
                <SelectItem value="Biology">Biologia</SelectItem>
                <SelectItem value="Informatics">Informatyka</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-200/50 p-1 rounded-xl">
           <button 
             onClick={() => setRequestType("explanation")}
             className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
               requestType === "explanation" 
               ? "bg-white text-primary shadow-sm" 
               : "text-muted-foreground hover:text-foreground"
             }`}
           >
             <BookOpen size={14} />
             Nauka
           </button>
           <button 
             onClick={() => setRequestType("contact")}
             className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
               requestType === "contact" 
               ? "bg-white text-secondary shadow-sm" 
               : "text-muted-foreground hover:text-foreground"
             }`}
           >
             <MessageSquare size={14} />
             Kontakt / Pytania
           </button>
        </div>
      </div>

      {/* Message Area */}
      <ScrollArea className="flex-1 bg-slate-50/30">
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4 animate-fade-in">
              <div className="p-4 bg-primary/10 rounded-3xl">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">Cześć! W czym mogę pomóc?</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Wybierz tryb **Nauka**, aby otrzymać wyjaśnienie zagadnienia, lub **Kontakt / Pytania**, jeśli masz inne zapytanie.
                </p>
              </div>
            </div>
          )}
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} animate-fade-in`}>
              <Avatar className={`w-9 h-9 shadow-md shrink-0 ${msg.role === "user" ? "bg-primary" : "bg-secondary"}`}>
                <AvatarFallback className="text-white">
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </AvatarFallback>
              </Avatar>
              
              <div className={`flex flex-col space-y-1.5 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white text-foreground border border-border/50 rounded-tl-none"
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
                {msg.role === "assistant" && (
                   <div className="flex items-center gap-2 px-1">
                     <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
                       <Sparkles size={10} className="text-secondary" />
                       AI Korepetytor
                     </span>
                     <span className="text-[10px] text-muted-foreground/40">•</span>
                     <span className="text-[10px] text-muted-foreground font-medium italic">
                       {msg.type === "explanation" ? "Wyjaśnienie" : "Kontakt"}
                     </span>
                   </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-4 animate-pulse">
              <Avatar className="w-9 h-9 bg-secondary">
                <AvatarFallback className="text-white"><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div className="bg-white border border-border/50 px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Generuję odpowiedź...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-6 border-t bg-white">
        <div className="max-w-3xl mx-auto relative flex items-center gap-3">
          <div className="relative flex-1">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={requestType === "explanation" ? "Zadaj pytanie naukowe..." : "Napisz wiadomość lub pytanie..."}
              className="w-full h-14 pl-6 pr-14 text-base rounded-2xl border-border/60 bg-slate-50/50 focus-visible:ring-primary/20 focus-visible:bg-white transition-all shadow-inner"
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim() || loading}
              size="icon"
              className="absolute right-2 top-2 h-10 w-10 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-4 font-medium opacity-60">
          Użyj trybu Kontakt, aby zapytać o lekcje, dostępność lub inne kwestie organizacyjne.
        </p>
      </div>
    </div>
  );
}
