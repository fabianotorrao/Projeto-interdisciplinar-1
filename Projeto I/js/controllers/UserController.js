import UserModel from '../models/UserModel.js'
export default class UserController {
    constructor() {
        this.userModel = new UserModel()
    }
    loginUser(email, password) {
        if (this.userModel.getAll().some(user => { return user.email === email && user.password === password})) {
            this.userModel.login(email);
            return true;
        } else {
            throw Error('Email ou Password errado! Por favor tente novamente');
        }
    }
    createUser(email, username, password, location, genre, weight, birthDate, aboutUser, height, photo){
        if (!this.userModel.getAll().some(user => user.email === email)){
            this.userModel.registerUser(email, username, password, location, genre, weight, birthDate, aboutUser, height, photo)
        }else{
            throw Error(`User with email "${email}" already exists!`)
        }
    }

    logOutUser() {
        this.userModel.logOut()
    }

}
