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

  useEffect(() => {
    async function fetchReleases() {
      try {
        const tokenRes = await fetch('/api/spotify-token')
        const tokenData = await tokenRes.json()
        if (!tokenData.access_token) throw new Error('No token')

        const res = await fetch(
          `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=album,single&market=NL&limit=6`,
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

  // Drag to scroll
  const onMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }
  const onMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    sliderRef.current.scrollLeft = scrollLeft - walk
  }
  const onMouseUp = () => setIsDragging(false)

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
                onClick={() => setActiveAlbum(activeAlbum?.id === album.id ? null : album)}
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
                      // Pause icon
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" rx="1"/>
                        <rect x="14" y="4" width="4" height="16" rx="1"/>
                      </svg>
                    ) : (
                      // Play icon
                      <svg className="w-6 h-6 text-black translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Album info */}
              <div className="mt-3 px-1">
                <p className={`font-primary uppercase text-sm truncate`}>{album.name}</p>
                <p className={`font-secondary text-xs mt-0.5 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
                  {album.album_type.charAt(0).toUpperCase() + album.album_type.slice(1)} · {album.release_date.split('-')[0]}
                </p>
              </div>

              {/* Spotify embed */}
              {activeAlbum?.id === album.id && (
                <div className="mt-3 rounded-xl overflow-hidden">
                  <iframe
                    src={`https://open.spotify.com/embed/album/${album.id}?utm_source=generator&theme=${darkMode ? '0' : '1'}`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={album.name}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}