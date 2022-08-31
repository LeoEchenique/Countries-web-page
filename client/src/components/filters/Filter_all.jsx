import React from "react"
import { orderCountries, getSortFront} from "../../actions/actions";
import { useDispatch, } from "react-redux"
import { useState } from "react";
import style from "../filters/Filter_all.module.css"

export default function Filter({ setter }) {
  
    const [marked, setMarked] = useState(false)
    const [order, setOrder] = useState("Name")
    const [continent, setContinent] = useState("")
    const dispatch = useDispatch();

    function handleRadio(e) {
        setter()    /* makes pages back to default (1) */
        setMarked(true)
        setContinent(e)
        dispatch(orderCountries("Continent", e))
         input()  
    }
    
    function handleSelect(e) {
        input()
        setOrder(e)
        handleRadio(continent)
    }
 
    function input() {
        let inpu = document.getElementById("None")
        if (inpu === null) return
        inpu.checked = true;
        let inpu2 = document.getElementById("order")
        inpu2.checked = false;
        let inpu3 = document.getElementById("order2")
        inpu3.checked = false;
    } 
 
    function handleOrder(e) {
        setter()
        dispatch(getSortFront(order, e, continent))
    }

    return (
        <div>
            <div onChange={(e) => handleRadio(e.target.value)} className={style.FilterContainer}>
                <label className={style.label}>
                    <input type="radio" name="Continent" value="Africa" className={style.button_17} />  Africa
                </label>
                <label className={style.label}>
                    <input type="radio" name="Continent" value="Antarctica"  className={style.button_17}/> Antarctica
                </label>
                <label className={style.label}>
                    <input type="radio" name="Continent" value="Asia"  className={style.button_17}/> Asia
                </label>
                <label className={style.label}>
                <input type="radio" name="Continent" value="Europe"  className={style.button_17}/> Europe
                </label>
                
                <label className={style.label}>
                <input type="radio" name="Continent" value="North America"  className={style.button_17}/>  North America
                </label>
                <label className={style.label}>
                <input type="radio" name="Continent" value="South America" className={style.button_17} /> South America
                </label>
                <label className={style.label}>
                <input type="radio" name="Continent" value="Oceania"  className={style.button_17}/> Oceania
                </label>
                        
                       
                        
                       
                        
                    </div>
            {marked === true ? 
                <div>
                    <div className={style.Select_filter}>
                        <h2 className={style.searchBy}> Order by: </h2> 
                        <div className={style.box}>
                         <select onChange={(e)=> handleSelect(e.target.value)} className={style.styling}>
                            <option defaultValue>Name </option>
                            <option >Population </option>
                            </select>
                        </div>
                    </div>
                    
                    <div onChange={(e) => handleOrder(e.target.value)} >
                        <label className={style.label}>
                            <input type="radio" name="order" value="None" id="None" defaultChecked className={style.button_17}/>  None
                         </label>
                        <label className={style.label}>
                          <input type="radio" name="order" value="Ascendent" id="order" className={style.button_17}/>  Ascendent
                        </label>
                        <label className={style.label}>
                         <input type="radio" name="order" value="Descendent"  id="order2" className={style.button_17}/> Descendent
                        </label>
                    </div>   
                </div>: null
            }

        </div>
    )
}