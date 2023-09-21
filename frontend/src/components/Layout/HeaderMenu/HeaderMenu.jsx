import React from 'react';
import './HeaderMenu.scss'
import IconMenu from '../../../assets/images/menu/iconMenu.png'
import {Link} from "react-router-dom";

const HeaderMenu = ({menu, setMenu}) => {
    const closeModal = () => {
        setMenu(false)
    }

    return (
        <div className="menu">
            <img
                onClick={() => setMenu(true)}
                src={IconMenu}
                alt="iconMenu"
            />
            <div onClick={closeModal} className={"menu__container" + (!menu ? " menu__container-hidden" : "")}>
                <div className={"menu__items"}
                     onClick={e => e.stopPropagation()}>
                    <Link to={"/stock"}>
                        <p>Акции</p>
                    </Link>
                    <Link to={"https://tyteda.ru/"}>
                        <p>Доставка</p>
                    </Link>
                    <Link to={"/preorder"}>
                        <p>Предзаказ</p>
                    </Link>
                    <Link to={"https://frantsuz-club.ru/booking-new/"}>
                        <p>Бронирование</p>
                    </Link>
                    <Link to={"/"}>
                        <p>Такси до дома</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeaderMenu;
