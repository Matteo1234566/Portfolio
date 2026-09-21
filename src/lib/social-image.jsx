import { ImageResponse } from 'next/og';

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 };

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#f8fafc',
          color: '#0f172a',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            width: 28,
            height: '100%',
            background: '#6366f1',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '72px 78px 64px',
            width: 800,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 18, height: 18, background: '#6366f1', transform: 'rotate(45deg)' }} />
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>DEVOP.SBS</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 78,
                lineHeight: 0.96,
                fontWeight: 800,
                letterSpacing: '-0.055em',
              }}
            >
              <span>AI engineering,</span>
              <span>shipped end-to-end.</span>
            </div>
            <div style={{ fontSize: 27, lineHeight: 1.35, color: '#475569' }}>
              Computer vision · Custom software · Data engineering
            </div>
          </div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#1e1b4b' }}>
            Simone Zannini + Matteo Cese
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            right: -54,
            top: -24,
            width: 440,
            height: 680,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1e1b4b',
            transform: 'rotate(7deg)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 284,
              height: 284,
              border: '18px solid #f8fafc',
              color: '#f8fafc',
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: '-0.08em',
              transform: 'rotate(-7deg)',
            }}
          >
            D/OP
          </div>
        </div>
      </div>
    ),
    SOCIAL_IMAGE_SIZE,
  );
}
