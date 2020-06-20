import activityController from '../controllers/activityController.js'
import activityModel from '../models/activitiyModel.js'
import notificationController from '../controllers/notificationController.js'
import missionController from '../controllers/missionController.js'



export default class activityView {
    constructor() {

        this.activitiesController = new activityController()
        this.activitiesModel = new activityModel()
        this.notificationsController = new notificationController()
        this.missionController = new missionController()

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
        this.registerActivityMessage = document.querySelector("#mdlRegisterMessage")
        this.RegisterStartTime = document.querySelector("#txtStartTime_Activity")
        this.FilterEmpty = document.querySelector("#warningEmptyFilter")
        this.DropTypeFilter = document.querySelector(".dropTypeFilter")
        this.sendRequest = document.querySelector("#btnSendRequestText")
        this.btnRequest = document.querySelectorAll("#btnSendRequest")

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
            if (this.bindLocalStorage() === null) {
                throw Error("There are no activities")
            }
            this.renderCards(this.bindLocalStorage())
            this.renderSpecialCard(this.bindLocalStorage())


        } catch (error) {

            this.displayErrorCardMessage(error, "danger")

        }





    }
    ChangeActivityStatus() {
        let today = new Date()
        let month = today.getDay()
        let day = today.getDate()
        let hour = today.getHours()
        let year = today.getFullYear()
        console.log(year)
        this.activitiesController.activityModelVar.getAll().forEach(activity => {
            console.log(activity)
            let Sdate = activity.date.split('-')
            console.log(Sdate[0] <= year)

            if (activity.passed==false) {


                if (parseInt(Sdate[0]) < year) {
                    this.activitiesModel.ToPassed(activity)
                    setTimeout(() => {
                        window.location.href = "../html/activities.html";
                    },
                        1000)
                } else {
                    if (parseInt(Sdate[1] < month)) {
                        this.activitiesModel.ToPassed(activity)
                        setTimeout(() => {
                            window.location.href = "../html/activities.html";
                        },
                            1000)
                    } else {
                        if (parseInt(Sdate[2] < day)) {
                            this.activitiesModel.ToPassed(activity)
                            setTimeout(() => {
                                window.location.href = "../html/activities.html";
                            },
                                1000)
                        } else if (Sdate[2] == day && activity.startTime <= hour) {
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
            mission.forEach(element => {
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
            //verificar se a missao está completa
            console.log(missionsToCheck)
            missionsToCheck.forEach(element => {

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

    bindRegisterActivity() {
        let idsCardNotification = this.notificationsController.getNotification()
        let participants = this.activitiesController.getActivities()

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
            console.log('insert')

            try {

                if (this.RegisterActiviyCategorie.options[this.RegisterActiviyCategorie.selectedIndex].text === "" || this.RegisterActivityDuration.options[this.RegisterActivityDuration.selectedIndex].text === "" || this.RegisterDate.value === "" || this.RegisterLocation.value === "" || this.RegisterStartTime.value === "") {
                    throw Error("You must fiel all the fields")

                } else {
                    let verifyDate = this.RegisterDate.value.split("-")
                    let dateToCompare = verifyDate[0] + verifyDate[1] + verifyDate[2]
                    if (dateToCompare < fullDate) {
                        throw Error("Sorry only future dates allowed")
                    } else {
                        this.activitiesController.addActivity(sessionStorage.getItem("userName"), this.RegisterActiviyCategorie.options[this.RegisterActiviyCategorie.selectedIndex].text, this.RegisterActivityDuration.options[this.RegisterActivityDuration.selectedIndex].text, this.RegisterLocation.value, this.RegisterDate.value, "image", "Recomended", this.RegisterStartTime.value, sessionStorage.getItem("loggedUser"), sessionStorage.getItem("userPhotoUser"), "")
                        this.displayRegisterMessage('Activity registered with success!', 'success');
                        setTimeout(() => {
                            window.location.href = "../html/activities.html";
                        },
                            1000)
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
    }

    _generateSpecialCard(activi) {
        if (activi.type === "Recomended") {
            if (activi.name === sessionStorage.getItem("userName")) {
                let html = `<div id="cardRecomended" class="card mb-2" style="width: 18rem;">
                <div class="d-flex justify-content-end m-2">
                  <h6 class="pr-2 text-muted">Recomended</h6>
                  <i class="fa fa-check-circle" style="color:#D60B52;" title="Recomended"></i>
                </div>
                <img class="rounded mt-3 mx-auto d-block" align="center" src="../images/cycling.png" alt="Running">
                <div class="card-body text-center">
                  <h5 class="card-title">${activi.name}</h5>
                  <p class="card-text mb-4">Category: ${activi.categorie}<br>
                    Local: <a id="activityLocation" href="https://www.google.pt/maps">${activi.local}</a><br>
                    Time: ${activi.startTime}<br>
                    Date: ${activi.date}<br>
                    Duration: ${activi.duration}
                  </p>
                  <button disabled id="" href="#" class="btn mx-auto d-block btnSendRequest" data-toggle="modal"
                  data-target="#exampleModal">Send Request</button>
                </div>
              </div>`
                return html
            } else {
                let html = `<div id="cardRecomended" class="card mb-2" style="width: 18rem;">
                <div class="d-flex justify-content-end m-2">
                  <h6 class="pr-2 text-muted">Recomended</h6>
                  <i class="fa fa-check-circle" style="color:#D60B52;" title="Recomended"></i>
                </div>
                <img class="rounded mt-3 mx-auto d-block" align="center" src="../images/cycling.png" alt="Running">
                <div class="card-body text-center">
                  <h5 class="card-title">${activi.name}</h5>
                  <p class="card-text mb-4">Category: ${activi.categorie}<br>
                    Local: <a id="activityLocation" href="https://www.google.pt/maps">${activi.local}</a><br>
                    Time: ${activi.startTime}<br>
                    Date: ${activi.date}<br>
                    Duration: ${activi.duration}
                  </p>
                  <button id="${activi.id} ${activi.userEmail} ${activi.userPhoto}" href="#" class="btn mx-auto d-block btnSendRequest" data-toggle="modal"
                    data-target="#exampleModal">Send Request</button>
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
                <img class="rounded mt-3 mx-auto d-block" align="center" src="../images/saudavel.png" alt="Running">
                <div class="card-body text-center">
                  <h5 class="card-title">${activi.name}</h5>
                  <p class="card-text mb-4">Category: ${activi.categorie}<br>
                    Local: ${activi.local}<br>
                    Time:${activi.startTime}/24Hours</a><br>
                    Date: ${activi.date} <br>
                    Duration: ${activi.duration}
                  </p>
                  <button disabled id="" href="#" class="btn mx-auto d-block btnSendRequest" data-toggle="modal"
                  data-target="#exampleModal">Send Request</button>
                </div>
              </div>`
                return html

            } else {
                let html = `<div class="card m-2" style="width: 18rem;">
                <img class="rounded mt-3 mx-auto d-block" align="center" src="../images/saudavel.png" alt="Running">
                <div class="card-body text-center">
                  <h5 class="card-title">${activi.name}</h5>
                  <p class="card-text mb-4">Category: ${activi.categorie}<br>
                    Local: ${activi.local}<br>
                    Time:${activi.startTime}/24Hours</a><br>
                    Date: ${activi.date} <br>
                    Duration: ${activi.duration}
                  </p>
                  <button id="${activi.id} ${activi.userEmail} ${activi.userPhoto}" href="#" class="btn mx-auto d-block btnSendRequest" data-toggle="modal"
                    data-target="#exampleModal">Send Request</button>
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
            `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`;
    }

    displayErrorCardMessage(message, type) {
        this.InsertNormalCard.innerHTML = `<div class="alert alert-${type}" role="alert">
        <img width="58" height="95" class="rounded mx-auto d-block" src="../images/test.png">
        <h4 class="alert-heading"></h4>
        <h4 class="text-center">${message}</h4>
        <hr>
        <p class="mb-0">If you need help please contact us by email: GeoMeHelpDesk@geome.com</p>
      </div>`
    }

}
