export default class UserModel {
    constructor() {

        this.users = localStorage.users ? JSON.parse(localStorage.users) : []
    }
    getAll() {
        return this.users
    }

    registerUser(email, username, password, location, genre, weight, birthDate, aboutUser, height,photo, type){
        const user = {
            id: this.users.length > 0 ? +this.users[this.users.length - 1].id + 1 : 1,
            email: email,
            username: username,
            password: password,
            location: location,
            genre: genre,
            weight: weight,
            birthDate: birthDate,
            aboutUser: aboutUser,
            height: height,
            photo: photo,
            type: type,
            points:0
        }
        this.users.push(user)
        this._persist()

    }
    _persist(){
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    login(email,photo) {
        sessionStorage.setItem('loggedUser', email)
        
    }
    
    //Faz logout do utilizador
    logOut() {
        window.sessionStorage.removeItem("loggedUser")
        window.sessionStorage.removeItem("userPhotoUser")
        window.sessionStorage.removeItem("userName")
        window.sessionStorage.removeItem("notificationUserEmail")
        window.sessionStorage.removeItem("notificationCardId")
        window.sessionStorage.removeItem("notificationMessage")
        console.log("fez logout");

    }

    //verifica se o user esta logado ou nao
    isLogged() {
        return sessionStorage.getItem("loggedUser") !== null ? true : false
    }
    remove(id){
        this.users=this.users.filter(user=>user.id!=id)
        this._persist()
    }
    editUser(email, username, password, location, genre, weight, birthDate, aboutUser, height,photo, type,id){
        const usernew = {
            id: id,
            email: email,
            username: username,
            password: password,
            location: location,
            genre: genre,
            weight: weight,
            birthDate: birthDate,
            aboutUser: aboutUser,
            height: height,
            photo: photo,
            type: type,
            points:this.users.filter(user=>user.id==id)[0].points
            
        }
        console.log(usernew)
        this.users= this.users.map(user=>user.id==usernew.id?usernew:user)
        this._persist()
    }
    addPoints(points,email){
        let user=this.getAll().filter(user=>user.email==email)[0]
        let newPoints=user.points+points
        const usernew={
            id:user.id,
            email:user.email,
            username:user.username,
            password:user.password,
            location:user.location,
            genre: user.genre,
            weight: user.weight,
            birthDate: user.birthDate,
            aboutUser: user.aboutUser,
            height: user.height,
            photo: user.photo,
            type: user.type,
            points:newPoints

        }
        this.users= this.users.map(user=>user.id==usernew.id?usernew:user)
        this._persist()
    }
}
