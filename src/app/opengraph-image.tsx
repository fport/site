import { ImageResponse } from 'next/og';
import { site } from '@/site';

export const alt = `${site.name} — ${site.role} & Full-stack Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The card that shows up when the site is shared or previewed in search.
 *
 * Deliberately built from system fonts and flat colour: fetching a webfont at
 * build time is one more thing that can fail a deploy, and the molokai palette
 * carries the identity on its own.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1b1d1e',
          padding: '80px',
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, color: '#f8f8f2', letterSpacing: '-0.02em' }}>
            {site.name}
          </div>
          {/* Satori needs an explicit display on any node with more than one
              child, and the interpolation below counts as two. */}
          <div style={{ display: 'flex', marginTop: 20, fontSize: 40, color: '#fd971f' }}>
            {`${site.role} · Full-stack Engineer`}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: '#7e8e91',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Full-stack TypeScript, AI-native products, and notes on building with LLMs.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: '#fd971f',
            }}
          />
          <div style={{ fontSize: 28, color: '#7e8e91' }}>getporti.com</div>
        </div>
      </div>
    ),
    size
  );
}
