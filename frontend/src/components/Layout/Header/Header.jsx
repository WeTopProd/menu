import React, {useState} from 'react';
import User from '../../User/User'
import LogoIcon from '../../../assets/images/header/logo.png'
import Basket from '../../../assets/images/basket/BasketIcon.png'
import {Link} from "react-router-dom";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import "./Header.scss"
import PersonalAreaModal from "../../PersonalAreaModal/PersonalAreaModal";

const Header = ({basket, menu, setMenu}) => {

    return (
        <header className="header">
            <div className="header__container">
                <HeaderMenu menu={menu} setMenu={setMenu}/>
                <Link className={basket ? "header__container_link header__container_linkModal" : "header__container_link"} to="/">
                    <img className="header__container_link_logo" src={LogoIcon} alt="logo"/>
                </Link>
                <div className="header__container_icons">
                    {
                        basket > 0
                            ?  <div className="header__container_icons_basket">
                                    <Link className="header__container_icons_basket_linkBasket" to="/basket">
                                        <img src={Basket} alt="icon"/>
                                        <div className="header__container_icons_basket_desc">{basket}</div>
                                    </Link>
                                </div>
                                : ""
                    }

                    {/*<Link className="header__container_icons_linkReg" to="/login">
                        <User setPersonal={setPersonal}/>
                    </Link>*/}
                    <User/>
                </div>

            </div>
        </header>
    );
};

export default Header;
