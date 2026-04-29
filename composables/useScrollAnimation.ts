import anime from 'animejs'

export const useScrollAnimation = (targetSelector, options = {}) => {
  const {
    stagger = 100,
    threshold = 0.1,
    repeat = true
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
            
            entry.target.classList.add('is-animated')
            
            // Si scrollea hacia abajo, entra por abajo. Si scrollea hacia arriba, entra por arriba.
            const yOffset = isScrollingDown ? 40 : -40

            anime({
              targets,
              translateY: [yOffset, 0],
              opacity: [0, 1],
              easing: 'easeOutExpo',
              duration: 1000,
              delay: anime.stagger(stagger)
            })
            
            if (!repeat) observer.unobserve(entry.target)
          } else if (repeat) {
            // Si sale de pantalla y queremos que repita, lo escondemos
            anime.set(targets, { opacity: 0 })
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
