import React from "react";
import "./Empty.css";
import imgs from "../#Images/empty.png";
import LanguageIcon from '@material-ui/icons/Language';


const Empty = () => {
    return (
        <div className="empty">
            <img src={imgs}/>
            <p> Keep your phone connected </p>
            <p1> This is a WhatsApp Clone made by Ayush Bhatt using MERN Stack </p1>
            <p2> <LanguageIcon/> To view my portfolio website <span> Click here </span> </p2>
        </div>
    );  
};

export default Empty;