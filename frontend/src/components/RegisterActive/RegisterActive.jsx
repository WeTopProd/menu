import React from 'react';
import './RegisterActive.scss'
import Vector from '../../assets/images/Login/Vector.png'
import {Link} from "react-router-dom";
const RegisterActive = ({desc}) => {
    return (
        <Link className="loginActive" to={"/"}>
            <img src={Vector} alt="icon"/>
            <p>{desc}</p>
        </Link>
    );
};

export default RegisterActive;
