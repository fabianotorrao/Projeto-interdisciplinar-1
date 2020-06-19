import activityModel from '../models/activityModel.js'

export default class activityController {
    constructor(){
        this.activityModelVar = new activityModel()
        this.getActivities()
    }

    addActivity(name, categorie, duration, local, date, image, type, startTime, userEmail, userPhoto, participants){
        if(!this.activityModelVar.getAll().some(activity => activity.local === local)){
            this.activityModelVar.create(name, categorie, duration, local, date, image, type, startTime, userEmail, userPhoto, participants)
        }else{
            throw Error ("It already exists an activity in this local")
        }
    }

    getActivities(){
        const activities = this.activityModelVar.getAll()
        return activities
        //console.log(activities);
        
        
    }
    sendRequest(id){
        this.activityModelVar.send(id)
    }
    editactivity(allActivities){
        this.activityModelVar.activities = allActivities
        this.activityModelVar._presist()
    }
}
