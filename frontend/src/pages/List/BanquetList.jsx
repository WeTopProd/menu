import React from 'react';
import {useParams} from "react-router-dom";
import Card from "../../components/Card/Card";
import "./BanquetList.scss"
import BanquetListData from "./MainListData";

const BanquetList = () => {
    let {name} = useParams();

    return (
        <div className="banquetList">
            <div className="banquetList__title">
                <p>{name}</p>
            </div>
            <div className="banquetList__animation">
                <BanquetListData subtype={name}/>
            </div>
            <Card data={{type: "Банкетное меню", subtype: name}}/>
        </div>
    );
};

export default BanquetList;
