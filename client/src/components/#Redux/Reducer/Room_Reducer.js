import { CREATE_ROOM, GET_ROOM, SEARCH_ROOM } from "../Actions/Types";

const RoomReducer = (state = [], action) => {
    switch(action.type) {

        case GET_ROOM: 
            return action.payload;

        case SEARCH_ROOM: 
            return action.payload;

        case CREATE_ROOM: 
            return action.payload;

        default: return state;

    }
};

export default RoomReducer;