import React, {useEffect, useState} from 'react';
import './Hookah.scss'
import HookahElements from "../../components/HookahElement/HookahElements";
import {api} from "../../api";

const Hookah = ({setPriceTobacco}) => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        api.goodsApi.getList({type: "Кальянная карта", subtype: "Кальян"}).then(res => {
            const data = res.data.results.reduce((prev, next)=>{
                return {
                    ...prev,
                    [next.hookah_type]: ''
                }
            }, {})
            setTypes(Object.keys(data))
        })
    }, []);

    return (
        <div className="hookah">
            <div className="hookah__container">
                <p className="hookah__container_title">Кальянная карта</p>
                {types.map((type, idx) =>
                    <HookahElements key={idx} type={type}/>
                )}
            </div>
        </div>
    );
};

export default Hookah;
