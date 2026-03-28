import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for lazy loading images with Intersection Observer
 * @param {string} src - Image source URL
 * @param {string} placeholder - Placeholder image (optional)
 */
export function useLazyImage(src, placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E') {
  const ref = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    // Create Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = src
            img.classList.remove('lazy')
            img.classList.add('loaded')
            setIsLoaded(true)
            observer.unobserve(img)
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01,
      }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [src])

  return { ref, isLoaded }
}

export default useLazyImage
