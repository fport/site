import { notFound } from 'next/navigation';

/**
 * Anything the real routes did not match lands here, so the 404 renders
 * inside the locale layout — with the right language and the site chrome —
 * instead of Next's bare default.
 */
export default function CatchAllPage() {
  notFound();
}
