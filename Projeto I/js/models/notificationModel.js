export default class notificationModel{
    constructor(){
        this.notifications  = localStorage.notifications ? JSON.parse(localStorage.notifications) : []
    }

    getAll(){
        return this.notifications
    }

    create(userEmailSend, userNameSend, userPhotoSend, userMessageSend, userEmailReceive, userPhotoReceive, cardId, hour, status){
        const notification = {
            id: this.notifications.length > 0 ? this.notifications[this.notifications.length - 1].id + 1 : 1,
            userEmailSend: userEmailSend,
            userNameSend: userNameSend,
            userPhotoSend: userPhotoSend,
            userMessageSend: userMessageSend,
            userEmailReceive: userEmailReceive,
            userPhotoReceive: userPhotoReceive,
            cardId: cardId,
            hour: hour,
            status: status,
            passed: false
        }
        this.notifications.push(notification)
        this._presist()
    }

    _presist(){
        localStorage.setItem('notifications', JSON.stringify(this.notifications))
    }
}