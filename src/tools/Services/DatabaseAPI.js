import {DB_FAV, DB_LISTS, DB_ROOT, DB_SUMM, DB_WORKS} from "../utils/const";


class DatabaseAPI{


  async getAllWorks(){
    const res = await fetch(DB_ROOT + DB_WORKS)
    return res.json()
  }

  async setWorks(body){
    const res = await fetch(DB_ROOT + DB_WORKS, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body,
    })
    return res.json()
  }


  async getAllLists(){
    const res = await fetch(DB_ROOT + DB_LISTS)
    return res.json()
  }

  async setLists(body){
    const res = await fetch(DB_ROOT + DB_LISTS, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body,
    })
    return res.json()
  }


  async getAllFav(){
    const res = await fetch(DB_ROOT + DB_FAV)
    return res.json()
  }

  async setFav(body){
    const res = await fetch(DB_ROOT + DB_FAV, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body,
    })
    return res.json()
  }


  async getAllSummary(){
    const res = await fetch(DB_ROOT + DB_SUMM)
    return res.json()
  }

  async getSummaryById(id){
    const res = await fetch(DB_ROOT + `/data/summary/${id}.json`)
    return res.json()
  }

  async setSummaries(body){
    const res = await fetch(DB_ROOT + DB_SUMM, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body,
    })
    return res.json()
  }



}


export default new DatabaseAPI()