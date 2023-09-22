import React, {useEffect, useState} from 'react';
import "./Main.scss"
import {Link} from "react-router-dom";
import {api} from "../../api";
import {getImageWithUrl} from "../../helpers/image";

const Main = () => {
    const [types, setTypes] = useState([]);
    const pageName = "Основное меню"

    useEffect(() => {
        api.goodsApi.getGoodsSubTypes({type:pageName}).then(resp => {
            setTypes(resp.data)
        })
    }, []);

    const listUrl = (name) => `/list/${pageName}/${name}`
    return (
        <div className="main">
            <div className="main__container">
                {types.map((elem, i) => {
                    return (
                        <Link key={i} to={listUrl(elem.name)}>
                            <div className='main__container_item'>
                                <img src={getImageWithUrl(elem.icon)} alt="icon"/>
                                <p>{elem.name}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default Main;
