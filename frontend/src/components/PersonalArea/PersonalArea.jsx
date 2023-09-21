import React, {useReducer} from 'react';
import './PersonalArea.scss'
import Vector1 from '../../assets/images/PersonalArea/Vector1.png'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const PersonalArea = ({setModal}) => {
    const {me} = useSelector((state) => state.auth)

    return (
        <div className="personalArea">
            <div className="personalArea__edit">
                <p className="personalArea__edit_name">Имя: {me.first_name}</p>
                <img onClick={()=>setModal("PersonalAreaEdit")} src={Vector1} alt="Vector1"/>
            </div>
            <p  className="personalArea__lastname">Фамилия: {me.last_name}</p>
            <p  className="personalArea__phone">Телефон: {me.phone}</p>
            <p  className="personalArea__gmail">Почта: {me.email}</p>
        </div>
    );
};

export default PersonalArea;
