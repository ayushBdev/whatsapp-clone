import React from "react";
import "./Chat.css";

const ShowMsg = ({msg, roomName}) => {

    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <>
            
            <div className="chats_date">
                <p> {msg.date} </p>
            </div>

            {msg.from === user?.result._id ? (
                <div className="chats_sender">
                    <div>
                        <h4> {user?.result.name} </h4> 
                        <p> {msg.msg} <span> {msg.time} </span></p>
                    </div>
                </div>
            ) : (
                <div className="chats_receiver">
                    <div>
                        <h4> {roomName} </h4> 
                        <p> {msg.msg} <span> {msg.time} </span></p>
                    </div>
                </div>
            )}
            
        </> 
    );
};

export default ShowMsg;