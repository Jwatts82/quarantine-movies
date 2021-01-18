class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:3000'
    } 

    async fetchCategories() {
        let res = await fetch(this.baseURL + '/categories')
        let data = await res.json()
        return data
    }

    async fetchMovies() {
        let res = await fetch(this.baseURL + '/movies')
        let data = await res.json()
        return data
    }

    async fetchCategory(id) {
        let res = await fetch(this.baseURL + `/categories/${id}`)
        let data = await res.json()
        return data
    }

    async fetchMovie(id) {
        let res = await fetch(this.baseURL + `/movies/${id}`)
        let data = await res.json()
        return data
    }

    async fetchCreateCategory(categoryData) {
        let configObj = {
            method: 'POST',
            body: JSON.stringify(categoryData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + `/categories`, configObj)
        let data = await res.json()
        return data
    }

    async fetchCreateMovie(movieData) {
        let configObj = {
            method: 'POST',
            body: JSON.stringify(movieData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + '/movies', configObj)
        let data = await res.json()
        return data
    }

    async fetchRemoveMovie(id) {
        let configObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + `/movies/${id}`, configObj)
    }

}

