import categoryModel from '../models/categoryModel.js'
export default class UserController {
    constructor() {
        this.categoryModel = new categoryModel()
    }
    addCategory(newcategory) {
        if (!this.categoryModel.getAll().some(category => category === newcategory)) {
            this.categoryModel.addCategory(newcategory)
        }
        else {
            throw Error(`category  "${newcategory}" already exists!`)
        }
    }
    deleteCategory(category) {
        this.categoryModel.deleteCategory(category)
    }
    editCategory(update, old) {
        if (update === old || (!this.categoryModel.getAll().some(category => category===update))) {
            this.categoryModel.edit(update,old)
        }
        else{
            throw Error(`category ${update} already exists!`)
        }
    }


}