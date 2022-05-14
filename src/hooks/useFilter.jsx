import {useState} from "react";


export const useFilter = ()=>{

  const [inputAuthor, setInputAuthor] = useState("")
  const [inputSubject, setInputSubject] = useState("")
  const [language, setLanguage] = useState("")



  return {
    author:inputAuthor,
    subject: inputSubject,
    language: language,
  }

}