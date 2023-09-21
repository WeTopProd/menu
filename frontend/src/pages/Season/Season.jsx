import React, {useEffect, useState} from 'react';
import "./Season.scss"
import {api} from "../../api";
import {getImage} from "../../helpers/image";
import Card from "../../components/Card/Card";

const Season = () => {

    return (
        <div className="season">
            <div className="season__container">
                <h3 className="season__container_title">Сезонные блюда</h3>
                <Card data={{type: "Сезонные блюда"}}/>
            </div>
        </div>
    );
};

export default Season;
