import { ScrollHint } from '@/components/scroll-hint';
import { SiteHeader } from '@/components/site-header';

/**
 * The reading shell used by every prose page: the frosted header, a narrow
 * measure, a footer of profile links and the scroll hint. The garden canvas
 * deliberately opts out of this so it can run full bleed.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col pt-0 md:pt-8 p-8 bg-background text-foreground">
        <SiteHeader />
        <main className="prose-flow max-w-[60ch] mx-auto w-full flex-1 pt-6">{children}</main>
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
  { name: 'huggingface', url: 'https://huggingface.co/fport' },
  { name: 'medium', url: 'https://medium.com/@furkanportakal' },
];

function SiteFooter() {
  return (
    <footer className="mt-8 max-w-[60ch] mx-auto w-full">
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm tracking-tight">
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
    </footer>
  );
}
