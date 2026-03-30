"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Loader2, 
  Send, 
  User, 
  Bot, 
  Sparkles,
  Cpu,
  Info
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
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  subject?: string;
};

export function TutorInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("Mathematics");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0 || loading) {
      scrollToBottom();
    }
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
      // AI działa teraz jako asystent organizacyjny
      const res = await generateConceptExplanation({
        subject,
        concept: "Zapytanie organizacyjne / Kontakt / Pomoc",
        question: currentInput,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: res.explanation,
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
      
      {/* Pasek Górny */}
      <div className="p-4 border-b bg-slate-50/80 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-border/50 shadow-sm">
            <Info className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-slate-700">Interesuje mnie:</span>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-[130px] h-7 border-none shadow-none focus:ring-0 text-sm font-semibold p-0 text-blue-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Matematyka</SelectItem>
                <SelectItem value="Physics">Fizyka</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Asystent Online</span>
        </div>
      </div>

      {/* Area Wiadomości */}
      <ScrollArea className="flex-1 bg-slate-50/30">
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4 animate-fade-in">
              <div className="p-4 bg-blue-100 rounded-3xl">
                <Cpu className="w-10 h-10 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-slate-800">Cześć! Tu Twój Asystent</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Pomogę Ci zarezerwować termin, wyjaśnię zasady współpracy lub odpowiem na pytania o materiały. W czym mogę dziś pomóc?
                </p>
              </div>
            </div>
          )}
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} animate-fade-in`}>
              <Avatar className={`w-9 h-9 shadow-md shrink-0 ${msg.role === "user" ? "bg-blue-600" : "bg-slate-800"}`}>
                <AvatarFallback className="text-white">
                  {msg.role === "user" ? <User size={16} /> : <Cpu size={16} />}
                </AvatarFallback>
              </Avatar>
              
              <div className={`flex flex-col space-y-1.5 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-white text-foreground border border-border/50 rounded-tl-none"
                }`}>
                  {msg.role === "user" ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <div className="[&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&_strong]:font-bold prose prose-sm">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
                {msg.role === "assistant" && (
                   <div className="flex items-center gap-2 px-1">
                     <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
                       <Sparkles size={10} className="text-blue-500" />
                       Sekretariat qJonathan
                     </span>
                   </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-4 animate-pulse">
              <Avatar className="w-9 h-9 bg-slate-200">
                <AvatarFallback className="text-white"><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div className="bg-white border border-border/50 px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-sm font-medium text-muted-foreground">Piszę...</span>
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
              placeholder="Napisz wiadomość lub pytanie..."
              className="w-full h-14 pl-6 pr-14 text-base rounded-2xl border-border/60 bg-slate-50/50 focus-visible:ring-blue-600/20 focus-visible:bg-white transition-all shadow-inner"
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim() || loading}
              size="icon"
              className="absolute right-2 top-2 h-10 w-10 rounded-xl shadow-lg bg-blue-600 hover:bg-blue-700 transition-all"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-4 font-medium opacity-60">
          Zadaj pytanie dotyczące lekcji, dostępności terminów lub darmowych materiałów.
        </p>
      </div>
    </div>
  );
}