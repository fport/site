'use client';

import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { useState, useRef, useEffect, useMemo } from 'react';

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () => new TextStreamChatTransport({ api: '/api/chat' }),
    []
  );

  const { messages, sendMessage, status } = useChat({
    transport,
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed sm:absolute top-16 sm:top-14 left-4 sm:left-auto right-4 sm:right-0 w-auto sm:w-96 bg-white dark:bg-zinc-900 border border-muted/30 rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 dark:bg-zinc-800 px-4 py-3 border-b border-muted/20">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Ask Porti 🍊</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-foreground transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-muted text-sm py-8">
                <p>Hey! I&apos;m Porti 🍊</p>
                <p className="mt-1">Ask me about Furkan&apos;s work!</p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.role === 'user'
                      ? 'bg-foreground text-background'
                      : 'bg-foreground/10 text-foreground'
                  }`}
                >
                  {message.parts?.map((part, i) =>
                    part.type === 'text' ? <span key={i}>{part.text}</span> : null
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-foreground/10 rounded-lg px-3 py-2 text-sm text-muted">
                  <span className="animate-pulse">typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-muted/20 p-3 bg-gray-50 dark:bg-zinc-800">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white dark:bg-zinc-900 border border-muted/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-muted/50 placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-foreground text-background px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-foreground text-background rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center text-xl"
        aria-label="Open chat"
      >
        {isOpen ? '✕' : '🍊'}
      </button>
    </div>
  );
}
