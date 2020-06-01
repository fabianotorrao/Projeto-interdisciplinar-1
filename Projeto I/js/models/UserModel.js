export default class UserModel {
    constructor() {

        this.users = localStorage.users ? JSON.parse(localStorage.users) : []
    }
    getAll() {
        return this.users
    }

    registerUser(email, username, password, location, genre, weight, birthDate, aboutUser, height,photo){
        const user = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            email: email,
            username: username,
            password: password,
            location: location,
            genre: genre,
            weight: weight,
            birthDate: birthDate,
            aboutUser: aboutUser,
            height: height,
            photo: photo
        }
        this.users.push(user)
        this._persist()

    }
    _persist(){
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    login(email,photo) {
        sessionStorage.setItem('loggedUser', email)
        sessionStorage.setItem('userPhoto', photo)
        
    }
    
    //Faz logout do utilizador
    logOut() {
        window.sessionStorage.removeItem("loggedUser")
        window.sessionStorage.removeItem("userPhotoUser")
        window.sessionStorage.removeItem("userName")
        console.log("fez logout");

    }

    //verifica se o user esta logado ou nao
    isLogged() {
        return sessionStorage.getItem("loggedUser") !== null ? true : false
    }
}
