import axios from "axios";

const PORT = process.env.PORT;

export const getCountries = () => {

    return async function (dispatch) {
        const { data } = await axios.get(`https://countries019.herokuapp.com/Countries`);
        return dispatch({ type: "GetAll", payload: data });
    };


}

export const getDetail = (payload) => {

    return async function (dispatch) {
        const { data } = await axios.get(`https://countries019.herokuapp.com/Countries/${payload}`);

        return dispatch({ type: "getDetail", payload: data });
    };
}

export const orderCountries = (order, toOrder) => {

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

        const { data } = await axios.get(`https://countries019.herokuapp.com/Countries/sort/${by}/${order}`);

        return dispatch({ type: "getSort", payload: data });
    };
}


export const getSortFront = (by, order, continent) => {

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
        const { data } = await axios.get(`https://countries019.herokuapp.com/Activity/all`);
        return dispatch({ type: "GET_ACTIVITIES", payload: data });
    };


}

export const createAct = (form, id) => {

    return {
        type: "CREATE_ACTIVITY",
        payload: { form: form, id: id }
    }
}

