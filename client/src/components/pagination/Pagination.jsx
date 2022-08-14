import React from "react";
import style from "../pagination/pagination.module.css"


export default function Pagination({CountriesPP, totalPosts, paginate}) {

    
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPosts.length / CountriesPP); i++) {
    
        pageNumber.push(i)
        
    }

    
    return (
        <nav className={style.container}>
            <ul>
                {pageNumber.map(number => (
                    <li key={number}>
                       <button onClick={()=>paginate(number)}>   {number}</button>
                      
                    </li>
                ))}
            </ul>
        </nav>
       
    )
}