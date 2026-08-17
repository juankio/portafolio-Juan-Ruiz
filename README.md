<div align="center">
  <img src="public/icons/pwa-192x192.png" alt="Logo" width="120" height="120" />
  <h1>Juan Miguel Ruiz | Dev Portfolio 🚀</h1>
  
  <blockquote>
    <i>"Un código afilado como Wado Ichimonji. Sin movimientos en falso."</i> ⚔️<br/>
    <b>Portafolio personal ultra-rápido, optimizado con AIO/GEO y JSON-LD.</b>
  </blockquote>
  
  <p>
    <a href="https://bun.sh"><img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" /></a>
    <a href="https://nuxt.com"><img src="https://img.shields.io/badge/Nuxt_3-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82" alt="Nuxt 3" /></a>
    <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue_3-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" alt="Vue.js" /></a>
    <a href="https://animejs.com/"><img src="https://img.shields.io/badge/Anime.js-FF4B4B?style=for-the-badge&logo=anime.js&logoColor=white" alt="Anime.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/Performance-100%2F100-success?style=for-the-badge&logo=lighthouse&color=00cc66" alt="Performance 100" />
    <img src="https://img.shields.io/badge/Accessibility-100%2F100-success?style=for-the-badge&logo=lighthouse&color=00cc66" alt="Accessibility 100" />
    <img src="https://img.shields.io/badge/Best_Practices-100%2F100-success?style=for-the-badge&logo=lighthouse&color=00cc66" alt="Best Practices 100" />
    <img src="https://img.shields.io/badge/SEO-100%2F100-success?style=for-the-badge&logo=lighthouse&color=00cc66" alt="SEO 100" />
  </p>

  <p>
    <img src="https://img.shields.io/github/repo-size/juankio/portafolio-Juan-Ruiz?style=for-the-badge&color=8A2BE2" alt="Repo Size" />
    <img src="https://img.shields.io/github/last-commit/juankio/portafolio-Juan-Ruiz?style=for-the-badge&color=FF69B4" alt="Last Commit" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  </p>
</div>

<br />

## 📖 Tabla de Contenidos

1. [🌟 Sobre el Proyecto](#-sobre-el-proyecto)
2. [✨ Características Principales & AIO/GEO](#-características-principales--aiogeo)
3. [🖼️ Showcase & UI](#️-showcase--ui)
4. [📐 Arquitectura & Diagrama](#-arquitectura--diagrama)
5. [🛠️ Stack Tecnológico](#️-stack-tecnológico)
6. [🚀 Instalación (Strictly Bun)](#-instalación-strictly-bun)
7. [🧠 Zettelkasten Knowledge Base](#-zettelkasten-knowledge-base)

---

## 🌟 Sobre el Proyecto

Este repositorio alberga mi identidad digital. Más que un portafolio, es un demostrador técnico forjado con la disciplina de un samurái del frontend. Cada componente ha sido extraído, modularizado y estilizado con *Armament Haki* para lograr una UI inquebrantable, responsiva y accesible.

El diseño está enfocado en una **excelente experiencia de usuario (UX)**, con micro-interacciones pulidas y animaciones dinámicas, todo potenciado por el motor de **Nuxt 3**.

---

## ✨ Características Principales & AIO/GEO

| Feature | Descripción |
| :--- | :--- |
| ⚡️ **Rendimiento Extremo** | Renderizado del lado del servidor (SSR), optimización agresiva de imágenes y un bundle cortado en pedazos para ser súper ligero. |
| 🧠 **AIO & GEO Optimization** | **NUEVO:** Optimizado para AI Overview (AIO) y Generative Engine Optimization (GEO). Usamos `JSON-LD` semántico estructurado a la perfección para dominar métricas de LLMs y buscadores. |
| 🎨 **UI/UX Premium** | Diseño neo-brutalista moderno, minimalista, con sistema de tokens para una adaptación orgánica (Tailwind + Animaciones fluidas). |
| 🌗 **Modo Oscuro/Claro** | Transiciones suaves de tema gestionadas nativamente sin bloqueos. |
| 🌍 **Multilenguaje (i18n)** | Soporte total en Español (ES) e Inglés (EN) listo para crecer. |
| 📦 **GitHub API Integration** | Consumo dinámico de mis repositorios. El código habla por mí, actualizándose en tiempo real. |

---

## 🖼️ Showcase & UI

<table align="center" style="width: 100%; border-collapse: collapse;">
  <tr>
    <td align="center" width="50%">
      <b>Vista Desktop (Ultra-wide Ready)</b><br/><br/>
      <img src="https://raw.githubusercontent.com/juankio/portafolio-Juan-Ruiz/main/public/icons/pwa-512x512.png" width="60%" alt="Hero View" style="border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);" />
    </td>
    <td align="center" width="50%">
      <b>Optimización Móvil Orgánica</b><br/><br/>
      <img src="https://raw.githubusercontent.com/juankio/portafolio-Juan-Ruiz/main/public/icons/maskable-icon-512x512.png" width="60%" alt="Mobile View" style="border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);" />
    </td>
  </tr>
</table>

*(Screenshots generados de los iconos de la PWA del proyecto como placeholder representativo del estilo general)*

---

## 📐 Arquitectura & Diagrama

Corté la deuda técnica y unifiqué el flujo de datos. **Nuxt 3 Nitro** orquesta las requests del lado del servidor, y entrega a Vue la tarea de hidratar y controlar el DOM reactivo.

```mermaid
graph TD;
    A[Navegador del Usuario] -->|HTTP Request| B(Nuxt 3 Nitro Server);
    B -->|Server-Side Rendering| C{Vue 3 App};
    C -->|Fetch Data| D[(GitHub GraphQL/REST API)];
    C -->|Inyección JSON-LD| E[AIO/GEO Metadata];
    D -->|Repositorios & Commits| C;
    C -->|Hidratación| F[DOM / Client Side];
    F -->|Transiciones Vivas| G[Anime.js / Tailwind v4];
    G --> A;
```

<details>
<summary><b>📂 Ver Estructura de Carpetas (Directory Tree)</b></summary>
<br>

```bash
📦 portafolio-Juan-Ruiz
 ┣ 📂 assets
 ┃ ┣ 📂 css        # Tokens globales de Tailwind
 ┃ ┗ 📂 img        # Activos visuales fijos
 ┣ 📂 components   # Modularizados con estilo Santoryu
 ┃ ┣ 📂 ui         # Botones, Inputs, Modales aislados
 ┃ ┣ 📂 layout     # Header, Footer, Wrappers
 ┃ ┗ 📜 Hero.vue   # Componente base
 ┣ 📂 composables  # Lógica TS extraída y limpia
 ┃ ┗ 📜 useGitHub.ts
 ┣ 📂 pages
 ┃ ┗ 📜 index.vue  # Raíz hidratada
 ┣ 📂 public       # Archivos estáticos y PWA manifest
 ┣ 📂 server       # Endpoints Nitro (Backend for Frontend)
 ┣ 📜 nuxt.config.ts
 ┣ 📜 package.json
 ┣ 📜 bun.lockb    # Bloqueo estricto de BUN
 ┗ 📜 README.md    # Estás aquí
```

</details>

---

## 🛠️ Stack Tecnológico

| Dominio | Tecnología Base |
| :--- | :--- |
| **Framework Base** | Nuxt 3 + Vue 3 (Composition API) |
| **Styling & UI** | Tailwind CSS v4 |
| **Tipado Estricto** | TypeScript |
| **Motion & Dynamics** | Anime.js + Vue Transitions |
| **Icons & Assets** | Nuxt UIcons (`heroicons`, `ph`) |
| **Engine & Scripts** | **Bun** 🥟 |

---

## 🚀 Instalación (Strictly Bun)

En este dojo, la ley es estricta: **`npm` y `yarn` están prohibidos.** Todo corre sobre `bun` para evitar cuellos de botella y arrancar proyectos a la velocidad del rayo.

### 1. Clonar el repositorio
```bash
git clone https://github.com/juankio/portafolio-Juan-Ruiz.git
cd portafolio-Juan-Ruiz
```

### 2. Instalar dependencias
```bash
bun install
```

### 3. Configurar variables de entorno (Opcional)
Si necesitas expandir los límites de la API de GitHub, crea un archivo `.env`:
```bash
echo "GITHUB_TOKEN=tu_token_personal_aqui" > .env
```

### 4. Modo Desarrollo
Levanta la interfaz y observa cómo cobra vida:
```bash
bun run dev
```
> El proyecto estará corriendo y afilado en `http://localhost:3000`

### 5. Compilación para Producción
```bash
bun run build
# Para previsualizar el código compilado:
bun run preview
```

---

## 🧠 Zettelkasten / Knowledge Base

Como parte de la disciplina del desarrollador y la persistencia de las arquitecturas generadas, este README conecta directamente a mi **Cerebro Digital (Obsidian Vault)**:

- 🔗 `[[Estrategia-GEO-AIO-Portafolio]]` - Notas y decisiones sobre la implementación del JSON-LD y optimización para Inteligencia Artificial.
- 🔗 `[[Auditoria-Portafolio-Robin]]` - Registros de las pruebas de seguridad, QA visual, score audit y performance.

---

<div align="center">
  <img src="https://github.com/juankio.png" width="60" style="border-radius: 50%; box-shadow: 0 0 10px rgba(0, 220, 130, 0.5);"/>
  <br/>
  <sub>Desarrollado con técnica de Tres Espadas (Santoryu) por <b>Juan Miguel Ruiz</b></sub>
  <br/>
  <a href="https://www.linkedin.com/in/juan-miguel-ruiz-300037276/">LinkedIn</a> • <a href="https://github.com/juankio">GitHub</a>
</div>
