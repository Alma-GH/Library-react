import {useEffect, useState} from "react";


export const usePagination = (countPages, view)=>{

  const [cursor, setCursor] = useState(1)

  useEffect(()=>{
    setCursor(1)
  }, [countPages])

  const pagesNum = []
  for (let i = 0; i < view && i+cursor<=countPages; i++) {
    pagesNum.push(i+cursor)
  }


  return [cursor,setCursor,pagesNum]
}