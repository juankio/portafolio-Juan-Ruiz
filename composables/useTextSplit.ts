import { animate, stagger, utils } from 'animejs'

// Mantenemos una referencia global de los observers para poder destruirlos al cambiar de idioma
const observersMap = new Map()
// Registrar los elementos atados a cada componente para no tener memory leaks
const componentElementsMap = new Map()

export const useTextSplit = (selector, options = {}) => {
  const {
    delay = 0,
    stagger: staggerMs = 30,
    duration = 800,
    easing = 'outExpo',
    repeat = false 
  } = options

  // Generamos un ID unico para este montaje del composable
  const instanceId = Symbol()

  onMounted(() => {
    // Escuchar cambios para poder recrear el split si el texto base cambia (ej: cambio de idioma)
    const initSplit = () => {
      setTimeout(() => {
        const elements = document.querySelectorAll(selector)
        componentElementsMap.set(instanceId, elements)
        let lastScrollY = window.scrollY
        
        elements.forEach(el => {
          // Destruir observers viejos de este elemento si existen
          if (observersMap.has(el)) {
            observersMap.get(el).disconnect()
            observersMap.delete(el)
          }

          if (el.classList.contains('is-split') && !el.hasAttribute('data-lang-changed')) return
          
          el.classList.add('is-split')
          el.removeAttribute('data-lang-changed')

          // Extraer y guardar el texto completo original para Accesibilidad (A11y)
          const originalText = el.textContent || ''
          
          const wrapChars = (node) => {
            if (node.nodeType === 3) { // Text node
              const text = node.nodeValue
              if (!text.trim() && text.includes('\n')) return null 
              
              const fragment = document.createDocumentFragment()
              const words = text.split(/(\s+)/)
              
              words.forEach(word => {
                if (!word) return
                const wordSpan = document.createElement('span')
                wordSpan.style.display = 'inline-block'
                wordSpan.style.whiteSpace = 'nowrap'
                
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
            } else if (node.nodeType === 1) { 
              const clone = node.cloneNode(false)
              Array.from(node.childNodes).forEach(child => {
                const result = wrapChars(child)
                if (result) clone.appendChild(result)
              })
              return clone
            }
          }
          
          const newContent = wrapChars(el)
          if (newContent) {
            el.innerHTML = ''
            
            // Inyectar el texto real oculto para Screen Readers
            const srSpan = document.createElement('span')
            srSpan.className = 'sr-only'
            srSpan.textContent = originalText
            el.appendChild(srSpan)

            // Inyectar el contenido visual cortado y esconderlo de los Screen Readers
            const visualWrapper = document.createElement('span')
            visualWrapper.setAttribute('aria-hidden', 'true')
            Array.from(newContent.childNodes).forEach(child => {
               visualWrapper.appendChild(child)
            })
            el.appendChild(visualWrapper)
          }

          const observer = new IntersectionObserver((entries) => {
            const currentScrollY = window.scrollY
            const isScrollingDown = currentScrollY >= lastScrollY
            lastScrollY = currentScrollY

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

            entries.forEach(entry => {
              const targets = entry.target.querySelectorAll('.split-char')
              if (entry.isIntersecting) {
                utils.remove(targets)
                
                if (!repeat && entry.target.classList.contains('text-animated') && !entry.target.hasAttribute('data-force-reanimate')) return
                
                entry.target.classList.add('text-animated')
                entry.target.removeAttribute('data-force-reanimate')

                if (prefersReducedMotion) {
                  animate(entry.target, {
                    opacity: [0, 1],
                    duration,
                    ease: 'linear'
                  })
                  utils.set(targets, { opacity: 1, translateY: 0, rotate: 0 })
                } else {
                  const yOffset = isScrollingDown ? 20 : -20
                  const rotation = isScrollingDown ? 5 : -5

                  animate(targets, {
                    y: [yOffset, 0],
                    opacity: [0, 1],
                    rotate: [rotation, 0],
                    ease: easing,
                    duration,
                    delay: stagger(staggerMs, { start: delay })
                  })
                }
                
                if (!repeat) {
                  observer.unobserve(entry.target)
                  observersMap.delete(entry.target)
                }
              } else if (repeat) {
                if (prefersReducedMotion) {
                  utils.set(entry.target, { opacity: 0 })
                } else {
                  utils.set(targets, { opacity: 0 })
                }
                entry.target.classList.remove('text-animated')
              }
            })
          }, { threshold: 0.1 })
          
          observer.observe(el)
          observersMap.set(el, observer)
        })
      }, 150)
    }

    initSplit()

    const { locale } = useI18n()
    watch(locale, async () => {
      // nextTick asegura que Vue actualizó los datos del Virtual DOM
      await nextTick()
      
      // requestAnimationFrame asegura que el navegador completó la fase de pintado (Paint)
      requestAnimationFrame(() => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(el => {
          el.classList.remove('is-split')
          el.setAttribute('data-force-reanimate', 'true')
        })
        initSplit()
      })
    })
  })

  // Destruir instancias al cambiar de ruta para evitar Memory Leaks
  onBeforeUnmount(() => {
    const elements = componentElementsMap.get(instanceId)
    if (elements) {
      elements.forEach(el => {
        if (observersMap.has(el)) {
          observersMap.get(el).disconnect()
          observersMap.delete(el)
        }
      })
      componentElementsMap.delete(instanceId)
    }
  })
}
