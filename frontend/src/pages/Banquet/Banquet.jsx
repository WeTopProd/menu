import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./Banquet.scss"
import {api} from "../../api";

const Banquet = () => {
    const [types, setTypes] = useState([]);
    const pageName = "Банкетное меню"

    useEffect(() => {
        api.goodsApi.getGoodsSubTypes({type: pageName}).then(resp => {
            setTypes(resp.data)
        })
    }, []);

    const listUrl = (name) => `/list/${pageName}/${name}`
    return (
        <div className="banquet">
            <div className="banquet__container">
                {types.map((elem, i) => {
                    return (
                        <Link key={i} to={listUrl(elem.name)}>
                            <div className="banquet__container_item">
                                <p className="banquet__container_item_desc">{elem.name}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default Banquet;
