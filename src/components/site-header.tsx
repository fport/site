import { LanguageSwitcher } from '@/components/language-switcher';
import { SiteName } from '@/components/site-name';
import { ThemeToggle } from '@/components/theme-toggle';

/**
 * The one strip of chrome on the reading pages: the name on the left, the
 * language and theme as two bracketed words on the right. It sticks to the
 * top and lets the page show through, frosted (`.site-header` in
 * globals.css) — so it is invisible until there is something to scroll under
 * it, and then it reads as a surface rather than a bar.
 *
 * `className` sets the bleed: the shell pads by 8, the canvas list by 5, and
 * the header pulls itself back out to the edges so the frosting spans the
 * viewport.
 */
export function SiteHeader({ className = '-mx-8 px-8 md:-mt-8' }: { className?: string }) {
  return (
    <header className={`site-header sticky top-0 z-30 ${className}`}>
      <div className="mx-auto flex w-full max-w-[60ch] items-center justify-between gap-4 py-3">
        <SiteName />
        <div className="flex items-center gap-x-2 text-sm leading-5 text-muted">
          <Bracketed>
            <LanguageSwitcher />
          </Bracketed>
          <Bracketed>
            <ThemeToggle />
          </Bracketed>
        </div>
      </div>
    </header>
  );
}

function Bracketed({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center">
      <span aria-hidden="true">[</span>
      {children}
      <span aria-hidden="true">]</span>
    </span>
  );
}
