import React from "react";
import "./Empty.css";

import { empty } from "../Images/Images";
import LanguageIcon from '@material-ui/icons/Language';

const Empty = () => {

    return (
        <div className="empty">
            <img src={empty} alt=""/>
            <p> Keep your phone connected </p>
            <p1> This is a WhatsApp Clone made by Ayush Bhatt using MERN Stack </p1>
            <p2> <LanguageIcon/> To view my portfolio website 
                <span>
                    <a href="https://ayushbhatt.herokuapp.com/" target="_blank" rel="noreferrer">
                        Click Here
                    </a>
                </span>
            </p2>
        </div>
    );  
};

export default Empty;