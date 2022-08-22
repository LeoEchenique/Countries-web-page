import { useEffect } from "react";
import React from "react";
import { getDetail } from "../../actions/actions";
import {useDispatch, useSelector} from "react-redux"
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import style from "../CountryDetail/card.module.css"



export default function Detail(props) {
    let { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id)) 
  
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[] )


    const actualStorage = useSelector(state => state.countryDetail);
    let detail = actualStorage;

  
    return (
    
        <div className={style.div_container}>
            <div className={style.detail}>
            <div className={style.div_img}>
            {detail?.Img_Flag ? <img src={detail.Img_Flag} className={style.img} alt="Not found" /> : "nop"}

            </div>
            
                {detail?.Continent ?
                    
                    <h1 className={style.h1}>Continent: <p className={style.p}>{detail.Continent} </p> </h1> : "nop"}
                {detail?.Sub_Region ? <h1 className={style.h1}>Sub-region:  <p className={style.p}> {detail.Sub_Region}</p> </h1> : "nop"}
                {detail?.Capital ? <h1 className={style.h1}>Capital:  <p className={style.p}> {detail.Capital}</p> </h1> : "nop"}
                {detail?.Summary ? <h1 className={style.h1}> Facts: <p className={`${style.p} ${style.facts}`}>{detail.Summary}</p> </h1> : "nop"}
                {detail?.Area ? <h1 className={style.h1}>Area: <p className={style.p} >{detail.Area} Km².</p> </h1> : "nop"}
               
                <h1 className={style.acth1}>Activities:</h1>
             
                <div className={style.acts}>
                    
                    {detail?.Activities ? 
                        detail.Activities.length ? 
                        detail.Activities.map(e => {
                        
                      return    <Card data={e} />
                    
                        })
                     :  <h1 className={style.p}>No Activities found for this country.</h1> : null}  
                
            </div>
            
            </div>
        </div>
)

}