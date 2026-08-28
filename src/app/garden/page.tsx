import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { SiteShell } from '@/components/site-shell';
import { gardens } from '@/garden';

export const metadata: Metadata = {
  title: 'Garden',
  description:
    'Whiteboards of working notes, schemas and open questions — half-finished on purpose.',
  alternates: { canonical: '/garden' },
};

export default function GardenIndexPage() {
  return (
    <SiteShell>
      <nav className="pt-12 text-sm">
        <Link href="/" className="text-muted underline hover:text-foreground">
          ← Furkan Portakal
        </Link>
      </nav>

      <header className="mt-6">
        <h1 className="text-2xl font-medium leading-tight">Garden</h1>
        <p className="mt-2 leading-snug text-muted">
          Whiteboards rather than articles. Each one is a canvas of notes you can pan around —
          half-finished on purpose, and updated whenever I learn something.
        </p>
      </header>

      <ul className="mt-8 space-y-6">
        {gardens.map((garden) => (
          <li key={garden.id}>
            <Link href={garden.path} className="group block">
              <h2 className="font-medium text-link underline group-hover:text-link-hover">
                {garden.title}
              </h2>
              <p className="mt-1 leading-snug text-muted">{garden.tagline}</p>
            </Link>
            <p className="mt-1.5 text-sm text-muted">
              {garden.notes.length} notes ·{' '}
              {garden.clusters.map((cluster) => cluster.label).join(' · ')}
            </p>
          </li>
        ))}
      </ul>
    </SiteShell>
  );
}
