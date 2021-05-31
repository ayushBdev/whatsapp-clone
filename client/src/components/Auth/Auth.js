import React, { useState } from "react";
import "./Auth.css";
import logo from "../#Images/logo.png";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { dates } from "../TimeStamp/TimeStamp";
import { signin, signup } from './../#Redux/Actions/Auth_Action';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { wrongPassword } from "../Notifications";

const Auth = () => {

    const initialState = {
        name: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        createdAt: dates,
    };

    const dispatch = useDispatch();
    const history = useHistory();

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setshowPassword] = useState(false);


    const handelSubmit = (event) => {
        event.preventDefault();
        if(isSignup) {
            if(form.password === form.confirmPassword) {
                dispatch(signup(form,history));
            } else {
                wrongPassword();
            }
        } else {
            dispatch(signin(form,history));
        }
    };

    const handelShowPassword = () => {
        setshowPassword(preValue => !preValue);
    };

    const switchMode = () => {
        setIsSignup(preValue => !preValue);
        setshowPassword(false);
    };

    const handelChange = (event) => {
        return setForm({...form, [event.target.name]: event.target.value});
    };

    return (
        <div className="auth">
            <div className="logo">
                <img src={logo}/>
            </div>
            <div className="text">
                <p> Whatts App Clone By AYUSH BHATT</p>
            </div>
            <form className="auth_form" onSubmit={handelSubmit}>
                {isSignup ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={form.name}
                            name="name"
                            onChange={handelChange}
                            autocomplete="off"
                        />
                    </div>
                ) : null}
                <div>
                    <input
                        type="text"
                        placeholder="Enter Phone Number"
                        value={form.phoneNumber}
                        name="phoneNumber"
                        onChange={handelChange}
                        autocomplete="off"
                    />
                </div>
                <div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        value={form.password}
                        name="password"
                        onChange={handelChange}
                        autocomplete="off"
                    />
                    {showPassword ? <VisibilityIcon onClick={handelShowPassword}/> : <VisibilityOffIcon onClick={handelShowPassword}/>}
                </div>
                {isSignup ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            name="confirmPassword"
                            onChange={handelChange}
                            autocomplete="off"
                        />
                    </div>
                ) : null}
                <button className="auth_btn" type="submit">
                    {isSignup ? "Sign Up" : "Log In"}
                </button>
            </form>
            <div className="switch_btn" onClick={switchMode}>
                {isSignup ? "Already have a account? Log In" : "Don't have a account. Sign Up"}
            </div>
        </div>
    );
};


export default Auth;