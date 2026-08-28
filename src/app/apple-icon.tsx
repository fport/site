import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * Same mark as `icon.tsx`, at the size iOS asks for when someone saves the site
 * to a home screen. Without this the tile is a screenshot of the page.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
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
            width: 132,
            height: 132,
            borderRadius: '50%',
            background: '#fd971f',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: 94,
            width: 56,
            height: 34,
            borderRadius: '50%',
            background: '#a6e22e',
            transform: 'rotate(-28deg)',
          }}
        />
      </div>
    ),
    size
  );
}
