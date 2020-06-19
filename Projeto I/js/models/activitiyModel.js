export default class activityModel {
    constructor() {
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : []
        
    }

    getAll(){
        return this.activities
    }

    create(name, categorie, duration, local, date, image, type, startTime, userEmail, userPhoto, participants) {

        const activity = {
            id: this.activities.length > 0 ? this.activities[this.activities.length - 1].id + 1 : 1,
            name: name,
            categorie: categorie,
            duration: duration,
            local: local,
            date: date,
            image: image,
            type: type,
            startTime: startTime,
            userEmail: userEmail,
            userPhoto: userPhoto,
            participants: participants,
            passed: false
        }
        this.activities.push(activity)

        this._presist()
    }

    _presist(){
        localStorage.setItem('activities', JSON.stringify(this.activities))

    }
}
