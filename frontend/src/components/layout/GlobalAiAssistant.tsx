import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { globalAiSuggestions, globalAiResponses } from '@/lib/app-data';
import { Sparkles, Send, X, ArrowRight } from 'lucide-react';

interface AssistantMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  data?: { label: string; value: string }[];
  action?: { label: string; link: string };
}

export function GlobalAiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSend(question: string) {
    if (!question.trim()) return;

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: question,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = globalAiResponses[question];
    setTimeout(() => {
      if (response) {
        setMessages((prev) => [
          ...prev,
          { id: `resp-${Date.now()}`, role: 'ai', text: response.text, data: response.data, action: response.action },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `resp-${Date.now()}`,
            role: 'ai',
            text: 'Based on current operational data, I recommend reviewing the active investigations on the dashboard. The most critical issue is the revenue decline in the North region, traced to a Warehouse B bottleneck.',
            data: [
              { label: 'Active investigations', value: '8' },
              { label: 'Critical signals', value: '3' },
            ],
            action: { label: 'Go to dashboard', link: '/dashboard' },
          },
        ]);
      }
      setIsTyping(false);
    }, 800);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl border border-primary/30 bg-card px-4 py-2.5 shadow-xl transition-all hover:bg-card/80',
          open && 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="text-xs font-semibold text-foreground">OPDOME AI</span>
      </button>

      {/* Side panel */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[500px] w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-xl border border-border bg-popover shadow-2xl animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Ask OPDOME</h3>
                <p className="text-[10px] text-muted-foreground">Business operations assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div>
                <p className="mb-3 text-xs text-muted-foreground">Ask me about your business operations. Try:</p>
                <div className="space-y-1.5">
                  {globalAiSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-left text-[11px] text-muted-foreground transition-colors hover:border-primary/20 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={cn('flex flex-col gap-1.5', msg.role === 'user' ? 'items-end' : 'items-start')}>
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
                    <div className="flex flex-wrap gap-1.5">
                      {msg.data.map((d, i) => (
                        <div key={i} className="rounded-md border border-border bg-background/50 px-2 py-1">
                          <span className="text-[10px] text-muted-foreground">{d.label}: </span>
                          <span className="text-[10px] font-medium text-foreground tabular-nums">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.action && (
                    <button
                      onClick={() => { navigate(msg.action!.link); setOpen(false); }}
                      className="flex items-center gap-1 text-[11px] font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      {msg.action.label}
                      <ArrowRight className="h-3 w-3" />
                    </button>
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
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask OPDOME..."
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
        </div>
      )}
    </>
  );
}
