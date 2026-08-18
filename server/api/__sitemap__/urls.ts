export default defineSitemapEventHandler(() => {
  return [
    { loc: '/', lastmod: new Date(), changefreq: 'daily', priority: 1.0 },
    { loc: '/sobre-mi', lastmod: new Date(), changefreq: 'weekly', priority: 0.8 },
    { loc: '/proyectos', lastmod: new Date(), changefreq: 'weekly', priority: 0.9 },
    { loc: '/contacto', lastmod: new Date(), changefreq: 'monthly', priority: 0.7 }
  ]
})