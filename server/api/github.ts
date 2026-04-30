import { defineCachedEventHandler } from 'nitropack/runtime'

// Definimos la interfaz del repositorio que esperamos recibir para evitar los 'any'
interface GithubRepo {
  owner: {
    login: string
  }
  [key: string]: unknown
}

export default defineCachedEventHandler(async (event) => {
  try {
    const repos = await $fetch<GithubRepo[]>('https://api.github.com/users/juankio/starred?sort=created&per_page=50', {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'nuxt-portfolio-server'
      }
    })

    // Filtrar solo repositorios cuyo dueño es "juankio"
    const myProjects = repos.filter((repo) => repo.owner.login === 'juankio')

    // Devolver los primeros 12 proyectos más recientes
    return myProjects.slice(0, 12)
  } catch (error) {
    console.error('Error fetching github repos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching GitHub repositories'
    })
  }
}, {
  maxAge: 60 * 60 * 2, // Caché por 2 horas (7200 segundos)
  name: 'github-starred-repos',
  getKey: () => 'juankio-repos'
})
