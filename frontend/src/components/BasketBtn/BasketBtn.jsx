import React, {useEffect} from 'react';
import "./BasketBtn.scss"
import BasketIcon from "../../assets/images/basket/BasketIcon.png"
import {api} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getGoods} from "../../redux/basket/thunk";

const BasketBtn = ({id, type, data}) => {
    const {isAuth} = useSelector((state) => state.auth)
    const {goods} = useSelector((state) => state.basket)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const checkAuth = () => {
        if (isAuth) {
            return true
        }

        navigate("/login")
        return false
    }

    const count = () => {
        return goods.find(good => good.goods.id === id)?.count || 0
    }

    const goodsCount = () => {
        return goods.find(good => good.goods.id === id)?.goods?.count || 0
    }

    const addToBasket = () => {
        if (checkAuth()) {
            api.shoppingApi.addToBasket(id, {...data, count: 1}).then(res => {
                dispatch(getGoods())
            })
        }
    }

    const updateBasket = (count) =>{
        if (checkAuth()) {
            api.shoppingApi.updateBasket(id, {...data, count: count}).then(res => {
                dispatch(getGoods())
            })
        }
    }

    const countPlus = () => {
        if (goodsCount() > count()){
            updateBasket(count() + 1)
        }
    }

    const countMinus = () => {
        if (count() === 1) {
            api.shoppingApi.deleteBasket(id, {}).then(res => {
                dispatch(getGoods())
            })
        }else{
            updateBasket(count() - 1)
        }
    }

    const button = () => {
        switch (type) {
            case "icon":
                return <div onClick={addToBasket} className="basketButton__basket basketButton__basket-icon">
                    <button>
                        <img src={BasketIcon} alt=""/>
                    </button>
                </div>

            case "text":
                return <div onClick={addToBasket} className="basketButton__basket basketButton__basket-text">
                    <button>
                        Добавить в корзину
                    </button>
                </div>

            case "colored-icon":
                return <div onClick={addToBasket}
                            className="basketButton__basket basketButton__basket-icon basketButton__basket-colored-icon">
                    <button>
                        <img src={BasketIcon} alt=""/>
                    </button>
                </div>

            default:
                return <div onClick={addToBasket} className="basketButton__basket basketButton__basket-icon">
                    <button>
                        <img src={BasketIcon} alt=""/>
                    </button>
                </div>
        }
    }


    return (
        <div className="basketButton">
            {
                count() > 0 ? <div>
                    <div className="basketButton__counter">
                        <div className="basketButton__counter_count">
                            <div className="basketButton__counter_count_button"
                                 onClick={countMinus}>-
                            </div>
                            <p>{count()}</p>
                            <div className="basketButton__counter_count_button"
                                 onClick={countPlus}>+
                            </div>
                        </div>
                    </div>
                </div> : button()
            }
        </div>

    );
};

export default BasketBtn;
