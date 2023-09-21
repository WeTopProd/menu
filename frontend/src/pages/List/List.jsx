import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Card from "../../components/Card/Card";
import "./List.scss"
import {api} from "../../api";
import {getImageWithUrl} from "../../helpers/image";

const List = () => {
    let {type, subtype} = useParams();
    const [animation, setAnimation] = useState([])

    useEffect(() => {
        api.goodsApi.getGoodsSubTypes({type: type, subtype: subtype, name: subtype}).then(resp => {
            setAnimation(resp.data)
        })
    }, []);

    return (
        <div className="list">
            <div className="list__title">
                <p>{subtype}</p>
            </div>
            {
                animation.length > 0 && animation[0].gif != null ?
                    <div className="list__animation">
                        <img src={getImageWithUrl(animation[0].gif)} alt="gif"/>
                    </div>
                    : ''
            }

            <Card data={{type: type, subtype: subtype}}/>
        </div>
    );
};

export default List;
