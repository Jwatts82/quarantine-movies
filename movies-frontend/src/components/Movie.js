class Movie {
    constructor(data) {
        this.id = data.id
        this.category_id = data.category_id
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
        `
    }

    renderMovie() {
        return `
        <h3>${movie.title}</h3>
        <hr>
        <br>

        <h4>Description:</h4>
        <h4>${movie.description}</h4>
        <br>
        <p>${this.watched ? "Watched" : "Not Watched Yet"}.</p>
        <br>
        <button id="delete-movie" data-id="${this.id}">Delete Movie</button>
        `
    }
}

