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
      availability: 'Disponible — respondo en menos de 24h',
      form: {
        nameLabel: 'Nombre',
        namePlaceholder: 'Tu nombre',
        emailLabel: 'Correo',
        emailPlaceholder: 'correo@ejemplo.com',
        messageLabel: 'Mensaje',
        messagePlaceholder: 'Cuentame sobre tu proyecto...',
        submit: 'Enviar mensaje',
        sendAnother: 'Enviar otro mensaje',
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
    },
    education: {
      sectionTitle: 'Cursos y certificaciones',
      headline: 'Actualizaciones constantes',
      interact: 'Interactua',
      hint: 'Explora la ruta y toca para ver detalle',
      summary: 'Resumen',
      nodeSelection: 'Seleccion del nodo',
      coursesLabel: 'cursos',
      certificate: 'Certificado',
      educationTitle: 'Educacion',
      educationHeadline: 'Formacion principal',
      courses: [
        {
          title: 'Universidad de Programacion - Python, Java y JavaScript',
          place: 'Udemy',
          period: '2023',
          detail: 'Fundamentos solidos en programacion multiparadigma, estructuras de datos y logica aplicada.'
        },
        {
          title: 'Universidad HTML - Desde Cero hasta Experto',
          place: 'Udemy',
          period: '2023',
          detail: 'Estructura web, etiquetas semanticas, accesibilidad, buenas practicas y diseno moderno.'
        },
        {
          title: 'Universidad CSS - Desde Cero hasta Experto',
          place: 'Udemy',
          period: '2023 - 2024',
          detail: 'Maquetacion avanzada, flexbox, grid, animaciones y responsive design.'
        },
        {
          title: 'De 0 a Programador: Aprende Python desde 0',
          place: 'Udemy',
          period: '2023 - 2024',
          detail: 'Sintaxis, funciones, estructuras de datos, OOP basica y automatizacion.'
        },
        {
          title: 'Vue.js 3 - Composition API + Pinia + MEVN (10 Apps)',
          place: 'Udemy',
          period: '2024',
          detail: 'Interfaces modernas, manejo de estado, APIs, composicion modular y entorno MEVN.'
        },
        {
          title: 'Dart + Introduccion a Flutter',
          place: 'Udemy',
          period: '2024',
          detail: 'Fundamentos de aplicaciones moviles multiplataforma.'
        },
        {
          title: 'Proyecto Aliado Latino - Desarrollador Full-Stack',
          place: 'Proyecto Aliado Latino',
          period: '2024',
          detail: 'Plataforma web con integracion de Google Drive API, autenticacion, manejo de archivos y dashboard empresarial.'
        },
        {
          title: 'Proyectos Personales Full-Stack',
          place: 'Side projects',
          period: '2024 - Presente',
          detail: 'Cine al Parque (PWA), Drive 2.0 (archivos y API propia), Portafolio Pro (NotchUI + Nuxt 3 + GSAP).'
        }
      ],
      education: [
        {
          title: 'Ingenieria de Sistemas (en curso)',
          place: 'UCC - Universidad Cooperativa de Colombia, Colombia',
          period: '2025 - Presente',
          detail: 'Formacion enfocada en arquitectura de software, bases de datos, ingenieria backend, redes y desarrollo web moderno.'
        },
        {
          title: 'Intercambio Internacional - Ingeniero en Formacion',
          place: 'UDEM - Universidad de Monterrey, Mexico',
          period: '2023 (Segundo semestre)',
          detail: 'Intercambio academico con enfasis en proyectos, competencias profesionales, pensamiento critico e innovacion tecnologica.'
        },
        {
          title: 'Tecnologia en Desarrollo de Software',
          place: 'UNIMINUTO - Corporacion Universitaria Minuto de Dios',
          period: '2022 - 2025',
          detail: 'Enfoque en desarrollo web, bases de datos, programacion orientada a objetos, APIs, arquitectura y metodologias agiles.'
        },
        {
          title: 'Fundamentos de Programacion - Modulo 1',
          place: 'MINTIC, Gobierno de Colombia',
          period: '2021',
          detail: 'Algoritmia inicial, logica, condicionales, ciclos y estructuras basicas.'
        },
        {
          title: 'Fundamentos de Programacion - Modulo 2',
          place: 'MINTIC, Gobierno de Colombia',
          period: '2021',
          detail: 'Programacion estructurada, funciones y resolucion de problemas computacionales.'
        }
      ]
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
      ctas: { projects: 'View projects', contact: "Let's talk" },
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
        "I'm Juan Miguel Ruiz Supelano (Villavicencio, CO). Frontend dev & designer studying Systems Engineering. I blend clean UI, purposeful motion, and PWA performance so products feel alive and convert better.",
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
      titleLead: "Let's talk about your next",
      titleAccent: 'project',
      subtitle: "Got an idea or product that needs life? Message me and we'll build something intentional, fast, and bold.",
      badges: ['Availability: Remote', 'Response within 24h'],
      availability: 'Available — I reply within 24h',
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'email@example.com',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your project...',
        submit: 'Send message',
        sendAnother: 'Send another message',
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
    },
    education: {
      sectionTitle: 'Courses & certifications',
      headline: 'Continuous learning',
      interact: 'Interactive',
      hint: 'Explore the path and tap to see details',
      summary: 'Summary',
      nodeSelection: 'Node selection',
      coursesLabel: 'courses',
      certificate: 'Certificate',
      educationTitle: 'Education',
      educationHeadline: 'Main education',
      courses: [
        {
          title: 'Programming University - Python, Java & JavaScript',
          place: 'Udemy',
          period: '2023',
          detail: 'Solid foundations in multi-paradigm programming, data structures and applied logic.'
        },
        {
          title: 'HTML University - From Zero to Expert',
          place: 'Udemy',
          period: '2023',
          detail: 'Web structure, semantic tags, accessibility, best practices and modern design.'
        },
        {
          title: 'CSS University - From Zero to Expert',
          place: 'Udemy',
          period: '2023 - 2024',
          detail: 'Advanced layout, flexbox, grid, animations and responsive design.'
        },
        {
          title: 'From 0 to Programmer: Learn Python from Scratch',
          place: 'Udemy',
          period: '2023 - 2024',
          detail: 'Syntax, functions, data structures, basic OOP and automation.'
        },
        {
          title: 'Vue.js 3 - Composition API + Pinia + MEVN (10 Apps)',
          place: 'Udemy',
          period: '2024',
          detail: 'Modern interfaces, state management, APIs, modular composition and MEVN environment.'
        },
        {
          title: 'Dart + Introduction to Flutter',
          place: 'Udemy',
          period: '2024',
          detail: 'Cross-platform mobile application fundamentals.'
        },
        {
          title: 'Aliado Latino Project - Full-Stack Developer',
          place: 'Proyecto Aliado Latino',
          period: '2024',
          detail: 'Web platform with Google Drive API integration, authentication, file management and business dashboard.'
        },
        {
          title: 'Personal Full-Stack Projects',
          place: 'Side projects',
          period: '2024 - Present',
          detail: 'Cine al Parque (PWA), Drive 2.0 (files and custom API), Portfolio Pro (NotchUI + Nuxt 3 + GSAP).'
        }
      ],
      education: [
        {
          title: 'Systems Engineering (in progress)',
          place: 'UCC - Universidad Cooperativa de Colombia, Colombia',
          period: '2025 - Present',
          detail: 'Focused on software architecture, databases, backend engineering, networks and modern web development.'
        },
        {
          title: 'International Exchange - Engineer in Training',
          place: 'UDEM - Universidad de Monterrey, Mexico',
          period: '2023 (Second semester)',
          detail: 'Academic exchange with emphasis on projects, professional skills, critical thinking and technological innovation.'
        },
        {
          title: 'Software Development Technology',
          place: 'UNIMINUTO - Corporacion Universitaria Minuto de Dios',
          period: '2022 - 2025',
          detail: 'Focus on web development, databases, OOP, APIs, architecture and agile methodologies.'
        },
        {
          title: 'Programming Fundamentals - Module 1',
          place: 'MINTIC, Government of Colombia',
          period: '2021',
          detail: 'Initial algorithmic thinking, logic, conditionals, loops and basic structures.'
        },
        {
          title: 'Programming Fundamentals - Module 2',
          place: 'MINTIC, Government of Colombia',
          period: '2021',
          detail: 'Structured programming, functions and computational problem solving.'
        }
      ]
    }
  }
}

export const defaultLocale = 'es'
