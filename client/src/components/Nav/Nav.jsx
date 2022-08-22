import React, {  } from "react";
import { Link } from "react-router-dom"
import style from "../Nav/Nav.module.css"
import logo from "../Nav/logo.png"

export default function Nav({onForm}) {

   
   return (
      

      <div className={style.main_container}>
         <div className={style.logo}>
            <img src={logo} alt="Not found"/>
         </div>
         <div className={style.nav_link}>
            {onForm ? <Link to={"/home"} > Home </Link>  : <p>   </p>}
            <Link to={"/home/CreateYourOwn"} > Create an Activity! </Link>
            <Link to={"/home/About"} > About </Link>
         </div>
        

      
       </div>
      
   )
}
  
