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
            <br>
            <button id="delete-category" data-id="${this.id}">Delete Category</button>

            `
    }
}