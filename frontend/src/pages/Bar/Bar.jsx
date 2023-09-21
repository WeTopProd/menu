import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import BarLogo from './img/barLogo.png'
import './Bar.scss'
import {api} from "../../api";

const Bar = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        api.goodsApi.getGoodsSubTypes({type: "Основное меню"}).then(resp => {
            setTypes(resp.data)
        })
    }, []);
    return (
        <div className="bar">
            <div className="bar__container">
                <div className="bar__container_items">
                    {types.map((elem, i) => {
                        return (
                            <Link key={i} to={elem.name}>
                                <div className="bar__container_item">
                                    <p className="bar__container_item_desc">{elem.name}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <img src={BarLogo} alt=""/>
            </div>
        </div>
    );
};

export default Bar;
