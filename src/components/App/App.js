import { Route, Switch } from 'react-router-dom';
import { Login, Signup, Chat } from 'components';
import { AuthProvider } from 'context/AuthContext.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { fb } from "service";

export const App = () => {

    const [mainComponent, setMainComponent] = useState("login")

    useEffect(() => {
    // This hook needs to be here because  GH Pages doesn't allow subdirectories by default,
    // making app unable to refresh on subdomain. So normally there is no need for conditional routes rendering
        fb.auth.onAuthStateChanged((user) => {
            if (user && user.displayName == null) {
                setMainComponent("chat")
            } else if (user && user.displayName !== null) {
                setMainComponent("chat")
            } else {
                setMainComponent("login")
            }
        });
    }, []);

    return (
        <div className="app">
            <HashRouter>
                <AuthProvider>
                    <Switch>
                        {(mainComponent === "login") ?
                            <Route path="/whatsup/" component={Login} /> :
                            <Route exact path="/whatsup/" component={Chat} />}

                        <Route path="/signup" component={Signup} />
                    </Switch>
                </AuthProvider>
            </HashRouter>
        </div>
    )
}