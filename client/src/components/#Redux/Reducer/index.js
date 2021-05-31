import { combineReducers } from "redux";
import AuthReducer from "./Auth_Reducer";
import UserReducer from "./Users_Reducer"; 
import RoomReducer from "./Room_Reducer"; 
import SwitchReducer from "./Switch_Reducer"; 
import SelectReducer from "./Select_Reducer"; 
import StatusReducer from "./Status_Reducer"; 

const rootReducer = combineReducers({
    AuthReducer: AuthReducer,
    UserReducer: UserReducer,
    RoomReducer: RoomReducer,
    SwitchReducer: SwitchReducer,
    SelectReducer: SelectReducer,
    StatusReducer: StatusReducer,
});

export default rootReducer;