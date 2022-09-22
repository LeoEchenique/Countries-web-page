import React from "react";
import { useEffect } from "react";
import { getCountries, cleanFilter, searchFor,getActivities } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import Card from "../Card/Card";
import style from "../_home/Home.module.css"
import Filter from "../filters/Filter_all";
import FilterAct  from "../filters/Act_filter";
import Pagination from "../pagination/Pagination"


export default function Home() {
   const dispatch = useDispatch();


   const [select, setSelect] = useState("All")
   const [search, setSearch] = useState("")
   /*  const [activities, setActivities]=useState([]) */
   const [currentPage, setCurrentPage] = useState(1)
   // eslint-disable-next-line no-unused-vars
   const [CountriesPP, setCountriesPP] = useState(10)
   

   useEffect(() => {

      dispatch(getCountries())
      return function () {
         dispatch(cleanFilter())
      }
      /* un return para el componentWillUnmount -> necesitas al volver al componente que el select y el order sea en "all" */
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const actualStorage = useSelector(state => state.allCountries);
   const filtered = useSelector(state => state.filtred);
   const allActivities = useSelector(state => state.activities);
   const activityByFilter = useSelector(state => state.filter_act)
   const error = useSelector(state => state.error);

   function handleChange(e) {    
      if (e === "Activities") { 
         setSelect(e)
         dispatch(cleanFilter())
         setCurrentPage(1)
         dispatch(getActivities())
      } 
      if (e === "Continent") {
         setSelect(e)
         setCurrentPage(1)
         dispatch(cleanFilter())
      }
      if (e === "All") {
         dispatch(cleanFilter())
         setSelect(e)
         setCurrentPage(1)
      }
   }
   
   function pages(arr) {
      const arrAll = [...arr]
      const indexOfLast = currentPage * CountriesPP;
      const indexOfFirst = indexOfLast - CountriesPP;
      const current = arrAll.slice(indexOfFirst, currentPage === 1 ? (indexOfLast - 1) : indexOfLast) /* this makes the dynamic paginate */
      return current.map(e => {
         return (<Card data={e} key={e.Id} />)  
      })
   }

   function paginate(num) {
      setCurrentPage(num)
      window.scroll(0,0)
   }

   function setter() {
      setCurrentPage(1)
   }
   function handleSearch() {
      let inpu = document.getElementById("all")     
      setCurrentPage(1)
      inpu.selected = true  
                
      if (search) {
         dispatch(searchFor(search))
         setSelect("all")  // this make posible to search in any instance of the page and not renderize filter components 
      } 
       // also changing the selected option in search by 
   }

   function handleMenu() {
      setCurrentPage(1)
      let inpu = document.getElementById("all")     
      inpu.selected = true
      setSelect("All")
      dispatch(cleanFilter())
   }

   return (
      <div>
            <div>
               <div>
               <div>
                
               <div className={style.search_bar}>
                  <input name="search" type="search" className={style.search_input} onChange={(e) => setSearch(e.target.value)} placeholder="Any Country in particular?..." />
                     <button name="search" className={style.button_17} onClick={() => handleSearch()}>Search!</button>
                     </div>
                  <div className={style.start_DIVbutton}>
              {( select === "All") && currentPage === 1 ? null : <button onClick={handleMenu} className={`${style.back_home} ${style.button_17}`}>Clean filters!</button>}

               </div>
               </div>
             
           
               <div className={style.Select_filter}>
                  <h2 className={style.search_by}>Search by:</h2>
                  <div className={style.box}>
                  <select onChange={(e) => handleChange(e.target.value)} className={style.styling}>
                        <option defaultValue id="all">All</option>
                        <option> Continent</option>
                        <option> Activities </option>
                     </select>

                  </div>
                  
                  </div>
               <div>
                  
                     {select === "Activities" ?
                     <FilterAct setter={setter} /> : null
                     }
                     {select === "Continent" ?
                        <Filter setter={setter} /> : null
                     }
                  </div> 
               </div>
            <div className={style.Card_container}>
               {select === "Activities" && activityByFilter.length ? 
                  <>
                     {pages(activityByFilter)}
                     <Pagination CountriesPP={CountriesPP} totalPosts={activityByFilter} paginate={paginate} />
                  </>
                  :
                  select === "Activities" && !activityByFilter.length ?
                     <p className={style.noData}>No activites... YET!</p> 
                  :
                  allActivities.length && !error ?
                     <>
                           {pages(allActivities)}
                            <Pagination CountriesPP={CountriesPP} totalPosts={allActivities} paginate={paginate} />
                     </>  
                     : 
                     filtered.length ?
                        <>
                           {pages(filtered)}
                           <Pagination CountriesPP={CountriesPP} totalPosts={filtered} paginate={paginate} />
                        </>
                        : actualStorage.length ?
                           <>
                              {pages(actualStorage)}
                              <Pagination CountriesPP={CountriesPP} totalPosts={actualStorage} paginate={paginate} />
                        </>
                        : <h1 className={style.noData}>Loading...</h1>}
               </div>
            </div>
      </div>
   )
}
  
