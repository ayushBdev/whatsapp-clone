import * as API from "../../#Api/Api";
import { CREATE_ROOM, DELETE_ROOM } from "./Types";
import { success, danger, warning } from "../../Notifications/Notifications";

export const createRooms = (Data) => async(dispatch) => {
    try {
        const { data } = await API.createRoom(Data);
        dispatch({
            type: CREATE_ROOM,
            payload: data
        });
        success(data.message);
    }catch(err) {
        console.log(err);
        danger(err.response.data.message);
    }
};

export const deleteRooms = (id, router) => async(dispatch) => {
    try {
        const { data } = await API.deleteRoom(id);
        dispatch({
            type: DELETE_ROOM,
            payload: data
        });
        warning(data.message);
        router.push("/");
    }catch(err) {
        console.log(err);
        danger(err.response.data.message);
    }
};
