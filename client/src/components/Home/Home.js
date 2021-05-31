import React, { useEffect, useState } from 'react';
import "./Home.css";
import SidebarInfo from "../Sidebar_Info/SidebarInfo";
import Empty from "../Empty_Page/Empty";
import Chat from "../Chat/Chat";
import Auth from "../Auth/Auth";

import { logouts } from './../#Redux/Actions/Auth_Action';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decode from 'jwt-decode';

const Home = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const Switch = useSelector(state => state.SwitchReducer);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect (()=> {
        const token = user?.token;
        if(token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch(logouts(user?.result._id, history));
            }
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    if (!user) {
        return (
           <Auth/>
        );
    };

    return (
        <div className="home">
            <div className="sidebar_div">
                <SidebarInfo/>
            </div>
            <div className="chat_div">
                {Switch ? <Chat/> : <Empty/>}
            </div>
        </div>
    );
};

export default Home;