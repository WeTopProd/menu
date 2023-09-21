import React, {useEffect, useState} from 'react';
import './Hookah.scss'
import HookahElement from "../../components/HookahElement/HookahElement";
import {api} from "../../api";

const Hookah = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
       /* api.goodsApi.getGoodsSubTypes({type: "Кальянная карта", subtype: "Кальян"}).then(resp => {
            setTypes(resp.data)
        })*/
        setTypes([
            {type: "Классика"},
            {type: "Вая"},
        ])
    }, []);

    return (
        <div className="hookah">
            <div className="hookah__container">
                <p className="hookah__container_title">Кальянная карта</p>
                {types.map((type, idx) =>
                    <HookahElement key={idx} type={type.type}/>
                )}
            </div>
        </div>
    );
};

export default Hookah;
