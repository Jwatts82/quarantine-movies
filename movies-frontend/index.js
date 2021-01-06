const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getCategories()
})

//categories index
function getCategories() {
    let main = document.getElementById('main')
    main.innerHTML = "" //blank the page and put categories on
    fetch(BASE_URL + '/categories')
    .then(res => res.json())
    .then(categories => categories.map(category => {
        
        main.innerHTML += `
        <li>
            <a href="#" data-id="${category.id}">${category.name}</a>
        </li>
        ` 
    })
    attachClicksToLinks()
)}

//movies index view
function getMovies() {
    let main = document.getElementById('main')
    main.innerHTML = "" //blank the page and put movies on
    fetch(BASE_URL + '/movies')
    .then(res => res.json())
    .then(movies => movies.map(movie => {

        main.innerHTML += `
        <li>
            <a href="#" data-id="${movie.id}">${movie.title}</a>
            - ${movie.watched ? "Watched" : "Not Watched"}
        </li>
        ` 
    })
    attachClicksToLinks()
)}

