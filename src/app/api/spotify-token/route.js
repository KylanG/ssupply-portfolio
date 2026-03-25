import { NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Missing Spotify credentials' }, { status: 500 })
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.error_description }, { status: response.status })
    }

    return NextResponse.json({ access_token: data.access_token })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 })
  }
}
