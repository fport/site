'use client';

import { useTheme } from 'next-themes';
import { useEffect, useId, useRef, useState } from 'react';

type State =
  | { status: 'pending' }
  | { status: 'ready'; svg: string }
  | { status: 'error'; message: string };

/**
 * Renders a mermaid diagram. Written either as a ```mermaid fence or as
 * `<Mermaid chart="..." />`; the fence is routed here from `mdx-components.tsx`.
 *
 * mermaid is ~500 kB, so it is imported lazily — pages without a diagram never
 * download it.
 */
export function Mermaid({ chart, title }: { chart: string; title?: string }) {
  const [state, setState] = useState<State>({ status: 'pending' });
  const { resolvedTheme } = useTheme();
  const reactId = useId();
  const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const source = chart.trim();
  const isDark = resolvedTheme === 'dark';

  // The canvas and the mobile list are both in the DOM, one hidden by CSS.
  // Gating on visibility means each diagram renders once, and only when seen.
  const [visible, setVisible] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = hostRef.current;
    if (!element || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setVisible(true);
      },
      { rootMargin: '200px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: isDark ? 'dark' : 'neutral',
          fontFamily: 'inherit',
          fontSize: 13,
          flowchart: { curve: 'basis', padding: 8, useMaxWidth: true },
          sequence: { useMaxWidth: true },
          themeVariables: isDark
            ? { background: '#16161a', primaryColor: '#22222a', lineColor: '#6b6b7a' }
            : { background: '#ffffff', primaryColor: '#f6f4ee', lineColor: '#9a9384' },
        });
        const { svg } = await mermaid.render(id, source);
        if (!cancelled) setState({ status: 'ready', svg });
      } catch (error) {
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Could not render diagram',
          });
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [source, isDark, id, visible]);

  return (
    <figure className="my-4 overflow-hidden rounded-lg border border-card-border bg-card not-prose">
      {title ? (
        <figcaption className="border-b border-card-border/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted">
          {title}
        </figcaption>
      ) : null}
      <div ref={hostRef} className="overflow-x-auto p-3 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full">
        {state.status === 'ready' ? (
          <div dangerouslySetInnerHTML={{ __html: state.svg }} />
        ) : state.status === 'error' ? (
          <div className="space-y-1">
            <p className="text-[12px] text-muted">Diagram failed to render.</p>
            <pre className="!my-0 whitespace-pre-wrap text-[11px]">{state.message}</pre>
          </div>
        ) : (
          <div className="animate-pulse text-[12px] text-muted">Rendering diagram…</div>
        )}
      </div>
    </figure>
  );
}
