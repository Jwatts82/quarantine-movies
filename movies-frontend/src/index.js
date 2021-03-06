const apiService = new ApiService() 
let main = document.getElementById('main')

const init = () => {
    bindEventListeners()
    renderCategories() 
}

function bindEventListeners() {
    document.getElementById('category-form').addEventListener('click', displayCreateForm)
    document.getElementById('categories').addEventListener('click', renderCategories)
}

async function renderCategories() {
    const categories = await apiService.fetchCategories()
    main.innerHTML = ""
    categories.map(category => {
        const newCategory = new Category(category)
        main.innerHTML += newCategory.render()
    })
    attachClicksToLinks()
}

async function renderMovies() {  
    const movies = await apiService.fetchMovies()
    main.innerHTML = ""
    movies.map(movie => {
        const newMovie = new Movie(movie)
        main.innerHTML += newMovie.render()
    })
}

function displayCreateForm() {
    let formDiv = document.querySelector("#new-category-form")
    let html = `
        <form>
            <label>Name:</label>
            <input type="text" id="name">
            <input type="submit">
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createCategory)    
}

function displayMovieForm(e) { 

    let formDiv = document.querySelector("#add-movie-div") 
    let html = `
        <form>
            <input type="hidden" id="categoryId" value="${e.target.dataset.id}">
            <label>Title:</label>
            <input type="text" id="title">
            <label>Description:</label>
            <input type="text" id="description">
            <label>Watched:</label>
            <input type="checkbox" id="watched"></input>
            <input type="submit">
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createMovie)    
}

async function createCategory(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let category = {
        name: e.target.querySelector("#name").value
    }

    let data = await apiService.fetchCreateCategory(category)
    let newCategory = new Category(data)
    main.innerHTML += newCategory.render()
    attachClicksToLinks()
    clearForm()
}

async function createMovie(e) {
    e.preventDefault()

    const categoryId = document.querySelector("#add-movie").dataset.id
    let main = document.getElementById('main')
    let movie = {
        category_id: categoryId, 
        title: e.target.querySelector("#title").value,
        description: e.target.querySelector("#description").value,
        watched: e.target.querySelector("#watched").checked,
    }

    let data = await apiService.fetchCreateMovie(movie)
    let newMovie = new Movie(data)
    main.innerHTML = newMovie.renderMovie() 
    attachClicksToCreateMovie()
    clearForm()
}

async function displayMovie(e) {
    let id = e.target.dataset.id

    const data = await apiService.fetchMovie(id)
    const movie = new Movie(data)
    main.innerHTML = movie.renderMovie()
    document.getElementById('delete-movie').addEventListener('click', removeMovie) 
}

async function displayCategory(id){
    
    const data = await apiService.fetchCategory(id)
    const category = new Category(data)
    main.innerHTML = category.renderCategory()

    if (category.movies) {
        category.movies.forEach(movie => {
            main.innerHTML += `
            <li><a href="#" data-id="${movie.id}" data-category-id="${category.id}" >${movie.title}</a> -${movie.watched ? "Watchecd" : "Not Watched"}</li>
            <br>
            `
        })
        attachClicksToMoviesLinks()
    }
    document.getElementById('add-movie').addEventListener('click', displayMovieForm)
    clearForm()
    //document.getElementById('alert').addEventListener('click', moviesInCategory)
}

function moviesInCategory() {
    document.querySelectorAll("li a").length
    
}

async function removeMovie(e) {
    let categoryId = e.target.dataset.categoryId
    let id = e.target.dataset.id
    const data = await apiService.fetchRemoveMovie(id)
    .then(data => {
        displayCategory(categoryId)
    })
}

function attachClicksToLinks() {
    const categories = document.querySelectorAll("li a")
    categories.forEach(category => {
        category.addEventListener('click', (e) => displayCategory(e.target.dataset.id))
    })
}

function attachClicksToMoviesLinks() {
    const movies = document.querySelectorAll("li a")
    movies.forEach(movie => {
        movie.addEventListener('click', displayMovie)
    })
}

function attachClicksToCreateMovie() {
    const movies = document.querySelectorAll("li a")
    movies.forEach(movie => {
        movie.addEventListener('click', displayMovie)
    })
}

function clearForm() {
    let formDiv = document.querySelector('#new-category-form')
    formDiv.innerHTML = ""
}

init()