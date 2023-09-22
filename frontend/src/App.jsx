import React, {useEffect, useState} from 'react';
import Router from "./router/router";
import Header from "./components/Layout/Header/Header";
import { useSelector, useDispatch } from 'react-redux'
import "./App.scss"
import {authGetMe} from "./redux/auth/thunk";
import {getGoods} from "./redux/basket/thunk";
import {reset} from "./redux/basket";

const App = () => {
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token){
            dispatch(authGetMe())
        }
    }, [token]);

    useEffect(() => {
        if (token){
            dispatch(getGoods())
        }else{
            dispatch(reset())
        }
    }, [token]);

    return (
        <div className="app">
            <Header />
            <div className="container">
                <Router/>
            </div>
        </div>
    );
};

export default App;
