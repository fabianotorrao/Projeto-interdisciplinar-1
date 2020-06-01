import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController()

        this.loginForm = document.getElementById('btnSubmit');
        this.loginUsername = document.getElementById('txtEmail');
        this.loginPassword = document.getElementById('txtPassword');
        this.loginMessage = document.getElementById('mdlLoginMessage');

        //Take logout button
        this.logOutBtn = document.querySelector('#btnLogout')
        //this.bindLogOutEvent()//Quando alteramos a posição durante a execução funciona...talvez por causa do refresh?
        this.bindAddLoginFrom()
    }

    bindAddLoginFrom() {
        this.loginForm.addEventListener('click', event => {

            event.preventDefault()
            try {
                this.userController.loginUser(this.loginUsername.value, this.loginPassword.value)
                this.displayLoginMessage("User logged with success", 'success')

                setTimeout(() => {
                    location.href = "./html/activities.html";
                },
                    1000)


            } catch (e) {
                this.displayLoginMessage(e, 'danger')
            }
        })
    }
    displayLoginMessage(message, type) {
        this.loginMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }

    bindLogOutEvent() {

        this.logOutBtn.addEventListener('click', event => {
            console.log("entrou");
            this.userController.logOutUser()
            setTimeout(() => {
                location.href = "./index.html"
            },
                1000)
        })
    }
}
