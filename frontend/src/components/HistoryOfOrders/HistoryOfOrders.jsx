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
                                    elem.items.map((item, idx) =>
                                        <div key={idx} className="historyHookah">
                                            <div className="historyOfOrders__desc_dishPrice">
                                                <p className="historyOfOrders__desc_dishPrice_dish">{item.count}<span> x </span>{item.goods.title} {item.goods.weight}МЛ)</p>
                                                <p className="historyOfOrders__desc_dishPrice_price">{item.price}руб.</p>
                                            </div>
                                            <div className="historyOfOrdersHookah">
                                                {
                                                    item.additive_price > 0 ?
                                                        <div className="historyOfOrdersHookah__desc">
                                                            <p className="historyOfOrdersHookah__desc_elem">{item.count} <span>x</span> Добавки: {item.additive_type}</p>
                                                            <p>{item.count * item.additive_price}руб</p>
                                                        </div>
                                                        : ''
                                                }
                                                {
                                                    item.tobacco_type ?
                                                        <>
                                                            <p className='historyOfOrdersHookah__tobacco'>Табак для кальяна: {item.tobacco_type}</p>
                                                        </>
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                        )
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
