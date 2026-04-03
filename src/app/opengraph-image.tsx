import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: '#ffffff', fontSize: 96, fontWeight: 700, margin: 0 }}>
          SSUPPLY
        </p>
        <p style={{ color: '#888888', fontSize: 36, margin: '16px 0 0' }}>
          Front-end developer &amp; web designer · Rotterdam
        </p>
      </div>
    )
  )
}
