import React from 'react';
import './PersonalAreaData.scss'
import {useDispatch} from "react-redux";
import {authLogout, setToken} from "../../redux/auth/thunk";
import {useNavigate} from "react-router-dom";

const PersonalAreaData = ({setModal}) => {
    const dispatchStore = useDispatch()
    const navigate = useNavigate();
    const logout = () => {
        dispatchStore(authLogout()).then(() => navigate("/login"))
    }
    return (
        <div className="personalAreaData">
            <p onClick={() => setModal("HistoryOfOrders")}>История заказов</p>
            <p onClick={() => setModal("PersonalArea")}>Личные данные</p>
            <p onClick={logout}>Выход</p>
        </div>
    );
};

export default PersonalAreaData;
