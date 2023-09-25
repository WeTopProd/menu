import React, {useEffect, useState} from 'react';
import './Basket.scss'
import RegisterActive from "../../components/RegisterActive/RegisterActive";
import {useDispatch, useSelector} from "react-redux";
import {setComment, setNumPerson, setNumTable} from "../../redux/basket";
import {useNavigate} from "react-router-dom";
import {api} from "../../api";
import {getGoods} from "../../redux/basket/thunk";

const Basket = () => {
    const [appState, setAppState] = useState([]);
    const [order, setOrder] = useState(false)
    const {goods, num_table, num_person, comment} = useSelector((state) => state.basket)
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token]);

    const changeNumTable = (e) => {
        dispatch(setNumTable(e.target.value))
    }

    const changeNumPerson = (num) => {
        if (num_person !== 0 || num > 0) {
            dispatch(setNumPerson(num_person + num))
        }
    }
    const changeComment = (e) => {
        dispatch(setComment(e.target.value))
    }

    useEffect(() => {
        api.orderApi.getOrderHistory().then(res => {
            setAppState(res.data)
        })
    }, [])
    const orderNumber =  appState.length >= 0  ? appState.length : 1

    const createOrder = () => {
        if (num_table.length === 0) {
            alert("Введите номер стола")
            return
        }
        if (comment.length === 0) {
            alert("Введите комментарий")
            return
        }
        if (num_person === 0) {
            alert("Введите количество персон")
            return
        }
        api.orderApi.createOrder({
            num_order: orderNumber,
            num_table: num_table,
            num_person: num_person,
            comment: comment,
            tobacco_type: "123",
            additive_type: "123",
            total_price: goods.reduce((prev, next) => prev + next.goods.price, 0)
        }).then(res => {
            dispatch(getGoods())
            setOrder(true)
        })
    }

    return (
        <div className="basket">
            {
                order
                    ? <RegisterActive desc="Заказ создан"/>
                    : <div>
                        <h1 className="basket__title">Корзина</h1>
                        <div className="basket__desc">
                            <p className="basket__desc_order">Заказ № {orderNumber}</p>
                            <div className="basket__desc_list">
                                {
                                    goods.map((good, idx) => <p key={idx}>{good.goods.title} ({good.goods.weight}МЛ)
                                        - {good.goods.price}руб.</p>)
                                }
                            </div>
                            <p className="basket__desc_price">Сумма: {goods.reduce((prev, next) => prev + next.goods.price, 0)}руб.</p>
                            <div className="basket__desc_table">
                                <p>Номер стола:</p>
                                <input type="number" value={num_table} onChange={changeNumTable}/>
                            </div>
                            <div className="basket__desc_persons">
                                <p>Кол-Во персон:</p>
                                <div className="basket__desc_persons_count">
                                    <div className="basket__desc_persons_count_button"
                                         onClick={() => changeNumPerson(-1)}>-
                                    </div>
                                    <p>{num_person}</p>
                                    <div className="basket__desc_persons_count_button"
                                         onClick={() => changeNumPerson(1)}>+
                                    </div>
                                </div>
                            </div>
                            <textarea value={comment} onChange={changeComment} className="basket__desc_coment"
                                      placeholder="Коментарий к заказу"
                                      name="comment"></textarea>
                            <div className="basket__desc_button">
                                <button onClick={createOrder}>Заказать</button>
                            </div>
                        </div>
                    </div>

            }
        </div>
    );
};

export default Basket;
