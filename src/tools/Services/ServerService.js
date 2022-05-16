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

    checkTypeWork(work){
      for(let key of Object.keys(work)){
        if(!WORK_PROPS.includes(key)) return false
      }
      return true
    },

    async getWorksByFilter(...args){
      let works = await DatabaseAPI.getAllWorks()
      if(!works) works = []
      const dataWorks = works
      return [dataWorks, dataWorks.length]
    },

    async setWorks(works){

      for(let work of works){
        if(!this.checkTypeWork(work)) throw Error("INCORRECT TYPE OF OBJECT")
      }

      const res = await DatabaseAPI.setWorks(JSON.stringify([...works]))
      return res
    },

    async addWork(work){

      if(!this.checkTypeWork(work)) throw Error("INCORRECT TYPE OF OBJECT")

      let allWorks = await DatabaseAPI.getAllWorks()
      if(!allWorks) allWorks = []

      const res = await DatabaseAPI.setWorks(JSON.stringify([...allWorks,work]))
      return res
    },

    async deleteWorkById(id){
      let allWorks = await DatabaseAPI.getAllWorks()
      if(!allWorks) allWorks = []

      allWorks = allWorks.filter(work=>work.id!==id)

      const res = await DatabaseAPI.setWorks(JSON.stringify([...allWorks]))
      return res
    }

  }

}


export default new ServerService()