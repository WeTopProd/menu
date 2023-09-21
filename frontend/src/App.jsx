import React, {useEffect, useState} from 'react';
import Router from "./router/router";
import Header from "./components/Layout/Header/Header";
import { useSelector, useDispatch } from 'react-redux'
import "./App.scss"
import {authGetMe} from "./redux/auth/thunk";

const App = () => {
    const [menu, setMenu] = useState(false)
    const [basket , setBasket] = useState(0)
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    const handleClick = () => {
        if (menu) {
            setMenu(false)
        }
    }

    useEffect(() => {
        if (token){
            dispatch(authGetMe())
        }
    }, [token]);

    return (
        <div onClick={handleClick} className="app">
            <Header basket={basket} menu={menu} setMenu={setMenu}/>
            <div className="container">
                <Router setBasket={setBasket} basket={basket}/>
            </div>
        </div>
    );
};

export default App;
