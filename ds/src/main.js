import './css/main.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

/* ------------------------------------------
   LOAD SIDEBAR INTO ALL PAGES
------------------------------------------- */
fetch("/asidebar.html")
  .then(res => res.text())
  .then(html => {
    const container = document.getElementById("sidebar")
    if (!container) return

    container.innerHTML = html

    // Highlight active link
    const current = window.location.pathname.split("/").pop()
    const links = container.querySelectorAll("a")

    links.forEach(link => {
      const href = link.getAttribute("href")
      if (href === current) {
        link.classList.add("active")
      }
    })

    // Auto-open the correct <details> section
    const allDetails = container.querySelectorAll("details")

    allDetails.forEach(details => {
      const sectionLinks = details.querySelectorAll("a")

      sectionLinks.forEach(link => {
        if (link.getAttribute("href") === current) {
          details.setAttribute("open", "")
        }
      })
    })
  })

/* ------------------------------------------
   VITE DEMO CODE (you can delete this later)
------------------------------------------- */
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
