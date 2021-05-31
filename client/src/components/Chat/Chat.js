import React, { useState, useEffect, useRef  } from "react";
import "./Chat.css";
import { IconButton } from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import ShowMsg from "./ShowMsg";

import { dateWeek, time } from "../TimeStamp/TimeStamp";
import { createMessages} from "../#Redux/Actions/Message_Action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";
import API from "../#Api/Api";
import ChatHeader from './ChatHeader';


const Chat = () => {

    const user = JSON.parse(localStorage.getItem("profile"));

    const { id } = useParams();
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null)

    const initialState = {
        roomId: id,
        msg: "",
        from: user?.result._id,
        time: time,
        date: dateWeek,
    };

    const [formData, setFormData] = useState(initialState);
    const [message, setMessage] = useState([]);
    const [room, setRoom] = useState([]);
    const [roomName, setRoomName] = useState("");

    const sendMessage = (event) => {
        event.preventDefault();
        dispatch(createMessages(formData));
        setFormData(initialState);
    };  

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
      }, [message]);

    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER, {
            cluster: process.env.REACT_APP_CLUSTER
        });

        const channel = pusher.subscribe("message");
        channel.bind("inserted", ((data) => {
            if(data.roomId === id) {
                setMessage([...message, data]);
            }
        }));

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [message]);


    useEffect(() => {
        API.get(`/message/${id}`)
            .then(res => (
                setMessage(res.data)
        ));
        API.get(`/room/rooms/${id}`)
            .then(res => (
                setRoom(res.data)
        ));
    }, [id]);

    useEffect(() => {
        if(room.userId1 === user?.result._id)
            return setRoomName(room.userName2);
        return setRoomName(room.userName1);
    }, [room]);

    return (
        <div className="chat">
            <div className="chat_header">
                <ChatHeader
                id={id}
                roomName={roomName}
                />
            </div>
            <div className="chat_container">
                {message && message.map(arr => (
                    <ShowMsg
                        key={arr._id}
                        msg={arr}
                        roomName={roomName}
                        dates={arr.date}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className="chat_footer" onSubmit={sendMessage}>
                <MoodIcon/>
                <AttachFileIcon/>
                <input
                    type="text"
                    value={formData.msg}
                    placeholder="Type a message"
                    onChange={(event) => setFormData({...formData, msg:event.target.value})}
                />
                <button type="submit" className="submit">
                    <IconButton onClick={sendMessage}> <SendIcon/> </IconButton>
                </button>
                
            </form>
        </div>
    );
};

export default Chat;