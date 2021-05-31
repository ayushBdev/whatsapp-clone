import React, { useEffect, useState } from 'react';
import "./Drawer.css";
import img2 from "../#Images/img2.png";
import { Avatar, Drawer } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import MessageIcon from '@material-ui/icons/Message';
import RefreshIcon from '@material-ui/icons/Refresh';

import { usersData } from "../#Redux/Actions/Auth_Action";
import { createRooms } from "../#Redux/Actions/Room_Action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; 

const Drawers = () => {

    const [state, setState] = useState(false);
    const [input, setInput] = useState("");
    const [filteredUser, setFilteredUser] = useState([]);

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("profile"));
    const USER = useSelector(state => state.UserReducer);

    const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open });
    };

    const handelClick = (userId1, userId2, userName1, userName2) => {
        dispatch(createRooms({userId1:userId1, userId2:userId2, userName1:userName1, userName2:userName2}));
        setState({ ...state, ["left"]: false });
    };

    const handelRefresh = () => {
        dispatch(usersData());  //Check working
    };

    useEffect(() => {
        setFilteredUser(USER.filter((arr) => arr.name.toLowerCase().includes(input.toLowerCase())));
    }, [input, USER]);
    
    useEffect(() => {
        dispatch(usersData());
    }, []);

    return (
    <div>
        <MessageIcon onClick={toggleDrawer("left", true)}/>
        
        <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
        
        <div className="drawer">
            <div className="drawer_header"> 
                <div>
                    <ArrowBackIcon onClick={toggleDrawer("left", false)}/>
                    <p> New Chat </p>
                </div>
                <RefreshIcon onClick={handelRefresh}/>
            </div>
            <div className="drawer_search"> 
                <div className="searchs"> 
                    <SearchIcon/>
                    <input
                        type="text"
                        placeholder="Search users"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
            </div>
            <div className="drawer_menu">
                {filteredUser && filteredUser.filter(arr => arr.phoneNumber !== user?.result.phoneNumber).map((val) => (
                    <Link className="container" key={val._id}  onClick={(() => handelClick(user?.result._id, val._id, user?.result.name, val.name))}>
                        <div className="user_info">
                            <Avatar src={img2}/>
                            <div>
                                <h4> {val.name} </h4>
                            </div>
                        </div>
                        <div className="date">
                            <p> {val.createdAt} </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        </Drawer>
    </div>
  );
};

export default Drawers;