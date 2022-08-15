import axios from "axios";
import { idGen } from "../Helpers/idGen";
const PORT = process.env.PORT;

const initialState = {

    allCountries: [],
    countryDetail: {},
    filtred: [],
    names: [],
    idNames: [],
    activities: [],
    filter_act: [],
    error: "",
    activities_created: [],

};


function rootReducer(state = initialState, action) {

    if (action.type === "GET_NAMES") {
        let names;
        if (state.allCountries.length) {
            names = state.allCountries.sort((a, b) => (a.Name > b.Name) ? 1 : -1);
            names = state.allCountries.map(e => {
                return {
                    name: e.Name,
                    id: e.Id
                }
            })
        }
        return {
            ...state,
            names: names
        }
    }
    if (action.type === "CREATE_ACTIVITY") {
        let activity = action.payload.form
        console.log("entree", activity)
        let result = async (e) => {
            const { data } = await axios.post(`https://countries019.herokuapp.com/Activity/`,
                {
                    Id: activity.id,
                    Name: activity.name.toUpperCase(),
                    Season: activity.season,
                    Level: parseInt(activity.level),
                    Duration: activity.duration,
                    Comments: activity.comments.toUpperCase(),
                    Contact: activity.contact,
                    PkCountry: action.payload.id    /* Here we pass the array of id's to make a for loop on the backend
                                                        a for iteration is needed because it can't run all at the same time 
                                                        because the activity will be created for each ID at the same time and throws error validation */
                }
            );
            return data
        }
        result()
        return {
            ...state,
            activities_created: result
        }
    }
    if (action.type === "GetAll") {
        return {
            ...state,
            allCountries: action.payload
        }
    }
    if (action.type === "GET_ACTIVITIES") {
        return {
            ...state,
            activities: action.payload,
            filter_act: action.payload
        }
    }
    if (action.type === "getDetail") {
        return {
            ...state,
            countryDetail: action.payload
        }
    }

    if (action.type === "SEARCH_FOR") {
        let fix;
        fix = action.payload.toLowerCase()
        fix = fix.replace(fix[0], fix[0].toUpperCase())
        let found;
        found = state.allCountries.filter(e => e.Name === fix)
        return {
            ...state,
            filtred: [...found],
            activities: []
        }
    }

    if (action.type === "orderBy") {
        let filtred;
        if (action.order === "Continent") {
            filtred = state.allCountries.filter(e => e.Continent === action.toOrder)
            return {
                ...state,
                filtred: filtred
            }
        }
        if (action.order === "Season") {
            if (action.toOrder === "All") {
                return {
                    ...state,
                    activities: state.activities,
                    filter_act: state.activities,
                    error: ""
                }
            } else {
                filtred = state.activities.filter(e => e.Season === action.toOrder)
                if (filtred.length) {
                    return {
                        ...state,
                        filter_act: filtred
                    }
                } else {
                    return {
                        ...state,
                        filter_act: filtred,
                        error: "not found"
                    }
                }
            }
        }
    }

    if (action.type === "CLEAR_FILTER") {
        return {
            ...state,
            filtred: [],
            activities: [],
            filter_act: [],
            error: ""
        }
    }

    if (action.type === "getSort") {
        return {
            ...state,
            allCountries: action.payload
        }
    }
    if (action.type === "SORT_FRONT") {
        let sort;
        if (action.order === "None") {
            sort = state.allCountries.filter(e => e.Continent === action.continent)
        }
        if (action.by === "Name") {
            if (action.order === "Ascendent") sort = state.filtred.sort((a, b) => (a.Name > b.Name) ? 1 : -1);
            if (action.order === "Descendent") sort = state.filtred.sort((a, b) => (a.Name < b.Name) ? 1 : -1);
        }
        if (action.by === "Population") {
            if (action.order === "Ascendent") sort = state.filtred.sort((a, b) => (a.Population < b.Population) ? 1 : -1);
            if (action.order === "Descendent") sort = state.filtred.sort((a, b) => (a.Population > b.Population) ? 1 : -1);
        }
        return {
            ...state,
            filtred: [...sort]      /* el spread genera una copia y la ref en memoria entonces cambia entonces si se renderiza */
        }
    }

    return {
        ...state
    }

}

export default rootReducer;


