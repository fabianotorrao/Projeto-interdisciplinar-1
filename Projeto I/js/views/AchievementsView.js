import userController from '../controllers/UserController.js'
import usermodel from '../models/UserModel.js'
import missionController from '../controllers/missionController.js'
import missionModel from '../models/missionModel.js'


export default class AchievementsView {
    constructor() {
        this.userController = new userController()
        this.usermodel = new usermodel()
        this.missionModel = new missionModel()
        this.chart = document.querySelector("#chart").getContext("2d")
        this.levelLabel = document.querySelector("#level")
        this.yourPoints = document.querySelector("#YourPoints")
        this.missionsList = document.querySelector("#missions")
        this.ranking = document.querySelector("#ranking")



        this.bindLoad()
        console.log('test')
    }
    bindLoad() {
        window.addEventListener('load', event => {
            this.RenderChart(sessionStorage.getItem('loggedUser'))
            const user = this.usermodel.getAll().filter(user => user.email == sessionStorage.getItem('loggedUser'))[0]


            this.levelLabel.innerHTML = `<h5>Level ${parseInt(user.points / 100) + 1}</h5>`
            this.yourPoints.innerHTML = `<h4>Your Points: ${user.points}</h4>`
            const userlevel = parseInt(user.points / 100) + 1
            this.missionModel.getAll().forEach(element => {
                if (userlevel >= element.minLevel && userlevel <= element.maxLevel) {
                    this.missionsList.innerHTML += `<div class="mission mb-5 col-lg-10 d-flex justify-content-center">${element.description}</div>`
                }

            });
            let users = this.usermodel.getAll()
            users=users.filter(user=>user.type=="user").sort(function(a,b){return parseInt(b.points)-parseInt(a.points)})
            console.log(users)
            let pos;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email==sessionStorage.getItem('loggedUser')) {
                    pos=i+1
                    break
                } 
                
            }
            console.log(pos)


            this.ranking.innerHTML = `<h4 class="col-lg-12 d-flex justify-content-center mt-5">Ranking : ${pos}</h4>`


        })
    }
    RenderChart(id) {
        const user = this.usermodel.getAll().filter(user => user.email == id)[0]
        const userLevel = parseInt(user.points / 100) + 1
        console.log(userLevel)
        let data = {

            datasets: [{
                data: [user.points, userLevel * 100 - user.points],
                backgroundColor: ['#A6CEE3', '#1F78B4']

            }],
            labels: ['Points', 'Remaining to next level'],
        }
        let chart1 = new Chart(this.chart, {
            type: 'doughnut', //'doughnut',

            data: data,
            options: {
                resposive: true,
                legend: { display: false }

            }


        })

        chart1.render()







    }
}