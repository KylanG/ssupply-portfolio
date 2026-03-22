import { useEffect, useState, useRef } from 'react'

const ARTIST_ID = '3TVXtAsR1Inumwj472S9r4' // Replace with your Spotify artist ID

export default function MusicSection({ darkMode }) {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalAlbum, setModalAlbum] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const dragDelta = useRef(0)

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

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setModalAlbum(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  function goTo(index) {
    if (index < 0) index = 0
    if (index >= albums.length) index = albums.length - 1
    setCurrentIndex(index)
  }

  // Mouse drag handlers
  function onMouseDown(e) {
    isDragging.current = true
    startX.current = e.clientX
    dragDelta.current = 0
  }

  function onMouseMove(e) {
    if (!isDragging.current) return
    dragDelta.current = e.clientX - startX.current
  }

  function onMouseUp() {
    if (!isDragging.current) return
    isDragging.current = false
    if (dragDelta.current < -60) goTo(currentIndex + 1)
    else if (dragDelta.current > 60) goTo(currentIndex - 1)
    dragDelta.current = 0
  }

  // Touch handlers
  function onTouchStart(e) {
    startX.current = e.touches[0].clientX
    dragDelta.current = 0
  }

  function onTouchMove(e) {
    dragDelta.current = e.touches[0].clientX - startX.current
  }

  function onTouchEnd() {
    if (dragDelta.current < -60) goTo(currentIndex + 1)
    else if (dragDelta.current > 60) goTo(currentIndex - 1)
    dragDelta.current = 0
  }

  // Calculate transform for each card in the fan
  function getCardStyle(index) {
    const total = albums.length
    const relIndex = index - currentIndex

    // Fan spread: each card rotates and translates away from center
    const rotateZ = relIndex * 12        // tilt angle per step
    const translateX = relIndex * 60     // horizontal spread
    const translateY = Math.abs(relIndex) * 18  // cards behind sit lower
    const scale = relIndex === 0 ? 1 : Math.max(0.72, 1 - Math.abs(relIndex) * 0.1)
    const zIndex = total - Math.abs(relIndex)
    const opacity = Math.abs(relIndex) > 3 ? 0 : Math.max(0.5, 1 - Math.abs(relIndex) * 0.15)

    return {
      position: 'absolute',
      transform: `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`,
      transformOrigin: 'bottom center',
      zIndex,
      opacity,
      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
      cursor: relIndex === 0 ? 'pointer' : 'default',
    }
  }

  return (
    <section className={`relative py-24 transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>

      {/* Header */}
      <div className="text-center px-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-primary uppercase mb-4">
          Fresh Drops From The Studio
        </h2>
        <p className={`font-secondary text-base md:text-lg max-w-xl mx-auto mb-8 ${darkMode ? 'text-white/70' : 'text-black/60'}`}>
          A selection of my most recent music productions. From atmospheric soundscapes
          to heavy-hitting beats — this is what's been coming out of the studio lately.
        </p>

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

      {/* Carousel */}
      {loading && (
        <div className="flex justify-center items-center h-96">
          <span className={`font-secondary text-sm ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Loading releases...</span>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-96">
          <span className={`font-secondary text-sm ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <div className="relative flex flex-col items-center">

          {/* Fan container */}
          <div
            className="relative w-56 md:w-64 select-none"
            style={{ height: '280px' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {albums.map((album, index) => (
              <div
                key={album.id}
                style={getCardStyle(index)}
                className="w-56 md:w-64"
                onClick={() => {
                  if (index === currentIndex && dragDelta.current === 0) {
                    setModalAlbum(album)
                  } else if (index !== currentIndex) {
                    goTo(index)
                  }
                }}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-square shadow-2xl group">
                  <img
                    src={album.images[0]?.url}
                    alt={album.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Play overlay — only on active card */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl">
                        <svg className="w-6 h-6 text-black translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Album info */}
          <div className="mt-6 text-center h-12">
            {albums[currentIndex] && (
              <>
                <p className="font-primary uppercase text-sm">{albums[currentIndex].name}</p>
                <p className={`font-secondary text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
                  {albums[currentIndex].album_type.charAt(0).toUpperCase() + albums[currentIndex].album_type.slice(1)} · {albums[currentIndex].release_date.split('-')[0]}
                </p>
              </>
            )}
          </div>

          {/* Navigation dots */}
          <div className="flex gap-2 mt-4">
            {albums.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? `w-4 h-2 ${darkMode ? 'bg-white' : 'bg-black'}`
                    : `w-2 h-2 ${darkMode ? 'bg-white/30' : 'bg-black/20'}`
                }`}
              />
            ))}
          </div>

          {/* Arrow navigation */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                currentIndex === 0
                  ? darkMode ? 'border-white/20 text-white/20' : 'border-black/20 text-black/20'
                  : darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex === albums.length - 1}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                currentIndex === albums.length - 1
                  ? darkMode ? 'border-white/20 text-white/20' : 'border-black/20 text-black/20'
                  : darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalAlbum && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setModalAlbum(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className={`relative z-10 rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={modalAlbum.images[0]?.url}
                alt={modalAlbum.name}
                className="w-full aspect-square object-cover"
              />
              <button
                onClick={() => setModalAlbum(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="p-5">
              <p className="font-primary uppercase text-lg truncate mb-1">{modalAlbum.name}</p>
              <p className={`font-secondary text-xs mb-4 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
                {modalAlbum.album_type.charAt(0).toUpperCase() + modalAlbum.album_type.slice(1)} · {modalAlbum.release_date.split('-')[0]}
              </p>
              <a
                href={modalAlbum.external_urls.spotify}
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