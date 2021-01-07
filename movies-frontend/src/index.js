const apiService = new ApiService() 
let main = document.getElementById('main')

const init = () => {
    bindEventListeners()
    renderCategories() 
}

function bindEventListeners() {
    document.getElementById('category-form').addEventListener('click', displayCreateForm)
    document.getElementById('categories').addEventListener('click', renderCategories) //add listeners to buttons
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
    attachClicksToMoviesLinks()
}

//new category
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

//new movie
function displayMovieForm() {
    let formDiv = document.querySelector("#new-movie-form")
    let html = `
        <form>
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
    let main = document.getElementById('main')
    let movie = {
        title: e.target.querySelector("#title").value,
        description: e.target.querySelector("#description").value,
        watched: e.target.querySelector("#watched").value,
    }

    let data = await apiService.fetchCreateMovie(movie)
    let newMovie = new Movie(data)
    main.innerHTML += newMovie.render()
    attachClicksToCreateMovie()
    clearForm()
}


//movie show route
async function displayMovie(e) {
    console.log(e.target)
    let id = e.target.dataset.id

    const data = await apiService.fetchMovie(id)
    const movie = new Movie(data)
    main.innerHTML = movie.renderMovie()
    document.getElementById('delete-movie').addEventListener('click', removeMovie)
}

async function displayCategory(e){
    console.log(e.target)
    let id = e.target.dataset.id
    
    const data = await apiService.fetchCategory(id)
    const category = new Category(data)
    main.innerHTML = category.renderCategory()
    if (category.movies) {
        category.movies.forEach(movie => {
            main.innerHTML += `
            <li><a href="#" data-id="${movie.id}">${movie.title}</a></li>
            <br>
            `
        })
    }
    document.getElementById('delete-category').addEventListener('click', removeCategory)

}

async function removeMovie(event) {
    let id = e.target.dataset.id
    const data = await apiService.fetchRemoveMovie(id)
    .then(data => {
        renderMovies()
    })
}

async function removeCategory(event) {
    let id = event.target.dataset.id
    const data = await apiService.fetchRemoveCategory(id)
    .then(data => {
        renderCategories()
    })
} 

function attachClicksToMoviesLinks() {
    const movies = document.querySelectorAll("li a")
    movies.forEach(movie => {
        movie.addEventListener('click', removeMovie)
    })
}

function attachClicksToCreateMovie() {
    const movies = document.querySelectorAll("li a")
    movies.forEach(movie => {
        movie.addEventListener('click', displayMovie)
    })
}

function attachClicksToLinks() {
    const categories = document.querySelectorAll("li a")
    categories.forEach(category => {
        category.addEventListener('click', displayCategory)
    })
}

function clearForm() {
    let formDiv = document.querySelector('#new-category-form')
    formDiv.innerHTML = ""
}

init()


/*main.innerHTML = ""
    fetch(BASE_URL + `/categories/${id}`)
    .then(resp => resp.json())
    .then(category => {
        main.innerHTML = `
        <h3>${category.name}</h3>
        <hr>
        <br>
        `
        category.movies.forEach(movie => {
            let movieList = document.createElement('div')
            
            movieList.setAttribute("id", `${movie.id}`)

            main.appendChild(movieList)

            movieList.innerHTML += `
            <li>
                <a href="#" data-id="${movie.id}">${movie.title}</a>
            </li>
            <button id="delete-movie" data-id="${movie.id}">Delete</button>

            `             
            //document.getElementById('delete-movie').addEventListener('click', removeMovie)
        })
        attachClicksToMoviesLinks()  
    })

}*/