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
    const {goods, num_table, num_person, comment, additive_price} = useSelector((state) => state.basket)
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

    const createOrder = () => {
        if (num_table.length === 0) {
            alert("Введите номер стола")
            return
        }
        if (num_person === 0) {
            alert("Введите количество персон")
            return
        }
        api.orderApi.createOrder({
            num_table: num_table,
            num_person: num_person,
            comment: comment,
            total_price: goods.reduce((prev, next) => prev + next.price,0) + goods.reduce((prev, next) => prev + next.additive_price * next.count,0)
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
                            <p className="basket__desc_order">Заказ № {appState.length + 1}</p>
                            <div className="basket__desc_list">
                                {
                                    goods.map((good, idx) =>
                                        <div key={idx} className="basketList">
                                            <div className="basketList__elem">
                                                <p  className="basketList__elem_count">{good.count}</p>
                                                <p className="basketList__elem_x">x</p>
                                                <p>{good.goods.title}({good.goods.weight}МЛ) - {good.price}руб.</p>
                                            </div>
                                            {
                                                good.additive_price > 0 ?
                                                    <div className="basketList__elem">
                                                        <p  className="basketList__elem_count">{good.count}</p>
                                                        <p className="basketList__elem_x">x</p>
                                                        <p>Добавки к кальяну: {good.additive_type} - {good.count * good.additive_price}руб</p>
                                                    </div> : ''
                                            }
                                            {
                                                good.tobacco_type ?
                                                    <div className="basketList__elem">
                                                        <p className='basketList__elem_desc'>Табак для кальяна: {good.tobacco_type}</p>
                                                    </div> : ''
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <p className="basket__desc_price">Сумма: {goods.reduce((prev, next) => prev + next.price,0) + goods.reduce((prev, next) => prev + next.additive_price * next.count,0)} руб.</p>
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
