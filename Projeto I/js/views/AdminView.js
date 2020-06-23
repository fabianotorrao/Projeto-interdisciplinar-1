import UserController from '../controllers/UserController.js'
import UserModel from '../models/UserModel.js'
import categoryModel from '../models/categoryModel.js'
import categoryController from '../controllers/categoryController.js'
import missionController from '../controllers/missionController.js'
import missionModel from '../models/missionModel.js'

export default class AdminView {

  constructor() {
    this.userModel = new UserModel()
    this.UserController = new UserController()
    this.categoryModel = new categoryModel()
    this.categoryController = new categoryController()
    this.missionController = new missionController()
    this.missionModel = new missionModel()

    this.AddBtn = document.querySelector("#btnSubmit")
    this.AdminEmail = document.querySelector("#txtEmail")
    this.AdminPassword = document.querySelector("#txtPasswordRegister")
    this.AdminPasswordConfirm = document.querySelector("#txtPasswordRegisterConfirm")
    this.RegisterMessage = document.querySelector("#AdminRegisterMessage")
    this.RegisterAdminUserName = document.querySelector("#txtUserName")
    this.userList = document.querySelector("#usersTable")
    this.categoryList = document.querySelector("#categoryTable")
    this.deleteUser = document.querySelector("#removeUser")
    this.editUserBtn = document.querySelector("#EditUser")
    this.userEditModal = document.querySelector("#UserEditmodal")
    this.logoutBtn = document.querySelector(".logout")
    this.addCategoryBtn = document.querySelector("#btnAddCategory")
    this.addCategoryTxt = document.querySelector("#txtcategory")
    this.addCategoryIMG=document.querySelector("#txtCategory_IMG")
    this.addCategoryMessage = document.querySelector("#CategoryRegisterMessage")
    this.deleteCategory = document.querySelector("#removeCategory")
    this.missionList = document.querySelector("#MissionsTable")

    this.editCategoryTxtInner = document.querySelector("#txtcategoryEditInner")
    this.CategoryEditBtn = document.querySelector("#btnEditCategory")

    this.editCategoryMessage = document.querySelector("#CategoryEditMessage")
    this.editCategoryPhoto=document.querySelector("#txtCategory_IMGEdit")

    this.missionDeleteBtn = document.querySelector("#removeMission")


    this.addMissionBtn = document.querySelector("#btnAddMission")
    this.missionAddMessage = document.querySelector("#missionRegisterMessage")
    this.missionType = document.querySelector("#MissionType")
    this.missionGoal = document.querySelector("#txtGoal")
    this.missionMinLevel = document.querySelector("#txtmin")
    this.missionMaxLevel = document.querySelector("#txtmax")
    this.missionPoints = document.querySelector("#txtpoints")
    this.missionDescription = document.querySelector("#MissionDescription")
    this.missionEditMissionsBtn = document.querySelector("#EditMission")


    this.missiontypeSelectEdit = document.querySelector('#MissionTypeEdit')
    this.missionGoalEdit = document.querySelector("#txtGoalEdit")
    this.missionMinLvlEdit = document.querySelector("#txtminEdit")
    this.missionMaxLvlEdit = document.querySelector("#txtmaxEdit")
    this.missionPointsEdit = document.querySelector("#txtpointsEdit")
    this.missionDescriptionEdit = document.querySelector("#MissionDescriptionEdit")
    this.editMissionBtnUpdateEdit = document.querySelector("#EditSubmitButton")
    this.editMissionMessage = document.querySelector("#missionEditMessage")










    this.bindRegisterAdm()
    this.bindLoadPage()
    this.bindRemoveUser()
    this.bindLogout()
    this.bindAddCategory()
    this.bindRemoveCategory()
    this.bindEditCategory()
    this.bindRemoveMission()
    this.bindAddMission()
    this.bindEditMission()






  }

  bindBtnEdit() {
    this.editMissionBtnUpdateEdit.addEventListener("click", event => {

      event.preventDefault()
      try {
        this.missiontypeSelectEdit = document.querySelector('#MissionTypeEdit')
        this.missionGoalEdit = document.querySelector("#txtGoalEdit")
        this.missionMinLvlEdit = document.querySelector("#txtminEdit")
        this.missionMaxLvlEdit = document.querySelector("#txtmaxEdit")
        this.missionPointsEdit = document.querySelector("#txtpointsEdit")

        if (this.missiontypeSelectEdit.value != "" && this.missionGoalEdit.value != "" && this.missionMinLvlEdit.value != "" && this.missionMaxLvlEdit.value != "" && this.missionPointsEdit.value != "" && this.missionDescriptionEdit.value != "") {

          if (this.missionMaxLvlEdit.value >= this.missionMinLvlEdit.value && this.missionGoalEdit.value > 0 && this.missionMinLvlEdit.value > 0 && this.missionMaxLvlEdit.value > 0 && this.missionPointsEdit.value > 0) {
            this.missionController.editMission(sessionStorage.getItem('selectedMission'), this.missiontypeSelectEdit.value, this.missionGoalEdit.value, this.missionMinLvlEdit.value, this.missionMaxLvlEdit.value, this.missionPointsEdit.value, this.missionDescriptionEdit.value)
            this.displayMissionEditMessage("Mission Edited", 'success')
            setTimeout(() => {
              window.location.href = "admin.html";
            },
              1000)


          } else {
            throw Error("just Positive numbers")
          }

        } else {
          throw Error("Empty fields")
        }
      }
      catch (e) {
        this.displayMissionEditMessage(e, 'danger')
      }


    })

  }

  bindEditMission() {
    this.missionEditMissionsBtn.addEventListener("click", event => {
      const selectedMission = this.missionModel.getAll().filter(mission => mission.id == sessionStorage.getItem('selectedMission'))[0]

      this.missiontypeSelectEdit.value = selectedMission.type
      this.missionGoalEdit.value = selectedMission.goal
      this.missionMinLvlEdit.value = selectedMission.minLevel
      this.missionMaxLvlEdit.value = selectedMission.maxLevel
      this.missionPointsEdit.value = selectedMission.points
      this.missionDescriptionEdit.value = selectedMission.description
      this.bindBtnEdit()

    })
  }

  bindAddMission() {
    this.addMissionBtn.addEventListener("click", event => {
      try {
        if (this.missionType.value != "" && this.missionGoal.value != "" && this.missionMinLevel.value != "" && this.missionMaxLevel.value != "" && this.missionPoints.value != "" && this.missionDescription.value) {
          if (this.missionMaxLevel.value > this.missionMinLevel.value && this.missionGoal.value > 0 && this.missionMinLevel.value > 0 && this.missionMaxLevel.value > 0 && this.missionPoints.value > 0) {
            this.missionController.addMission(this.missionType.value, this.missionGoal.value, this.missionMinLevel.value, this.missionMaxLevel.value, this.missionPoints.value, this.missionDescription.value)
            this.displayMissionMessage("Mission Created", 'success')
            setTimeout(() => {
              window.location.href = "admin.html";
            },
              1000)

          }
          else {
            throw Error("just Positive numbers")
          }
        }
        else {
          throw Error("Empty fields")
        }
      }
      catch (e) {
        this.displayMissionMessage(e, 'danger')
      }

    })

  }

  bindRemoveMission() {
    this.missionDeleteBtn.addEventListener("click", event => {
      event.preventDefault()
      if (confirm(`Delete ${sessionStorage.getItem('selectedMission')}`)) {
        this.missionController.deleteMission(sessionStorage.getItem('selectedMission'))
        setTimeout(() => {
          window.location.href = "admin.html";
        },
          1000)
      }
    })
  }

  bindEditCategory() {
    this.CategoryEditBtn.addEventListener("click", event => {
      event.preventDefault()
      try {
        this.categoryEditTxt = document.querySelector("#txtcategoryEdit")
        this.categoryEditIMG=document.querySelector("#txtCategory_IMGEdit")
        if (this.categoryEditTxt.value != ""&&this.categoryEditIMG.value!="") {
          //edit
          this.categoryController.editCategory(this.categoryEditIMG.value,this.categoryEditTxt.value,sessionStorage.getItem('selectedCategory'))
          this.displayEditCategoryMessage("Category Edited", "success")
          setTimeout(() => {
            window.location.href = "admin.html";
          },
            1000)
        }
        else {
          throw Error("Field is empty")
        }
      }
      catch (e) {
        console.log("empty")
        this.displayEditCategoryMessage(e, 'danger')
      }



    })
  }
  bindRemoveCategory() {
    this.deleteCategory.addEventListener("click", event => {
      if (confirm(`Delete ${sessionStorage.getItem('selectedCategory')}`)) {
        this.categoryController.deleteCategory(sessionStorage.getItem('selectedCategory'))
        setTimeout(() => {
          window.location.href = "admin.html";
        },
          1000)
      }

    })

  }

  bindAddCategory() {
    this.addCategoryBtn.addEventListener("click", event => {
      event.preventDefault()
      try {
        if (this.addCategoryTxt.value != ""&&this.addCategoryIMG.value!="") {
          this.categoryController.addCategory(this.addCategoryTxt.value,this.addCategoryIMG.value)
          this.displayCategoryMessage('Category Added', 'success')
          setTimeout(() => {
            window.location.href = "admin.html";
          },
            1000)

        }
        else {
          throw Error("Field is empty")
        }

      } catch (e) {
        this.displayCategoryMessage(e, 'danger')
      }


    })

  }

  bindLogout() {
    this.logoutBtn.addEventListener("click", event => {
      this.userModel.logOut()
      setTimeout(() => {
        window.location.href = "../index.html"
      },
        1000)
    })
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
        try {
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

            } else {
              throw Error("There are empty fields")
            }

          } else {
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
  bindCategoryRow() {
    for (let index = 0; index < document.querySelectorAll(".Category").length; index++) {
      const element = document.querySelectorAll(".Category")[index];
      element.addEventListener("click", event => {
        sessionStorage.setItem('selectedCategory', event.target.id)
        this.editCategoryTxtInner.innerHTML = `
      <input type="text" class="form-control col-lg-6  modalField" id="txtcategoryEdit"
        aria-describedby="emailHelp" placeholder="Category" value="${sessionStorage.getItem('selectedCategory')}">
    `
    
    
    this.editCategoryPhoto.value=this.categoryModel.getAll().filter(category=>category.category==sessionStorage.getItem('selectedCategory'))[0].photo
      })

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
  bindMissionRow() {
    for (let index = 0; index < document.querySelectorAll(".Mission").length; index++) {
      const element = document.querySelectorAll(".Mission")[index]
      element.addEventListener("click", event => {
        sessionStorage.setItem('selectedMission', event.target.id)
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

      for (let i = 0; i <= [this.categoryModel.categories.length - 1]; i++) {
        const category = JSON.parse(localStorage.getItem('categories'))[i]
        this.categoryList.innerHTML += `
              
              <tr class="categoryData" >
                <td>
                    <button class="btnAdminTable btn Category" id="${category.category}">
                       <img src="${category.photo}"  height="22" width="22"> ${category.category}
                    </button>
                </td>
                
              </tr>
            `

      }
      this.bindCategoryRow()
    })

    for (let i = 0; i <= [this.missionModel.missions.length - 1]; i++) {
      const id = JSON.parse(localStorage.getItem('missions'))[i].id
      const type = JSON.parse(localStorage.getItem('missions'))[i].type
      const goal = JSON.parse(localStorage.getItem('missions'))[i].goal
      const minLevel = JSON.parse(localStorage.getItem('missions'))[i].minLevel
      const maxLevel = JSON.parse(localStorage.getItem('missions'))[i].maxLevel
      const points = JSON.parse(localStorage.getItem('missions'))[i].points
      this.missionList.innerHTML += `<tr><td><button class="btnAdminTable btn Mission" id="${id}">${id}</button></td><td><button class="btnAdminTable btn Mission" id="${id}">${type}</button></td><td><button class="btnAdminTable btn Mission" id="${id}">${goal}</button></td><td><button class="btnAdminTable btn Mission" id="${id}">${minLevel}</button></td><td><button class="btnAdminTable btn Mission" id="${id}">${maxLevel}</button></td><td><button class="btnAdminTable btn Mission" id="${id}">${points}</button></td></tr>`
    }
    this.bindMissionRow()

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
  displayCategoryMessage(message, type) {
    this.addCategoryMessage.innerHTML =
      `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`;
  }
  displayEditCategoryMessage(message, type) {
    this.editCategoryMessage.innerHTML =
      `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`

  }
  displayMissionMessage(message, type) {
    this.missionAddMessage.innerHTML = `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`
  }
  displayMissionEditMessage(message, type) {
    this.editMissionMessage.innerHTML = `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`
  }






}