import { useEffect, useState, useRef } from 'react'

const ARTIST_ID = '3TVXtAsR1Inumwj472S9r4' // Replace with your Spotify artist ID

export default function MusicSection({ darkMode }) {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeAlbum, setActiveAlbum] = useState(null)
  const sliderRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const audioRef = useRef(null)
  const tokenRef = useRef(null)

  useEffect(() => {
    async function fetchReleases() {
      try {
        const tokenRes = await fetch('/api/spotify-token')
        const tokenData = await tokenRes.json()
        if (!tokenData.access_token) throw new Error('No token')
        tokenRef.current = tokenData.access_token

        const res = await fetch(
          `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=single&market=NL&limit=6`,
          { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
        )
        const data = await res.json()
        setAlbums(data.items || [])
      } catch (err) {
        setError('Could not load releases.')
      } finally {
        setLoading(false)
      }
    }
    fetchReleases()
  }, [])

  async function handlePlay(album) {
    // If same album is playing, pause it
    if (activeAlbum?.id === album.id) {
      audioRef.current?.pause()
      setActiveAlbum(null)
      return
    }

    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    try {
      // Fetch tracks for this album to get preview_url
      const res = await fetch(
        `https://api.spotify.com/v1/albums/${album.id}/tracks?market=NL&limit=1`,
        { headers: { Authorization: `Bearer ${tokenRef.current}` } }
      )
      const data = await res.json()
      const previewUrl = data.items?.[0]?.preview_url

      if (!previewUrl) {
        alert('No preview available for this release.')
        return
      }

      const audio = new Audio(previewUrl)
      audioRef.current = audio
      audio.play()
      setActiveAlbum(album)

      audio.addEventListener('ended', () => {
        setActiveAlbum(null)
        audioRef.current = null
      })
    } catch (err) {
      console.error('Playback error:', err)
    }
  }

  // Drag to scroll
  const onMouseDown = (e) => {
    setIsDragging(false)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }
  const onMouseMove = (e) => {
    if (!e.buttons) return
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    if (Math.abs(walk) > 5) setIsDragging(true)
    sliderRef.current.scrollLeft = scrollLeft - walk
  }
  const onMouseUp = () => setTimeout(() => setIsDragging(false), 0)

  return (
    <section className={`relative py-24 overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>

      {/* Header */}
      <div className="text-center px-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-primary uppercase mb-4">
          Fresh Drops From The Studio
        </h2>
        <p className={`font-secondary text-base md:text-lg max-w-xl mx-auto mb-8 ${darkMode ? 'text-white/70' : 'text-black/60'}`}>
          A selection of my most recent music productions. From atmospheric soundscapes
          to heavy-hitting beats — this is what's been coming out of the studio lately.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3 flex-wrap">
          <a
            href="/music#releases"
            className={`flex items-center gap-2 px-6 py-3 rounded-full border font-secondary leading-none transition-colors duration-300 ${
              darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'
            }`}
          >
            <span>All releases</span>
            <span>+</span>
          </a>
          <a
            href="/music#about"
            className={`flex items-center gap-2 px-6 py-3 rounded-full border font-secondary leading-none transition-colors duration-300 ${
              darkMode ? 'border-white text-white' : 'border-black text-black'
            }`}
          >
            <span>More about my music</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Slider */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <span className={`font-secondary text-sm ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Loading releases...</span>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-64">
          <span className={`font-secondary text-sm ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto px-8 pb-4 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {albums.map((album) => (
            <div
              key={album.id}
              className="relative flex-shrink-0 w-56 md:w-64 group"
            >
              {/* Album art */}
              <div
                className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer shadow-lg"
                onClick={() => { if (!isDragging) handlePlay(album) }}
              >
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl">
                    {activeAlbum?.id === album.id ? (
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" rx="1"/>
                        <rect x="14" y="4" width="4" height="16" rx="1"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-black translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Playing bars indicator */}
                {activeAlbum?.id === album.id && (
                  <div className="absolute bottom-3 left-3 flex items-end gap-0.5">
                    {[1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className="block w-1 bg-white rounded-full animate-bounce"
                        style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Album info */}
              <div className="mt-3 px-1">
                <p className="font-primary uppercase text-sm truncate">{album.name}</p>
                <p className={`font-secondary text-xs mt-0.5 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
                  {album.album_type.charAt(0).toUpperCase() + album.album_type.slice(1)} · {album.release_date.split('-')[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}