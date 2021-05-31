import * as API from "../../#Api/Api";
import { CREATE_MESSAGE } from "./Types";

export const createMessages = (id, Data) => async(dispatch) => {
    try {
        const { data } = await API.createMessage(id, Data);
        dispatch({
            type: CREATE_MESSAGE,
            payload: data
        });
    }catch(err) {
        console.log(err);
    }
};