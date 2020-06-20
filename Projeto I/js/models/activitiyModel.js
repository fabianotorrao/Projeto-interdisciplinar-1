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
    ToPassed(activity){
        
        
        const Editactivity = {
            id: activity.id,
            name: activity.name,
            categorie: activity.categorie,
            duration: activity.duration,
            local: activity.local,
            date: activity.date,
            image: activity.image,
            type: activity.type,
            startTime: activity.startTime,
            userEmail: activity.userEmail,
            userPhoto: activity.userPhoto,
            participants: activity.participants,
            passed: true
        }
        this.activities=this.activities.map(activity=>activity.id==Editactivity.id?Editactivity:activity)
        this._presist()
        
    }
}
