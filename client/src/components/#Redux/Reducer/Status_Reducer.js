import { STATUS } from "../Actions/Types";

const StatusReducer = (state = [], action) => {
    switch(action.type) {

        case STATUS:
            return action.payload;

        default: return state;
    };
};

export default StatusReducer;