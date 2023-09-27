import React, {useEffect, useState} from 'react';
import './HistoryOfOrders.scss'
import {api} from "../../api";

const HistoryOfOrders = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        api.orderApi.getOrderHistory().then(res => {
            setHistory(res.data)
        })
    }, [])

    return (
        <div className="historyOfOrders">
            <p className="historyOfOrders__title">История заказов:</p>
            <div className="historyOfOrders__list">
                {
                    history.map((elem, idx) => {
                        return (
                            <div key={idx} className="historyOfOrders__desc">
                                <p className="historyOfOrders__desc_num">Заказ №{idx + 1}</p>
                                {
                                    elem.items.map((item, idx) => <div key={idx} className="historyOfOrders__desc_dishPrice">
                                        <p className="historyOfOrders__desc_dishPrice_dish">{item.count}<span> x </span>{item.goods.title} {item.goods.weight}МЛ)</p>
                                        <p className="historyOfOrders__desc_dishPrice_price">{item.price}руб.</p>
                                    </div>)
                                }
                                <span className="historyOfOrders__desc_line"></span>
                                <p className="historyOfOrders__desc_check">Сумма: {elem.total_price}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default HistoryOfOrders;
