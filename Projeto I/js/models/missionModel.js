export default class missionModel{
    constructor(){
        this.missions=localStorage.missions?JSON.parse(localStorage.missions):[]
    }

    _persist(){
        localStorage.setItem('missions', JSON.stringify(this.missions));
    }
    getAll() {
        return this.missions
    }
    addMission(type,goal,minLevel,maxLevel,points,descript){
        const mission={
            id:this.missions.length > 0 ? this.missions[this.missions.length - 1].id + 1 : 1,
            type:type,
            goal:goal,
            minLevel:minLevel,
            maxLevel:maxLevel,
            points:points,
            description:descript
        }
        this.missions.push(mission)
        this._persist()

    }
    removeMission(idRemove){
        
            this.missions=this.missions.filter(mission=>mission.id!=idRemove)
            this._persist()
        
    }
    editMission(newid,type,goal,minLevel,maxLevel,points,descript)
    {
        const missionEdited={
            id:newid,
            type:type,
            goal:goal,
            minLevel:minLevel,
            maxLevel:maxLevel,
            points:points,
            description:descript
        }
        console.log(missionEdited)
        this.missions =this.missions.map(mission=>mission.id==missionEdited.id?missionEdited:mission)
        this._persist()
    }
}
