import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * The tab icon: porti, which is what portakal shortens to.
 *
 * Generated rather than committed as a binary so it stays in the same palette
 * as the rest of the site, and drawn with plain boxes — at 32px an emoji or a
 * glyph turns to mush, a filled circle does not.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1b1d1e',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: '#fd971f',
        }}
      />
      {/* The leaf. Small enough to read as a notch rather than a shape. */}
      <div
        style={{
          position: 'absolute',
          top: 3,
          left: 17,
          width: 10,
          height: 6,
          borderRadius: '50%',
          background: '#a6e22e',
          transform: 'rotate(-28deg)',
        }}
      />
    </div>,
    size,
  );
}
