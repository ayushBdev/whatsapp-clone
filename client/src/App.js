import React from "react";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { Switch, Route } from "react-router-dom";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const App = () => {
    return (<>
            
        <ReactNotification />

        <Switch>

            <Route path="/" component={Home} exact/>
            <Route path="/auth" component={Auth} exact/>
            <Route path="/:id" component={Home} exact/>

        </Switch>
    </>);
};

export default App;