import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getNames, createAct } from "../../actions/actions";
import style from "../Create_Activity/CreateAct.module.css"
import { idGen } from "../../Helpers/idGen";
import { validator } from "../../Helpers/validator"


export default function CreateAct() {
    
    let id = idGen(32);
    
    const dispatch = useDispatch();
    const [countries, setCountries] = useState([]);

    const [countriesId, setCountriesId] = useState([]);
    const [error, setErrors] = useState("");
    const [form, setForm] = useState({
        id: id,
        name: "",
        season:"",
        comments: "",
        contact: "",
        duration: ""
    });
   
    useEffect(() => {

    dispatch(getNames())
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const actualStorage = useSelector(state => state.names)
    
    function handleSelect(e) {
        setCountries(current => [...current, e.target.value]) /* setting an array of values for one state without taking the others away */
    }
   
    function handleCheck(e) {
        if (e.checked === false) {
            let filtredNames= countries.filter(country => country !== e.value)
            setCountries(filtredNames) 
            /* in case of unchecked country will filter the arr of id's */
            let filtredIds = countriesId.filter(country => country.name !== e.value)
            setCountriesId(filtredIds)
             setForm(values=> ({...values, pkCountry: [...filtredIds]})) 
        } 
    }

    function handleForm(e) {
        const name = e.name;
        const value = e.value;
        
        setForm(values => ({ ...values, [name]: value }))
         
    }
    
    function handleClick(e) {
        setCountriesId(current => [...current, {
            id: e.target.id,
            name: e.target.value
        }])     
    }

   



      function handleSubmit(e) {
         e.preventDefault()
        let success = validator(form, countriesId);
        if (success === true) {
            setErrors({})   
            dispatch(createAct(form, countriesId))       
            window.location = "/home";
         
        } else setErrors(success)
        
    } 
      
     

    return (
    

        <div className={style.div_container}>
           
            
                <div className={style.form_container}>

            <h1 className={`${style.h1} ${style.create_act}`}>Create activity</h1>
                 <form onSubmit={(e)=> handleSubmit(e)}>
                     
                    <div className={style.text_name}>
                        <div className={style.text_input}>
                        <label className={style.label}> Name: </label>
                         <input type="text" placeholder="Name of the activity" onChange={e => handleForm(e.target)} name="name"></input>    

                    </div>
                        {error?.name ? <p className={style.p}>{error.name}</p> : null}
                    </div>
                <div  className={style.box}>
                    <label className={style.label}>Season: </label>
                    <select name="season" onChange={e => handleForm(e.target)} className={style.styling}>
                     <option selected="selected">Select</option>
                     <option>Spring</option>
                     <option>Summer</option>
                     <option>Fall</option>
                     <option>Winter</option>
                     <option>All</option>
                    </select>
                    
                    {error?.season ? <p className={style.p}>{error.season}</p> : null}
                </div>
                        
                    <div  className={style.box}>
                    <label className={style.label}>Level: </label>
                 <select name="level" onChange={e => handleForm(e.target)} className={style.styling}>
                     <option  selected="selected">Select</option>
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                 
                 </select>

                 {error?.level ? <p className={style.p}>{error.level}</p> : null}
                    </div>
                    
                    <div className={style.box}>
                    <label className={style.label}> Duration: </label>
                    <select name="duration" onChange={e => handleForm(e.target)} className={style.styling}> 
                    <option  selected="selected">Select</option>
                    <option>1 Hour or less</option>
                    <option>2 Hours or less</option>
                    <option>3 Hours or less </option>
                    <option>4 Hours or less</option>
                    <option>5 Hours or less</option>
                    <option>6 Hours or less</option>
                    <option>+6 Hours</option>
                 
                    </select>

                    {error?.duration ? <p className={style.p}>{error.duration}</p> : null}
                        </div>
                    
                    <div className={style.container_comments}>
                        <label className={`${style.label} ${style.labul}`}> Comments: </label>
                        <textarea className={style.text_area_container} placeholder="Comments here..." onChange={e => handleForm(e.target)} name="comments"></textarea>
                 
                    </div>

                    <div className={style.div_err}>
                        
                         <label  className={style.label} > Contact: </label>
                         <input type="text" placeholder="Email contact" onChange={e => handleForm(e.target)} name="contact"></input>

                        {error?.contact ? <p className={style.p}>{error.contact}</p> : null}
            
                    </div>
                    {actualStorage?.length?
                        <h1 className={`${style.countries_choice} ${style.h1}`}>Choose your countries</h1> : null}
                    
                <div className={style.countries_choose} >
                        {actualStorage?.length ?
                            <div className={style.box}>
                                <select onChange={(e) => handleSelect(e)} className={style.styling}>
                                    {actualStorage.length ?
                                        actualStorage.map(e => {
                                            return (
                                                <>
                                                    <option onClick={(e) => handleClick(e)} id={e.id}>{e.name}</option>
                                                </>
                                            )
                                        })
                                        : null}
                                </select>

                            </div> : <h1 className={style.pre_select}> Couldn't load the countries, please go back to HOME. </h1>}
                            
                      
                <div onChange={(e)=> handleCheck(e)} className={style.countries_selected} >
                    {countries.length ? 
                        countries.map(e => {
                            return (
                                <div className={style.div_selectedCon}>
                                    <label  className={style.label_selected}>
                                    <input className={style.button_17} onChange={(e)=>handleCheck(e.target)}  type="checkbox" checked /* checked instead of defaultCheked was the bug */ value={e} />{e}
                                    </label>
                                </div>
                            )
                        })
                                : error?.keys ? <p className={`${style.p} ${style.texted}`}>{error.keys} </p>
                            : actualStorage?.length? 
                        <p className={`${style.pre_select}`}>Selected countries will appear here..</p> : null}
                        
                </div>
                    </div>
                    {actualStorage?.length ?
                        <button className={style.button_17}> CREATE NOW!</button> : null}
                        
                </form>


            </div> 
           
        </div>
)
}