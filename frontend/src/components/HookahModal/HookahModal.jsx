import React, {useState} from 'react';
import './HookahModal.scss'
import Line from '../../assets/images/hookah/Line42.png'
import {api} from "../../api";
import {getGoods} from "../../redux/basket/thunk";
import {useDispatch} from "react-redux";

const HookahModal = ({setTobaccoPrice, setIsShow, additive_types, selected, setAdditiveType}) => {
    const [selectedType, setSelectedType] = useState(selected)

    const closeModal = (e) => {
        setIsShow(false)
    }
    const add = () => {
        setAdditiveType(selectedType)
        setIsShow(false)
    }

    const selectType = (type, setTobaccoPrice) => {
        if (selectedType === type) {
            setSelectedType("")
        } else {
            setSelectedType(type)
        }
        selectedType === type ? setTobaccoPrice(0) : setTobaccoPrice(additive_types[type])
    }

    return (
        <div className="hookahModal">
            <div className="hookahModal__desc">
                <p className="hookahModal__desc__title">Добавки в колбу</p>
                {
                    Object.keys(additive_types).map((type, idx) =>
                        <div
                            onClick={() => selectType(type, setTobaccoPrice)}
                            key={idx}
                            className={"hookahModal__desc__item" + (selectedType === type ? " hookahModal__desc__item-active" : '')}
                        >
                            <img src={Line} alt="icon"/>
                            <p><span>{type}</span> {additive_types[type]}руб</p>
                        </div>)
                }
                {
                    selectedType === "" ? <button onClick={add} className="hookahModal__desc__button">Закрыть</button> :
                        <button onClick={add} className="hookahModal__desc__button">добавить</button>
                }
            </div>
        </div>
    );
};

export default HookahModal;
