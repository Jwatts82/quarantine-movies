//const BASE_URL = 'http://localhost:3000'

//window.addEventListener("DOMContentLoaded", () => {
  //  document.getElementById('category-form').addEventListener('click', displayCreateForm)
    //document.getElementById('categories').addEventListener('click', getCategories) //add listeners to buttons
    //getCategories()
//})




//new route category
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

//create route category
function createCategory(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let category = {
        name: e.target.querySelector("#name").value
    }

    let configObj = {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    }

    fetch(BASE_URL + '/categories', configObj)    
    .then(res => res.json())
    .then(category => {
        main.innerHTML += `
        <li>
            <a href="#" data-id="${category.id}">${category.name}</a>
        </li>
        ` 
        attachClicksToLinks()
        clearForm()
        }
    )
}

//categories index
function getCategories() {
    let main = document.getElementById('main')
    main.innerHTML = "" //blank the page and put categories on
    fetch(BASE_URL + '/categories') //
    .then(res => res.json()) //
    //fetchCategories
    .then(categories => {
        categories.map(category => {
        main.innerHTML += `
        <li>
            <a href="#" data-id="${category.id}">${category.name}</a>
        </li>
        ` 
        })
        attachClicksToLinks()    
    })
}

//async
//async function fetchCategories(){
  //  let res = await fetch(BASE_URL + '/categories')
  //  let data = await res.json()
  //  return data
//}

function attachClicksToLinks() {
    const categories = document.querySelectorAll("li a")
    categories.forEach(category => {
        category.addEventListener('click', displayCategory)
    })
}

//category show view
function displayCategory(e) {
    console.log(e.target)
    let id = e.target.dataset.id
    let main = document.getElementById('main')
    main.innerHTML = ""
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
}

//movie show route
function displayMovie(e) {
    console.log(e.target)
    let id = e.target.dataset.id
    let main = document.getElementById('main') //querySelector("#main")
    
    main.innerHTML = ""
    fetch(BASE_URL + `/movies/${id}`)
    .then(resp => resp.json())
    .then(movie => {

        main.innerHTML = `
        <h3>${movie.title}</h3>
        <hr>
        <br>

        <h4>Description:</h4>
        <h4>${movie.description}</h4>
        <br>
        `
    })
}

// delete - delete movie 2

/*function removeMovie(event){
    let configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + `/movies/${event.target.dataset.id}`, configObj)
        .then(getCategories())
    
}*/


//new route movie
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

//create route movie
function createMovie(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let movie = {
        title: e.target.querySelector("#title").value
    }

    let configObj = {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    }

    fetch(BASE_URL + '/movies', configObj)    
    .then(res => res.json())
    .then(movie => {
        main.innerHTML += `
        <li>
            <a href="#" data-id="${movie.id}">${movie.title}</a>
        </li>
        ` 
        attachClicksToCreateMovie()
        clearForm()
        }
    )
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

function clearForm() {
    let formDiv = document.querySelector('#new-category-form')
    formDiv.innerHTML = ""
}