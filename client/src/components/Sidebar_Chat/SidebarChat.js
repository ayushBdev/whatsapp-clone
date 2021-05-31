import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import img2 from "../#Images/img2.png";
import { Avatar } from '@material-ui/core';

import { SWITCH } from "../#Redux/Actions/Types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pusher from "pusher-js";
import API from "../#Api/Api";

const SidebarChat = () => {

    const [room, setRoom] = useState([]);

    const user = JSON.parse(localStorage.getItem("profile"));
    const searchs = useSelector(state => state.RoomReducer);
    const dispatch = useDispatch();

    const handelClicks = () => {
        dispatch({
           type: SWITCH,
           payload: true 
        });
    };

    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER, {
            cluster: process.env.REACT_APP_CLUSTER
        });

        const channel = pusher.subscribe("rooms");
        channel.bind("inserted", ((data) => {
            if(data.userId1 === user?.result._id ||data.userId2 === user?.result._id) {
                setRoom([...room, data]);
            }
        }));

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [room]);

    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER, {
            cluster: process.env.REACT_APP_CLUSTER
        });

        const channel = pusher.subscribe("rooms");
        channel.bind("deleted", ((data) => {
            API.get("/room")
                .then(res => (
                    setRoom(res.data)
            ));
        }));

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [room]);

    useEffect(() => {
        API.get("/room")
            .then(res => (
                setRoom(res.data)
        ));
    }, []);

    return (
        <div className="sidebar_chat">
            {searchs && searchs.map((arr) => (
                <Link className="container" key={arr._id} to={`/${arr._id}`} onClick={handelClicks}>
                    <div className="user_info">
                        <Avatar src={img2}/>
                        <div>
                            <h4> {arr.userName2} </h4>
                            <p> Room Last Message </p>
                        </div>
                    </div>
                    <div className="date">
                        <p> 20 APR 2021 </p>
                    </div>
                </Link>
            ))}
        </div>  
    );
};

export default SidebarChat;