class Movie {
    constructor(data) {
        this.id = data.id
        this.category_id = data.category.id
        this.title = data.title
        this.description = data.description
        this.watched = data.watched
    }

    renderMovies() {
        return `
        <li>
        <a href="#" data-id="${this.id}">${this.title}</a> 
        </li>
        <br>
        <button id="create-movie" data-id="${movie.id}">Add Movie</button>

        `
    }

    renderMovie() {
        return `
        <h3>${this.title}</h3>
        <hr>
        <br>

        <h4>Description:</h4>
        <h4>${this.description}</h4>
        <br>
        <h5>${this.watched ? "Watched" : "Not Watched Yet"}.</h5>
        <br>
        <button id="delete-movie" data-id="${this.id}" data-category-id="${this.category_id}">Delete Movie</button>
        `
    }

}

