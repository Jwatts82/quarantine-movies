const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getCategories()
})

function getCategories() {
    let main = document.getElementById('main')
    fetch(BASE_URL + '/categories')
    .then(res => res.json())
    .then(categories => {
        console.log(categories)
    })
}