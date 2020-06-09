import UserModel from '../models/UserModel.js'
export default class UserController {
    constructor() {
        this.userModel = new UserModel()
    }
    loginUser(email, password) {
        if (this.userModel.getAll().some(user => { return user.email === email && user.password === password })) {
            this.userModel.login(email);
            let userEmailCompare = JSON.parse(localStorage.getItem('users'))

            let userPhotoLink
            let userNameLogged
            for (let i = 0; i <= [this.userModel.users.length - 1]; i++) {
                if (userEmailCompare[i].email === sessionStorage.getItem('loggedUser')) {
                    sessionStorage.setItem('userPhotoUser', this.userPhotoLink = JSON.parse(localStorage.getItem('users'))[i].photo);
                    sessionStorage.setItem('userName', this.userNameLogged = JSON.parse(localStorage.getItem('users'))[i].username)
                    sessionStorage.setItem('userType', this.userNameLogged = JSON.parse(localStorage.getItem('users'))[i].type)
                }

            }
            //let userPhotoLink = JSON.parse(localStorage.getItem('users'))

            return true;
        } else {
            throw Error('Email ou Password errado! Por favor tente novamente');
        }
    }
    createUser(email, username, password, location, genre, weight, birthDate, aboutUser, height, photo, type) {
        if (!this.userModel.getAll().some(user => user.email === email)) {
            this.userModel.registerUser(email, username, password, location, genre, weight, birthDate, aboutUser, height, photo, type)
        } else {
            throw Error(`User with email "${email}" already exists!`)
        }
    }
    editUser(email, username, password, location, genre, weight, birthDate, aboutUser, height, photo, type,id) {
        if (this.userModel.getAll().filter(user => user.email == email && user.id==id).length==1) {
            console.log(this.userModel.getAll().filter(user => user.email === email).length)
            this.userModel.editUser(email, username, password, location, genre, weight, birthDate, aboutUser, height, photo, type,id)
        } else {
            throw Error(`User with email "${email}" already exists!`)
        }
    }

    logOutUser() {
        this.userModel.logOut()
    }

    getById(id) {
        for (const user of this.userModel.users) {
            if (user.id == id) {
                return user
            }
        }
    }

}
