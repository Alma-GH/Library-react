import BookAPI from "./BookAPI";
import {
  ADD_FOR_NAME,
  LIST_PROPS,
  NAME_NEW_LIST,
  T_AUTHOR,
  T_PUBLISH,
  T_TITLE,
  WORK_PROPS
} from "../utils/const";
import {getLocationByURL, matchInArrays, strInclude} from "../utils/func.js";
import DatabaseAPI from "./DatabaseAPI";


class ServerService{

  ST_FROM_API = "fromAPI"
  ST_FROM_DB = "fromDB"

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
    },                //Confirm

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
        img:          BookAPI.getURLCoverByID(work.covers?.[0],3),
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

    async getAllWorks(){
      let works = await DatabaseAPI.getAllWorks()
      if(!works) works = []
      return [works, works.length]
    },                              //Confirm
    async getWorksByFilter(...args){

      const filterObj = args[0]
      const page = args[1]
      const limit = args[2]

      let works = await DatabaseAPI.getAllWorks()
      if(!works) works = []

      if(typeof filterObj === "object"){

        if(filterObj.list) [works] = await this.getWorksByListId({title:+filterObj.list})

        if(filterObj.title) works = works.filter(work=>strInclude(work.title, filterObj.title))
        if(filterObj.author) works = works.filter(work=>strInclude(work.author, filterObj.author.name))
        if(filterObj.subjects) works = works.filter(work=>matchInArrays(work.subjects, filterObj.subjects))


        const favIds = await this.getAllFavId()

        if(filterObj.checkFavourite) works = works.filter(work=>favIds.includes(work.id))

      }

      return [works, works.length]
    },                  //Confirm
    async getWorksByIds(ids){
      const [works] = await this.getWorksByFilter()

      let orderedWorks = []
      for (let i = 0; i < ids.length; i++) {
        orderedWorks.push(works.find(work=>work.id === ids[i]))
      }
      return orderedWorks
    },
    async getAllWorksIds(){
      const [works, len] = await this.getAllWorks()
      const ids = works.map(work=>work.id)
      return ids
    },

    async setWorks(works){

      for(let work of works){
        if(!this.checkTypeWork(work)) this.errorTypeWork()
      }

      const res = await DatabaseAPI.setWorks(JSON.stringify([...works]))
      return res
    },                            //UpdateOrder

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

      //from fav
      await this.deleteFav(id)

      //from lists
      const [allLists] = await this.getAllLists()
      const newLists = allLists.map(list=>{
        if(list.wids) list.wids = list.wids.filter(wid=>wid!==id)
        return list
      })

      await this.setLists(newLists)
      const res     =  await DatabaseAPI.setWorks(JSON.stringify([...allWorks]))
      return res
    },

    //lists
    checkTypeList(list){
      for(let key of Object.keys(list)){
        if(!LIST_PROPS.includes(key)) return false
      }
      return true
    },
    errorTypeList(){throw Error("INCORRECT TYPE OF LIST")},

    async getListById(lid){
      const [allLists] = await this.getAllLists()
      const find = allLists.find(list=>list.lid === lid)
      if(!find) throw Error("CANNOT FIND LIST BY ID: " + lid)
      return find
    },
    async getAllLists(...args) {
      let lists = await DatabaseAPI.getAllLists()
      if(!lists) lists = []
      return [lists, lists.length]
    },                      //Confirm
    async getWorksByListId(...args){

      const lid = args[0].title

      const list = await this.getListById(lid)
      let worksIds = list?.wids
      worksIds = worksIds ? worksIds : []

      const filterWorks = await this.getWorksByIds(worksIds)

      return [filterWorks, filterWorks.length]
    },                  //Confirm
    async getListsByWorkId(id){

      const [allLists, len] = await this.getAllLists()
      const listsByWork = allLists.filter(list=>list.wids?.includes(id))

      return listsByWork
    },


    async setLists(lists){
      for(let list of lists){
        if(!this.checkTypeList(list)) this.errorTypeList()
      }

      const res = await DatabaseAPI.setLists(JSON.stringify([...lists]))
      return res
    },                            //UpdateOrder
    async setWorksInList(works, lid){
      for(let work of works){
        if(!this.checkTypeWork(work)) this.errorTypeWork()
      }
      const wids = works.map(work=>work.id)
      const [allLists] = await this.getAllLists()
      const editList = allLists.find(list=>list.lid === lid)
      editList.wids = wids
      await this.setLists(allLists)
    },                 //UpdateOrder

    async addNewList(name, wids, pos=0){

      let allLists = await DatabaseAPI.getAllLists()
      if(!allLists) allLists = []

      let newName = name || NAME_NEW_LIST
      while(allLists.some(list=>list.name === newName)){
        newName += ADD_FOR_NAME
      }
      const newList = {
        lid: Date.now(),
        name: newName,
        wids: wids || []
      }


      allLists.splice(pos,0,newList)
      const newLists = [...allLists]

      const res = await DatabaseAPI.setLists(JSON.stringify(newLists))
      return res
    },

    async deleteList(lid){
      let allLists = await DatabaseAPI.getAllLists()
      if(!allLists) allLists = []

      allLists = allLists.filter(list=>list.lid!==lid)

      const res = await DatabaseAPI.setLists(JSON.stringify([...allLists]))
      return res
    },

    //fav
    checkTypeFav(favID){
      return typeof favID === "string"
    },
    errorTypeFav(){throw Error("INCORRECT TYPE OF FAV")},

    async getAllFav(...args){
      const ids = await this.getAllFavId()
      const orderedWorks = await this.getWorksByIds(ids)

      return [orderedWorks, orderedWorks.length]
    },                         //Confirm
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

    },                      //UpdateOrder

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


    //summary
    checkTypeSumm(summ){
      for(let val of Object.values(summ)){
        if(typeof val !== "string") return false
      }
      return true
    },
    errorTypeSumm(){throw Error("INCORRECT TYPE OF SUMM")},

    async getAllSummary(){
      let summaries = await DatabaseAPI.getAllSummary()
      if(!summaries) summaries = {}
      return summaries
    },

    async getSummaryById(id){
      let summary = await DatabaseAPI.getSummaryById(id)
      // if(summary === null) throw Error("CANNOT FIND SUMMARY BY ID: " + id)
      if(!summary) summary = ""
      return summary
    },

    async setSummaries(summaries){
      if(!this.checkTypeSumm(summaries)) this.errorTypeSumm()
      const res = await DatabaseAPI.setSummaries(JSON.stringify(summaries))
      return res
    },

    async setSummaryById(id, text){

      if(typeof text !== "string") this.errorTypeSumm()

      const res = await DatabaseAPI.setSummaryById(id,JSON.stringify(text))
      return res
    },

  }

}


export default new ServerService()