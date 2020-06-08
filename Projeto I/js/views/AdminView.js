import UserController from '../controllers/UserController.js'
import UserModel from '../models/UserModel.js'

export default class AdminView {

    constructor() {
        this.userModel = new UserModel()
        this.UserController = new UserController()
          
        this.AddBtn = document.querySelector("#btnSubmit")
        this.AdminEmail = document.querySelector("#txtEmail")
        this.AdminPassword = document.querySelector("#txtPasswordRegister")
        this.AdminPasswordConfirm = document.querySelector("#txtPasswordRegisterConfirm")
        this.RegisterMessage=document.querySelector("#AdminRegisterMessage")
        this.RegisterAdminUserName = document.querySelector("#txtUserName")
        this.userList=document.querySelector(".table")

        


        
        this.bindRegisterAdm()
        this.bindLoadPage()

    }

    bindLoadPage(){
        window.addEventListener("load", event=>{
            
                for(let i = 0 ; i <= [this.userModel.users.length -1]; i++){

                    
                    if (JSON.parse(localStorage.getItem('users'))[i].type === "admin" || JSON.parse(localStorage.getItem('users'))[i].type === "user" ){ 
                        const type = JSON.parse(localStorage.getItem('users'))[i].type
                        const name = JSON.parse(localStorage.getItem('users'))[i].username
                        
                        this.userList.innerHTML+=`
                        <tbody>
                          <tr class="">
                            <td>
                                <button class="btnAdminTable btn">
                                    ${type}
                                </button>
                            </td>
                            <td>
                            <button class="btnAdminTable btn">
                                ${name}
                            </button>
                            </td>
                          </tr>
                        </tbody>`
                        /*this.userList.innerHTML+=`<div class="mb-5  col-lg-5 d-flex justify-content-center">${type}</div>
                        <div class="mb-5  col-lg-5 d-flex justify-content-center">${name}</div>`*/
                    }else{
                        
                    }
                }
                   
                
                
        
        })
    }
    
    bindRegisterAdm() {
        this.AddBtn.addEventListener('click', event => {
            event.preventDefault()
            try{
                if (this.AdminPassword.value !==this.AdminPasswordConfirm.value) {
                    throw Error ('Password and Confirm Password are not equal')
                }else if (this.AdminEmail.value=="" ||this.AdminPassword.value=="" || this.AdminPasswordConfirm.value=="" ) {
                    throw Error('Please field all the fields');
                    
                }else{
                    

                    this.UserController.createUser(this.AdminEmail.value,this.RegisterAdminUserName.value,this.AdminPasswordConfirm.value,"","","","","","","","admin")
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
