// LocalStorage bilan ishlash
const MOVIES_STORAGE_KEY = "movienest_movies"
const ADMIN_EMAIL = "dadordev@gmail.com"
const ADMIN_PASSWORD = "dadordev"

// Demo kinolar
const demoMovies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Action, Adventure, Drama",
    director: "Anthony Russo, Joe Russo",
    poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    telegramLink: "https://t.me/movienest_uz",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    director: "Frank Darabont",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco",
    telegramLink: "https://t.me/movienest_uz",
  },
  {
    id: 3,
    title: "Inception",
    year: 2010,
    genre: "Action, Adventure, Sci-Fi",
    director: "Christopher Nolan",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    telegramLink: "https://t.me/movienest_uz",
  },
  {
    id: 4,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action, Crime, Drama",
    director: "Christopher Nolan",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    telegramLink: "https://t.me/movienest_uz",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime, Drama",
    director: "Quentin Tarantino",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    telegramLink: "https://t.me/movienest_uz",
  },
  {
    id: 6,
    title: "Parasite",
    year: 2019,
    genre: "Comedy, Drama, Thriller",
    director: "Bong Joon Ho",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    telegramLink: "https://t.me/movienest_uz",
  },
]

// Sahifalar
const userView = document.getElementById("userView")
const movieDetails = document.getElementById("movieDetails")
const adminLogin = document.getElementById("adminLogin")
const adminPanel = document.getElementById("adminPanel")
const movieForm = document.getElementById("movieForm")
const trailerModal = document.getElementById("trailerModal")

// Tugmalar
const adminBtn = document.getElementById("adminBtn")
const backBtn = document.getElementById("backBtn")
const searchBtn = document.getElementById("searchBtn")
const searchInput = document.getElementById("searchInput")
const loginForm = document.getElementById("loginForm")
const addMovieBtn = document.getElementById("addMovieBtn")
const deleteAllBtn = document.getElementById("deleteAllBtn")
const logoutBtn = document.getElementById("logoutBtn")
const saveMovieBtn = document.getElementById("saveMovieBtn")
const cancelFormBtn = document.getElementById("cancelFormBtn")
const exportJsonBtn = document.getElementById("exportJsonBtn")
const importJsonBtn = document.getElementById("importJsonBtn")
const importJsonInput = document.getElementById("importJsonInput")
const closeTrailerBtn = document.getElementById("closeTrailerBtn")

// Modal
const confirmModal = document.getElementById("confirmModal")
const confirmMessage = document.getElementById("confirmMessage")
const confirmYes = document.getElementById("confirmYes")
const confirmNo = document.getElementById("confirmNo")

// Kinolar ro'yxati
const moviesList = document.getElementById("moviesList")
const adminMoviesList = document.getElementById("adminMoviesList")

// Formalar
const addEditMovieForm = document.getElementById("addEditMovieForm")
const formTitle = document.getElementById("formTitle")

// Particles yaratish
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
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
    const duration = Math.random() * 15 + 10
    particle.style.animation = `floatParticle ${duration}s linear infinite`

    // Random delay
    const delay = Math.random() * 10
    particle.style.animationDelay = `${delay}s`

    particlesContainer.appendChild(particle)
  }
}

// Kino ma'lumotlarini olish
function getMovies() {
  const storedMovies = localStorage.getItem(MOVIES_STORAGE_KEY)
  if (storedMovies) {
    return JSON.parse(storedMovies)
  } else {
    // Agar localStorage bo'sh bo'lsa, demo kinolarni saqlash
    localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(demoMovies))
    return demoMovies
  }
}

// Kinolarni saqlash
function saveMovies(movies) {
  localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(movies))
}

// Kinolarni ko'rsatish (foydalanuvchi ko'rinishi)
function displayMovies(movies = getMovies(), container = moviesList) {
  container.innerHTML = ""

  if (movies.length === 0) {
    container.innerHTML = '<p class="no-movies">Kinolar topilmadi</p>'
    return
  }

  movies.forEach((movie, index) => {
    const movieCard = document.createElement("div")
    movieCard.className = "movie-card"
    movieCard.dataset.id = movie.id
    // Animatsiya uchun kechikish
    movieCard.style.animationDelay = `${index * 0.05}s`

    // Admin paneli uchun qo'shimcha tugmalar
    let adminActions = ""
    if (container === adminMoviesList) {
      adminActions = `
                <div class="admin-movie-actions">
                    <button class="edit-btn" data-id="${movie.id}" title="Tahrirlash"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${movie.id}" title="O'chirish"><i class="fas fa-trash"></i></button>
                </div>
            `
      movieCard.className += " admin-movie-card"
    }

    movieCard.innerHTML = `
            ${adminActions}
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p><i class="fas fa-calendar-alt"></i> ${movie.year} | <i class="fas fa-film"></i> ${movie.genre}</p>
            </div>
        `

    // Kino kartasini bosganda batafsil ma'lumot ko'rsatish
    if (container === moviesList) {
      movieCard.addEventListener("click", () => showMovieDetails(movie.id))
    }

    // 3D effect
    movieCard.addEventListener("mousemove", (e) => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const angleX = ((y - centerY) / centerY) * 10
      const angleY = ((x - centerX) / centerX) * 10

      card.style.transform = `translateY(-15px) rotateX(${angleX}deg) rotateY(${angleY}deg)`
    })

    movieCard.addEventListener("mouseleave", (e) => {
      const card = e.currentTarget
      card.style.transform = ""
    })

    container.appendChild(movieCard)
  })

  // Admin paneli uchun tugmalar qo'shish
  if (container === adminMoviesList) {
    addAdminEventListeners()
  }
}

// Kino qidirish
function searchMovies() {
  const searchTerm = searchInput.value.toLowerCase().trim()
  if (!searchTerm) {
    displayMovies()
    return
  }

  const movies = getMovies()
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm) ||
      movie.director.toLowerCase().includes(searchTerm) ||
      movie.year.toString().includes(searchTerm),
  )

  displayMovies(filteredMovies)
}

// Kino haqida batafsil ma'lumot ko'rsatish
function showMovieDetails(movieId) {
  const movies = getMovies()
  const movie = movies.find((m) => m.id === Number.parseInt(movieId))

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
                <p><strong>Rejissor:</strong> ${movie.director}</p>
                <p><strong>Tavsif:</strong> ${movie.description}</p>
                <div class="movie-actions">
                    <button class="watch-trailer" data-url="${movie.trailerUrl}"><i class="fab fa-youtube"></i> Treyler Ko'rish</button>
                    <button class="watch-movie" data-url="${movie.telegramLink}"><i class="fab fa-telegram"></i> Telegram Bot Orqali Ko'rish</button>
                </div>
            </div>
        </div>
    `

  // Treyler ko'rish tugmasi
  const trailerBtn = movieDetailContent.querySelector(".watch-trailer")
  trailerBtn.addEventListener("click", () => {
    showTrailerModal(movie.trailerUrl)
  })

  // Telegram bot orqali ko'rish tugmasi
  const telegramBtn = movieDetailContent.querySelector(".watch-movie")
  telegramBtn.addEventListener("click", () => {
    window.open(movie.telegramLink, "_blank")
  })

  // Ko'rinishni o'zgartirish
  userView.classList.remove("active")
  userView.classList.add("hidden")
  movieDetails.classList.remove("hidden")
  movieDetails.classList.add("active")

  // Sahifa tepasiga o'tish
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Treyler modalni ko'rsatish
function showTrailerModal(url) {
  // YouTube video ID ni olish
  const videoId = getYouTubeVideoId(url)
  if (!videoId) return

  // iframe src ni o'zgartirish
  const trailerFrame = document.getElementById("trailerFrame")
  trailerFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`

  // Modalni ko'rsatish
  trailerModal.classList.remove("hidden")
}

// YouTube video ID ni olish
function getYouTubeVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Admin paneli uchun tugmalar qo'shish
function addAdminEventListeners() {
  // Tahrirlash tugmalari
  const editBtns = document.querySelectorAll(".edit-btn")
  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      const movieId = Number.parseInt(btn.dataset.id)
      editMovie(movieId)
    })
  })

  // O'chirish tugmalari
  const deleteBtns = document.querySelectorAll(".delete-btn")
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      const movieId = Number.parseInt(btn.dataset.id)
      showConfirmModal(`Kinoni o'chirishni tasdiqlaysizmi?`, () => deleteMovie(movieId))
    })
  })
}

// Kino qo'shish/tahrirlash formasini ko'rsatish
function showMovieForm(isEdit = false, movieId = null) {
  formTitle.textContent = isEdit ? "Kinoni Tahrirlash" : "Yangi Kino Qo'shish"

  // Agar tahrirlash bo'lsa, formani to'ldirish
  if (isEdit && movieId) {
    const movies = getMovies()
    const movie = movies.find((m) => m.id === movieId)

    if (movie) {
      document.getElementById("movieId").value = movie.id
      document.getElementById("title").value = movie.title
      document.getElementById("year").value = movie.year
      document.getElementById("genre").value = movie.genre
      document.getElementById("director").value = movie.director
      document.getElementById("poster").value = movie.poster
      document.getElementById("description").value = movie.description
      document.getElementById("trailerUrl").value = movie.trailerUrl
      document.getElementById("telegramLink").value = movie.telegramLink
    }
  } else {
    // Yangi kino uchun formani tozalash
    addEditMovieForm.reset()
    document.getElementById("movieId").value = ""
  }

  movieForm.classList.remove("hidden")

  // Form elementiga fokus
  setTimeout(() => {
    document.getElementById("title").focus()
  }, 100)
}

// Kino qo'shish/tahrirlash
function saveMovie(e) {
  e.preventDefault()

  const movieId = document.getElementById("movieId").value
  const title = document.getElementById("title").value
  const year = Number.parseInt(document.getElementById("year").value)
  const genre = document.getElementById("genre").value
  const director = document.getElementById("director").value
  const poster = document.getElementById("poster").value
  const description = document.getElementById("description").value
  const trailerUrl = document.getElementById("trailerUrl").value
  const telegramLink = document.getElementById("telegramLink").value

  const movies = getMovies()

  // Yangi kino yoki mavjud kinoni tahrirlash
  if (movieId) {
    // Tahrirlash
    const index = movies.findIndex((m) => m.id === Number.parseInt(movieId))
    if (index !== -1) {
      movies[index] = {
        id: Number.parseInt(movieId),
        title,
        year,
        genre,
        director,
        poster,
        description,
        trailerUrl,
        telegramLink,
      }

      // Muvaffaqiyatli xabar
      showNotification("Kino muvaffaqiyatli tahrirlandi!")
    }
  } else {
    // Yangi kino qo'shish
    const newId = movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1
    movies.push({
      id: newId,
      title,
      year,
      genre,
      director,
      poster,
      description,
      trailerUrl,
      telegramLink,
    })

    // Muvaffaqiyatli xabar
    showNotification("Yangi kino muvaffaqiyatli qo'shildi!")
  }

  saveMovies(movies)
  displayMovies(movies, adminMoviesList)
  movieForm.classList.add("hidden")
}

// Kinoni tahrirlash
function editMovie(movieId) {
  showMovieForm(true, movieId)
}

// Kinoni o'chirish
function deleteMovie(movieId) {
  const movies = getMovies()
  const updatedMovies = movies.filter((movie) => movie.id !== movieId)
  saveMovies(updatedMovies)
  displayMovies(updatedMovies, adminMoviesList)

  // Muvaffaqiyatli xabar
  showNotification("Kino muvaffaqiyatli o'chirildi!")
}

// Barcha kinolarni o'chirish
function deleteAllMovies() {
  saveMovies([])
  displayMovies([], adminMoviesList)

  // Muvaffaqiyatli xabar
  showNotification("Barcha kinolar muvaffaqiyatli o'chirildi!")
}

// Tasdiqlash modalni ko'rsatish
function showConfirmModal(message, onConfirm) {
  confirmMessage.textContent = message
  confirmModal.classList.remove("hidden")

  // Tasdiqlash tugmasi
  confirmYes.onclick = () => {
    onConfirm()
    confirmModal.classList.add("hidden")
  }

  // Bekor qilish tugmasi
  confirmNo.onclick = () => {
    confirmModal.classList.add("hidden")
  }

  // Esc tugmasi bilan yopish
  document.addEventListener("keydown", function escListener(e) {
    if (e.key === "Escape") {
      confirmModal.classList.add("hidden")
      document.removeEventListener("keydown", escListener)
    }
  })
}

// Admin panelga kirish
function login(e) {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    adminLogin.classList.add("hidden")
    adminPanel.classList.remove("hidden")
    displayMovies(getMovies(), adminMoviesList)

    // Muvaffaqiyatli xabar
    showNotification("Admin panelga muvaffaqiyatli kirdingiz!")
  } else {
    // Xatolik xabari
    showNotification("Login yoki parol noto'g'ri!", true)
  }
}

// Admin paneldan chiqish
function logout() {
  adminPanel.classList.add("hidden")
  userView.classList.add("active")
  userView.classList.remove("hidden")
  adminLogin.classList.add("hidden")

  // Muvaffaqiyatli xabar
  showNotification("Admin paneldan chiqildi!")
}

// Kinolarni JSON formatida eksport qilish
function exportMoviesToJson() {
  const movies = getMovies()
  const jsonData = JSON.stringify(movies, null, 2)
  const blob = new Blob([jsonData], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "movienest_movies.json"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  // Muvaffaqiyatli xabar
  showNotification("Kinolar muvaffaqiyatli eksport qilindi!")
}

// JSON fayldan kinolarni import qilish
function importMoviesFromJson(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (event) => {
    try {
      const movies = JSON.parse(event.target.result)
      if (Array.isArray(movies)) {
        showConfirmModal("Mavjud kinolar o'rniga yangi kinolarni import qilishni tasdiqlaysizmi?", () => {
          saveMovies(movies)
          displayMovies(movies, adminMoviesList)
          showNotification("Kinolar muvaffaqiyatli import qilindi!")
        })
      } else {
        showNotification("Noto'g'ri JSON fayl formati!", true)
      }
    } catch (error) {
      showNotification("Faylni o'qishda xatolik yuz berdi: " + error.message, true)
    }
  }
  reader.readAsText(file)
  // Input qiymatini tozalash (qayta import qilish uchun)
  e.target.value = ""
}

// Xabar ko'rsatish
function showNotification(message, isError = false) {
  // Agar mavjud xabar bo'lsa, uni o'chirish
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Yangi xabar yaratish
  const notification = document.createElement("div")
  notification.className = `notification ${isError ? "error" : "success"}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${isError ? "fa-exclamation-circle" : "fa-check-circle"}"></i>
            <p>${message}</p>
        </div>
    `

  // Xabarni sahifaga qo'shish
  document.body.appendChild(notification)

  // Xabarni ko'rsatish
  setTimeout(() => {
    notification.classList.add("show")
  }, 10)

  // Xabarni yopish
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

// Glossy effect animation
function addGlossyEffect() {
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const angleX = ((y - centerY) / centerY) * 10
      const angleY = ((x - centerX) / centerX) * 10

      button.style.transform = `perspective(500px) rotateX(${-angleY}deg) rotateY(${angleX}deg) scale(1.02)`
      button.style.boxShadow = `0 5px 15px rgba(0, 198, 255, ${0.3 + (x / rect.width) * 0.2})`
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = ""
      button.style.boxShadow = ""
    })
  })
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Particles yaratish
  createParticles()

  // Kinolarni ko'rsatish
  displayMovies()

  // Glossy effect qo'shish
  addGlossyEffect()

  // Admin tugmasi
  adminBtn.addEventListener("click", () => {
    userView.classList.add("hidden")
    movieDetails.classList.add("hidden")
    adminLogin.classList.remove("hidden")

    // Form elementiga fokus
    setTimeout(() => {
      document.getElementById("email").focus()
    }, 100)
  })

  // Orqaga tugmasi
  backBtn.addEventListener("click", () => {
    movieDetails.classList.add("hidden")
    userView.classList.remove("hidden")
    userView.classList.add("active")
  })

  // Qidirish
  searchBtn.addEventListener("click", searchMovies)
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchMovies()
    }
  })

  // Admin login
  loginForm.addEventListener("submit", login)

  // Admin panel tugmalari
  addMovieBtn.addEventListener("click", () => showMovieForm())
  deleteAllBtn.addEventListener("click", () => {
    showConfirmModal("Barcha kinolarni o'chirishni tasdiqlaysizmi?", deleteAllMovies)
  })
  logoutBtn.addEventListener("click", logout)

  // JSON eksport/import tugmalari
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener("click", exportMoviesToJson)
  }
  if (importJsonBtn) {
    importJsonBtn.addEventListener("click", () => {
      importJsonInput.click()
    })
  }
  if (importJsonInput) {
    importJsonInput.addEventListener("change", importMoviesFromJson)
  }

  // Kino qo'shish/tahrirlash formasi
  addEditMovieForm.addEventListener("submit", saveMovie)
  cancelFormBtn.addEventListener("click", () => {
    movieForm.classList.add("hidden")
  })

  // Treyler modalni yopish
  closeTrailerBtn.addEventListener("click", () => {
    trailerModal.classList.add("hidden")
    document.getElementById("trailerFrame").src = ""
  })

  // Esc tugmasi bilan formani yopish
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!movieForm.classList.contains("hidden")) {
        movieForm.classList.add("hidden")
      }
      if (!trailerModal.classList.contains("hidden")) {
        trailerModal.classList.add("hidden")
        document.getElementById("trailerFrame").src = ""
      }
    }
  })

  // Modal tashqarisini bosganda yopish
  movieForm.addEventListener("click", (e) => {
    if (e.target === movieForm) {
      movieForm.classList.add("hidden")
    }
  })

  confirmModal.addEventListener("click", (e) => {
    if (e.target === confirmModal) {
      confirmModal.classList.add("hidden")
    }
  })

  trailerModal.addEventListener("click", (e) => {
    if (e.target === trailerModal) {
      trailerModal.classList.add("hidden")
      document.getElementById("trailerFrame").src = ""
    }
  })

  // Parallax effect
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    const depth = 30
    const moveX = mouseX * depth
    const moveY = mouseY * depth

    document.documentElement.style.setProperty("--mouse-x", moveX + "px")
    document.documentElement.style.setProperty("--mouse-y", moveY + "px")
  })
})