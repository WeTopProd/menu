import React, {useEffect, useState} from 'react';
import './HookahElement.scss'
import Line from '../../assets/images/hookah/Line42.png'
import {api} from "../../api";
import {getImage} from "../../helpers/image";

const HookahElement = ({type}) => {
    const [goods, setGoods] = useState([])
    useEffect(() => {
        api.goodsApi.getList({type: "Кальянная карта", subtype: "Кальян", hookah_type: type}).then(res => {
            setGoods(res.data.results)
        })
    }, [])

    return (
        <div className="hookahElement">
            <div className="hookahElement__subtitle">
                <p>{type}</p>
            </div>
            {
                goods.map((good, idx) =>
                    <div key={idx} className="classic hookahElement__block">
                        <div className="hookahElement__block_desc">
                            <p className="hookahElement__block_desc_subtitle">Выбрать табак</p>
                            {
                                good.tobacco_type.map((tobacco_type, idc) => <div key={idc}
                                                                                  className="hookahElement__block_desc_item">
                                    <img src={Line} alt="icon"/>
                                    <p>{tobacco_type}</p>
                                </div>)
                            }

                            <p className="hookahElement__block_desc_linck">Выбрать
                                добавки</p>
                        </div>
                        <div className="hookahElement__block_price">
                            <p>{good.price} руб.</p>
                        </div>
                        {
                            good.images.length > 0 && good.images[0].images != null ?
                                <img className="hookahElement__block_image" src={getImage(good.images)} alt="icon"/>
                                : ''
                        }

                    </div>)
            }

            {/*<HookahModal
                additive_type={good.additive_type}
                setHookah={setHookah}
            />*/}
        </div>
    );
};

export default HookahElement;
