import React, {useEffect, useState} from 'react';
import './HookahElements.scss'
import {api} from "../../api";
import HookahElement from "./HookahElement";

const HookahElements = ({type}) => {
    const [goods, setGoods] = useState([])

    useEffect(() => {
        api.goodsApi.getList({type: "Кальянная карта", subtype: "Кальян", hookah_type: type}).then(res => {
            setGoods(res.data.results)
        })
    }, [])

    return (
        <div className="hookahElements">
            <div className="hookahElements__subtitle">
                <p>{type}</p>
            </div>
            {goods.map((good, idx) => <HookahElement key={idx} type={type} good={good}/>)}
        </div>
    );
};

export default HookahElements;
