export const messages = {
  es: {
    nav: {
      links: { home: 'Inicio', about: 'Sobre mi', projects: 'Proyectos', contact: 'Contacto' },
      ctaProjects: 'Ver proyectos',
      themeToggle: 'Cambiar modo'
    },
    hero: {
      availability: 'Abierto a nuevos proyectos',
      name: 'Juan Miguel Ruiz Supelano',
      tagline: 'Juan Miguel Ruiz Supelano',
      title: {
        main: 'Hago webs',
        highlight1: 'rapidas',
        connector: 'que no se sienten',
        highlight2: 'genericas.'
      },
      subtitle: 'Vue, Nuxt y mucho cafe. Me obsesiona que las cosas carguen rapido y que el usuario sepa a donde ir sin pensarlo dos veces.',
      rolePrefix: 'Soy',
      rotatingWords: ['Frontend Developer', 'Disenador de UI', 'Dev 10x con IA', 'Builder de PWAs', 'Dev que si responde'],
      ctas: { projects: 'Ver proyectos', contact: 'Hablemos' },
      cards: [
        { label: 'Stack', value: 'Vue - Nuxt - Tailwind' },
        { label: 'Manias', value: 'Rendimiento y a11y' },
        { label: 'Estado', value: 'Tomando proyectos' }
      ]
    },
    about: {
      sectionTitle: 'Sobre mi',
      headline: {
        lead: 'Diseno y codigo,',
        accent: 'sin intermediarios',
        tail: 'ni reuniones eternas.'
      },
      intro:
        'Soy Juan Miguel, dev frontend desde Villavicencio (CO). Estudio Ingenieria de Sistemas de dia y rompo layouts de noche. Me obsesiona que las webs carguen rapido, que la UI no aburra y que el usuario sepa que hacer en cada pantalla sin manual.',
      chips: ['Nuxt 3', 'UX/UI', 'AI Agents', 'Animacion', 'Angular', 'Flask', 'Anime.js', 'PWAs', 'Cafe negro'],
      availability: 'Abierto',
      skillsTitle: 'Habilidades',
      summary: [
        { label: 'Stack Web', value: 'Vue 3 · Nuxt 3 · Angular' },
        { label: 'UX + Motion', value: 'Anime.js · GSAP · A11y' },
        { label: 'IA & Backend', value: 'Prompt Eng. · Claude · Flask' }
      ],
      skills: [
        {
          title: 'Frontend y UI',
          copy: 'Componentes Nuxt que no se rompen cuando el proyecto crece. Tailwind limpio, estados cuidados (hover, focus, scroll raro que nadie piensa).'
        },
        {
          title: 'Rendimiento de verdad',
          copy: 'PWAs que pasan Lighthouse sin trampas. GSAP que no mata el FPS. SEO tecnico que si aparece en Google.'
        },
        {
          title: 'Backend cuando toca',
          copy: 'APIs con Node y Express cuando la idea lo pide. MongoDB, auth simple y deploys en Vercel sin drama.'
        },
        {
          title: 'IA & Herramientas',
          copy: 'Potenciado por IA (Claude, Opencode, Open claw). Gestion con Obsidian. Desarrollo 10x mas rapido sin perder calidad ni control.'
        }
      ]
    },
    projects: {
      sectionTitle: 'Proyectos',
      headline: 'Mis mejores líneas de',
      headlineAccent: 'Código',
      refresh: 'Actualizar',
      github: 'GitHub',
      error: 'Se cayo la conexion con GitHub. Dale actualizar o revisa en un rato.',
      empty: 'Todavia nada por aqui. Vuelve en un rato.',
      repo: 'Repositorio',
      stars: 'estrellas',
      updated: 'Actualizado',
      noDescription: 'Este repo anda sin descripcion. Perdon por eso.',
      viewCode: 'Ver codigo',
      viewDemo: 'Probar'
    },
    contact: {
      section: 'Contacto',
      titleLead: 'Cuentame de tu proximo',
      titleAccent: 'proyecto',
      subtitle: 'Tienes una idea rondando? Manda el brief sin introducciones largas. Respondo en menos de 24 horas y sin copy pegado de plantilla.',
      badges: ['Remoto siempre', 'Respondo en 24h'],
      availability: 'Abierto — respondo rapido',
      form: {
        nameLabel: 'Nombre',
        namePlaceholder: 'Como te llamas',
        emailLabel: 'Correo',
        emailPlaceholder: 'tucorreo@dominio.com',
        messageLabel: 'Mensaje',
        messagePlaceholder: 'Cuentame la idea, el plazo y el vibe que buscas...',
        submit: 'Enviar mensaje',
        sendAnother: 'Enviar otro',
        helper: 'Resend se encarga del envio. Llega siempre.'
      },
      validation: {
        required: 'Faltan campos por llenar',
        email: 'Ese correo no se ve bien',
        success: 'Mensaje enviado',
        successDesc: 'Te escribo de vuelta pronto.',
        error: 'Algo fallo al enviar',
        fallback: 'Intenta de nuevo en un rato.'
      }
    },
    education: {
      sectionTitle: 'Cursos y obsesiones',
      headline: 'Nunca dejo de aprender',
      interact: 'Interactua',
      hint: 'Tocalo para ver el detalle',
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
          detail: 'Bases solidas de programacion multiparadigma, estructuras de datos y logica aplicada.'
        },
        {
          title: 'Universidad HTML - Desde Cero hasta Experto',
          place: 'Udemy',
          period: '2023',
          detail: 'Estructura web, etiquetas semanticas, accesibilidad y buenas practicas modernas.'
        },
        {
          title: 'Universidad CSS - Desde Cero hasta Experto',
          place: 'Udemy',
          period: '2023 - 2024',
          detail: 'Maquetacion avanzada, flexbox, grid, animaciones y responsive sin dolor.'
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
          period: '2026',
          detail: 'Interfaces modernas, manejo de estado, APIs y el entorno MEVN a fondo.'
        },
        {
          title: 'Dart + Introduccion a Flutter',
          place: 'Udemy',
          period: '2026',
          detail: 'Fundamentos de apps moviles multiplataforma.'
        },
        {
          title: 'Proyecto Aliado Latino - Desarrollador Full-Stack',
          place: 'Proyecto Aliado Latino',
          period: '2026',
          detail: 'Plataforma web con integracion a Google Drive API, autenticacion, manejo de archivos y dashboard empresarial.'
        },
        {
          title: 'Anthropic AI Engineering',
          place: 'Anthropic Courses',
          period: '2026',
          detail: 'Desarrollo avanzado de agentes de IA, prompt engineering y tool use con Claude.'
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
          detail: 'Arquitectura de software, bases de datos, backend, redes y desarrollo web moderno.'
        },
        {
          title: 'Intercambio Internacional - Ingeniero en Formacion',
          place: 'UDEM - Universidad de Monterrey, Mexico',
          period: '2023 (Segundo semestre)',
          detail: 'Semestre con enfasis en proyectos, pensamiento critico e innovacion tecnologica.'
        },
        {
          title: 'Tecnologia en Desarrollo de Software',
          place: 'UNIMINUTO - Corporacion Universitaria Minuto de Dios',
          period: '2022 - 2025',
          detail: 'Desarrollo web, bases de datos, OOP, APIs, arquitectura y metodologias agiles.'
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
      availability: 'Open to new projects',
      name: 'Juan Miguel Ruiz Supelano',
      tagline: 'Juan Miguel Ruiz Supelano',
      title: {
        main: 'I build web stuff',
        highlight1: "that's fast",
        connector: 'and',
        highlight2: "doesn't feel generic."
      },
      subtitle: "Vue, Nuxt, and way too much coffee. I obsess over pages that load quick and interfaces where you never have to guess what to click.",
      rolePrefix: "I'm a",
      rotatingWords: ['Frontend Developer', 'UI Designer', 'AI-Powered Dev', 'PWA Builder', 'Dev who actually replies'],
      ctas: { projects: 'View projects', contact: "Let's talk" },
      cards: [
        { label: 'Stack', value: 'Vue - Nuxt - Tailwind' },
        { label: 'Obsessions', value: 'Performance & a11y' },
        { label: 'Status', value: 'Taking on projects' }
      ]
    },
    about: {
      sectionTitle: 'About me',
      headline: {
        lead: 'Design and code,',
        accent: 'no middlemen,',
        tail: 'no endless meetings.'
      },
      intro:
        "I'm Juan Miguel, a frontend dev from Villavicencio (CO). Studying Systems Engineering by day, breaking layouts by night. I care about pages that load fast, UI that doesn't bore you, and users who know exactly what to do next.",
      chips: ['Nuxt 3', 'UX/UI', 'AI Agents', 'Animation', 'Angular', 'Flask', 'Anime.js', 'PWAs', 'Black coffee'],
      availability: 'Open',
      skillsTitle: 'Skills',
      summary: [
        { label: 'Web Stack', value: 'Vue 3 · Nuxt 3 · Angular' },
        { label: 'UX + Motion', value: 'Anime.js · GSAP · A11y' },
        { label: 'AI & Backend', value: 'Prompt Eng. · Claude · Flask' }
      ],
      skills: [
        {
          title: 'Frontend & UI',
          copy: "Nuxt components that don't break as the project grows. Clean Tailwind, well-handled states (hover, focus, that weird scroll nobody thinks about)."
        },
        {
          title: 'Real performance',
          copy: 'PWAs that pass Lighthouse without cheating. GSAP motion that stays buttery. Technical SEO that actually shows up on Google.'
        },
        {
          title: 'Backend when needed',
          copy: 'REST APIs with Node and Express when the idea calls for it. MongoDB, simple auth, and painless Vercel deploys.'
        },
        {
          title: 'AI & Tooling',
          copy: 'AI-powered by Claude, Opencode, and Open claw. Second brain in Obsidian. 10x faster development without losing quality or control.'
        }
      ]
    },
    projects: {
      sectionTitle: 'Projects',
      headline: 'My best lines of',
      headlineAccent: 'Code',
      refresh: 'Refresh',
      github: 'GitHub',
      error: 'GitHub connection dropped. Hit refresh or come back in a bit.',
      empty: 'Nothing here yet. Check back in a moment.',
      repo: 'Repository',
      stars: 'stars',
      updated: 'Updated',
      noDescription: 'This repo is missing a description. Sorry about that.',
      viewCode: 'View code',
      viewDemo: 'Try it'
    },
    contact: {
      section: 'Contact',
      titleLead: "Tell me about your next",
      titleAccent: 'project',
      subtitle: "Got an idea cooking? Send over the brief without the long intro. I reply in under 24 hours, no copy-pasted templates.",
      badges: ['Remote always', 'Reply within 24h'],
      availability: 'Open — fast replies',
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'you@domain.com',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me the idea, the timeline, and the vibe you want...',
        submit: 'Send message',
        sendAnother: 'Send another',
        helper: 'Resend handles delivery. It always arrives.'
      },
      validation: {
        required: 'Some fields are empty',
        email: "That email doesn't look right",
        success: 'Message sent',
        successDesc: "I'll get back to you soon.",
        error: 'Something went wrong',
        fallback: 'Try again in a moment.'
      }
    },
    education: {
      sectionTitle: 'Courses & obsessions',
      headline: 'Always learning',
      interact: 'Interactive',
      hint: 'Tap to see details',
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
          detail: 'Web structure, semantic tags, accessibility and modern best practices.'
        },
        {
          title: 'CSS University - From Zero to Expert',
          place: 'Udemy',
          period: '2023 - 2024',
          detail: 'Advanced layout, flexbox, grid, animations and painless responsive design.'
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
          period: '2026',
          detail: 'Modern interfaces, state management, APIs and the full MEVN environment.'
        },
        {
          title: 'Dart + Introduction to Flutter',
          place: 'Udemy',
          period: '2026',
          detail: 'Cross-platform mobile application fundamentals.'
        },
        {
          title: 'Aliado Latino Project - Full-Stack Developer',
          place: 'Proyecto Aliado Latino',
          period: '2026',
          detail: 'Web platform with Google Drive API integration, authentication, file management and business dashboard.'
        },
        {
          title: 'Anthropic AI Engineering',
          place: 'Anthropic Courses',
          period: '2026',
          detail: 'Advanced AI agent development, prompt engineering, and tool use with Claude.'
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
          detail: 'Software architecture, databases, backend engineering, networks and modern web development.'
        },
        {
          title: 'International Exchange - Engineer in Training',
          place: 'UDEM - Universidad de Monterrey, Mexico',
          period: '2023 (Second semester)',
          detail: 'Academic exchange with emphasis on projects, critical thinking and technological innovation.'
        },
        {
          title: 'Software Development Technology',
          place: 'UNIMINUTO - Corporacion Universitaria Minuto de Dios',
          period: '2022 - 2025',
          detail: 'Web development, databases, OOP, APIs, architecture and agile methodologies.'
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
