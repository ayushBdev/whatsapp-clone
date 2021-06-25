import React from "react";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { Switch, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (<>
            
        <ToastContainer />

        <Switch>

            <Route path="/" component={Home} exact/>
            <Route path="/auth" component={Auth} exact/>
            <Route path="/:id" component={Home} exact/>
            <Route component={Error} exact/>

        </Switch>
    </>);
};

export default App;