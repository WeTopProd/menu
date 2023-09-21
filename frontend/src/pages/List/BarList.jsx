import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Card from "../../components/Card/Card";
import "./BarList.scss"
import {api} from "../../api";
import {getImageWithUrl} from "../../helpers/image";

const BarList = () => {
    let {name} = useParams();
    const [animation, setAnimation] = useState([])

    useEffect(() => {
        api.goodsApi.getGoodsSubTypes({type:"Барная карта", subtype: name, name: name}).then(resp => {
            setAnimation(resp.data)
        })
    }, []);

    return (
        <div className="barList">
            <div className="barList__title">
                <p>{name}</p>
            </div>
            <div className="barList__animation">
                {animation.map((elem, idx) => {
                    return <img key={idx} src={getImageWithUrl(elem.gif)} alt="gif"/>
                })}
            </div>
            <Card data={{type: "Барная карта", subtype: name}}/>
        </div>
    );
};

export default BarList;
