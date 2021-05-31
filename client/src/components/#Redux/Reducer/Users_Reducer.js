import { GET_USERS } from "../Actions/Types";

const UserReducer = (state = [], action) => {
    switch(action.type) {

        case GET_USERS: 
            return action.payload;

        default: return state;

    }
};

export default UserReducer;