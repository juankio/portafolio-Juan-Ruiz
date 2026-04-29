import anime from 'animejs'

export const useTextSplit = (selector, options = {}) => {
  const {
    delay = 0,
    stagger = 30,
    duration = 800,
    easing = 'easeOutExpo',
    repeat = true
  } = options

  onMounted(() => {
    setTimeout(() => {
      const elements = document.querySelectorAll(selector)
      let lastScrollY = window.scrollY
      
      elements.forEach(el => {
        if (el.classList.contains('is-split')) return
        el.classList.add('is-split')
        
        // Recursive function to split text nodes while preserving elements
        const wrapChars = (node) => {
          if (node.nodeType === 3) { // Text node
            const text = node.nodeValue
            if (!text.trim() && text.includes('\n')) return null // skip empty newlines
            
            const fragment = document.createDocumentFragment()
            const chars = text.split('')
            
            chars.forEach(char => {
              const span = document.createElement('span')
              span.className = 'split-char'
              span.textContent = char === ' ' ? '\u00A0' : char
              span.style.display = 'inline-block'
              span.style.opacity = '0'
              span.style.transform = 'translateY(20px) rotate(5deg)'
              fragment.appendChild(span)
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

          entries.forEach(entry => {
            const targets = entry.target.querySelectorAll('.split-char')
            if (entry.isIntersecting) {
              anime.remove(targets)
              
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
              
              if (!repeat) observer.unobserve(entry.target)
            } else if (repeat) {
              anime.set(targets, { opacity: 0 })
            }
          })
        }, { threshold: 0.1 })
        
        observer.observe(el)
      })
    }, 150)
  })
}
