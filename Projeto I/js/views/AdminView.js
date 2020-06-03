import UserController from '../controllers/UserController.js'
import UserModel from '../models/UserModel.js'

export default class AdminView {

    constructor() {
        this.UserController = new UserController()
          
        this.AddBtn = document.querySelector("#btnSubmit")
        this.AdminEmail = document.querySelector("#txtEmail")
        this.AdminPassword = document.querySelector("#txtPasswordRegister")
        this.AdminPasswordConfirm = document.querySelector("#txtPasswordRegisterConfirm")
        this.RegisterMessage=document.querySelector("#AdminRegisterMessage")
        this.userList=document.querySelector(".userList")

        


        
        this.bindRegisterAdm()

    }

    /* bindLoadPage(){
        addEventListener("load",event=>{

                //problema para listar os users chegar ao get all do user modal // this.getAll().forEach(element => {
                    const type=element.type
                    const name=element.name
                this.userList.innerHTML+=`<div class="mb-5  col-lg-5 d-flex justify-content-center">${type}</div>
                <div class="mb-5  col-lg-5 d-flex justify-content-center">${name}</div>`
                });
                
        
        })
    }*/
    
    bindRegisterAdm() {
        this.AddBtn.addEventListener('click', event => {
            event.preventDefault()
            try{
                if (this.AdminPassword.value !==this.AdminPasswordConfirm.value) {
                    throw Error ('Password and Confirm Password are not equal')
                }else if (this.AdminEmail.value=="" ||this.AdminPassword.value=="" || this.AdminPasswordConfirm.value=="" ) {
                    throw Error('Please field all the fields');
                    
                }else{
                    

                    this.UserController.createUser(this.AdminEmail.value,"admin",this.AdminPasswordConfirm.value,"","","","","","","","admnin")
                    this.displayRegisterMessage("Admin registered with success!",'success')
                    setTimeout(() => {
                        window.location.href = "admin.html";
                    },
                        1000)
                }

            }
            catch(e){
                this.displayRegisterMessage(e,"danger")
            }
        })
    }

    displayRegisterMessage(message, type){
        this.RegisterMessage.innerHTML =
            `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`;
    }

    




}
