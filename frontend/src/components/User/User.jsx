import React, {useEffect, useState} from 'react';
import Icon from '../../assets/images/header/icon.png'
import "./User.scss"
import PersonalAreaModal from "../PersonalAreaModal/PersonalAreaModal";
import {store} from "../../redux";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

const User = () => {
    const [isShowModal, setIsShowModal] = useState(false)
    const {isAuth} = useSelector((state) => state.auth)
    const navigate = useNavigate();

    const onClick = () =>{
        if (isAuth){
            setIsShowModal(true)
        }else{
            navigate("/login")
        }
    }

    useEffect(()=>{
        setIsShowModal(false)
    }, [isAuth])

    return (
        <div className="user">
            <img onClick={onClick} className="user__container_icon" src={Icon} alt="Icon"/>
            {
                isShowModal && <PersonalAreaModal setIsShow={setIsShowModal} isShow={isShowModal}/>
            }

        </div>
    );
};

export default User;
