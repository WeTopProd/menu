import React, {useEffect, useState} from 'react';
import "./Main.scss"
import {Link} from "react-router-dom";
import {api} from "../../api";
import {getImage, getImageWithUrl} from "../../helpers/image";

const Main = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        api.goodsApi.getGoodsSubTypes({type:"Основное меню"}).then(resp => {
            setTypes(resp.data)
        })
    }, []);

    return (
        <div className="main">
            <div className="main__container">
                {types.map((elem, i) => {
                    return (
                        <Link key={i} to={elem.name}>
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
