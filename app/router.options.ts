import type { RouterConfig } from '@nuxt/schema'

// Custom router options to silence missing hash warnings when the element is not present.
export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      const el = document.querySelector(to.hash)
      if (el) {
        return { el: to.hash, behavior: 'smooth' }
      }
    }

    return { left: 0, top: 0 }
  }
}
