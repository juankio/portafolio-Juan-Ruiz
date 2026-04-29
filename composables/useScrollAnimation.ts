import anime from 'animejs'

export const useScrollAnimation = (targetSelector, options = {}) => {
  const {
    stagger = 100,
    threshold = 0.1,
    repeat = false // Cambiado a false por defecto para evitar parpadeos
  } = options

  onMounted(() => {
    let lastScrollY = window.scrollY

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
            // Remove previous animations to avoid jumpiness
            anime.remove(targets)
            
            // Avoid re-animating if it's already done and repeat is false
            if (!repeat && entry.target.classList.contains('is-animated')) return

            entry.target.classList.add('is-animated')
            
            // Animación suave
            const yOffset = isScrollingDown ? 40 : -40

            anime({
              targets,
              translateY: [yOffset, 0],
              opacity: [0, 1],
              easing: 'easeOutExpo',
              duration: 800, // Ligeramente más rápido
              delay: anime.stagger(stagger)
            })
            
            if (!repeat) observer.unobserve(entry.target)
          } else if (repeat) {
            // Solo lo escondemos si explícitamente se pidió repeat
            anime.set(targets, { opacity: 0 })
            entry.target.classList.remove('is-animated')
          }
        })
      },
      { threshold }
    )

    setTimeout(() => {
      const elements = document.querySelectorAll(targetSelector)
      elements.forEach((el) => observer.observe(el))
    }, 150)
  })
}
