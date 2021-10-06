import React from "react";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "../pages/HomePage";


export const Routes = () => {

    return <>
        <Switch>
            <Route path={"/"}>
                <HomePage/>
            </Route>
        </Switch>
    </>

}