import {useState} from "react";
import {useFetching} from "./useFetching";
import ServerService from "../tools/Services/ServerService";


export const useFavourite = (idTable)=>{

  const [isFav, setIsFav] = useState(null)

  const [toggleFav, isLoadingSetFav, errSetFav] = useFetching(async()=>{
    if(!isFav){
      await ServerService.fromDB.addFav(idTable)
      setIsFav(true)
    }else{
      await ServerService.fromDB.deleteFav(idTable)
      setIsFav(false)
    }

  })
  const [initFav, isLoadingMembership, errMembership] = useFetching(async ()=>{
    const favs = await ServerService.fromDB.getAllFavId()
    setIsFav(favs.some(fav=>fav===idTable))
  })



  return [isFav,toggleFav,initFav,isLoadingMembership||isLoadingSetFav, errSetFav||errMembership]
}