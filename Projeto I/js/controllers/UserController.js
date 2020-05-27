import UserModel from '../models/UserModel.js'

export default class UserController {
    constructor() {
        this.userModel = new UserModel()
    }
    loginUser(username, password) {
        if (this.userModel.getAll().some(user => { return user.username === username && user.password === password })) {
            this.userModel.login(username);
            return true;
        } else {
            throw Error('Invalid login!');
        }
    }

    logOutUser() {
        this.userModel.logOut()
    }

}
