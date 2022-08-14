import { useEffect } from "react";
import React from "react";
import { getDetail } from "../../actions/actions";
import {useDispatch, useSelector} from "react-redux"
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
export default function Detail(props) {
    let { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id)) 
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[] )
   /*  const { id } = props.match.params;
    console.log(id) */

    const actualStorage = useSelector(state => state.countryDetail);
    let detail = actualStorage;
    console.log(actualStorage,"actual storage")
    return (
    
        <div>
            {detail?.Img_Flag ? <img src={detail.Img_Flag} alt="Not found" /> : "nop"}
            {detail?.Name ? <h1>{detail.Name}</h1> : "nop"}
            {detail?.Continent ? <h1>Continent: {detail.Continent}</h1> : "nop"}
            {detail?.Sub_Region ? <h1>Sub-region: {detail.Sub_Region}</h1> : "nop"}
            {detail?.Capital ? <h1>Capital: {detail.Capital}</h1> : "nop"}
            {detail?.Summary ? <h1>Sterile facts: {detail.Summary}</h1> : "nop"}
            {detail?.Area ? <h1>Area: {detail.Area} Km².</h1> : "nop"}
            {detail?.Activities ? 
                detail.Activities.map(e => {
                return    <Card data={e} />
                    
                })
            : null } 
            {/* faltan 
            actividades turisticas  
            el área km2 o millones de km 
            
            */}
        </div>
)

}