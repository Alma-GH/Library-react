import {DB_FAV, DB_LISTS, DB_ROOT, DB_SUMM, DB_WORKS} from "../utils/const";
import {child, get, ref, set} from "firebase/database";

class DatabaseAPI{

  _uid = null
  _db = null

  _folder = null

  set user(val){
    this._uid = val?.uid
    this._folder = `users/${this._uid}`
  }

  set database(val){
    this._db = val
  }


  async getAllWorks(){
    // const res = await fetch(DB_ROOT + DB_WORKS)

    // return res.json()


    const res = await get(child(ref(this._db), this._folder + DB_WORKS))
    return JSON.parse(res.val())
  }

  async setWorks(body){
    // const res = await fetch(DB_ROOT + DB_WORKS, {
    //   method: "PUT",
    //   headers:{
    //     "Content-Type": "application/json"
    //   },
    //   body,
    // })
    // return res.json()


    return set(ref(this._db, this._folder + DB_WORKS), body)
  }


  async getAllLists(){
    // const res = await fetch(DB_ROOT + DB_LISTS)
    // return res.json()

    const res = await get(child(ref(this._db), this._folder + DB_LISTS))
    return JSON.parse(res.val())
  }

  async setLists(body){
    // const res = await fetch(DB_ROOT + DB_LISTS, {
    //   method: "PUT",
    //   headers:{
    //     "Content-Type": "application/json"
    //   },
    //   body,
    // })
    // return res.json()

    return set(ref(this._db, this._folder + DB_LISTS), body)
  }


  async getAllFav(){
    // const res = await fetch(DB_ROOT + DB_FAV)
    // return res.json()

    const res = await get(child(ref(this._db), this._folder + DB_FAV))
    return JSON.parse(res.val())
  }

  async setFav(body){
    // const res = await fetch(DB_ROOT + DB_FAV, {
    //   method: "PUT",
    //   headers:{
    //     "Content-Type": "application/json"
    //   },
    //   body,
    // })
    // return res.json()

    return set(ref(this._db, this._folder + DB_FAV), body)
  }


  async getAllSummary(){
    // const res = await fetch(DB_ROOT + DB_SUMM)
    // return res.json()

    const res = await get(child(ref(this._db), this._folder + DB_SUMM))
    return JSON.parse(res.val())
  }

  async getSummaryById(id){
    // const res = await fetch(DB_ROOT + `/data/summary/${id}.json`)
    // return res.json()

    const res = await get(child(ref(this._db), this._folder + `/data/summary/${id}`))
    return JSON.parse(res.val())
  }

  async setSummaries(body){
    // const res = await fetch(DB_ROOT + DB_SUMM, {
    //   method: "PUT",
    //   headers:{
    //     "Content-Type": "application/json"
    //   },
    //   body,
    // })
    // return res.json()

    return set(ref(this._db, this._folder + DB_SUMM), body)
  }

  async setSummaryById(id, text){
    // const res = await fetch(DB_ROOT + `/data/summary/${id}.json`,{
    //   method: "PUT",
    //   headers:{
    //     "Content-Type": "application/json"
    //   },
    //   body: text,
    // })
    // return res.json()

    return set(ref(this._db, this._folder + `/data/summary/${id}`), text)
  }

}


export default new DatabaseAPI()