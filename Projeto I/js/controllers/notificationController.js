import notificationModel from '../models/notificationModel.js'

export default class notificationController {
    constructor(){
        this.notificationModelImport = new notificationModel()
    }

    addNotification(userEmailSend, userNameSend, userPhotoSend, userMessageSend, userEmailReceive, userPhotoReceive, cardId, hour, status){
        if(!this.notificationModelImport.getAll().some(notification => notification.userMessageSend === userMessageSend)){
            this.notificationModelImport.create(userEmailSend, userNameSend, userPhotoSend, userMessageSend, userEmailReceive,userPhotoReceive, cardId, hour, status)
        }else{
            throw Error ("Something went wrong with the notification send")
        }

    }
    getNotification(){
        const notifications = this.notificationModelImport.getAll()
        return notifications
    }
}