import React, {useEffect, useState} from 'react';
import './HookahElement.scss'
import Line from '../../assets/images/hookah/Line42.png'
import {getImage} from "../../helpers/image";
import BasketBtn from "../BasketBtn/BasketBtn";
import HookahModal from "../HookahModal/HookahModal";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../api";
import {getGoods} from "../../redux/basket/thunk";

const HookahElement = ({good, type}) => {
    const [tobacco, setTobacco] = useState({tobacco_type: "", additive_type: "", additive_price: ''})
    const [isShow, setIsShow] = useState(false)
    const [additivePrice, setAdditivePrice] = useState(0)
    const {goods} = useSelector((state) => state.basket)
    const dispatch = useDispatch()

    const setAdditiveType = (type) => {
        setAdditivePrice(+good.additive_type[type])
        setTobacco({
            ...tobacco,
            additive_type: type,
            additive_price: additivePrice,
        })
    }

    const getGood = () => {
        return goods.find(g => g.goods.id === good.id)
    }

    useEffect(()=>{
        if (getGood()?.count > 0) {
            api.shoppingApi.updateBasket(good.id, {...tobacco, count: getGood()?.count}).then(res => {
                dispatch(getGoods())
            })
        }
    }, [tobacco])

    const setTobaccoType = (type) => {
        if (tobacco.tobacco_type === type) {
            setTobacco({
                ...tobacco,
                tobacco_type: "",
            })
        } else {
            setTobacco({
                ...tobacco,
                tobacco_type: type,
            })
        }
    }

    return (
        <div className="classic hookahElement">
            <div className="hookahElement_desc">
                <p className="hookahElement_desc_subtitle">Выбрать табак</p>
                {
                    good.tobacco_type.map((tobacco_type, idc) =>
                        <div key={idc}
                             onClick={() => setTobaccoType(tobacco_type)}
                             className={"hookahElement_desc_item" + ((getGood()?.tobacco_type ? getGood()?.tobacco_type === tobacco_type : tobacco.tobacco_type === tobacco_type) ? " hookahElement_desc_item-active" : '')}
                        >
                            <img src={Line} alt="icon"/>
                            <p>{tobacco_type}</p>
                        </div>)
                }

                <p className="hookahElement_desc_linck" onClick={() => setIsShow(true)}>Выбрать
                    добавки</p>
            </div>
            {
                good.images.length > 0 && good.images[0].images != null ?
                    <img className="hookahElement_image" src={getImage(good.images)} alt="icon"/>
                    : ''
            }
            <div className="hookahElement_price">
                <p>{good.price} руб.</p>
                <BasketBtn type="colored-icon" id={good.id} data={tobacco} additivePrice={additivePrice}/>
            </div>

            {
                isShow ? <HookahModal
                    selected={getGood()?.additive_type ? getGood()?.additive_type : tobacco.additive_type}
                    selectedPrice={getGood()?.additive_price ? getGood()?.additive_price : tobacco.additive_price}
                    additive_types={good.additive_type}
                    setAdditiveType={setAdditiveType}
                    setIsShow={setIsShow}
                /> : ''
            }

        </div>
    );
};

export default HookahElement;
