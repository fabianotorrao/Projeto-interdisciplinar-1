export default class UserModel {
    constructor() {

        this.users = localStorage.users ? JSON.parse(localStorage.users) : []
    }
    getAll() {
        return this.users
    }

    login(username) {
        sessionStorage.setItem('loggedUser', username)
    }
    //Faz logout do utilizador
    logOut() {
        sessionStorage.removeItem("loggedUser")
        console.log("fez logout");

    }

    //verifica se o user esta logado ou nao
    isLogged() {
        return sessionStorage.getItem("loggedUser") !== null ? true : false
    }
}
