"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AIChatPage() {
  const { user } = useAuth();
  const chatId = user ? `${user.uid}_default` : "guest_chat";
  
  const { 
    messages, 
    setMessages, 
    input, 
    setInput, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    append 
  } = useChat({
    api: "/api/chat",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history on mount
  useEffect(() => {
    if (!user) return;
    const loadChat = async () => {
      try {
        const chatDoc = await getDoc(doc(db, "chats", chatId));
        if (chatDoc.exists()) {
          const data = chatDoc.data();
          if (data.messages && Array.isArray(data.messages)) {
            setMessages(data.messages);
          }
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };
    loadChat();
  }, [user, chatId, setMessages]);

  // Save chat history when messages change
  useEffect(() => {
    if (!user || messages.length === 0) return;
    const saveChat = async () => {
      try {
        await setDoc(doc(db, "chats", chatId), {
          userId: user.uid,
          messages,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      } catch (error) {
        console.error("Error saving chat history:", error);
      }
    };
    saveChat();
  }, [messages, user, chatId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Study Assistant</h1>
        <p className="text-muted-foreground mt-1">Ask questions, generate practice quizzes, or summarize your notes.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 space-y-6 pb-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <Bot className="w-16 h-16 text-primary/20 mb-4" />
            <p>How can I help you study today?</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl w-full">
              <Button 
                variant="outline" 
                className="justify-start bg-card/50" 
                onClick={() => append({ role: "user", content: "Summarize the concept of Thermodynamics" })}
              >
                Summarize Thermodynamics
              </Button>
              <Button 
                variant="outline" 
                className="justify-start bg-card/50" 
                onClick={() => append({ role: "user", content: "Generate a 5-question math quiz" })}
              >
                Generate Math Quiz
              </Button>
              <Button 
                variant="outline" 
                className="justify-start bg-card/50" 
                onClick={() => append({ role: "user", content: "Explain quantum mechanics to a 10 year old" })}
              >
                Explain Quantum Mechanics
              </Button>
              <Button 
                variant="outline" 
                className="justify-start bg-card/50" 
                onClick={() => append({ role: "user", content: "How do I build a study schedule?" })}
              >
                Create a Study Schedule
              </Button>
            </div>
          </div>
        )}
        
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-5 h-5 text-primary" />
              </div>
            )}
            <div
              className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card border border-border rounded-bl-sm"
              }`}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.content}
                </ReactMarkdown>
              </div>
            </div>
            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-card border border-border rounded-bl-sm flex items-center">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 relative">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="flex-1 rounded-full border border-border bg-card/50 backdrop-blur-sm px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-lg"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-2 bottom-2 rounded-full w-10 h-10 p-0 shadow-md transition-transform hover:scale-105">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
