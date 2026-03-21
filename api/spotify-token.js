export default async function handler(req, res) {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  
    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: 'Missing Spotify credentials' })
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
        return res.status(response.status).json({ error: data.error_description })
      }
  
      res.status(200).json({ access_token: data.access_token })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch token' })
    }
  }