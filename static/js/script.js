// Global variables
let movies = []
const userView = document.getElementById("userView")
const movieDetails = document.getElementById("movieDetails")
const backBtn = document.getElementById("backBtn")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const confirmModal = document.getElementById("confirmModal")
const confirmMessage = document.getElementById("confirmMessage")
const confirmYes = document.getElementById("confirmYes")
const confirmNo = document.getElementById("confirmNo")
const trailerModal = document.getElementById("trailerModal")
const trailerFrame = document.getElementById("trailerFrame")
const closeTrailerBtn = document.getElementById("closeTrailerBtn")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Initialize 3D background
  initThreeJSBackground()

  // Initialize particles
  createParticles()

  // Load movies
  if (window.initialMovies) {
    movies = window.initialMovies
    renderMovies(movies)
  } else {
    fetchMovies()
  }

  // Event listeners
  if (backBtn) {
    backBtn.addEventListener("click", goBack)
  }

  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", searchMovies)
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        searchMovies()
      }
    })
  }

  if (confirmNo) {
    confirmNo.addEventListener("click", closeConfirmModal)
  }

  if (closeTrailerBtn) {
    closeTrailerBtn.addEventListener("click", closeTrailerModal)
  }

  // Admin panel specific event listeners
  if (window.isAdminPanel) {
    initAdminPanel()
  }
})

// Fetch movies from API
async function fetchMovies() {
  try {
    const response = await fetch("/api/movies")
    movies = await response.json()
    renderMovies(movies)
  } catch (error) {
    showNotification("Kinolarni yuklashda xatolik yuz berdi: " + error.message, true)
  }
}

// Render movies to the page
function renderMovies(moviesToRender) {
  const moviesList = document.getElementById("moviesList") || document.getElementById("adminMoviesList")
  if (!moviesList) return

  if (moviesToRender.length === 0) {
    moviesList.innerHTML = '<div class="no-movies">Hech qanday kino topilmadi</div>'
    return
  }

  moviesList.innerHTML = ""

  moviesToRender.forEach((movie, index) => {
    const movieCard = document.createElement("div")
    movieCard.className = "movie-card"
    movieCard.style.animationDelay = `${index * 0.1}s`

    movieCard.innerHTML = `
      <div class="movie-poster">
        <img src="${movie.poster}" alt="${movie.title}">
      </div>
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p><i class="fas fa-calendar-alt"></i> ${movie.year}</p>
        <p><i class="fas fa-film"></i> ${movie.genre}</p>
      </div>
    `

    // Add admin actions if in admin panel
    if (window.isAdminPanel) {
      const adminActions = document.createElement("div")
      adminActions.className = "admin-movie-actions"
      adminActions.innerHTML = `
        <button class="edit-btn" data-id="${movie.id}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-id="${movie.id}"><i class="fas fa-trash"></i></button>
      `
      movieCard.appendChild(adminActions)

      // Add event listeners for admin actions
      adminActions.querySelector(".edit-btn").addEventListener("click", (e) => {
        e.stopPropagation()
        editMovie(movie.id)
      })

      adminActions.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.stopPropagation()
        deleteMovie(movie.id)
      })
    }

    // Add click event to show movie details
    movieCard.addEventListener("click", () => {
      showMovieDetails(movie.id)
    })

    // Add 3D hover effect with Three.js
    add3DEffectToCard(movieCard)

    moviesList.appendChild(movieCard)
  })
}

// Go back to movie list
function goBack() {
  movieDetails.classList.remove("active")
  movieDetails.classList.add("hidden")
  userView.classList.remove("hidden")
  userView.classList.add("active")
}

// Search movies
function searchMovies() {
  const query = searchInput.value.toLowerCase().trim()
  if (query === "") {
    renderMovies(movies)
    return
  }

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query) ||
      (movie.director && movie.director.toLowerCase().includes(query)) ||
      (movie.description && movie.description.toLowerCase().includes(query)),
  )

  renderMovies(filteredMovies)
}

// Show movie details
function showMovieDetails(movieId) {
  const movie = movies.find((m) => m.id === Number(movieId))

  if (!movie) return

  const movieDetailContent = document.getElementById("movieDetailContent")
  movieDetailContent.innerHTML = `
    <div class="movie-detail-container">
      <div class="movie-detail-poster">
        <img src="${movie.poster}" alt="${movie.title}">
      </div>
      <div class="movie-detail-info">
        <h2>${movie.title} <span>(${movie.year})</span></h2>
        <p><strong>Janr:</strong> ${movie.genre}</p>
        <p><strong>Rejissor:</strong> ${movie.director || "Ma'lumot yo'q"}</p>
        <p><strong>Tavsif:</strong> ${movie.description || "Ma'lumot yo'q"}</p>
        <div class="movie-actions">
          <button class="watch-trailer" data-url="${movie.trailerUrl}"><i class="fab fa-youtube"></i> Treyler Ko'rish</button>
          <button class="watch-movie" data-url="${movie.telegramLink}"><i class="fab fa-telegram"></i> Telegram Bot Orqali Ko'rish</button>
        </div>
      </div>
    </div>
  `

  // Trailer button
  const trailerBtn = movieDetailContent.querySelector(".watch-trailer")
  trailerBtn.addEventListener("click", () => {
    showTrailerModal(movie.trailerUrl)
  })

  // Telegram button
  const telegramBtn = movieDetailContent.querySelector(".watch-movie")
  telegramBtn.addEventListener("click", () => {
    window.open(movie.telegramLink, "_blank")
  })

  // Change view
  userView.classList.remove("active")
  userView.classList.add("hidden")
  movieDetails.classList.remove("hidden")
  movieDetails.classList.add("active")

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })

  // Add 3D effect to movie detail
  add3DEffectToMovieDetail()
}

// Show trailer modal
function showTrailerModal(url) {
  // Extract YouTube video ID
  let videoId = ""
  if (url.includes("youtube.com")) {
    videoId = new URL(url).searchParams.get("v")
  } else if (url.includes("youtu.be")) {
    videoId = url.split("/").pop().split("?")[0]
  }

  if (videoId) {
    trailerFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
    trailerModal.classList.remove("hidden")

    // Add 3D effect to modal
    add3DEffectToModal(trailerModal)
  } else {
    showNotification("Video URL noto'g'ri formatda!", true)
  }
}

// Close trailer modal
function closeTrailerModal() {
  trailerFrame.src = ""
  trailerModal.classList.add("hidden")
}

// Show confirmation modal
function showConfirmModal(message, onConfirm) {
  confirmMessage.textContent = message
  confirmModal.classList.remove("hidden")

  // Remove previous event listener
  const newConfirmYes = confirmYes.cloneNode(true)
  confirmYes.replaceWith(newConfirmYes)
  const confirmYesElem = document.getElementById("confirmYes")

  // Add new event listener
  confirmYesElem.addEventListener("click", () => {
    onConfirm()
    closeConfirmModal()
  })

  // Add 3D effect to modal
  add3DEffectToModal(confirmModal)
}

// Close confirmation modal
function closeConfirmModal() {
  confirmModal.classList.add("hidden")
}

// Show notification
function showNotification(message, isError = false) {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create new notification
  const notification = document.createElement("div")
  notification.className = `notification ${isError ? "error" : "success"}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="${isError ? "fas fa-exclamation-circle" : "fas fa-check-circle"}"></i>
      <p>${message}</p>
    </div>
  `

  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => {
    notification.classList.add("show")
  }, 10)

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

// Initialize admin panel
function initAdminPanel() {
  const addMovieBtn = document.getElementById("addMovieBtn")
  const deleteAllBtn = document.getElementById("deleteAllBtn")
  const exportJsonBtn = document.getElementById("exportJsonBtn")
  const importJsonBtn = document.getElementById("importJsonBtn")
  const importJsonInput = document.getElementById("importJsonInput")
  const movieForm = document.getElementById("movieForm")
  const addEditMovieForm = document.getElementById("addEditMovieForm")
  const cancelFormBtn = document.getElementById("cancelFormBtn")

  if (addMovieBtn) {
    addMovieBtn.addEventListener("click", showAddMovieForm)
  }

  if (deleteAllBtn) {
    deleteAllBtn.addEventListener("click", deleteAllMovies)
  }

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener("click", exportMoviesToJson)
  }

  if (importJsonBtn && importJsonInput) {
    importJsonBtn.addEventListener("click", () => {
      importJsonInput.click()
    })
    importJsonInput.addEventListener("change", importMoviesFromJson)
  }

  if (addEditMovieForm) {
    addEditMovieForm.addEventListener("submit", saveMovie)
  }

  if (cancelFormBtn) {
    cancelFormBtn.addEventListener("click", hideMovieForm)
  }

  // Make sure the movie cards have the correct event listeners
  const adminMoviesList = document.getElementById("adminMoviesList")
  if (adminMoviesList) {
    const editBtns = adminMoviesList.querySelectorAll(".edit-btn")
    const deleteBtns = adminMoviesList.querySelectorAll(".delete-btn")

    editBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const movieId = btn.getAttribute("data-id")
        editMovie(movieId)
      })
    })

    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const movieId = btn.getAttribute("data-id")
        deleteMovie(movieId)
      })
    })
  }
}

// Show add movie form
function showAddMovieForm() {
  const formTitle = document.getElementById("formTitle")
  const movieIdInput = document.getElementById("movieId")
  const titleInput = document.getElementById("title")
  const yearInput = document.getElementById("year")
  const genreInput = document.getElementById("genre")
  const directorInput = document.getElementById("director")
  const posterInput = document.getElementById("poster")
  const descriptionInput = document.getElementById("description")
  const trailerUrlInput = document.getElementById("trailerUrl")
  const telegramLinkInput = document.getElementById("telegramLink")

  formTitle.textContent = "Yangi Kino Qo'shish"
  movieIdInput.value = ""
  titleInput.value = ""
  yearInput.value = new Date().getFullYear()
  genreInput.value = ""
  directorInput.value = ""
  posterInput.value = ""
  descriptionInput.value = ""
  trailerUrlInput.value = ""
  telegramLinkInput.value = "https://t.me/movienestuz_bot"

  document.getElementById("movieForm").classList.remove("hidden")

  // Add 3D effect to form
  add3DEffectToForm()
}

// Hide movie form
function hideMovieForm() {
  document.getElementById("movieForm").classList.add("hidden")
}

// Edit movie
function editMovie(movieId) {
  const movie = movies.find((m) => m.id === Number(movieId))
  if (!movie) return

  const formTitle = document.getElementById("formTitle")
  const movieIdInput = document.getElementById("movieId")
  const titleInput = document.getElementById("title")
  const yearInput = document.getElementById("year")
  const genreInput = document.getElementById("genre")
  const directorInput = document.getElementById("director")
  const posterInput = document.getElementById("poster")
  const descriptionInput = document.getElementById("description")
  const trailerUrlInput = document.getElementById("trailerUrl")
  const telegramLinkInput = document.getElementById("telegramLink")

  formTitle.textContent = "Kinoni Tahrirlash"
  movieIdInput.value = movie.id
  titleInput.value = movie.title
  yearInput.value = movie.year
  genreInput.value = movie.genre
  directorInput.value = movie.director || ""
  posterInput.value = movie.poster
  descriptionInput.value = movie.description || ""
  trailerUrlInput.value = movie.trailerUrl || ""
  telegramLinkInput.value = movie.telegramLink || "https://t.me/movienestuz_bot"

  document.getElementById("movieForm").classList.remove("hidden")

  // Add 3D effect to form
  add3DEffectToForm()
}

// Save movie
async function saveMovie(e) {
  e.preventDefault()

  const movieId = document.getElementById("movieId").value
  const movie = {
    title: document.getElementById("title").value,
    year: Number.parseInt(document.getElementById("year").value),
    genre: document.getElementById("genre").value,
    director: document.getElementById("director").value,
    poster: document.getElementById("poster").value,
    description: document.getElementById("description").value,
    trailerUrl: document.getElementById("trailerUrl").value,
    telegramLink: document.getElementById("telegramLink").value,
  }

  // Validate required fields
  if (!movie.title || !movie.year || !movie.genre || !movie.poster) {
    showNotification("Iltimos, barcha majburiy maydonlarni to'ldiring!", true)
    return
  }

  try {
    let response
    if (movieId) {
      // Update existing movie
      response = await fetch(`/api/movies/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      })
    } else {
      // Add new movie
      response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      })
    }

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`)
    }

    const result = await response.json()
    if (result.success) {
      await fetchMovies()
      hideMovieForm()
      showNotification(movieId ? "Kino muvaffaqiyatli yangilandi!" : "Yangi kino muvaffaqiyatli qo'shildi!")
    } else {
      showNotification("Xatolik yuz berdi: " + (result.error || "Noma'lum xato"), true)
    }
  } catch (error) {
    console.error("Error saving movie:", error)
    showNotification("Xatolik yuz berdi: " + error.message, true)
  }
}

// Delete movie
function deleteMovie(movieId) {
  showConfirmModal("Haqiqatan ham bu kinoni o'chirishni xohlaysizmi?", async () => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      const result = await response.json()
      if (result.success) {
        await fetchMovies()
        showNotification("Kino muvaffaqiyatli o'chirildi!")
      } else {
        showNotification("Xatolik yuz berdi: " + (result.error || "Noma'lum xato"), true)
      }
    } catch (error) {
      console.error("Error deleting movie:", error)
      showNotification("Xatolik yuz berdi: " + error.message, true)
    }
  })
}

// Delete all movies
function deleteAllMovies() {
  showConfirmModal("Haqiqatan ham barcha kinolarni o'chirishni xohlaysizmi?", async () => {
    try {
      const response = await fetch("/api/movies/delete-all", {
        method: "DELETE",
      })
      const result = await response.json()
      if (result.success) {
        await fetchMovies()
        showNotification("Barcha kinolar muvaffaqiyatli o'chirildi!")
      } else {
        showNotification("Xatolik yuz berdi: " + result.error, true)
      }
    } catch (error) {
      showNotification("Xatolik yuz berdi: " + error.message, true)
    }
  })
}

// Export movies to JSON
function exportMoviesToJson() {
  if (movies.length === 0) {
    showNotification("Eksport qilish uchun kinolar mavjud emas!", true)
    return
  }

  const dataStr = JSON.stringify(movies, null, 2)
  const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

  const exportFileDefaultName = "movies.json"

  const linkElement = document.createElement("a")
  linkElement.setAttribute("href", dataUri)
  linkElement.setAttribute("download", exportFileDefaultName)
  linkElement.click()

  showNotification("Kinolar muvaffaqiyatli eksport qilindi!")
}

// Import movies from JSON
function importMoviesFromJson(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (event) => {
    try {
      const importedMovies = JSON.parse(event.target.result)
      if (Array.isArray(importedMovies)) {
        showConfirmModal("Mavjud kinolar o'rniga yangi kinolarni import qilishni tasdiqlaysizmi?", async () => {
          try {
            // Delete all movies first
            await fetch("/api/movies/delete-all", { method: "DELETE" })

            // Add each movie
            for (const movie of importedMovies) {
              // Make a copy of the movie without the id to let the server assign a new one
              const movieData = { ...movie }
              delete movieData.id

              await fetch("/api/movies", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(movieData),
              })
            }

            // Fetch new data
            await fetchMovies()

            showNotification("Kinolar muvaffaqiyatli import qilindi!")
          } catch (error) {
            showNotification("Import qilishda xatolik yuz berdi: " + error.message, true)
          }
        })
      } else {
        showNotification("Noto'g'ri JSON fayl formati!", true)
      }
    } catch (error) {
      showNotification("Faylni o'qishda xatolik yuz berdi: " + error.message, true)
    }
  }
  reader.readAsText(file)
  // Clear input value (for re-importing)
  e.target.value = ""
}

// ===== 3D ANIMATIONS AND EFFECTS =====

// Initialize Three.js background
function initThreeJSBackground() {
  const container = document.createElement("div")
  container.className = "three-background"
  container.style.position = "fixed"
  container.style.top = "0"
  container.style.left = "0"
  container.style.width = "100%"
  container.style.height = "100%"
  container.style.zIndex = "-2"
  container.style.pointerEvents = "none"
  document.body.appendChild(container)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  // Create stars
  const starsGeometry = new THREE.BufferGeometry()
  const starsMaterial = new THREE.PointsMaterial({
    color: 0x00c6ff,
    size: 0.5,
    transparent: true,
    opacity: 0.8,
  })

  const starsVertices = []
  for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = (Math.random() - 0.5) * 2000
    starsVertices.push(x, y, z)
  }

  starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3))
  const stars = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(stars)

  // Create nebula
  const nebulaGeometry = new THREE.BufferGeometry()
  const nebulaMaterial = new THREE.PointsMaterial({
    color: 0x0088ff,
    size: 2,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
  })

  const nebulaVertices = []
  for (let i = 0; i < 500; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    const distance = 100 + Math.random() * 200

    const x = distance * Math.sin(phi) * Math.cos(theta)
    const y = distance * Math.sin(phi) * Math.sin(theta)
    const z = distance * Math.cos(phi)

    nebulaVertices.push(x, y, z)
  }

  nebulaGeometry.setAttribute("position", new THREE.Float32BufferAttribute(nebulaVertices, 3))
  const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial)
  scene.add(nebula)

  camera.position.z = 500

  // Animation
  function animate() {
    requestAnimationFrame(animate)

    stars.rotation.x += 0.0001
    stars.rotation.y += 0.0002

    nebula.rotation.x += 0.0002
    nebula.rotation.y += 0.0003

    renderer.render(scene, camera)
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  animate()
}

// Create particles
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  if (!particlesContainer) return

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random size
    const size = Math.random() * 5 + 2
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`

    // Random position
    const posX = Math.random() * 100
    particle.style.left = `${posX}%`

    // Random animation duration
    const duration = Math.random() * 20 + 10
    particle.style.animation = `floatParticle ${duration}s linear infinite`

    // Random delay
    const delay = Math.random() * 20
    particle.style.animationDelay = `${delay}s`

    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.2

    particlesContainer.appendChild(particle)
  }
}

// Add 3D effect to movie card
function add3DEffectToCard(card) {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = (x - centerX) / 20
    const rotateX = (centerY - y) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    card.style.transition = "transform 0.1s ease"

    // Add dynamic shadow
    card.style.boxShadow = `
      ${rotateY / 2}px ${rotateX / 2}px 20px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(0, 198, 255, 0.3)
    `

    // Add dynamic highlight
    const poster = card.querySelector(".movie-poster")
    if (poster) {
      poster.style.background = `
        linear-gradient(
          ${135 + rotateY}deg,
          rgba(0, 198, 255, ${0.1 + Math.abs(rotateY) / 100}),
          transparent 70%
        )
      `
    }
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = ""
    card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease"
    card.style.boxShadow = ""

    const poster = card.querySelector(".movie-poster")
    if (poster) {
      poster.style.background = ""
    }
  })
}

// Add 3D effect to movie detail
function add3DEffectToMovieDetail() {
  const movieDetail = document.getElementById("movieDetails")
  if (!movieDetail) return

  const poster = movieDetail.querySelector(".movie-detail-poster")
  if (!poster) return

  movieDetail.addEventListener("mousemove", (e) => {
    const rect = movieDetail.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const moveX = (x - centerX) / 30
    const moveY = (y - centerY) / 30

    poster.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) scale3d(1.05, 1.05, 1.05)`
    poster.style.transition = "transform 0.2s ease"

    // Add dynamic shadow
    poster.style.boxShadow = `
      ${moveX / 2}px ${moveY / 2}px 30px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(0, 198, 255, 0.4)
    `
  })

  movieDetail.addEventListener("mouseleave", () => {
    poster.style.transform = "perspective(1000px) rotateY(0) rotateX(0)"
    poster.style.transition = "transform 0.5s ease, box-shadow 0.5s ease"
    poster.style.boxShadow = ""
  })
}

// Add 3D effect to modal
function add3DEffectToModal(modal) {
  if (!modal) return

  const modalContent = modal.querySelector(".modal-content")
  if (!modalContent) return

  modal.addEventListener("mousemove", (e) => {
    const rect = modalContent.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const moveX = (x - centerX) / 40
    const moveY = (y - centerY) / 40

    modalContent.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`
    modalContent.style.transition = "transform 0.2s ease"

    // Add dynamic shadow
    modalContent.style.boxShadow = `
      ${moveX / 2}px ${moveY / 2}px 30px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(0, 198, 255, 0.4)
    `
  })

  modal.addEventListener("mouseleave", () => {
    modalContent.style.transform = ""
    modalContent.style.transition = "transform 0.5s ease, box-shadow 0.5s ease"
    modalContent.style.boxShadow = ""
  })
}

// Add 3D effect to form
function add3DEffectToForm() {
  const form = document.querySelector("#movieForm form")
  if (!form) return

  form.addEventListener("mousemove", (e) => {
    const rect = form.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const moveX = (x - centerX) / 50
    const moveY = (y - centerY) / 50

    form.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`
    form.style.transition = "transform 0.2s ease"

    // Add dynamic shadow
    form.style.boxShadow = `
      ${moveX / 2}px ${moveY / 2}px 30px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(0, 198, 255, 0.4)
    `
  })

  form.addEventListener("mouseleave", () => {
    form.style.transform = ""
    form.style.transition = "transform 0.5s ease, box-shadow 0.5s ease"
    form.style.boxShadow = ""
  })
}
