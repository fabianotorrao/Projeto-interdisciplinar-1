import categoryModel from '../models/categoryModel.js'
export default class UserController {
    constructor() {
        this.categoryModel = new categoryModel()
    }
    addCategory(newcategory,IMG) {
        if (!this.categoryModel.getAll().some(category => category.category === newcategory)) {
            this.categoryModel.addCategory(newcategory,IMG)
        }
        else {
            throw Error(`category  "${newcategory}" already exists!`)
        }
    }
    deleteCategory(category) {
        this.categoryModel.deleteCategory(category)
    }
    editCategory(Nphoto,update, old) {
        if (update === old || (!this.categoryModel.getAll().some(category => category.category===update))) {
            this.categoryModel.edit(Nphoto,update,old)
        }
        else{
            throw Error(`category ${update} already exists!`)
        }
    }


}