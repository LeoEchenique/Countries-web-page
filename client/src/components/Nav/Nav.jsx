import React, {  } from "react";
import { Link } from "react-router-dom"
import style from "../Nav/Nav.module.css"
export default function Nav({onForm}) {

   console.log(onForm, "yazz")
   
   return (
      

      <div className={style.main_container}>
         <div className={style.logo}>
            <img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfkzCo8_vP7052aug-FqnCbWaO9sMyHb2AA&usqp=CAU`} alt="Not found"/>
         </div>
         
         <Link to={"/home/CreateYourOwn"} > Create an Activity! </Link>
         {onForm ? <Link to={"/home"} > Home </Link>  : null}
         <Link to={"/home/About"} > About </Link>

      
       </div>
      
   )
}
  
