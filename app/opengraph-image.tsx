import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/seo';

export const alt = `${SITE_NAME} — SEO, AEO, and GEO`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 28, marginTop: 16, opacity: 0.9 }}>SEO · AEO · GEO</div>
      </div>
    ),
    { ...size }
  );
}
