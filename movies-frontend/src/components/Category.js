class Category {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.movies = data.movies
    }

    render() {
        return `
        <li>
            <a href="#" data-id="${this.id}">${this.name}</a>
        </li>
        ` 
    }

    renderCategory() {
        return `
            <h3>${this.name}</h3>
            <hr>
            
            <div id="add-movie-div">
                <button id="add-movie" data-id="${this.id}">Add Movie</button>
            </div>
            <br>
            <br>
            `
    }
}

//<button id="delete-category" data-id="${this.id}">Delete Category</button>

