import React, {useState} from 'react';
import './PersonalAreaModal.scss'
import {Link} from "react-router-dom";
import PersonalAreaData from "../PersonalAreaData/PersonalAreaData";
import PersonalArea from "../PersonalArea/PersonalArea";
import HistoryOfOrders from "../HistoryOfOrders/HistoryOfOrders";
import Vector from '../../assets/images/PersonalArea/Vector.png'
import PersonalAreaEdit from "../PersonalAreaEdit/PersonalAreaEdit";
import {useSelector} from "react-redux";

const PersonalAreaModal = ({setIsShow}) => {
    const [modal, setModal] = useState("")
    const {me} = useSelector((state) => state.auth)
    const {isAuth} = useSelector((state) => state.auth)

    const closeModal = () => {
        setIsShow(false)
    }

    const modalShow = () => {
        switch (modal) {
            case "":
                return <PersonalAreaData setModal={setModal}/>
            case "HistoryOfOrders":
                return <HistoryOfOrders/>
            case "PersonalArea":
                return <PersonalArea setModal={setModal}/>
            case "PersonalAreaEdit":
                return <PersonalAreaEdit/>
        }
    }

    return (
        <div onClick={closeModal} className={"personalAreaModal"}>
            <div
                onClick={e => e.stopPropagation()}
                className={"personalAreaModal__items personalAreaModal__items__active"}>
                <div className="personalAreaModal__title">
                    <Link className="personalAreaModal__items_name" to="/"><h3>{me.first_name} {me.last_name}</h3>
                    </Link>
                    <img onClick={closeModal} src={Vector} alt="vector"/>
                </div>

                <span className="personalAreaModal__items_line"></span>
                {modalShow()}
            </div>
        </div>
    );
};

export default PersonalAreaModal;
