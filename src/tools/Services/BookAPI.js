import Controller from "./Controller";
import {paramsFromObj} from "../utils/func";
import {BIG_LANGUAGES} from "../utils/const";

const DEF_PAGE = 1
const DEF_LIMIT = 10

class BookAPI{


  getURLCoverByID(id, size=2){
    if(!id) return null


    const sizeMap = {
      1:"S", 2: "M", 3:"L"
    }
    const sizeLetter = sizeMap[size]
    return `https://covers.openlibrary.org/b/id/${id}-${sizeLetter}.jpg`
  }

  getURLPageByKey(key){
    return `https://openlibrary.org${key}`
  }


  //TODO: WARNING
  //get data not from openlibrary
  getLanguages(){
    return BIG_LANGUAGES
  }

  async getSubjectsByQuery(query, page=DEF_PAGE, limit=DEF_LIMIT){

    if(!query) query="*"
    else       query=encodeURI(query)

    const res =
      await fetch(`https://openlibrary.org/search/subjects.json?q=${query}&page=${page}&limit=${limit}`, {signal:Controller.now.signal})
    return res.json()
  }




  async getWorksByTitle(query, page=DEF_PAGE, limit=DEF_LIMIT){

      if(!query) query="*"
      else       query=encodeURI(query)
      const res =
        await fetch(`https://openlibrary.org/search.json?title=${query}&page=${page}&limit=${limit}`, {signal:Controller.now.signal})
      return res.json()

  }

  async getWorkByKey(key){
    try{
      const res = await fetch(`https://openlibrary.org/works/${key}.json`)
      return res.json()

    }catch (e){
      console.log(e.message)
    }
  }

  async getWorksByFilter(filter={}, page=DEF_PAGE, limit=DEF_LIMIT){

    const subjects = filter.subjects?.map(sub=>`subject_facet=${encodeURI(sub)}`).join("&")

    const params = []
    if(filter.title)    params.push(`title=${filter.title}`)
    else                throw Error("Error: you have empty title") //TODO: exception
    if(filter.author)   params.push(`author=${encodeURI(filter.author.name)}`)
    if(filter.language) params.push(`language=${filter.language}`)
    if(subjects)        params.push(`${subjects}`)
    if(filter.publish)  params.push(`first_publish_year=${filter.publish}`)

    console.log(params.join("&"))

    const res =
      await fetch(`https://openlibrary.org/search.json?${params.join("&")}&page=${page}&limit=${limit}`, {signal:Controller.now.signal})
    return res.json()

  }



  async getAuthorsByQuery(query, page=DEF_PAGE, limit=DEF_LIMIT){
    if(!query) query="*"
    else       query=encodeURI(query)

    const res =
      await fetch(`https://openlibrary.org/search/authors.json?q=${query}&page=${page}&limit=${limit}`, {signal:Controller.now.signal})
    return res.json()
  }

  async getAuthorByKey(key){
    try{
      const res = await fetch(`https://openlibrary.org/authors/${key}.json`)
      return res.json()

    }catch (e){
      console.log(e.message)
    }
  }



  async getBooksByTitle(query, page=DEF_PAGE, limit=DEF_LIMIT){
    try{
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}&page=${page}&limit=${limit}`).then(res=>res.json())
      console.log(res)
      const isbns = []
      for(let doc of res.docs){
        if(doc.isbn) isbns.push("ISBN:"+doc.isbn[0])
      }
      return fetch(`https://openlibrary.org/api/books?bibkeys=${isbns.join(",")}&format=json&jscmd=data`).then(res=>res.json())

    }catch (e){
      console.log(e.message)
    }
  }
  async getBookByKey(key){

  }
}


export default new BookAPI()