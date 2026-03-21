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

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setActiveAlbum(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

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
            className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}
          >
            <span>All releases</span>
          </a>
          <a
            href="/music#about"
            className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${darkMode ? 'border-white text-white' : 'border-black text-black'}`}
          >
            <span>More about my music</span>
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
                onClick={() => { if (!isDragging) setActiveAlbum(album) }}
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
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
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

      {/* Modal */}
      {activeAlbum && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setActiveAlbum(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className={`relative z-10 rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm transition-colors duration-300 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Album art */}
            <div className="relative">
              <img
                src={activeAlbum.images[0]?.url}
                alt={activeAlbum.name}
                className="w-full aspect-square object-cover"
              />
              {/* Close button */}
              <button
                onClick={() => setActiveAlbum(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Album info + button */}
            <div className="p-5">
              <p className="font-primary uppercase text-lg truncate mb-1">{activeAlbum.name}</p>
              <p className={`font-secondary text-xs mb-4 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
                {activeAlbum.album_type.charAt(0).toUpperCase() + activeAlbum.album_type.slice(1)} · {activeAlbum.release_date.split('-')[0]}
              </p>

              <a
                href={activeAlbum.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}
              >
                <span>Luister op Spotify</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}