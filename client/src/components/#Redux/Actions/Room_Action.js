import * as API from "../../#Api/Api";
import { CREATE_ROOM, DELETE_ROOM } from "./Types";

export const createRooms = (Data) => async(dispatch) => {
    try {
        const { data } = await API.createRoom(Data);
        dispatch({
            type: CREATE_ROOM,
            payload: data
        });
    }catch(err) {
        console.log(err);
    }
};

export const deleteRooms = (id, router) => async(dispatch) => {
    try {
        const { data } = await API.deleteRoom(id);
        dispatch({
            type: DELETE_ROOM,
            payload: data
        });
        router.push("/");
    }catch(err) {
        console.log(err);
    }
};
