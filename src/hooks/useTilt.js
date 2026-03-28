import { useEffect, useRef } from 'react'

/**
 * Custom hook for 3D tilt effect based on mouse position
 * Applies CSS transform: perspective, rotateX, rotateY
 * @param {number} maxRotation - Maximum rotation angle in degrees (default: 10)
 * @param {boolean} enabled - Whether tilt effect is enabled (default: true)
 */
export function useTilt(maxRotation = 10, enabled = true) {
  const elementRef = useRef(null)

  useEffect(() => {
    if (!enabled || !elementRef.current) return

    const element = elementRef.current
    const rect = element.getBoundingClientRect()

    const handleMouseMove = (e) => {
      // Calculate mouse position relative to element center
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      // Calculate rotation angles based on mouse position
      const rotateY = (x / (rect.width / 2)) * maxRotation
      const rotateX = -(y / (rect.height / 2)) * maxRotation

      // Apply 3D transform
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
      element.style.transition = 'none'

      // Calculate shadow based on rotation (add depth)
      const shadowX = rotateY * 2
      const shadowY = rotateX * 2
      element.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 212, 255, 0.3)`
    }

    const handleMouseLeave = () => {
      // Reset to initial state with smooth transition
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
      element.style.transition = 'all 0.6s ease-out'
      element.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.2)'
    }

    const handleMouseEnter = () => {
      element.style.transition = 'none'
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [maxRotation, enabled])

  return elementRef
}
