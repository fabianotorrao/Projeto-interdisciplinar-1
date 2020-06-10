export default class categoryModel {
    constructor() {

        this.categories = localStorage.categories ? JSON.parse(localStorage.categories) : []
    }
    getAll() {
        return this.categories
    }
    _persist(){
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }
    addCategory(category){
        this.categories.push(category)
        this._persist()
    }
    deleteCategory(Delcategory){
        this.categories=this.categories.filter(category=>category!=Delcategory)
        this._persist()
    }
    edit(update,old){
        this.categories=this.categories.map(category=>category==old?update:category)
        this._persist()
    }



}