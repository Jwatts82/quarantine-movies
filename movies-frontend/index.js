const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('category-form').addEventListener('click', displayCreateForm)
    document.getElementById('categories').addEventListener('click', getCategories) //add listeners to buttons
    getCategories()
})

function displayCreateForm() {
    let formDiv = document.querySelector('#new-category-form')
    let html =  `
        <form>
            <label>Name:</label>
            <input type="text" id="name">
            <input type="submit">
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('sumbit', createCategory)
}


function clearForm() {
    let formDiv = document.querySelector('new-category-form')
    formDiv.innerHTML = ""
}


function createCategory(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let category = {
        name: e.target.querySelector("name").value
    }
    let configObj = {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'applicaation/json'
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
    //fetch(BASE_URL + '/categories')
    //.then(res => res.json())
    fetchCategories()
    .then(  categories => {
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

async function fetchCategories() {
    let res = await fetch(BASE_URL + '/categories')
    let data = await res.json()
    return data
}

/*movies index view
function getMovies() {
    let main = document.getElementById('main')
    main.innerHTML = "" //blank the page and put movies on
    fetch(BASE_URL + '/movies')
    .then(res => res.json())
    .then(  movies => {
        movies.map(movie => {
        main.innerHTML += `
        <li>
            <a href="#" data-id="${movie.id}">${movie.title}</a>
            - ${movie.watched ? "Watched" : "Not Watched"}
        </li>
        ` 
    })
    attachClicksToMovieLinks()
    })
} */

function attachClicksToLinks() {
    const categories = document.querySelectorAll("li a")
    categories.forEach(category => {
        category.addEventListener('click', displayCategory)
    })
}

/*function attachClicksToMoviesLinks() {
    const movies = document.querySelectorAll("li a")
    movies.forEach(movie => {
        movie.addEventListener('click', displayMovie)
    })
}*/

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
        //category.movies.forEach
    })
}

/*movie show view
function displayMovie(e) {
    console.log(e.target)
    let id = e.target.dataset.id
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + `/movies/${id}`)
    .then(resp => resp.json())
    .then(movie => {
        main.innerHTML = `
        <h3>${movie.name}</h3>
        <hr>
        <br>
        <h2>${movie.description}</h2>
        <br>
        <p>${movie.watched ? "Watched" : "Not Watched"}</p>
        `
        //category.movies.forEach
    })
}*/