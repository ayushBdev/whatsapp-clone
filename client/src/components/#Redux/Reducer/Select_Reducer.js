import { SELECTED } from "../Actions/Types";

const SelectReducer = (state = [], action) => {
    switch(action.type) {

        case SELECTED:
            return action.payload;

        default: return state;
    };
};

export default SelectReducer;