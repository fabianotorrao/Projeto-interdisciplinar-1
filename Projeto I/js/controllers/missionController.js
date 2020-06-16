import missionModel from '../models/missionModel.js'
export default class missionController {
    constructor() {
        this.missionModel = new missionModel()
    }

    addMission(type, goal, minLevel, maxLevel, points, descript) {
        console.log(this.missionModel)
        if (!this.missionModel.getAll().some(mission => mission.type == type && mission.goal == goal && mission.minLevel == minLevel && mission.maxLevel == maxLevel && mission.points == points)) {
            this.missionModel.addMission(type, goal, minLevel, maxLevel, points, descript)
        }
        else {
            throw Error('Mission with this parameters already exists')
        }


    }
    deleteMission(id) {
        this.missionModel.removeMission(id)
    }
    editMission(id, type, goal, minLevel, maxLevel, points, descript) {
        let missions=this.missionModel.getAll().filter(mission=>mission.type == type && mission.goal == goal && mission.minLevel == minLevel && mission.maxLevel == maxLevel && mission.points == points)
        if (missions.length==0||missions.length==1) {
            this.missionModel.editMission(id,type,goal,minLevel,maxLevel,points,descript)
        }
        else {
            throw Error('Mission with this parameters already exists')
        }

    }
}
