import * as API from "../../#Api/Api";
import { CREATE_MESSAGE } from "./Types";
import { success } from "../../Notifications/Notifications";

export const createMessages = (id, Data) => async(dispatch) => {
    try {
        const { data } = await API.createMessage(id, Data);
        dispatch({
            type: CREATE_MESSAGE,
            payload: data
        });
        success(data.message);
    }catch(err) {
        console.log(err);
    }
};