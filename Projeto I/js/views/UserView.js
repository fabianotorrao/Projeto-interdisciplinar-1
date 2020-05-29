import UserController from '../controllers/UserController.js'
import UserModel from '../models/UserModel.js'

export default class UserView {
    constructor() {
        this.userController = new UserController()

        this.loginForm = document.querySelector('#btnSubmit');
        this.loginEmail = document.querySelector('#txtEmail');
        this.loginPassword = document.querySelector('#txtPasswordLogin');
        this.loginMessage = document.querySelector('#mdlLoginMessage');

        //Take logout button
        this.logOutBtn = document.querySelector('#btnLogout')


        //this.bindLogOutEvent()//Quando alteramos a posição durante a execução funciona...talvez por causa do refresh?


        this.bindAddLoginFrom()

        //Identificar tag <a> em que é inserido o nome do utilizador que fez login
        this.UserName = document.querySelector('#userControls')
        
        

        //Take signup button
        this.registerPhoto = document.querySelector("#photoUpload")
        this.registerEmail = document.querySelector("#txtEmail_Register")
        this.registerUserName = document.querySelector("#txtUsername_Register")
        this.registerPassword = document.querySelector("#txtpassword_Register")
        this.registerConfirmPassword = document.querySelector("#txtConfirmpassword_Register")
        this.registerLocation = document.querySelector("#txtLocation_Register")
        this.registerGenre = document.querySelector("#Genre_Register")
        this.registerheight = document.querySelector("#txtheight_Register")
        this.registerWeight = document.querySelector("#txtweight_Register")
        this.registerBornDate = document.querySelector("#dBirth_Register")
        this.registerAboutYou = document.querySelector("#txtAboutme_Register")
        this.btnSubmitRegister = document.querySelector("#btnRegister")
        this.registerMessage = document.querySelector("#mdlRegisterMessage");
        //this.imgUrl = getBase64Image( this.registerPhoto)
        
        this.bindRegisterUser()

        this.bindUserNameTake()
    }

    bindAddLoginFrom() {
        this.loginForm.addEventListener('click', event => {

            event.preventDefault()
            try {
                this.userController.loginUser(this.loginEmail.value, this.loginPassword.value)
                this.displayLoginMessage("User logged with success", 'success')

                setTimeout(() => {
                    window.location.href = "../html/activities.html";
                },
                    1000)


            } catch (e) {
                this.displayLoginMessage(e, 'danger')
            }
        })
    }
    displayLoginMessage(message, type) {
        this.loginMessage.innerHTML =
            `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`;
    }

    displayRegisterMessage(message, type) {
        this.registerMessage.innerHTML =
            `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`;
    }

    bindLogOutEvent() {

        this.logOutBtn.addEventListener('click', event => {
            this.userController.logOutUser()
            setTimeout(() => {
                window.location.href = "../index.html"
            },
                1000)
        })
    }

    bindUserNameTake() {
        this.UserName.innerHTML = sessionStorage.getItem("loggedUser")
    }

    bindRegisterUser(){
        this.btnSubmitRegister.addEventListener('click', event =>{
            console.log("Clicou")
            event.preventDefault()
           try{
            const read = new FileReader()
            let file = document.querySelector('input[type=file]').files[0];
            if(this.registerPassword.value !== this.registerConfirmPassword.value) {
                throw Error('Password and Confirm Password are not equal');
            }else{
                if(this.registerUserName.value === "" || this.registerEmail.value === "" || this.registerPassword.value === "" || this.registerConfirmPassword.value === "" || this.registerLocation.value === "" || this.registerGenre.value === "" || this.registerWeight.value === "" || this.registerBornDate.value === "" || this.registerAboutYou.value === "" || this.registerheight.value === ""){
                    throw Error('Please field all the fields');
                }else{
                    this.userController.createUser(this.registerEmail.value, this.registerUserName.value, this.registerPassword.value, this.registerLocation.value, this.registerGenre.value, this.registerWeight.value, this.registerBornDate.value, this.registerAboutYou.value, this.registerheight.value, this.registerPhoto.value);
                    this.displayRegisterMessage('User registered with success!', 'success');
                   
                }
            }

           } catch(e){
               this.displayRegisterMessage(e,"danger")

           }
        })
    }
}
