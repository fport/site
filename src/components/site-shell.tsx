import { ScrollHint } from '@/components/scroll-hint';
import { ThemeToggle } from '@/components/theme-toggle';

/**
 * The reading shell used by every prose page: a narrow measure, a footer and
 * the scroll hint. The garden canvas deliberately opts out of this so it can
 * run full bleed.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-background text-foreground">
        <main className="max-w-[60ch] mx-auto w-full space-y-6">{children}</main>
        <SiteFooter />
      </div>
      <ScrollHint />
    </>
  );
}

const links = [
  { name: 'x', url: 'https://x.com/getporti' },
  { name: 'youtube', url: 'https://www.youtube.com/@getporti' },
  { name: 'linkedin', url: 'https://www.linkedin.com/in/furkanportakal' },
  { name: 'github', url: 'https://github.com/fport' },
];

function SiteFooter() {
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
