import { useEffect, useState, useRef, useCallback } from 'react'

const ARTIST_ID = '3TVXtAsR1Inumwj472S9r4' // Replace with your Spotify artist ID

export default function MusicSection({ darkMode }) {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalAlbum, setModalAlbum] = useState(null)
  const [centerIndex, setCenterIndex] = useState(0)
  const sliderRef = useRef(null)
  const cardRefs = useRef([])
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

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setModalAlbum(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Detect which card is closest to center of slider
  const updateCenterIndex = useCallback(() => {
    const slider = sliderRef.current
    if (!slider || cardRefs.current.length === 0) return
    const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2
    let closestIndex = 0
    let closestDistance = Infinity
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - sliderCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = i
      }
    })
    setCenterIndex(closestIndex)
  }, [])

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    slider.addEventListener('scroll', updateCenterIndex, { passive: true })
    return () => slider.removeEventListener('scroll', updateCenterIndex)
  }, [updateCenterIndex])

  // Set center index after albums load
  useEffect(() => {
    if (albums.length > 0) setTimeout(updateCenterIndex, 100)
  }, [albums, updateCenterIndex])

  // Get 3D transform based on distance from center
  function getCardStyle(index) {
    const distance = index - centerIndex
    const absDistance = Math.abs(distance)
    const rotateY = distance * 18
    const translateX = distance * 8
    const scale = absDistance === 0 ? 1 : absDistance === 1 ? 0.88 : 0.76
    const translateZ = absDistance === 0 ? 0 : absDistance === 1 ? -60 : -120
    const opacity = absDistance > 2 ? 0.4 : absDistance === 2 ? 0.6 : absDistance === 1 ? 0.85 : 1
    const zIndex = 10 - absDistance

    return {
      transform: `perspective(1000px) rotateY(${rotateY}deg) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease',
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
    <section className={`relative py-24 transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>

      {/* Header */}
      <div className="text-center px-6 mb-12">
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
          className="flex gap-5 overflow-x-auto px-[40%] pb-8 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {albums.map((album, index) => (
            <div
              key={album.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative flex-shrink-0 w-56 md:w-64"
              style={getCardStyle(index)}
            >
              {/* Album art */}
              <div
                className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer shadow-2xl group"
                onClick={() => { if (!isDragging) setModalAlbum(album) }}
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
                    <svg className="w-6 h-6 text-black translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Album info — only show for center card */}
              <div className={`mt-3 px-1 transition-opacity duration-300 ${index === centerIndex ? 'opacity-100' : 'opacity-0'}`}>
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