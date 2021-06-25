import * as API from "../../#Api/Api";
import { AUTH, GET_USERS, LOGOUT, STATUS, SPINNER } from "./Types";
import { success, danger } from "../../Notifications/Notifications";

export const logouts = (id,router) => async(dispatch) => {
    try {
        const { data } = await API.logout(id);
        dispatch({
            type: LOGOUT,
            payload: data
        });
        danger(data.message);
        router.push("/");
    }catch(err) {
        console.log(`Auth Action ${err}`);
        danger(err.response.data.message);
    }
};

export const signin = (formData,router) => async(dispatch) => {
    try {
        const { data } = await API.signIn(formData);
        success(`Welcome ${data?.result.name}`);
        dispatch({
            type: AUTH,
            payload: data
        });
        router.push("/");
    }catch(err) {
        console.log(`Auth Action ${err}`);
        dispatch({
            type: SPINNER,
            payload: false
        });
        danger(err.response.data.message);
    }
};

export const signup = (formData,router) => async(dispatch) => {
    try {
        const { data } = await API.signUp(formData);
        success(`Welcome ${data?.result.name}`);
        dispatch({
            type: AUTH,
            payload: data
        });
        router.push("/");
    }catch(err) {
        console.log(`Auth Action ${err}`);
        dispatch({
            type: SPINNER,
            payload: false
        });
        danger(err.response.data.message);
    }
};

export const usersData = () => async(dispatch) => {
    try {
        const { data } = await API.getUsers();
        dispatch({
            type: GET_USERS,
            payload: data,
        });
    }catch(err) {
        console.log(`Fetching User Error: ${err}`);
    }
};

export const getsStatus = (name) => async(dispatch) => {
    try {
        const { data } = await API.getStatus(name);
        dispatch({
            type: STATUS,
            payload: data
        });
    }catch(err) {
        console.log(`Fetching User Error: ${err}`);
    }
};