import UserController from '../controllers/UserController.js'


export default class profileView {
    constructor() {
        this.userController = new UserController()


        this.username = document.querySelector("#userName")
        this.email = document.querySelector("#email")
        this.birth = document.querySelector("#datebirth")

        this.location = document.querySelector("#location")
        this.genre = document.querySelector("#genre")
        this.weight = document.querySelector("#weight")
        this.height = document.querySelector("#height")
        this.aboutYou = document.querySelector("#aboutYou")
        this.imgProfile = document.querySelector("#imgprofile")
        this.editProfile = document.querySelector("#btnEdit")



        this.usernameModal = document.querySelector("#txtUsername_edit")
        this.emailModal = document.querySelector("#txtEmail_edit")
        this.birthModal = document.querySelector("#dBirth_edit")

        this.locationModal = document.querySelector("#txtLocation_edit")
        this.genreModal = document.querySelector("#Genre_edit")
        this.weightModal = document.querySelector("#txtweight_edit")
        this.heightModal = document.querySelector("#txtheight_edit")
        this.aboutYouModal = document.querySelector("#txtAboutme_edit")
        this.imgProfileModal = document.querySelector("#txtUser_photo")
        this.editProfileModal = document.querySelector("#UploadEdit")
        this.passwordModal = document.querySelector("#txtpassword_edit")
        this.passwordConfirmModal = document.querySelector("#txtConfirmpassword_edit")
        this.editMessage = document.querySelector("#mdlRegisterMessage")
        this.imgThird=document.querySelector("#imgThird")
        this.imgSecond=document.querySelector("#imgSecond")
        this.imgFirst=document.querySelector("#imgFist")
        this.first=document.querySelector("#FirstPlace")
        this.second=document.querySelector("#secondPlace")
        this.third=document.querySelector("#thirdPlace")
        this.myDataBtn=document.querySelector(".myData")


        this.bindLoad()
        this.bindEditBtn()
        this.bindMyData()

    }
    bindMyData(){
        this.myDataBtn.addEventListener('click',event=>{
            setTimeout(() => {
                window.location.href = "myData.html";
            },
                1000)
        })
    }
    displayEditMessage(message, type) {
        this.editMessage.innerHTML =
            `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`;
    }
    bindEditBtn() {
        let loggeduser = this.userController.userModel.getAll().filter(user => user.email == sessionStorage.getItem('loggedUser'))[0]
        this.editProfile.addEventListener('click', event => {
            this.usernameModal.value = loggeduser.username
            this.emailModal.value = loggeduser.email
            this.birthModal.value = loggeduser.birthDate

            this.locationModal.value = loggeduser.location
            this.genreModal.value = loggeduser.genre
            this.weightModal.value = loggeduser.weight
            this.heightModal.value = loggeduser.height
            this.aboutYouModal.value = loggeduser.aboutUser
            this.imgProfileModal.value = loggeduser.photo
            this.passwordModal.value = loggeduser.password
            this.passwordConfirmModal.value = loggeduser.password
            this.editProfileModal.addEventListener('click', event => {
                try {
                    if (this.weightModal.value > 0 && this.heightModal.value > 0) {


                        if (this.passwordModal.value == this.passwordConfirmModal.value) {
                            if (this.emailModal.value != "" && this.usernameModal.value != "" && this.passwordModal.value != "" && this.passwordConfirmModal.value != "" && this.locationModal.value != "" && this.weightModal.value != "" && this.birthModal.value != "" && this.aboutYouModal.value != "" && this.heightModal.value != "" && this.imgProfileModal.value != "") {
                                if (confirm("Are you Sure to edit?")) {
                                    let id = this.userController.userModel.getAll().filter(user => user.email == sessionStorage.getItem('loggedUser'))[0].id
                                    this.userController.editUser(this.emailModal.value, this.usernameModal.value, this.passwordConfirmModal.value, this.locationModal.value, this.genreModal.value, this.weightModal.value, this.birthModal.value, this.aboutYouModal.value, this.heightModal.value, this.imgProfileModal.value, "user", id)
                                    this.displayEditMessage("User Edited with success", 'success')
                                    setTimeout(() => {
                                        window.location.href = "profile.html";
                                    },
                                        1000)
                                }
                            } else {
                                throw Error("There are empty fields")
                            }
                        } else {
                            throw Error("Password and Confirm Password are not equal")
                        }


                    } else {
                        throw Error("Just positive numbers")
                    }


                }
                catch (e) {
                    this.displayEditMessage(e, "danger")
                }
            })

        })

    }
    bindLoad() {
        let loggeduser = this.userController.userModel.getAll().filter(user => user.email == sessionStorage.getItem('loggedUser'))[0]
        console.log(loggeduser);

        this.username.innerHTML += loggeduser.username
        this.email.innerHTML += loggeduser.email
        this.birth.innerHTML += loggeduser.birthDate
        this.location.innerHTML += loggeduser.location
        this.genre.innerHTML += loggeduser.genre
        this.weight.innerHTML += loggeduser.weight + "Kg "
        this.height.innerHTML += loggeduser.height + "Cm"
        this.aboutYou.value = loggeduser.aboutUser
        this.imgProfile.src = (loggeduser.photo)


        let users = this.userController.userModel.getAll().filter(user => user.type == "user").sort(function (a, b) { return parseInt(b.points) - parseInt(a.points) })
        if (users.length>=3) {
            this.third.innerHTML=users[2].username
            this.imgThird.scr=users[2].photo
            this.second.innerHTML=users[1].username
            this.imgSecond.src=users[1].photo
            this.first.innerHTML=users[0].username
            this.imgFirst.src=users[0].photo
            
        }
    }
}