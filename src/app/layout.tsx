import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { Inter } from 'next/font/google';
import './globals.css';

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
      <html lang="en" className={`${inter.className}`}>
        <body className="antialiased tracking-tight">
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-white text-gray-900">
            <main className="max-w-[60ch] mx-auto w-full space-y-6">
              {children}
            </main>
            <Footer />
          </div>
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
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}