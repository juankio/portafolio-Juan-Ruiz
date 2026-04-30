import anime from 'animejs'

export const useTextSplit = (selector, options = {}) => {
  const {
    delay = 0,
    stagger = 30,
    duration = 800,
    easing = 'easeOutExpo',
    repeat = false // Cambiado a false por defecto
  } = options

  onMounted(() => {
    // Escuchar cambios para poder recrear el split si el texto base cambia (ej: cambio de idioma)
    const initSplit = () => {
      setTimeout(() => {
        const elements = document.querySelectorAll(selector)
        let lastScrollY = window.scrollY
        
        elements.forEach(el => {
          // If already split, do not block, but we need to know if the text changed
          // Since Vue re-renders the text node on lang change, the original text nodes might be replaced
          // Actually, if Vue replaces innerHTML, the 'is-split' class might be lost. 
          // If it isn't, we should clear it if we detect a change.
          if (el.classList.contains('is-split') && !el.hasAttribute('data-lang-changed')) return
          
          el.classList.add('is-split')
          el.removeAttribute('data-lang-changed')
          
          // Recursive function to split text nodes while preserving elements
          const wrapChars = (node) => {
            if (node.nodeType === 3) { // Text node
              const text = node.nodeValue
              if (!text.trim() && text.includes('\n')) return null // skip empty newlines
              
              const fragment = document.createDocumentFragment()
              // Split by words first to keep words together (prevent mid-word line breaks)
              const words = text.split(/(\s+)/)
              
              words.forEach(word => {
                if (!word) return
                
                const wordSpan = document.createElement('span')
                wordSpan.style.display = 'inline-block'
                wordSpan.style.whiteSpace = 'nowrap' // Mantiene la palabra entera, no parte letras
                
                const chars = word.split('')
                chars.forEach(char => {
                  const span = document.createElement('span')
                  span.className = 'split-char'
                  span.textContent = char === ' ' ? '\u00A0' : char
                  span.style.display = 'inline-block'
                  span.style.opacity = '0'
                  span.style.transform = 'translateY(20px) rotate(5deg)'
                  wordSpan.appendChild(span)
                })
                
                fragment.appendChild(wordSpan)
              })
              return fragment
            } else if (node.nodeType === 1) { // Element node
              // Copy the element
              const clone = node.cloneNode(false)
              Array.from(node.childNodes).forEach(child => {
                const result = wrapChars(child)
                if (result) {
                  clone.appendChild(result)
                }
              })
              return clone
            }
          }
          
          const newContent = wrapChars(el)
          if (newContent) {
            el.innerHTML = ''
            Array.from(newContent.childNodes).forEach(child => {
               el.appendChild(child)
            })
          }

          const observer = new IntersectionObserver((entries) => {
            const currentScrollY = window.scrollY
            const isScrollingDown = currentScrollY >= lastScrollY
            lastScrollY = currentScrollY

            // Optimization: Check for prefers-reduced-motion
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

            entries.forEach(entry => {
              const targets = entry.target.querySelectorAll('.split-char')
              if (entry.isIntersecting) {
                anime.remove(targets)
                
                if (!repeat && entry.target.classList.contains('text-animated')) return
                entry.target.classList.add('text-animated')

                if (prefersReducedMotion) {
                  // If user prefers reduced motion, just fade in the container
                  anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    duration,
                    easing: 'linear'
                  })
                  anime.set(targets, { opacity: 1, translateY: 0, rotate: 0 })
                } else {
                  // Normal animated text split
                  const yOffset = isScrollingDown ? 20 : -20
                  const rotation = isScrollingDown ? 5 : -5

                  anime({
                    targets,
                    translateY: [yOffset, 0],
                    opacity: [0, 1],
                    rotate: [rotation, 0],
                    easing,
                    duration,
                    delay: anime.stagger(stagger, { start: delay })
                  })
                }
                
                if (!repeat) observer.unobserve(entry.target)
              } else if (repeat) {
                if (prefersReducedMotion) {
                  anime.set(entry.target, { opacity: 0 })
                } else {
                  anime.set(targets, { opacity: 0 })
                }
                entry.target.classList.remove('text-animated')
              }
            })
          }, { threshold: 0.1 })
          
          observer.observe(el)
        })
      }, 150)
    }

    initSplit()

    // Observar cambios de idioma para re-splitear el texto
    const { locale } = useI18n()
    watch(locale, () => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        el.classList.remove('is-split')
        el.classList.remove('text-animated')
        el.setAttribute('data-lang-changed', 'true')
        // El problema es que Vue va a reescribir el innerHTML con el nuevo texto del i18n
        // Necesitamos darle tiempo a Vue de actualizar el DOM antes de re-splitear
      })
      setTimeout(initSplit, 50) // Ejecutar después del render de Vue
    })
  })
}
