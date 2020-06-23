import activityController from '../controllers/activityController.js'
import activityModel from '../models/activityModel.js'
import notificationController from '../controllers/notificationController.js'
import UserController from '../controllers/UserController.js'
import missionModel from '../models/missionModel.js'
import categoriesModel from '../models/categoryModel.js'
import missionController from '../controllers/missionController.js'
import categoryController from '../controllers/categoryController.js'

export default class activityView {
    constructor() {

        this.activitiesController = new activityController()
        this.activitiesModel = new activityModel()
        this.notificationsController = new notificationController()
        this.categoriesModel = new categoriesModel()
        this.missionModel = new missionModel()
        this.missionController = new missionController()
        this.userController = new UserController()
        this.categorisControllerVar = new categoryController()


        this.InsertCard = document.querySelector("#scroll-card")
        this.InsertNormalCard = document.querySelector("#insertNormalCard")

        //Area de filtos de atividades
        this.searchBar = document.querySelector("#searchBar")
        this.CategorieFilter = document.querySelector(".dropCategorieFilter")
        this.DurationFilter = document.querySelector(".dropDurationFilter")
        this.DateFilter = document.querySelector(".dateFilter")
        this.ButtonFilter = document.querySelector("#btnFilter")
        //this.TypeFilter = document.querySelector(".")


        this.RegisterActiviyCategorie = document.querySelector("#buttonCategoryDropModal")
        this.RegisterActivityDuration = document.querySelector("#btnDurationModal")
        this.RegisterLocation = document.querySelector("#txtLocation_Activity")
        this.RegisterDate = document.querySelector("#dateModal")
        this.RegisterStartTime = document.querySelector("#txtStartTime_Activity")
        this.RegisterActivityButton = document.querySelector("#btnRegisterActivity")
        this.registerActivityMessage = document.querySelector("#alertMessage")
        this.RegisterStartTime = document.querySelector("#txtStartTime_Activity")
        this.FilterEmpty = document.querySelector("#warningEmptyFilter")
        this.DropTypeFilter = document.querySelector(".dropTypeFilter")
        this.sendRequest = document.querySelector("#btnSendRequestText")
        this.btnRequest = document.querySelectorAll("#btnSendRequest")
        this.Activitydetails = document.querySelector("#myDetailsSection")
        this.listUsers = document.querySelector("#listUsers")
        this.filterCategories = document.querySelector("#btnCategories")

        this.bindParticipants()

        this.missionsPoints()
        this.ChangeActivityStatus()



        this.bindLocalStorage()
        this.filterActivitiesBySearchBar()
        this.bindRegisterActivity()
        this.filterSpecialCard(this.activitiesController.getActivities())
        this.filterSection()
        this.alert = ""
        try {
            if (this.bindLocalStorage().length === 0) {
                throw Error("There are no activities")
            }
            this.renderCards(this.bindLocalStorage())
            this.renderSpecialCard(this.bindLocalStorage())


        } catch (error) {

            this.displayErrorCardMessage(error, "danger")

        }

        this.ListCategories()



    }
    ListCategories() {
        window.addEventListener('load', event => {
            let categories = this.categoriesModel.getAll()
            categories.forEach(element => {
                this.filterCategories.innerHTML += `<option value="${element.category}">${element.category}</option>`
                this.RegisterActiviyCategorie.innerHTML += `<option value="${element.category}">${element.category}</option>`

            });
        })


    }
    ChangeActivityStatus() {
        let today = new Date()
        let month = today.getMonth() + 1
        let day = today.getDate()
        let hour = today.getHours()
        let year = today.getFullYear()
        console.log(year)
        console.log(month)
        this.activitiesController.activityModelVar.getAll().forEach(activity => {
            console.log(month)
            let Sdate = activity.date.split('-')
            console.log(parseInt(Sdate[1]))

            if (activity.passed == false) {


                if (parseInt(Sdate[0]) < year) {

                    try {
                        activity.participants.forEach(email => {
                            this.userController.addPoints(10, email)
                        });
                    }
                    catch (e) { }
                    let host = this.userController.userModel.getAll().filter(user => user.username == activity.name)[0].email
                    this.userController.addPoints(20, host)
                    this.activitiesModel.ToPassed(activity)
                    setTimeout(() => {
                        window.location.href = "../html/activities.html";
                    },
                        1000)
                } else {
                    if (parseInt(Sdate[1]) < month) {

                        try {
                            activity.participants.forEach(email => {
                                this.userController.addPoints(10, email)
                            });
                        }
                        catch (e) { }
                        let host = this.userController.userModel.getAll().filter(user => user.username == activity.name)[0].email
                        this.userController.addPoints(20, host)
                        this.activitiesModel.ToPassed(activity)
                        setTimeout(() => {
                            window.location.href = "../html/activities.html";
                        },
                            1000)
                    } else {

                        if (parseInt(Sdate[1]) == month && parseInt(Sdate[2]) < day) {

                            try {
                                activity.participants.forEach(email => {
                                    this.userController.addPoints(10, email)
                                });
                            }
                            catch (e) { }
                            let host = this.userController.userModel.getAll().filter(user => user.username == activity.name)[0].email
                            alert(host)
                            this.userController.addPoints(20, host)
                            this.activitiesModel.ToPassed(activity)
                            setTimeout(() => {
                                window.location.href = "../html/activities.html";
                            },
                                1000)
                        } else if (parseInt(Sdate[1]) < month && parseInt(Sdate[2]) == day && activity.startTime <= hour) {
                            try {
                                activity.participants.forEach(email => {
                                    this.userController.addPoints(10, email)
                                });
                            }
                            catch (e) { }
                            let host = this.userController.userModel.getAll().filter(user => user.username == activity.name)[0].email
                            console.log(host)
                            this.userController.addPoints(20, host)
                            this.activitiesModel.ToPassed(activity)
                            setTimeout(() => {
                                window.location.href = "../html/activities.html";
                            },
                                1000)
                        }
                    }
                }
            }

        });


    }
    missionsPoints() {
        let missions = this.missionController.missionModel.getAll()
        let missionsComplete = this.missionController.missionModel.getAllCompletedMissions()
        console.log(missions)
        console.log(missionsComplete);

        let missionsToCheck = []
        if (missionsComplete.length > 0) {
            missions.forEach(element => {
                if (!missionsComplete.some(mission => mission.idMission == element.id && mission.idUser == sessionStorage.getItem('loggedUser'))) {
                    missionsToCheck.push(element.id)

                }

            });
        }
        else {
            missions.forEach(element => {
                console.log(element)
                missionsToCheck.push(element.id)

            });

            console.log(missionsToCheck)
            let nActivity = 0
            let nTime = 0;
            let nPersons = 0
            missionsToCheck.forEach(mission => {
                let activities = this.activitiesController.getActivities()
                if (mission.type == 'activities') {
                    activities.forEach(activity => {
                        if (activity.participants.includes(sessionStorage.getItem('loggedUser'))) {
                            nActivity++
                        }
                    });
                    if (nActivity >= mission.goal) {
                        this.userController.addPoints(mission.points, sessionStorage.getItem('loggedUser'))
                        //passar a missao a completa
                        this.missionModel.addCompletedMission(mission.id, sessionStorage.getItem('loggedUser'))
                    }

                }
                if (mission.type == 'time') {
                    activities.forEach(activity => {
                        if (activity.participants.includes(sessionStorage.getItem('loggedUser'))) {
                            nTime += activity.duration

                        }

                    });
                    if (nTime >= mission.goal) {
                        this.userController.addPoints(mission.points, sessionStorage.getItem('loggedUser'))
                        //passar a missao a completa
                        this.missionModel.addCompletedMission(mission.id, sessionStorage.getItem('loggedUser'))
                    }

                }
                if (mission.type == 'nPersons') {
                    activities.forEach(activity => {
                        if (activity.name == sessionStorage.getItem('userName')) {
                            nPersons += activities.participants.length
                        }
                    })
                    if (nPersons >= mission.goal) {
                        this.userController.addPoints(mission.points, sessionStorage.getItem('loggedUser'))
                        //passar a missao a completa
                        this.missionModel.addCompletedMission(mission.id, sessionStorage.getItem('loggedUser'))
                    }

                }

            });

        }
        ;


    }
    sendRequestFunction() {
        let dataCard = []
        let idCard = ""
        let cardUserEmail = ""
        let userPhoto = ""
        for (const btnSend of document.getElementsByClassName("btnSendRequest")) {
            btnSend.addEventListener('click', event => {
                dataCard = (event.target.id).split(" ")
                console.log(dataCard)
                idCard = dataCard[0]
                cardUserEmail = dataCard[1]
                userPhoto = dataCard[2]
                console.log(userPhoto)
                sessionStorage.setItem("notificationCardId", idCard)
                sessionStorage.setItem("notificationUserEmail", cardUserEmail)
                sessionStorage.setItem("notificationUserPhotoReceive", userPhoto)

            })

        }



    }

    myActivityDetails() {
        let dataCard = []
        let idCard = ""
        let cardUserEmail = ""
        let userPhoto = ""
        for (const btnSend of document.getElementsByClassName("btnSeeDetails")) {
            btnSend.addEventListener('click', event => {
                dataCard = (event.target.id).split(" ")
                console.log(dataCard)
                idCard = dataCard[0]
                cardUserEmail = dataCard[1]
                userPhoto = dataCard[2]
                console.log(userPhoto)
                sessionStorage.setItem("notificationCardId", idCard)
                sessionStorage.setItem("notificationUserEmail", cardUserEmail)
                sessionStorage.setItem("notificationUserPhotoReceive", userPhoto)
                this.renderMydetails(sessionStorage.getItem("notificationCardId"))
            })

        }
    }

    renderMydetails(cardId) {
        let selectedActivities = this.activitiesController.getActivities()
        let user = []
        let userPhotoDetail = []
        let userEmail = []

        for (let i = 0; i <= [selectedActivities.length - 1]; i++) {

            if (cardId == selectedActivities[i].id) {
                for (let j = 0; j <= [this.userController.getUsers().length - 1]; j++) {
                    for (const users of selectedActivities[i].participants) {

                        if (users === this.userController.getUsers()[j].email) {
                            user.push(this.userController.getUsers()[j].username)
                            userPhotoDetail.push(this.userController.getUsers()[j].photo)
                            userEmail.push(this.userController.getUsers()[j].email)

                        }
                    }
                }
                if (user == "") {
                    this.Activitydetails.innerHTML = `
                    <div class="alert alert-danger mt-1" role="alert">
                       <p class="text-center">There are no participants</p>
                  </div>
                  `
                } else {
                    this.Activitydetails.innerHTML = `
                    <div class="d-flex justify-content-center">
                    <div class="col-lg-10">
                        <div class="d-flex justify-content-center pt-2">
                            <button style="background-color: #D60B52; border-radius: 20px; border: none;" type="button" class="btn btn-primary ">
                                Nº Participants: <span class="badge badge-light">${user.length}</span>
                                <span class="sr-only">unread messages</span>
                            </button>
                        </div>
                        `
                    for (let k = 0; k <= [user.length - 1]; k++) {
                        this.Activitydetails.innerHTML += `
                        <table class="table table-borderless">
                        <tbody>
                          <tr>
                            <td style="font-weight: bold; background-color: none;"><img src="${userPhotoDetail[k]}" width="42" height="42" class="rounded-circle profileIMG mr-2"> ${user[k]} - ${userEmail[k]}</td>
                          </tr>
                        </tbody>
                      </table>`
                    }
                }

            }

        }

    }

    bindRegisterActivity() {
        let idsCardNotification = this.notificationsController.getNotification()
        let participants = this.activitiesController.getActivities()
        let users = []
        let category = this.categorisControllerVar.getCategories()
        let poinstSum = 0
        let loggedUser = ""

        users = this.userController.userModel.getAll().filter(user => user.type == "user").sort(function (a, b) { return parseInt(b.points) - parseInt(a.points) })
        let image = ""
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getUTCMonth() + 1
        let verifiedMonth = ""
        if (month.toString().length === 1) {
            verifiedMonth = "0" + month
        }
        let day = date.getUTCDate()

        let fullDate = year + verifiedMonth + day

        this.RegisterActivityButton.addEventListener('click', event => {
            event.preventDefault()
            for (const categorie of category) {
                if (this.RegisterActiviyCategorie.options[this.RegisterActiviyCategorie.selectedIndex].text == categorie.category) {
                    image = categorie.photo
                }
            }

            try {

                if (this.RegisterActiviyCategorie.options[this.RegisterActiviyCategorie.selectedIndex].text === "" || this.RegisterActivityDuration.options[this.RegisterActivityDuration.selectedIndex].text === "" || this.RegisterDate.value === "" || this.RegisterLocation.value === "" || this.RegisterStartTime.value === "") {
                    throw Error("You must fiel all the fields")

                } else {
                    let verifyDate = this.RegisterDate.value.split("-")
                    let dateToCompare = verifyDate[0] + verifyDate[1] + verifyDate[2]
                    if (dateToCompare < fullDate) {
                        throw Error("Sorry only future dates allowed")
                    } else {


                        let recomendedCount = this.activitiesModel.getAll().filter(activity => activity.type == "Recomended"&&activity.passed==false).length
                        console.log(recomendedCount)
                        if (recomendedCount < 3&& (users[0].email==sessionStorage.getItem('loggedUser')||users[1].email==sessionStorage.getItem('loggedUser')&&users[1].email==sessionStorage.getItem('loggedUser') )) {


                            this.activitiesController.addActivity(sessionStorage.getItem("userName"), this.RegisterActiviyCategorie.options[this.RegisterActiviyCategorie.selectedIndex].text, this.RegisterActivityDuration.options[this.RegisterActivityDuration.selectedIndex].text, this.RegisterLocation.value, this.RegisterDate.value, image, "Recomended", this.RegisterStartTime.value, sessionStorage.getItem("loggedUser"), sessionStorage.getItem("userPhotoUser"), "")
                            console.log("inseriu")
                            this.displayRegisterMessage('Activity registered with success!', 'success');
                            setTimeout(() => {
                                window.location.href = "../html/activities.html";
                            },
                                1000)
                        } else {


                            if (true)
                                this.activitiesController.addActivity(sessionStorage.getItem("userName"), this.RegisterActiviyCategorie.options[this.RegisterActiviyCategorie.selectedIndex].text, this.RegisterActivityDuration.options[this.RegisterActivityDuration.selectedIndex].text, this.RegisterLocation.value, this.RegisterDate.value, image, "normal", this.RegisterStartTime.value, sessionStorage.getItem("loggedUser"), sessionStorage.getItem("userPhotoUser"), "")
                            console.log("inseriu")
                            this.displayRegisterMessage('Activity registered with success!', 'success');
                            setTimeout(() => {
                                window.location.href = "../html/activities.html";
                            },
                                1000)



                        }


                    }





                }


            } catch (error) {
                this.displayRegisterMessage(error, "danger")
            }
        })
    }



    bindLocalStorage() {
        let activitiesListParse = this.activitiesController.getActivities()
        return activitiesListParse


    }

    bindParticipants() {
        let allActivities = this.activitiesController.getActivities()
        let acceptedParticipants = this.notificationsController.getNotification()
        let data = ""
        let participant = []
        let verifiedactivities = []
        let people = []
        let stat = allActivities.map(items => {
            return items
        })

        for (const verifyStatus of acceptedParticipants) {
            if (verifyStatus.status === "accepted") {
                participant.push(verifyStatus)
            }
        }
        for (let i = 0; i <= [participant.length - 1]; i++) {
            for (let j = 0; j <= [allActivities.length - 1]; j++) {
                if (allActivities[j].id == participant[i].cardId) {
                    people.push(participant[i].userEmailSend)
                    allActivities[j].participants = people

                    this.activitiesController.editactivity(allActivities)
                }
            }
        }
    }

    renderCards(activitiesListParse) {

        let cardResult = ''
        let cardRecomendedResult = ""
        let type = ""

        for (const activi of activitiesListParse) {


            type = activi.type
            if (!activi.passed) {


                if (type === "normal") {
                    cardResult += this._generateCards(activi)
                } else {
                    if (type === "Recomended") {
                        cardRecomendedResult += this._generateSpecialCard(activi)
                    }
                }
            }
        }
        this.InsertNormalCard.innerHTML = cardResult
        this.sendRequestFunction()
        this.myActivityDetails()
    }

    renderSpecialCard(activitiesListParse) {
        let cardRecomendedResult = ""
        let type = ""
        for (const activi of activitiesListParse) {
            type = activi.type

            if (!activi.passed) {


                if (type === "Recomended") {

                    cardRecomendedResult += this._generateSpecialCard(activi)

                }
            }
        }
        this.InsertCard.innerHTML = cardRecomendedResult
        this.sendRequestFunction()
        this.myActivityDetails()
    }

    _generateSpecialCard(activi) {
        if (activi.type === "Recomended") {
            if (activi.name === sessionStorage.getItem("userName")) {
                let html = `<div id="cardRecomended" class="card mb-2" style="width: 18rem;">
                <div class="d-flex justify-content-end m-2">
                  <h6 class="pr-2 text-muted">Recomended</h6>
                  <i class="fa fa-check-circle" style="color:#D60B52;" title="Recomended"></i>
                </div>
                <img width="128" height="128" class="rounded mt-3 mx-auto d-block" align="center" src="${activi.image}" alt="Running">
                <div class="card-body text-center">
                  <h5 class="card-title">${activi.name}</h5>
                  <p class="card-text mb-4">Category: ${activi.categorie}<br>
                    Local: <a id="activityLocation" href="https://www.google.pt/maps">${activi.local}</a><br>
                    Time: ${activi.startTime}<br>
                    Date: ${activi.date}<br>
                    Duration: ${activi.duration}
                  </p>
                  <button id="${activi.id} ${activi.userEmail} ${activi.userPhoto}" href="#" class="btn mx-auto d-block btnSeeDetails" data-toggle="modal"
                  data-target="#myActivityDetails">Participants</button>
                </div>
              </div>`
                return html
            } else {
                let html = `<div id="cardRecomended" class="card mb-2" style="width: 18rem;">
                <div class="d-flex justify-content-end m-2">
                  <h6 class="pr-2 text-muted">Recomended</h6>
                  <i class="fa fa-check-circle" style="color:#D60B52;" title="Recomended"></i>
                </div>
                <img width="128" height="128" class="rounded mt-3 mx-auto d-block" align="center" src="${activi.image}" alt="Running">
                <div class="card-body text-center">
                  <h5 class="card-title">${activi.name}</h5>
                  <p class="card-text mb-4">Category: ${activi.categorie}<br>
                    Local: <a id="activityLocation" href="https://www.google.pt/maps">${activi.local}</a><br>
                    Time: ${activi.startTime}<br>
                    Date: ${activi.date}<br>
                    Duration: ${activi.duration}
                  </p>
                  <button id="${activi.id} ${activi.userEmail} ${activi.userPhoto}" href="#" class="btn mx-auto d-block btnSendRequest" data-toggle="modal"
                    data-target="#sendRequestArea">Send Request</button>
                </div>
              </div>`
                return html
            }
        }
    }

    _generateCards(activi) {

        if (activi.type === "normal") {
            if (activi.name === sessionStorage.getItem("userName")) {
                let html = `<div class="card m-2" style="width: 18rem;">
                <img width="128" height="128" class="rounded mt-3 mx-auto d-block" align="center" src="${activi.image}" alt="Running">
                <div class="card-body text-center">
                  <h5 class="card-title">${activi.name}</h5>
                  <p class="card-text mb-4">Category: ${activi.categorie}<br>
                    Local: ${activi.local}<br>
                    Time:${activi.startTime}/24Hours</a><br>
                    Date: ${activi.date} <br>
                    Duration: ${activi.duration}
                  </p>
                  <button id="${activi.id} ${activi.userEmail} ${activi.userPhoto}" href="#" class="btn mx-auto d-block btnSeeDetails" data-toggle="modal"
                  data-target="#myActivityDetails">Participants</button>
                </div>
              </div>`
                return html

            } else {
                let html = `<div class="card m-2" style="width: 18rem;">
                <img width="128" height="128" class="rounded mt-3 mx-auto d-block" align="center" src="${activi.image}" alt="Running">
                <div class="card-body text-center">
                  <h5 class="card-title">${activi.name}</h5>
                  <p class="card-text mb-4">Category: ${activi.categorie}<br>
                    Local: ${activi.local}<br>
                    Time:${activi.startTime}/24Hours</a><br>
                    Date: ${activi.date} <br>
                    Duration: ${activi.duration}
                  </p>
                  <button id="${activi.id} ${activi.userEmail} ${activi.userPhoto}" href="#" class="btn mx-auto d-block btnSendRequest" data-toggle="modal"
                    data-target="#sendRequestArea">Send Request</button>
                </div>
              </div>`
                return html

            }


        }
    }

    filterActivitiesBySearchBar() {
        this.searchBar.addEventListener('change', () => {

            let getItems = this.activitiesController.getActivities()


            let arrayCard = []
            for (let i = 0; i <= [this.activitiesModel.activities.length - 1]; i++) {
                if (getItems[i].name === this.searchBar.value || getItems[i].categorie === this.searchBar.value
                    || getItems[i].duration === this.searchBar.value || getItems[i].local === this.searchBar.value
                    || getItems[i].date === this.searchBar.value) {


                    arrayCard.push(getItems[i])

                } else {

                }
            }
            this.renderCards(arrayCard)

        })
    }

    filterIndividual() {
        this.ButtonFilter.addEventListener('click', () => {
            alert("Hel yeah")
        })
    }

    filterSection() {
        this.ButtonFilter.addEventListener('click', () => {

            this.filterFields()
        })
    }

    filterFields() {
        let categorieField = (this.CategorieFilter.options[this.CategorieFilter.selectedIndex].text)
        let durationField = (this.DurationFilter.options[this.DurationFilter.selectedIndex].text)
        let getItems = this.activitiesController.getActivities()
        let arrayCard = []
        let specialCard = []
        for (let i = 0; i <= [this.activitiesModel.activities.length - 1]; i++) {
            if (getItems[i].categorie === categorieField && getItems[i].duration === durationField && this.DateFilter.value === getItems[i].date) {
                arrayCard.push(getItems[i])
                specialCard.push(getItems[i])


            } else {

                if (categorieField === getItems[i].categorie && durationField === getItems[i].duration && this.DateFilter.value === "") {

                    arrayCard.push(getItems[i])
                    specialCard.push(getItems[i])


                } else {

                    if (categorieField === getItems[i].categorie && durationField === "Duration" && this.DateFilter.value === "") {
                        arrayCard.push(getItems[i])
                        specialCard.push(getItems[i])

                    } else {
                        if (categorieField === "Categorie" && durationField === getItems[i].duration && this.DateFilter.value === "") {
                            arrayCard.push(getItems[i])
                            specialCard.push(getItems[i])

                        } else {
                            if (categorieField === "Categorie" && durationField === "Duration" && this.DateFilter.value === getItems[i].date) {
                                arrayCard.push(getItems[i])
                                specialCard.push(getItems[i])

                            } else {
                                if (categorieField === getItems[i].categorie && durationField === "Duration" && this.DateFilter.value === getItems[i].date) {
                                    arrayCard.push(getItems[i])
                                    specialCard.push(getItems[i])

                                } else {
                                    if (categorieField === "Categorie" && durationField === "Duration" && this.DateFilter.value === "") {
                                        arrayCard.push(getItems[i])
                                        specialCard.push(getItems[i])
                                    }
                                    else {
                                        if (categorieField === "Categorie" && durationField === getItems[i].duration && this.DateFilter.value === getItems[i].date) {
                                            arrayCard.push(getItems[i])
                                            specialCard.push(getItems[i])
                                        }
                                    }
                                }
                            }
                        }
                    }

                }

            }




        }
        this.renderCards(arrayCard)
        this.filterSpecialCard(specialCard)
        if (arrayCard.length < 1) {
            this.displayErrorCardMessage("There are no activities", "danger")
        }
        if (specialCard.length < 1) {
            this.displayErrorCardMessage("There are no activities", "danger")
        }
    }

    filterSpecialCard(activitiesSpecial) {
        let getItems = this.activitiesController.getActivities()
        let categorieField = (this.CategorieFilter.options[this.CategorieFilter.selectedIndex].text)
        let durationField = (this.DurationFilter.options[this.DurationFilter.selectedIndex].text)
        let specialCardRender = []
        let cardRenderCondition = ""

        if (this.DropTypeFilter.options[this.DropTypeFilter.selectedIndex].text === "All Activities") {
            this.renderSpecialCard(activitiesSpecial)
        } else {
            if (this.DropTypeFilter.options[this.DropTypeFilter.selectedIndex].text === "My Activities") {
                for (const card of activitiesSpecial) {
                    if (card.name === sessionStorage.getItem("userName")) {
                        specialCardRender.push(card)
                    }
                }
                this.renderSpecialCard(specialCardRender)
                this.renderCards(specialCardRender)


            }
        }

    }








    displayRegisterMessage(message, type) {
        this.registerActivityMessage.innerHTML =
            `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`
    }

    displayErrorCardMessage(message, type) {
        this.InsertNormalCard.innerHTML = `<div class="alert alert-${type}" role="alert">
        <h4 class="alert-heading"></h4>
        <h4 class="text-center">${message}</h4>
        <hr>
        <p class="mb-0">If you need help please contact us by email: GeoMeHelpDesk@geome.com</p>
      </div>`
        this.InsertCard.innerHTML = `<div class="alert alert-${type}" role="alert">
      <h4 class="alert-heading"></h4>
      <h4 class="text-center">${message}</h4>
      <hr>
      <p class="mb-0">If you need help please contact us by email: GeoMeHelpDesk@geome.com</p>
    </div>`
    }

}