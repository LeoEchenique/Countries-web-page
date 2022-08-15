
import React from "react";
import { Link } from "react-router-dom";
import style from "../Landing/Landing.module.css"

export default function Landing () {
    


    return (

        <div className={style.main_container}>
            
            <div className={style.toHome}>
                <h1> Countries App!</h1>
                <Link className={`${style.button_17} ${style.h1butt}`} role="button" to={"/home"}>Get started </Link>
            </div>
            
        </div>
        
    )
}


