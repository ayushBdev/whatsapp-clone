import { SWITCH } from "../Actions/Types";

const SwitchReducer = (state = false, action) => {
    switch(action.type) {
        
        case SWITCH: 
            return action.payload;

        default: return state;
    };
};

export default SwitchReducer;