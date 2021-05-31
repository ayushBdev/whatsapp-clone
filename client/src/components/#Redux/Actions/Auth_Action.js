import * as API from "../../#Api/Api";
import { AUTH, GET_USERS, LOGOUT, STATUS } from "./Types";
import { success, Logouts } from "../../Notifications";

export const logouts = (id,router) => async(dispatch) => {
    try {
        const { data } = await API.logout(id);
        dispatch({
            type: LOGOUT,
            payload: data
        });
        Logouts();
        router.push("/");
    }catch(err) {
        console.log(`Auth Action ${err}`);
    }
};

export const signin = (formData,router) => async(dispatch) => {
    try {
        const { data } = await API.signIn(formData);
        dispatch({
            type: AUTH,
            payload: data
        });
        success(data?.result.name);
        router.push("/");
    }catch(err) {
        console.log(`Auth Action ${err}`);
    }
};

export const signup = (formData,router) => async(dispatch) => {
    try {
        const { data } = await API.signUp(formData);
        dispatch({
            type: AUTH,
            payload: data
        });
        success(data?.result.name);
        router.push("/");
    }catch(err) {
        console.log(`Auth Action ${err}`);
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