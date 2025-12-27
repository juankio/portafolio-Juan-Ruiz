export const messages = {
  es: {
    nav: {
      links: { home: 'Inicio', about: 'Sobre mi', projects: 'Proyectos', contact: 'Contacto' },
      ctaProjects: 'Ver proyectos',
      themeToggle: 'Cambiar modo'
    },
    hero: {
      availability: 'Disponible para nuevos retos',
      name: 'Juan Miguel Ruiz Supelano',
      tagline: 'Juan Miguel Ruiz Supelano',
      title: {
        main: 'Construyo experiencias web',
        highlight1: 'rapidas',
        connector: 'y',
        highlight2: 'intencionales.'
      },
      subtitle: 'Diseno productos web rapidos, accesibles y listos para produccion, con foco en PWAs, rendimiento y UX.',
      rolePrefix: 'Soy',
      rotatingWords: ['Frontend Developer', 'UI Designer', 'PWA Builder', 'Creative Coder'],
      ctas: { projects: 'Ver proyectos', contact: 'Hablemos' },
      cards: [
        { label: 'Especialidad', value: 'Nuxt - Vue - PWA' },
        { label: 'Stack visual', value: 'Tailwind - Animaciones suaves' },
        { label: 'Disponible', value: 'Freelance y proyectos' }
      ]
    },
    about: {
      sectionTitle: 'Sobre mi',
      headline: {
        lead: 'Estrategia, diseno y codigo para',
        accent: 'productos',
        tail: 'digitales listos para crecer.'
      },
      intro:
        'Soy Juan Miguel Ruiz Supelano (Villavicencio, CO). Diseñador y dev frontend que estudia Ingenieria de Sistemas. Conecto UI limpia, animaciones medidas y performance PWA para lanzar productos que se sienten vivos y venden mejor.',
      chips: ['Nuxt 3', 'UX/UI', 'PWAs', 'Animacion', 'Accesibilidad', 'SEO tecnico'],
      availability: 'Disponible',
      skillsTitle: 'Habilidades',
      summary: [
        { label: 'Frontend', value: 'Vue 3 · Nuxt 3 · Tailwind' },
        { label: 'UX + Motion', value: 'GSAP · Microinteracciones · A11y' },
        { label: 'Producto', value: 'Rendimiento · SEO · Flujos claros' }
      ],
      skills: [
        {
          title: 'Frontend y UI',
          copy: 'Componentes Nuxt 3 con Composition API, diseño atómico, Tailwind y estados finos (hover, focus, scroll).'
        },
        {
          title: 'Experiencia y rendimiento',
          copy: 'PWAs listas para Lighthouse 90+, animaciones GSAP que no bloquean, optimización de Core Web Vitals y SEO técnico.'
        },
        {
          title: 'Backend ligero',
          copy: 'APIs REST con Node.js/Express, MongoDB, autenticación sencilla y despliegues rápidos en Vercel/Netlify.'
        },
        { title: 'Tooling', copy: 'Figma, GitHub, Nuxt UI, SendGrid, CI/CD ligero y monitoreo básico.' }
      ]
    },
    projects: {
      sectionTitle: 'Proyectos',
      headline: 'Repositorios vivos desde',
      headlineAccent: 'GitHub',
      refresh: 'Actualizar',
      github: 'GitHub',
      error: 'Hubo un problema al traer los repos. Intenta nuevamente o revisa el rate limit de GitHub.',
      empty: 'Aun no hay proyectos para mostrar. Intenta actualizar o revisa mas tarde.',
      repo: 'Repositorio',
      stars: 'estrellas',
      updated: 'Actualizado',
      noDescription: 'Repositorio en GitHub sin descripcion anadida.',
      viewCode: 'Ver codigo',
      viewDemo: 'Ver demo'
    },
    contact: {
      section: 'Contacto',
      titleLead: 'Hablemos de tu proximo',
      titleAccent: 'proyecto',
      subtitle: 'Tienes una idea o producto que necesita vida? Escribeme y armemos algo brutalista, rapido y con intencion.',
      badges: ['Disponibilidad: Remoto', 'Respuesta en 24h'],
      form: {
        nameLabel: 'Nombre',
        namePlaceholder: 'Tu nombre',
        emailLabel: 'Correo',
        emailPlaceholder: 'correo@ejemplo.com',
        messageLabel: 'Mensaje',
        messagePlaceholder: 'Cuentame sobre tu proyecto...',
        submit: 'Enviar mensaje',
        helper: 'Uso Resend para un delivery confiable.'
      },
      validation: {
        required: 'Completa todos los campos',
        email: 'Ingresa un correo valido',
        success: 'Mensaje enviado',
        successDesc: 'Te respondere pronto.',
        error: 'No se pudo enviar',
        fallback: 'Intenta mas tarde.'
      }
    }
  },
  en: {
    nav: {
      links: { home: 'Home', about: 'About', projects: 'Projects', contact: 'Contact' },
      ctaProjects: 'View projects',
      themeToggle: 'Toggle theme'
    },
    hero: {
      availability: 'Available for new challenges',
      name: 'Juan Miguel Ruiz Supelano',
      tagline: 'Juan Miguel Ruiz Supelano',
      title: {
        main: 'I craft web experiences',
        highlight1: 'fast',
        connector: 'and',
        highlight2: 'intentional.'
      },
      subtitle: 'I design web products that are fast, accessible, and production-ready, focused on PWAs, performance, and UX.',
      rolePrefix: 'I am',
      rotatingWords: ['Frontend Developer', 'UI Designer', 'PWA Builder', 'Creative Coder'],
      ctas: { projects: 'View projects', contact: 'Let’s talk' },
      cards: [
        { label: 'Specialty', value: 'Nuxt - Vue - PWA' },
        { label: 'Visual stack', value: 'Tailwind - Smooth animations' },
        { label: 'Availability', value: 'Freelance and projects' }
      ]
    },
    about: {
      sectionTitle: 'About me',
      headline: {
        lead: 'Strategy, design, and code for',
        accent: 'products',
        tail: 'built to grow.'
      },
      intro:
        'I’m Juan Miguel Ruiz Supelano (Villavicencio, CO). Frontend dev & designer studying Systems Engineering. I blend clean UI, purposeful motion, and PWA performance so products feel alive and convert better.',
      chips: ['Nuxt 3', 'UX/UI', 'PWAs', 'Animation', 'Accessibility', 'Technical SEO'],
      availability: 'Available',
      skillsTitle: 'Skills',
      summary: [
        { label: 'Frontend', value: 'Vue 3 · Nuxt 3 · Tailwind' },
        { label: 'UX + Motion', value: 'GSAP · Microinteractions · A11y' },
        { label: 'Product', value: 'Performance · SEO · Clear flows' }
      ],
      skills: [
        {
          title: 'Frontend & UI',
          copy: 'Nuxt 3 components with Composition API, atomic design, Tailwind, and tight state handling (hover, focus, scroll).'
        },
        {
          title: 'Experience & performance',
          copy: 'PWAs tuned for 90+ Lighthouse, GSAP motion that stays smooth, Core Web Vitals and technical SEO improvements.'
        },
        {
          title: 'Lightweight backend',
          copy: 'REST APIs with Node.js/Express, MongoDB, straightforward auth, and fast deploys on Vercel/Netlify.'
        },
        { title: 'Tooling', copy: 'Figma, GitHub, Nuxt UI, SendGrid, lightweight CI/CD and basic monitoring.' }
      ]
    },
    projects: {
      sectionTitle: 'Projects',
      headline: 'Live repositories from',
      headlineAccent: 'GitHub',
      refresh: 'Refresh',
      github: 'GitHub',
      error: 'There was a problem fetching the repos. Try again or check the GitHub rate limit.',
      empty: 'No projects to show yet. Try refreshing or check back later.',
      repo: 'Repository',
      stars: 'stars',
      updated: 'Updated',
      noDescription: 'GitHub repository without a description added.',
      viewCode: 'View code',
      viewDemo: 'View demo'
    },
    contact: {
      section: 'Contact',
      titleLead: 'Let’s talk about your next',
      titleAccent: 'project',
      subtitle: 'Got an idea or product that needs life? Message me and we’ll build something intentional, fast, and bold.',
      badges: ['Availability: Remote', 'Response within 24h'],
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'email@example.com',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your project...',
        submit: 'Send message',
        helper: 'I use Resend for reliable delivery.'
      },
      validation: {
        required: 'Complete all fields',
        email: 'Enter a valid email',
        success: 'Message sent',
        successDesc: 'I will reply soon.',
        error: 'Could not send',
        fallback: 'Try again later.'
      }
    }
  }
}

export const defaultLocale = 'es'
