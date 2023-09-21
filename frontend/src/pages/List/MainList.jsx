import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Card from "../../components/Card/Card";
import "./MainList.scss"
import {api} from "../../api";
import {getImageWithUrl} from "../../helpers/image";

const MainList = () => {
    let {name} = useParams();
    const [animation, setAnimation] = useState([])

    useEffect(() => {
        api.goodsApi.getGoodsSubTypes({type:"Основное меню", subtype: name, name: name}).then(resp => {
            setAnimation(resp.data)
        })
    }, []);

    return (
        <div className="mainList">
            <div className="mainList__title">
                <p>{name}</p>
            </div>
            <div className="mainList__animation">
                {animation.map((elem, idx) => {
                    return <img key={idx} src={getImageWithUrl(elem.gif)} alt="gif"/>
                })}
            </div>
            <Card data={{type: "Основное меню", subtype: name}}/>
        </div>
    );
};

export default MainList;
