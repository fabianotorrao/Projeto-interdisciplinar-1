export default class categoryModel {
    constructor() {

        this.categories =  localStorage.categories ? JSON.parse(localStorage.categories) : []
    }
    getAll() {
        return this.categories
    }
    
    _persist(){
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }
    addCategory(category,photo){
        const newCategory={
            category:category,
            photo:photo
        }
        
        this.categories.push(newCategory)
        this._persist()
    }
    deleteCategory(Delcategory){
        this.categories=this.categories.filter(category=>category.category!=Delcategory)
        this._persist()
    }
    edit(nphoto,update,old){
        const editCategory={
            category:update,
            photo:nphoto
        }
        this.categories=this.categories.map(category=>category.category==old?editCategory:category)
        this._persist()
    }



}