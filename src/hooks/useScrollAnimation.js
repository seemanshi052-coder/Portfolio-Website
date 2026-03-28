import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook to handle intersection observer for scroll animations
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} - ref to attach to element and boolean indicating if element is in view
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.2,
      ...options,
    })

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [options])

  return [elementRef, isInView]
}

export default useScrollAnimation
