import notificationController from '../controllers/notificationController.js'
import notificationModel from "../models/notificationModel.js"
import activityController from '../controllers/activityController.js'
import UserController from '../controllers/UserController.js'

export default class notificationView {
    constructor(){
        this.notificationImportController = new notificationController()
        this.notificationImportModel = new notificationModel()
        this.activityControllerImport = new activityController()
        this.userControllerImport = new UserController()
        this.sendNotificationBtn = document.querySelector("#btnSendRequestText")
        this.sendRequestMessage = document.querySelector("#sendRequestTextArea")
        this.notificationsSection = document.querySelector("#notificationSection")
        this.sendRequestMessageMessage = document.querySelector("#mdlRegisterMessage")
        this.acceptNotificationBtn = document.querySelectorAll("#accept")
        this.RenderCardDetails = document.querySelector("#cardInsert")


        this.notificationAnswer = []
        this.createNotification()
        this.renderNotifications(this.bindLocalStorage())
        this.acceptNotification()
        this.declineNotification()
        this.detailsNotification()
    }


    createNotification(){
        this.sendNotificationBtn.addEventListener("click", () =>{
            let getItems = this.notificationImportController.getNotification()
            let date = new Date()
            let hour = date.getHours()
            let minutes = date.getUTCMinutes()
            let minutesFormat = ""
            if(minutes.toString().length === 1){
               minutesFormat = "0" + minutes
            }else{
                minutesFormat = minutes
            }
            let sendHour = hour + ":" + minutesFormat
            console.log(sendHour)
            let arrayVerified = []
            sessionStorage.setItem("notificationMessage",this.sendRequestMessage.value)
            try{
                for(let i = 0; i <= [getItems.length -1]; i++){
                    if(getItems[i].userEmailSend === sessionStorage.getItem("loggedUser") && getItems[i].cardId === sessionStorage.getItem("notificationCardId")){
                        arrayVerified.push(getItems[i])
                    }
                }
                
               if(arrayVerified.length === 0){
                   this.notificationImportController.addNotification(sessionStorage.getItem("loggedUser"),sessionStorage.getItem("userName"), sessionStorage.getItem("userPhotoUser"), sessionStorage.getItem("notificationMessage"), sessionStorage.getItem("notificationUserEmail"), sessionStorage.getItem("notificationUserPhotoReceive"), sessionStorage.getItem("notificationCardId"), sendHour, "sent")
                   this.displaySendRequestMessage("Request send with success",'success')
                   window.location.reload()
               }else{
                   throw Error("Sorry you already send a request to this activity")
               }
          
            
               
            }catch(error){
                this.displaySendRequestMessage(error,'danger')
            }
        })
    }



    bindLocalStorage(){
        let notificationsListParse = this.notificationImportController.getNotification() 
    
        return notificationsListParse
    }

    acceptNotification(){
        let data = []
        let cardId = ""
        let notificationId = ""
        let userToAnswer = ""
        for (const btnControl of document.getElementsByClassName("btn-notification")) {
            btnControl.addEventListener('click', event => {
                data = (event.target.id).split(" ")
                notificationId = data[0]
                cardId = data[1]
                userToAnswer = data[2]
                sessionStorage.setItem("notificationAnswerId", notificationId)
                sessionStorage.setItem("cardAnswerNotification", cardId)
                sessionStorage.setItem("userToAnswer", userToAnswer)
                this.answerdNotification(sessionStorage.getItem("notificationAnswerId"), sessionStorage.getItem("cardAnswerNotification"), sessionStorage.getItem("userToAnswer"))
                setTimeout(() => {
                    window.location.reload()
                },
                    1000)
            })
            
        }
    }

    declineNotification(){
        let data = []
        let cardId = ""
        let notificationId = ""
        let userToAnswer = ""
        for(const btnControl of document.getElementsByClassName("btn-notificationDecline")){
            btnControl.addEventListener('click', event =>{
                console.log("clicou")
                data = (event.target.id).split(" ")
                notificationId = data[0]
                cardId = data[1]
                userToAnswer = data[2]
                sessionStorage.setItem("notificationAnswerId", notificationId)
                sessionStorage.setItem("cardAnswerNotification", cardId)
                sessionStorage.setItem("userToAnswer", userToAnswer)
                this.declineAnswer(sessionStorage.getItem("notificationAnswerId"))
                setTimeout(() => {
                    window.location.reload()
                },
                    1000)
            })     	
        }
    }

    detailsNotification(){
        let data = []
        let cardId = ""
        let notificationId = ""
        let userToAnswer = ""
        for(const btnControl of document.getElementsByClassName("btn-notificationDetails")){
            btnControl.addEventListener('click', event =>{
                data = (event.target.id).split(" ")
                notificationId = data[0]
                cardId = data[1]
                userToAnswer = data[2]
                sessionStorage.setItem("notificationAnswerId", notificationId)
                sessionStorage.setItem("cardAnswerNotification", cardId)
                sessionStorage.setItem("userToAnswer", userToAnswer)
                this.getActivityDetails(sessionStorage.getItem("cardAnswerNotification"))
            })     	
        }
    }

    answerdNotification(notificationId, cardId, userToAnswer){
        let arrayUpdate = []
        for(const not of this.notificationImportController.getNotification()){
            if(not.id.toString() === notificationId){
                not.status = "accepted"
                arrayUpdate.push(not)
            }else{
                arrayUpdate.push(not)
            }
        }
        localStorage.removeItem("notifications")
        localStorage.setItem("notifications", JSON.stringify(arrayUpdate))
    }

    declineAnswer(notificationId){
        let arrayUpdate = []
        for(const not of this.notificationImportController.getNotification()){
            if(not.id.toString() === notificationId){
                not.status = "decline"
                arrayUpdate.push(not)
            }else{
                arrayUpdate.push(not)
            }
        }
        localStorage.removeItem("notifications")
        localStorage.setItem("notifications", JSON.stringify(arrayUpdate))
    }


    getActivityDetails(cardID){
    let activities = this.activityControllerImport.getActivities()
    let activitySelected = []
      for(let i = 0 ; i <= [activities.length - 1]; i++){
          if(activities[i].id == cardID){
              activitySelected.push(activities[i])
          }
      }
      
      this.renderDetails(activitySelected)
    }

    renderDetails(activity){
        let cardResult = ""
        let users = ""
        
        for(const activi of activity){
            console.log(activi.participants)
            cardResult += this._generateCardInfo(activi)

        }
        console.log(users)
        this.RenderCardDetails.innerHTML = cardResult
    }

    _generateCardInfo(activi){

        let html = `
        <div class="card" style="width: 18rem;">
        <img class="rounded mt-3 mx-auto d-block" align="center" src="../images/saudavel.png" alt="Running">
        <div class="card-body text-center">
          <h5 class="card-title">${activi.name}</h5>
          <p class="card-text mb-4">Category: ${activi.categorie}<br>
          Local: ${activi.local}<br>
          Time:${activi.startTime}/24Hours</a><br>
          Date: ${activi.date} <br>
          Duration: ${activi.duration}
        </p>
        <span style="font-size: 12px;" class="badge badge-pill badge-info">Nº Participants: ${activi.participants.length}</span>
        </div>
      </div>
      `
  
      return html

        
  
    }




    renderNotifications(notificationsListParse){
        let notificationsResult = ""
        let userLogged = sessionStorage.getItem("loggedUser")
        let arrayVerifyEmpty = []
        for(const notification of notificationsListParse){
            if(notification.userEmailReceive === userLogged && notification.status === "sent"){
                notificationsResult += this._generateNotifications(notification)
                arrayVerifyEmpty.push(notification)
            }

            if(notification.userEmailSend === userLogged){
                
                if(notification.status === "accepted"){
                    arrayVerifyEmpty.push(notification)
                    notificationsResult += this._generateNotificationsAnswer(notification)

                }
                if(notification.userEmailSend === userLogged){
                    if(notification.status === "decline"){
                        arrayVerifyEmpty.push(notification)
                        notificationsResult += this._generateNotificationAnswerDecline(notification)
                    }
                }
            }
        }
        this.notificationsSection.innerHTML = notificationsResult
        if(arrayVerifyEmpty.length === 0){
            this.dispalyNotificationError()
        }

    }

    _generateNotifications(notification){
        if(notification.status === "sent"){
            console.log(notification.status)
            let html = ` <h6 id="notificationsText"><img id="notificationIMG" src="${notification.userPhotoSend}" width="42" height="42" class="rounded-circle profileIMG mr-2">
            ${notification.userNameSend} wants to participate in your activity 
            <br>
             <p style="font-style: italic;" class="text-secondary pl-5">"${notification.userMessageSend}" • ${notification.hour} 
             <a id="${notification.id} ${notification.cardId} ${notification.userEmailSend}" class="btn-notification ml-1 text-success" href="#"> Accept</a> • 
             <a id="${notification.id} ${notification.cardId} ${notification.userEmailSend}" class="btn-notificationDecline text-danger" href="#">Decline</a> • 
             <a id="${notification.id} ${notification.cardId} ${notification.userEmailSend}" class="btn-notificationDetails text-info" data-toggle="modal" data-target="#activityDetails" href="#">Activity Details</a>
             </p>
             </h6>
             <br>
          <br>`
          return html
        }else{
            this.dispalyNotificationError()
        }
    }
    _generateNotificationAnswerDecline(notification){
        let html = ` <h6 id="notificationsText"><img id="notificationIMG" src="${notification.userPhotoReceive}" width="42" height="42" class="rounded-circle profileIMG mr-2">
        ${notification.userEmailReceive} <span style="color: red">refuse</span> your request activity
        <br>
      <br>`
      return html  
    }

    _generateNotificationsAnswer(notification){
            let html = ` <h6 id="notificationsText"><img id="notificationIMG" src="${notification.userPhotoReceive}" width="42" height="42" class="rounded-circle profileIMG mr-2">
            ${notification.userEmailReceive} <span style="color: green">accepted</span> your request activity
            <br>
          <br>`
          return html  
    }

    dispalyNotificationError(){

        this.notificationsSection.innerHTML = `<div id="notificationsMessageError" class="d-flex justify-content-center"><p style="font-size: 19px;">You don´t have notifications for now</p></div>`

    }

    displaySendRequestMessage(message, type){
        this.sendRequestMessageMessage.innerHTML =
        `<div class="alert alert-${type} d-flex justify-content-center" role="alert">${message}</div>`;
    }
}