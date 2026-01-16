import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers';
import { ThemeToggle } from './theme-toggle';
import { ChatBubble } from './components/chat-bubble';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://getporti.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Furkan Portakal',
    template: '%s | Furkan Portakal',
  },
  description: 'Frontend developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
        <body className="antialiased tracking-tight">
          <ThemeProvider>
            <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-background text-foreground">
              <main className="max-w-[60ch] mx-auto w-full space-y-6">
                {children}
                <Analytics />
              </main>
              <Footer />
            </div>
            <ChatBubble />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}

function Footer() {
  const links = [
    { name: 'x', url: 'https://x.com/getporti' },
    { name: 'youtube', url: 'https://www.youtube.com/@getporti' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/furkanportakal' },
    { name: 'github', url: 'https://github.com/fport' },
  ];

  return (
    <footer className="mt-12 max-w-[60ch] mx-auto w-full">
      <div className="flex justify-between items-center text-sm">
        <div className="flex space-x-4 tracking-tight">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground underline transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
}
