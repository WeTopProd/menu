import React, {useEffect, useState} from 'react';
import './Preorder.scss'
import RegisterActive from "../../components/RegisterActive/RegisterActive";
import {useSelector} from "react-redux";

const Preorder = () => {
    const [preorder, setPreorder] = useState(false)
    const {me} = useSelector((state) => state.auth)

    /*
     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i; // Почта
     const oneUppLetterRegex = /(?=.*[a-z])/; // Одна прописная буква
     const eightСharacterRegex = /[a-zA-Z0-9]{8,}/; // Не менее 8 символов
     const oneLowercaseLetterRegex = /(?=.*[A-Z])/; // Одна строчная буква
     const oneDigitRegex = /(?=.*\d)/; // Одна цифра
     const registerPassRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}/; // Пароль
     */
    const [name, setName] = useState(!!me.first_name ? me.first_name + " " + me.last_name : '');
    const [phone, setPhone] = useState(me.phone);
    const [phoneError, setPhoneError] = useState('');
    const [email, setEmail] = useState(me.email);
    const [emailError, setEmailError] = useState('');

    const validatePhone = (phone) => {
        const phoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError('Не коректный номер телефона');
            return false;
        } else {
            setPhoneError('');
            return true;
        }
    };
    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone(value);
        validatePhone(value);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i;
        if (!emailRegex.test(email)) {
            setEmailError('Электроная почта не коректна');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        validateEmail(value);
    };
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    return (
        <div className="preorder">
            {
                preorder
                ? <RegisterActive desc="Заказ оформлен"/>
                    :  <div className="preorder__container">
                        <p>Предзаказ банкета</p>
                        <div>
                            <input disabled={!!me.first_name} value={name} type="text" onChange={handleNameChange} placeholder="Имя*"/>

                        </div>
                        <div>
                            <input disabled={!!me.phone} type="text" value={phone}  onChange={handlePhoneChange} placeholder="Телефон*"/>
                            {phoneError && <span className="error">{phoneError}</span>}
                        </div>
                        <div>
                            <input disabled={!!me.email} type="text" value={email} onChange={handleEmailChange} placeholder="Почта*"/>
                            {emailError && <span className="error">{emailError}</span>}
                        </div>
                        <div>
                            <input type="text" placeholder="Событие"/>

                        </div>
                        <div>
                            <input type="text" placeholder="Зал*"/>

                        </div>
                        <div>
                            <input type="text" placeholder="Дата*"/>

                        </div>
                        <div>
                            <input type="number" placeholder="Количество гостей*"/>

                        </div>
                        <div>
                            <input type="text" placeholder="Доп-услуги"/>

                        </div>
                        <button onClick={() => setPreorder(true)}>Оформить заказ</button>
                    </div>
            }

        </div>
    );
};

export default Preorder;
