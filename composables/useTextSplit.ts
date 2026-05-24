import { animate, stagger as animeStagger, set, remove } from 'animejs'

// Mantenemos una referencia global de los observers para poder destruirlos al cambiar de idioma
const observersMap = new Map()
// Registrar los elementos atados a cada componente para no tener memory leaks
const componentElementsMap = new Map()

export const useTextSplit = (selector, options = {}) => {
  const {
    delay = 0,
    stagger = 30,
    duration = 800,
    easing = 'outExpo',
    repeat = false 
  } = options

  // Generamos un ID unico para este montaje del composable
  const instanceId = Symbol()

  // Track the original HTML before splitting so we can restore it on translation changes
  const originalHtmlMap = new Map()

  const initSplit = () => {
    nextTick(() => {
      const newElements = document.querySelectorAll(selector)
      
      // Limpiar observers de elementos que ya no están en el DOM o fueron recreados
      const oldElements = componentElementsMap.get(instanceId)
      if (oldElements) {
        oldElements.forEach(el => {
          if (observersMap.has(el)) {
            observersMap.get(el).disconnect()
            observersMap.delete(el)
          }
        })
      }
      
      componentElementsMap.set(instanceId, newElements)
      let lastY = 0
      
      newElements.forEach(el => {
        // Destruir observers viejos de este elemento si existen
        if (observersMap.has(el)) {
          observersMap.get(el).disconnect()
          observersMap.delete(el)
        }

        // Si ya está split, limpiarlo primero para que no rompa el nuevo texto del i18n
        if (el.classList.contains('is-split')) {
          if (originalHtmlMap.has(el)) {
            // No restauramos el innerHTML aquí porque vue i18n ya reemplazó los nodos de texto.
            // Solo removemos las clases para rehacer el proceso.
            el.classList.remove('is-split', 'text-animated')
            // Ojo: si hay spans creados por el anterior wrapChars, los dejamos, 
            // pero lo ideal es que Vue controle el virtual DOM. 
            // Al hacer el wrapChars de nuevo, lo volveremos a dividir.
          }
        } else {
           originalHtmlMap.set(el, el.innerHTML)
        }
        
        el.classList.add('is-split')
        el.removeAttribute('data-lang-changed')

        // Extraer y guardar el texto completo original para Accesibilidad (A11y)
        const originalText = el.textContent || ''
        const isAlreadyAnimated = el.classList.contains('text-animated')
        
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
                span.style.opacity = isAlreadyAnimated ? '1' : '0'
                span.style.transform = isAlreadyAnimated ? 'none' : 'translateY(20px) rotate(5deg)'
                wordSpan.appendChild(span)
              })
              fragment.appendChild(wordSpan)
            })
            return fragment
          } else if (node.nodeType === 1) { 
            // Avoid re-wrapping already split chars or sr-only
            if (node.classList && (node.classList.contains('split-char') || node.classList.contains('sr-only'))) {
              return node.cloneNode(true)
            }
            // Skip visual wrapper
            if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') {
               const clone = node.cloneNode(false)
               Array.from(node.childNodes).forEach(child => {
                 const result = wrapChars(child)
                 if (result) clone.appendChild(result)
               })
               return clone
            }

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
          entries.forEach(entry => {
            const currentY = entry.boundingClientRect.top
            const isScrollingDown = currentY < lastY
            lastY = currentY

            const targets = entry.target.querySelectorAll('.split-char')
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            if (entry.isIntersecting) {
              remove(targets)
              
              if (!repeat && entry.target.classList.contains('text-animated') && !entry.target.hasAttribute('data-force-reanimate')) {
                observer.unobserve(entry.target)
                observersMap.delete(entry.target)
                return
              }
              
              entry.target.classList.add('text-animated')
              entry.target.removeAttribute('data-force-reanimate')

              if (prefersReducedMotion) {
                animate(entry.target, {
                  opacity: [0, 1],
                  duration,
                  ease: 'linear'
                })
                set(targets, { opacity: 1, translateY: 0, rotate: 0 })
              } else {
                const yOffset = isScrollingDown ? 20 : -20
                const rotation = isScrollingDown ? 5 : -5

                animate(targets, {
                  translateY: [yOffset, 0],
                  opacity: [0, 1],
                  rotate: [rotation, 0],
                  ease: easing.replace('easeOut', 'out').replace('easeIn', 'in').replace('easeInOut', 'inOut'),
                  duration,
                  delay: animeStagger(stagger, { start: delay })
                })
              }
              
              if (!repeat) {
                observer.unobserve(entry.target)
                observersMap.delete(entry.target)
              }
            } else if (repeat) {
              if (prefersReducedMotion) {
                set(entry.target, { opacity: 0 })
              } else {
                set(targets, { opacity: 0 })
              }
              entry.target.classList.remove('text-animated')
            }
          })
        }, { threshold: 0.1 })
        
        observer.observe(el)
        observersMap.set(el, observer)
      })
    })
  }

  // Hook into locale changes using Nuxt's useState
  const locale = useState('ui-locale-state')
  
  watch(locale, () => {
    // Force re-initialization when language changes
    setTimeout(() => {
      initSplit()
      // Disparar animación de nuevo
      const els = document.querySelectorAll(selector)
      els.forEach(el => el.setAttribute('data-force-reanimate', 'true'))
    }, 50)
  })

  onMounted(() => {
    initSplit()
  })

  onUpdated(() => {
    // Only re-init if the content has changed and we lost the splits
    const elements = document.querySelectorAll(selector)
    if (elements.length > 0 && !elements[0].querySelector('.split-char')) {
      initSplit()
    }
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
