import { SiteShell } from '@/components/site-shell';

export default function NoteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell>{children}</SiteShell>;
}
