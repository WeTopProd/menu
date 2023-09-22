import React from 'react';
import "./BasketIcon.scss"
import BasketIc from "../../assets/images/basket/BasketIcon.png"
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const BasketIcon = () => {
    const {isAuth} = useSelector((state) => state.auth)
    const {goods} = useSelector((state) => state.basket)
    const navigate = useNavigate()

    return (
        <>
            {
                goods.length > 0 && isAuth ? <div onClick={()=>navigate("/basket")} className="basketIcon">
                    <img src={BasketIc} alt="icon"/>
                    {
                        goods.length > 0 && <div className="basketIcon_num">{goods.length}</div>
                    }
                </div> : ''
            }
        </>
    );
};

export default BasketIcon;
