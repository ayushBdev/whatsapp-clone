import React, { useState, useEffect, useRef  } from "react";
import "./Chat.css";

import { IconButton } from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';

import ShowMsg from "./ShowMesssages/ShowMsg";
import { dateWeek, time } from "../TimeStamp/TimeStamp";
import { createMessages} from "../#Redux/Actions/Message_Action";
import API from "../#Api/Api";
import ChatHeader from './ChatHeader/ChatHeader';

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import pusher from "../Pusher/Pusher";

const Chat = () => {

    const user = JSON.parse(localStorage.getItem("profile"));

    const { id } = useParams();
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null)

    const initialState = {
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
        dispatch(createMessages(id, formData));
        setFormData(initialState);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(() => {
        scrollToBottom()
    }, [message]);

    useEffect(() => {
        const channel = pusher.subscribe("message");
        channel.bind("updated", ((data) => {
            if(message._id === data._id) {
                API.get(`/message/${id}`)
                    .then(res => (
                        setMessage(res.data)
                ));
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
                <ShowMsg
                    message={[message]}
                    roomName={roomName}
                />
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