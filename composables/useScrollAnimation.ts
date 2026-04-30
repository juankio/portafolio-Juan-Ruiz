import { animate, stagger, utils } from 'animejs'

// Registro global para prevenir leaks
const scrollObserversMap = new Map()

export const useScrollAnimation = (targetSelector, options = {}) => {
  const {
    stagger: staggerMs = 100,
    threshold = 0.1,
    repeat = false 
  } = options

  const instanceId = Symbol()

  onMounted(() => {
    let lastScrollY = window.scrollY
    
    // Guardamos las referencias de este componente particular
    scrollObserversMap.set(instanceId, new Set())

    const observer = new IntersectionObserver(
      (entries) => {
        const currentScrollY = window.scrollY
        const isScrollingDown = currentScrollY >= lastScrollY
        lastScrollY = currentScrollY

        entries.forEach((entry) => {
          const targets = entry.target.classList.contains('animate-group') 
            ? entry.target.querySelectorAll('.animate-item') 
            : entry.target

          if (entry.isIntersecting) {
            utils.remove(targets)
            
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
                y: [yOffset, 0],
                opacity: [0, 1],
                ease: 'outExpo',
                duration: 800,
                delay: stagger(staggerMs)
              })
            }
            
            if (!repeat) {
              observer.unobserve(entry.target)
              scrollObserversMap.get(instanceId)?.delete(entry.target)
            }
          } else if (repeat) {
            utils.set(targets, { opacity: 0 })
            entry.target.classList.remove('is-animated')
          }
        })
      },
      { threshold }
    )

    setTimeout(() => {
      const elements = document.querySelectorAll(targetSelector)
      elements.forEach((el) => {
        observer.observe(el)
        scrollObserversMap.get(instanceId)?.add(el)
      })
    }, 150)

    const { locale } = useI18n()
    watch(locale, () => {
      setTimeout(() => {
        const elements = document.querySelectorAll(targetSelector)
        elements.forEach((el) => {
          if (el.classList.contains('is-animated')) {
            el.setAttribute('data-force-reanimate', 'true')
            const targets = el.classList.contains('animate-group') ? el.querySelectorAll('.animate-item') : el
            
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

            utils.remove(targets)
            if (prefersReducedMotion) {
              animate(targets, { opacity: [0, 1], duration: 800, ease: 'linear' })
            } else {
              animate(targets, {
                y: [20, 0],
                opacity: [0, 1],
                ease: 'outExpo',
                duration: 800,
                delay: stagger(staggerMs)
              })
            }
          }
        })
      }, 250) 
    })

    // Limpieza
    onBeforeUnmount(() => {
      const elements = scrollObserversMap.get(instanceId)
      if (elements) {
        elements.forEach(el => observer.unobserve(el))
        scrollObserversMap.delete(instanceId)
      }
      observer.disconnect()
    })
  })
}
