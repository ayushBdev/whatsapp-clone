import { CREATE_MESSAGE } from "./Types";;

const MessageReducer = (state = [], action) => {
    switch(action.type) {

        case CREATE_MESSAGE: 
            return [...state, action.payload];

        default: return state;

    }
};

export default MessageReducer;