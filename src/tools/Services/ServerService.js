import BookAPI from "./BookAPI";
import {T_AUTHOR, T_PUBLISH, T_TITLE, WORK_PROPS} from "../utils/const";
import {getLocationByURL} from "../utils/func";
import Controller from "./Controller";
import DatabaseAPI from "./DatabaseAPI";


class ServerService{

  fromAPI = {

    getLanguages(){
      const langs = BookAPI.getLanguages()
      return langs.map(lang=>({value:getLocationByURL(lang.key), name:lang.name}))
    },



    async getWorksByFilter(...args){
      const works = await BookAPI.getWorksByFilter(...args)
      const dataWorks = works.docs.map(work=>({
        id:     getLocationByURL(work.key),

        img:            BookAPI.getURLCoverByID(work.cover_i),
        [T_TITLE]:      work.title,
        [T_AUTHOR]:     work.author_name?.[0],
        [T_PUBLISH]:    work.first_publish_year,

        url:    BookAPI.getURLPageByKey(work.key)
      }))
      return [dataWorks, works.numFound]
    },

    async getWorksByTitle(...args){
      const works = await BookAPI.getWorksByTitle(...args)
      const dataWorks = works.docs.map(work=>({
        id:     getLocationByURL(work.key),

        img:            BookAPI.getURLCoverByID(work.cover_i),
        [T_TITLE]:      work.title,
        [T_AUTHOR]:     work.author_name?.[0],
        [T_PUBLISH]:    work.first_publish_year,

        url:    BookAPI.getURLPageByKey(work.key)
      }))
      return [dataWorks, works.numFound]
    },

    async getWorkByKey(key){
      const work = await BookAPI.getWorkByKey(key)
      const authorKey = getLocationByURL(work.authors[0].author.key)
      const author = await this.getAuthorNameByKey(authorKey)
      const dataWork = {
        img:          BookAPI.getURLCoverByID(work.covers?.[0]),
        title:        work.title,
        author:       {name:author, key:authorKey},
        description:  typeof work.description === "string" ? work.description : work.description?.value,
        subjects:     work.subjects,
        url:          BookAPI.getURLPageByKey(work.key)
      }
      return dataWork
    },




    async getAuthorsByQuery(...args){
      const authors = await BookAPI.getAuthorsByQuery(...args)
      const dataAuthors = authors.docs.map(author=>({
        key:author.key,
        name:author.name
      }))
      return dataAuthors
    },

    async getAuthorNameByKey(key){
      const author = await BookAPI.getAuthorByKey(key)
      return author.name
    },

    async getSubjectsByQuery(query){
      const subjs = await BookAPI.getSubjectsByQuery(query)
      const dataSubjs = subjs.docs.map(subj=>subj.name)
      return dataSubjs
    },

  }

  fromDB = {

    //works
    checkTypeWork(work){
      for(let key of Object.keys(work)){
        if(!WORK_PROPS.includes(key)) return false
      }
      return true
    },
    errorTypeWork(){throw Error("INCORRECT TYPE OF WORK")},

    async getWorksByFilter(...args){
      let works = await DatabaseAPI.getAllWorks()
      if(!works) works = []
      const dataWorks = works
      return [dataWorks, dataWorks.length]
    },

    async setWorks(works){

      for(let work of works){
        if(!this.checkTypeWork(work)) this.errorTypeWork()
      }

      const res = await DatabaseAPI.setWorks(JSON.stringify([...works]))
      return res
    },

    async addWork(work){

      if(!this.checkTypeWork(work)) this.errorTypeWork()

      let allWorks = await DatabaseAPI.getAllWorks()
      if(!allWorks) allWorks = []

      const res = await DatabaseAPI.setWorks(JSON.stringify([...allWorks,work]))
      return res
    },

    async deleteWorkById(id){
      let allWorks = await DatabaseAPI.getAllWorks()
      if(!allWorks) allWorks = []


      allWorks = allWorks.filter(work=>work.id!==id)


      const favRes  =  await this.deleteFav(id)
      const res     =  await DatabaseAPI.setWorks(JSON.stringify([...allWorks]))
      return res
    },

    //lists
    checkTypeList(list){

    },
    errorTypsList(){throw Error("INCORRECT TYPE OF LIST")},

    async getAllLists() {
      let lists = await DatabaseAPI.getAllLists()
      if(!lists) lists = []
      return [lists, lists.length]
    },

    //fav
    checkTypeFav(fav){
      return typeof fav === "string"
    },
    errorTypeFav(){throw Error("INCORRECT TYPE OF FAV")},

    async getAllFav(){
      const ids = await this.getAllFavId()
      let [works, num] = await  this.getWorksByFilter()

      works = works.filter(work=>ids.includes(work.id))


      return [works, num]
    },
    async getAllFavId(){
      let favs = await DatabaseAPI.getAllFav()
      if(!favs) favs = []
      return favs
    },

    async setFavsByWorks(works){

      for(let work of works){
        if(!this.checkTypeWork(work)) this.errorTypeWork()
      }

      let allFavs = works.map(work=>work.id)
      if(!allFavs) allFavs = []

      const res = await DatabaseAPI.setFav(JSON.stringify([...allFavs]))
      return res

    },

    async addFav(id){
      if(!this.checkTypeFav(id)) this.errorTypeFav()

      let allFavs = await DatabaseAPI.getAllFav()
      if(!allFavs) allFavs = []

      const res = await DatabaseAPI.setFav(JSON.stringify([...allFavs,id]))
      return res

    },

    async deleteFav(id){
      let allFav = await DatabaseAPI.getAllFav()
      if(!allFav) allFav = []

      allFav = allFav.filter(fav=>fav!==id)

      const res = await DatabaseAPI.setFav(JSON.stringify([...allFav]))
      return res
    },

  }

}


export default new ServerService()