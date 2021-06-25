import React from "react";
import "../Chat.css";

const ShowMsg = (props) => {

    const user = JSON.parse(localStorage.getItem("profile"));

    const msgs = props.message[0].messages;

    return (<>
    
        {msgs && msgs.map(msg => (<>

            <div className="chats_date" key={msg._id}>
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
                        <h4> {props.roomName} </h4> 
                        <p> {msg.msg} <span> {msg.time} </span></p>
                    </div>
                </div>
            )} 

        </>))}

    </>);
};

export default ShowMsg;