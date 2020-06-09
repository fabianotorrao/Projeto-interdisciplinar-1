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
    this.RegisterMessage = document.querySelector("#AdminRegisterMessage")
    this.RegisterAdminUserName = document.querySelector("#txtUserName")
    this.userList = document.querySelector(".table")
    this.deleteUser = document.querySelector("#removeUser")
    this.editUserBtn = document.querySelector("#EditUser")
    this.userEditModal = document.querySelector("#UserEditmodal")








    this.bindRegisterAdm()
    this.bindLoadPage()
    this.bindRemoveUser()





  }


  bindEditUser() {
    this.editBtn = document.querySelector("#btnEdit")

    this.editLoadPhotoRegister = document.querySelector("#userPhoto")
    this.editPhoto = document.querySelector("#txtUser_photo_edit")
    this.editEmail = document.querySelector("#txtEmail_edit")
    this.editUserName = document.querySelector("#txtUsername_edit")
    this.editPassword = document.querySelector("#txtpassword_edit")
    this.editConfirmPassword = document.querySelector("#txtConfirmpassword_edit")
    this.editLocation = document.querySelector("#txtLocation_edit")
    this.editGenre = document.querySelector("#Genre_edit")
    this.editheight = document.querySelector("#txtheight_edit")
    this.editWeight = document.querySelector("#txtweight_edit")
    this.editBornDate = document.querySelector("#dBirth_edit")
    this.editAboutYou = document.querySelector("#txtAboutme_edit")
    this.editMessage = document.querySelector("#mdleditMessage")

    this.editBtn.addEventListener("click", event => {
      if (this.UserController.getById(sessionStorage.getItem('selectedUser')).type == "user") {
        try {
          if (this.editPassword.value === this.editConfirmPassword.value) {
            if (this.editEmail.value != "" && this.editUserName.value != "" && this.editPassword.value != "" && this.editConfirmPassword.value != "" && this.editLocation.value != "" && this.editWeight.value != "" && this.editBornDate.value != "" && this.editAboutYou.value != "" && this.editheight.value != "" && this.editPhoto.value != "") {
              if (confirm("Are you Sure to edit?")) {
                console.log(this.editUserName.value)
                this.UserController.editUser(this.editEmail.value, this.editUserName.value, this.editPassword.value, this.editLocation.value, this.editGenre.value, this.editWeight.value, this.editBornDate.value, this.editAboutYou.value, this.editheight.value, this.editPhoto.value, "user", sessionStorage.getItem('selectedUser'))
                this.displayEditMessage("User Edited with success", 'success')
                setTimeout(() => {
                  window.location.href = "admin.html";
                },
                  1000)
              }
            }
            else {
              throw Error("There are empty fields")
            }
          }
          else {
            throw Error("Password and Confirm Password are not equal")
          }
        }
        catch (e) {
          this.displayEditMessage(e, "danger")
        }
      }
      else {
        try{
        if (this.editPassword.value === this.editConfirmPassword.value) {
          if (this.editEmail.value != "" && this.editUserName.value != "" && this.editPassword.value != "" && this.editConfirmPassword.value != "") {
            if (confirm("Are you Sure to edit?")) {
              this.UserController.editUser(this.editEmail.value, this.editUserName.value, this.editPassword.value, "", "", "", "", "", "", "", "admin", sessionStorage.getItem('selectedUser'))
              this.displayEditMessage("Admin Edited with success", 'success')
              setTimeout(() => {
                window.location.href = "admin.html";
              },
                1000)
            }

          }else {
            throw Error("There are empty fields")
          }

        }else {
          throw Error("Password and Confirm Password are not equal")
        }

      }
      catch (e) {
        this.displayEditMessage(e, "danger")
      }
    }
      


    })
  }

  bindRemoveUser() {
    this.deleteUser.addEventListener("click", event => {
      if (confirm(`Sure to delete : ${this.UserController.getById(sessionStorage.getItem('selectedUser')).username}`)) {
        this.userModel.remove(sessionStorage.getItem('selectedUser'))
        setTimeout(() => {
          window.location.href = "admin.html";
        },
          1000)
      }
    })

  }
  displayEditMessage(message, type) {
    this.editMessage.innerHTML =
      `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`;
  }
  selectEditModal() {
    let user = this.UserController.getById(sessionStorage.getItem('selectedUser'))
    if (user.type !== "admin") {
      this.userEditModal.innerHTML = `<div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <div class="d-flex justify-content-center col-lg-11">
      
                  <div class="col-lg-12 d-flex justify-content-center"><img src="../images/modalIcon.png"
                      style="width: 131px; height:29px ;">
      
                  </div>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
      
              </div>
              <div class="modal-body">
                <div id="frm">
                  <div class="form-group d-flex justify-content-center">
                    <h5 class="modal-title d-flex justify-content-center " id="exampleModalLabel">Edit User</h5>
                  </div>
                  <div class="d-flex justify-content-center">
                    <img width="99" height="99" id="userPhoto" src="${user.photo}">
                    
      
                  </div>
      
                  <div class="file d-flex justify-content-center  mb-3">
                    <input type="text" class="form-control col-lg-6 mt-2 modalField" id="txtUser_photo_edit"
                    aria-describedby="nameHelp" placeholder="Insert user photo link" value="${user.photo}">  
                  </div>
          
                  <div class="form-group d-flex justify-content-center">
                    <input type="email" class="form-control col-lg-6 mt-2 modalField" id="txtEmail_edit"
                      aria-describedby="emailHelp" placeholder="Email" value="${user.email}">
                  </div>
                  <div class="form-group d-flex justify-content-center">
                    <input type="text" class="form-control col-lg-6 mt-2 modalField" id="txtUsername_edit"
                      aria-describedby="nameHelp" placeholder="Name" value="${user.username}">
                  </div>
                  <div class="form-group d-flex justify-content-center">
                    <input type="text" class="form-control col-lg-6 mt-2 modalField" id="txtLocation_edit"
                      aria-describedby="LocationHelp" placeholder="Location" value="${user.location}">
                  </div>
                  <div class="form-group d-flex justify-content-center">
                    <select type="select" class="form-control col-lg-2 mt-2 mr-1 modalField" id="Genre_edit">
                    
                        <option value="M">M</option>
                        <option value="f">F</option>
                      <input type="number" class="form-control col-lg-2 mt-2 mr-1 modalField" id="txtheight_edit" value="${user.height}"
                        aria-describedby="heightnHelp" placeholder="Cm">
                      <input type="number" class="form-control col-lg-2 mt-2 mr-1 modalField" id="txtweight_edit" value="${user.weight}"
                        aria-describedby="weightHelp" placeholder="Kg">
                    </select>
      
                  </div>
                  <div class="form-group d-flex justify-content-center">
                    <input type="date" name="bday" max="3000-12-31" min="1000-01-01"
                      class="form-control col-lg-6 mt-2 modalField" id="dBirth_edit" value="${user.birthDate}">
                  </div>
                  <div class=" form-group d-flex justify-content-center">
                    <textarea class="form-control col-lg-6 mt-2 modalField" id="txtAboutme_edit" 
                      aria-describedby="LocationHelp" placeholder="About you - Modalities, main sport...">${user.aboutUser}</textarea>
                  </div>
                  <div class="form-group d-flex justify-content-center">
                    <input type="password" class="form-control col-lg-3 mt-3 mr-1 modalField" id="txtpassword_edit" value="${user.password}"
                      aria-describedby="weightHelp" placeholder="Password">
                    <input type="password" class="form-control col-lg-3 mt-3 mr-1 modalField" id="txtConfirmpassword_edit" value="${user.password}"
                      aria-describedby="pwconfimHelp" placeholder="Confirm">
      
                  </div>
      
                  <div class="d-flex justify-content-center mb-3">
                    <button type="button" class="btn btn-secondary navButton mr-1 col-lg-3 "
                      data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary navButton col-lg-3" id="btnEdit"
                      data-target="html/activities.html">Update</button>
      
                  </div>
                  <div id="mdleditMessage" class="col-lg-12 d-flex justify-content-center">
                    
                  </div>
      
                </div>
              </div>
            </div>
      
          </div>`
      this.bindEditUser()

    }
    else {
      this.userEditModal.innerHTML = `<div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <div class="d-flex justify-content-center col-lg-11">
      
                  <div class="col-lg-12 d-flex justify-content-center"><img src="../images/modalIcon.png"
                      style="width: 131px; height:29px ;">
      
                  </div>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
      
              </div>
              <div class="modal-body">
                <div id="frmRegisterAdm">
                  <div class="form-group d-flex justify-content-center">
                    <h5 class="modal-title d-flex justify-content-center " id="exampleModalLabel">Edit Admin</h5>
                  </div>
                  <div class="form-group d-flex justify-content-center">
                    <input type="email" class="form-control col-lg-6  modalField" id="txtEmail_edit" value="${user.email}"
                      aria-describedby="emailHelp" placeholder="Email">
                  </div>
                  <div class="form-group d-flex justify-content-center">
                      <input type="text" class="form-control col-lg-6  modalField" id="txtUsername_edit" value="${user.username}"
                        aria-describedby="emailHelp" placeholder="username">
                    </div>
                  <div class="form-group d-flex justify-content-center">
                    <input type="password" class="form-control col-lg-6 m-2 modalField" id="txtpassword_edit" value="${user.password}"
                      placeholder="Password">
                  </div>
                  <div class="form-group d-flex justify-content-center">
                      <input type="password" class="form-control col-lg-6 m-2 modalField" id="txtConfirmpassword_edit" value="${user.password}"
                        placeholder="Confirm Password">
                    </div>
                  <div class="d-flex justify-content-center mb-3">
                    <button type="button" class="btn btn-secondary navButton mr-1 col-lg-3 "
                      data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary navButton col-lg-3" id="btnEdit"
                      data-target="html/activities.html">Update</button>
      
                  </div>
                  <div id="mdleditMessage" class="col-lg-12 d-flex justify-content-center">
                    
                  </div>
      
                </div>
              </div>
            </div>
      
          </div>`
      this.bindEditUser()
    }
  }
  bindUserRow() {

    for (let index = 0; index < document.querySelectorAll(".U").length; index++) {
      const element = document.querySelectorAll(".U")[index];
      element.addEventListener("click", event => {

        sessionStorage.setItem('selectedUser', event.target.id)
        this.selectEditModal()

      })
    }




  }

  bindLoadPage() {
    window.addEventListener("load", event => {

      for (let i = 0; i <= [this.userModel.users.length - 1]; i++) {


        if (JSON.parse(localStorage.getItem('users'))[i].type === "admin" || JSON.parse(localStorage.getItem('users'))[i].type === "user") {
          const type = JSON.parse(localStorage.getItem('users'))[i].type
          const name = JSON.parse(localStorage.getItem('users'))[i].username
          const id = JSON.parse(localStorage.getItem('users'))[i].id
          this.userList.innerHTML += `
                        <body>
                          <tr class="userdata" >
                            <td>
                                <button class="btnAdminTable btn U" id="${id}">
                                    ${type}
                                </button>
                            </td>
                            <td>
                            <button class="btnAdminTable btn U" id="${id}"D>
                                ${name}
                            </button>
                            </td>
                          </tr>
                        </body>`

          /*this.userList.innerHTML+=`<div class="mb-5  col-lg-5 d-flex justify-content-center">${type}</div>
          <div class="mb-5  col-lg-5 d-flex justify-content-center">${name}</div>`*/
        } else {

        }
      }
      this.bindUserRow()



    })
  }


  bindRegisterAdm() {
    this.AddBtn.addEventListener('click', event => {
      event.preventDefault()
      try {
        if (this.AdminPassword.value !== this.AdminPasswordConfirm.value) {
          throw Error('Password and Confirm Password are not equal')
        } else if (this.AdminEmail.value == "" || this.AdminPassword.value == "" || this.AdminPasswordConfirm.value == "") {
          throw Error('Please field all the fields');

        } else {


          this.UserController.createUser(this.AdminEmail.value, this.RegisterAdminUserName.value, this.AdminPasswordConfirm.value, "", "", "", "", "", "", "", "admin")
          this.displayRegisterMessage("Admin registered with success!", 'success')
          setTimeout(() => {
            window.location.href = "admin.html";
          },
            1000)
        }

      }
      catch (e) {
        this.displayRegisterMessage(e, "danger")
      }
    })
  }

  displayRegisterMessage(message, type) {
    this.RegisterMessage.innerHTML =
      `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`;
  }






}
