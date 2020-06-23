import userController from '../controllers/UserController.js'
import activityController from '../controllers/activityController.js'
import categoryModel from '../models/categoryModel.js'

export default class MyDataView {
    constructor() {
        this.userController = new userController()
        this.activityController = new activityController()
        this.categoryModel=new categoryModel()
        this.container=document.querySelector(".container")


        this.bindLoad()
    }
    bindLoad() {
        window.addEventListener('load', event => {
            let activities = this.activityController.activityModelVar.getAll()
            activities.forEach(activity => {
                if(this.categoryModel.getAll() == ""){
                    this.container.innerHTML = `<div class="alert alert-danger text-center" role="alert">
                    You haven't participated in any activity so far
                  </div>`
                }else{
                    let categoryImagePath=this.categoryModel.getAll().filter(category=>category.category==activity.categorie)[0].photo
                    if (activity.participants.includes(sessionStorage.getItem('loggedUser'))||(activity.name==sessionStorage.getItem('userName'))) {
                        this.container.innerHTML+=`<div class="d-flex justify-content-center">
                        <div id="myDataItems" class="col-lg-10 mt-5">
                            <div class="activityDate">
                                <h4 class="text-muted">Activity - ${activity.date}</h4>
                            </div>
                            <div id="mydata" class="row d-flex justify-content-around">
                                <div class="col-lg-3 mb-3">
                                    <h5 class="d-flex justify-content-center text-muted">Spend Time</h5>
                                    <i class="fa fa-clock-o d-flex justify-content-center mt-5" style="font-size:64px; color: #D60B52;"></i>
                                    <h3 class="dataText d-flex justify-content-center">${activity.duration}</h3>
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <h5 class="d-flex justify-content-center text-muted">Modalitie</h5>
                                    <img class="rounded mt-3 mx-auto d-block" align="center" width="94" src="${categoryImagePath}" alt="Running">
                                    <h3 class="dataText d-flex justify-content-center">${activity.categorie}</h3>
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <h5 class="d-flex justify-content-center text-muted">Participants</h5>
                                    <i class="fa fa-users d-flex justify-content-center mt-5" style="font-size:64px; color: #D60B52;"></i>
                                    <h3 class="dataText d-flex justify-content-center">${activity.participants.length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>`
    
                    }    
                }
                
            });

        })


    }
}