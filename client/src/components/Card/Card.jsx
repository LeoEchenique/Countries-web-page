import React from "react";
import style from "./Card.module.css"
import { Link } from "react-router-dom";

    
export default function Card(data) {
    
  

    let datos = data.data;
  
    return (
        <div className={style.Container}>
            {
            !datos.Season ? 
                  <div>
                        <img src={datos?.Img_Flag ?? ""} alt="No Img" className="Img" />
                    <Link to={`/home/detail/${datos.Id}`} className={style.link}>
                        <h1  className={style.a}>{datos?.Name ? datos.Name : ""}</h1> 
                    </Link>
                        <h4 className="Card_text">{datos?.Continent ? `Continent: ${datos.Continent}` : ""}</h4>
                    </div>
                    
            :     <div>
                    <h1>{datos.Name} </h1>
                    <h2>Season {datos.Season}</h2>
                    <h3> Difficulty: {datos.Level}</h3>
                    <h3>Takes: {datos.Duration}</h3>
                    <p> Contact information: {datos.Contact}</p>
                    <p> Comments: {datos.Comments}</p>
                  </div>
            }
        </div>
       
    )
}