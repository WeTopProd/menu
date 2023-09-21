import React from 'react';
import './HistoryOfOrders.scss'
import {historyData} from "./data";

const HistoryOfOrders = () => {
    return (
        <div className="historyOfOrders">
            <p className="historyOfOrders__title">История заказов:</p>
            <div className="historyOfOrders__list">
                {
                    historyData.map(elem => {
                        return(
                            <div className="historyOfOrders__desc">
                                <p className="historyOfOrders__desc_num">Заказ №{elem.orderNumber}</p>
                                <div className="historyOfOrders__desc_dishPrice">
                                    <p className="historyOfOrders__desc_dishPrice_dish">{elem.dish}</p>
                                    <p className="historyOfOrders__desc_dishPrice_price">{elem.price}</p>
                                </div>
                                <div className="historyOfOrders__desc_dishPrice">
                                    <p className="historyOfOrders__desc_dishPrice_dish">{elem.dish}</p>
                                    <p className="historyOfOrders__desc_dishPrice_price">{elem.price}</p>
                                </div>
                                <span className="historyOfOrders__desc_line"></span>
                                <p className="historyOfOrders__desc_check">Сумма: {elem.check}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default HistoryOfOrders;
