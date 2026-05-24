import { animate, stagger as animeStagger, set, remove } from 'animejs'

// Registro global para prevenir leaks
const scrollObserversMap = new Map()
const observerInstances = new Map()

export const useScrollAnimation = (targetSelector, options = {}) => {
  const {
    stagger = 100,
    threshold = 0.1,
    repeat = false 
  } = options

  const instanceId = Symbol()

  onMounted(() => {
    let lastY = 0
    
    // Guardamos las referencias de este componente particular
    scrollObserversMap.set(instanceId, new Set())

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentY = entry.boundingClientRect.top
          const isScrollingDown = currentY < lastY
          lastY = currentY

          const targets = entry.target.classList.contains('animate-group') 
            ? entry.target.querySelectorAll('.animate-item') 
            : entry.target

          if (entry.isIntersecting) {
            remove(targets)
            
            if (!repeat && entry.target.classList.contains('is-animated') && !entry.target.hasAttribute('data-force-reanimate')) return

            entry.target.classList.add('is-animated')
            entry.target.removeAttribute('data-force-reanimate')
            
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

            if (prefersReducedMotion) {
               animate(targets, {
                opacity: [0, 1],
                duration: 800,
                ease: 'linear'
              })
            } else {
              const yOffset = isScrollingDown ? 40 : -40
              animate(targets, {
                translateY: [yOffset, 0],
                opacity: [0, 1],
                ease: 'outExpo',
                duration: 800,
                delay: animeStagger(stagger)
              })
            }
            
            if (!repeat) {
              observer.unobserve(entry.target)
              scrollObserversMap.get(instanceId)?.delete(entry.target)
            }
          } else if (repeat) {
            set(targets, { opacity: 0 })
            entry.target.classList.remove('is-animated')
          }
        })
      },
      { threshold }
    )
    
    observerInstances.set(instanceId, observer)

    nextTick(() => {
      const elements = document.querySelectorAll(targetSelector)
      elements.forEach((el) => {
        observer.observe(el)
        scrollObserversMap.get(instanceId)?.add(el)
      })
    })
  })

  // Limpieza fuera de onMounted para que Vue no tire warnings
  onBeforeUnmount(() => {
    const elements = scrollObserversMap.get(instanceId)
    const observer = observerInstances.get(instanceId)
    
    if (elements && observer) {
      elements.forEach(el => observer.unobserve(el))
      scrollObserversMap.delete(instanceId)
    }
    
    if (observer) {
      observer.disconnect()
      observerInstances.delete(instanceId)
    }
  })
}
