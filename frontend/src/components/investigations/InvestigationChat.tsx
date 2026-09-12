import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  initialChatMessages,
  suggestedQuestions,
  aiResponses,
} from '@/lib/investigation-data';
import type { ChatMessage } from '@/types';
import { Send, Sparkles } from 'lucide-react';

export function InvestigationChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSend(question: string) {
    if (!question.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: question,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = aiResponses[question];
    setTimeout(() => {
      if (response) {
        setMessages((prev) => [...prev, { ...response, id: `resp-${Date.now()}` }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `resp-${Date.now()}`,
            role: 'ai',
            text: 'Based on the investigation data, this question requires deeper analysis. I recommend reviewing the timeline and AI reasoning sections for the available evidence.',
            data: [
              { label: 'Confidence', value: '87%' },
              { label: 'Data sources', value: '4' },
            ],
          },
        ]);
      }
      setIsTyping(false);
    }, 800);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Ask OPDOME</h3>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="mb-3 max-h-[280px] space-y-3 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex flex-col gap-1.5',
              msg.role === 'user' ? 'items-end' : 'items-start'
            )}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed',
                msg.role === 'user'
                  ? 'bg-accent text-accent-foreground'
                  : 'border border-border bg-background/50 text-foreground'
              )}
            >
              {msg.text}
            </div>
            {msg.data && (
              <div className="flex flex-wrap gap-2">
                {msg.data.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-md border border-border bg-background/50 px-2 py-1"
                  >
                    <span className="text-[10px] text-muted-foreground">{d.label}: </span>
                    <span className="text-[10px] font-medium text-foreground tabular-nums">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" style={{ animationDelay: '0.3s' }} />
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" style={{ animationDelay: '0.6s' }} />
          </div>
        )}
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="rounded-lg border border-border bg-background/50 px-2.5 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/20 hover:text-foreground"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask OPDOME about this investigation..."
          className="flex-1 rounded-lg border border-border bg-background py-2 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim() || isTyping}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
