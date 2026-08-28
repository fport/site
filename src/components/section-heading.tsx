import { Link } from "next-view-transitions";

/**
 * A section title with an optional action pushed to the right margin, so the
 * eye lands on the label and the "see all" sits where the text block ends.
 * Matches the `h2` styling in `mdx-components.tsx`.
 */
export function SectionHeading({
  children,
  href,
  action = "see all",
}: {
  children: React.ReactNode;
  href?: string;
  action?: string;
}) {
  return (
    <div className="section-heading mt-8 mb-3 flex items-baseline justify-between gap-4">
      <h2 className="text-foreground font-medium">{children}</h2>
      {href ? (
        <Link
          href={href}
          className="shrink-0 text-sm text-muted underline transition-colors hover:text-foreground"
        >
          {action} →
        </Link>
      ) : null}
    </div>
  );
}
