import axios from "axios";


export const getCountries = () => {

    return async function (dispatch) {
        const { data } = await axios.get(`http://localhost:3001/Countries`);
        return dispatch({ type: "GetAll", payload: data });
    };


}

export const getDetail = (payload) => {

    return async function (dispatch) {
        const { data } = await axios.get(`http://localhost:3001/Countries/${payload}`);
        /* console.log(data, "data") */
        return dispatch({ type: "getDetail", payload: data });
    };
}

export const orderCountries = (order, toOrder) => {
    /*     console.log(order, toOrder, "act") */
    return {
        type: "orderBy",
        order,
        toOrder
    }

}

export const searchFor = (payload) => {

    return {
        type: "SEARCH_FOR",
        payload
    }
}
export const cleanFilter = () => {

    return {
        type: "CLEAR_FILTER"
    }

}


export const getSort = (by, order) => {

    return async function (dispatch) {

        const { data } = await axios.get(`http://localhost:3001/Countries/sort/${by}/${order}`);

        return dispatch({ type: "getSort", payload: data });
    };
}


export const getSortFront = (by, order, continent) => {
    /*   console.log("order:", order, "by:", by, "continent:", continent) */
    return {
        type: "SORT_FRONT",
        by,
        order,
        continent
    }
}

export const getNames = () => {

    return {
        type: "GET_NAMES",
    }
}

export const getActivities = () => {

    return async function (dispatch) {
        const { data } = await axios.get(`http://localhost:3001/Activity/all`);
        return dispatch({ type: "GET_ACTIVITIES", payload: data });
    };


}

export const createAct = (form, id) => {

    return {
        type: "CREATE_ACTIVITY",
        payload: { form: form, id: id }
    }
}

