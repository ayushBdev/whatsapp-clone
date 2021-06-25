import React, { useState } from "react";
import "../Chat.css";

import { img3 } from "../../Images/Images";
import { Avatar, IconButton, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { SWITCH } from "../../#Redux/Actions/Types";
import { deleteRooms} from "../../#Redux/Actions/Room_Action";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ChatHeader = ({id,roomName}) => {

    const [open, setOpen] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    const status = useSelector(state =>  state.StatusReducer);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handelDelete = () => {
        dispatch(deleteRooms(id, history));
        handleClose();
        dispatch({
            type: SWITCH,
            payload: false 
         });
    };

    return(
        <>  
            <div className="chats_div">
                <Avatar src={img3}/>
                <div>
                    <p> {roomName} </p>
                    <p> Last Seen {status.status} </p>
                </div>
            </div>
            <div>
                <IconButton> <DeleteIcon onClick={handleClickOpen}/> </IconButton>
            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title"> {"Delete this Chat?"} </DialogTitle>
                <DialogActions>
                    <button className="no_btn" onClick={handleClose}>
                        CANCEL
                    </button>
                    <button className="yes_btn" onClick={handelDelete}>
                        DELETE CHAT
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ChatHeader;