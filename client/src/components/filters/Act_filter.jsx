import React from "react";
// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { orderCountries, getSortFront} from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux"
import style from "../filters/Filter_all.module.css"

/* filtred no tiene nada entonces renderiza allCountries */
export default function FilterAct({setter}) {
    
    const dispatch = useDispatch();
    /* const actualStorage= useSelector(state=> state.filtred) */
    
    function handleChange(e) {
        setter()
      /*   console.log(e) */
        dispatch(orderCountries("Season", e))
    }

    return (
        <div>
           
           
                <div>
                     <h2> Order by: </h2> 
                <div onChange={(e) => handleChange(e.target.value)}>
                    <label className={style.label}>
                        <input type="radio" name="order" value="All" id="None" defaultChecked  className={style.button_17}/>  All
                    </label>
                    <label className={style.label}>
                        <input type="radio" name="order" value="Spring" id="Order1"  className={style.button_17} /> Spring
                    </label>
                    <label className={style.label}>
                        <input type="radio" name="order" value="Summer" id="Order2" className={style.button_17}/>  Summer 
                    </label>
                    <label className={style.label}>
                        <input type="radio" name="order" value="Fall" id="Order3" className={style.button_17}/>  Fall
                    </label>
                    <label className={style.label}>
                        <input type="radio" name="order" value="Winter"  id="Order4" className={style.button_17}/> Winter
                    </label>
                       
                      
                      
                        
                </div>   
                </div>
             

        </div>
    )
}

     
