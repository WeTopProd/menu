import React, {useEffect, useReducer, useState} from 'react';
import InputMask from "react-input-mask";
import "./Register.scss"
import RegisterActive from "../../components/RegisterActive/RegisterActive";
import {Link, useNavigate} from "react-router-dom";
import {initialState, reducer} from "./reducers";
import {api} from "../../api";


const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false)
    const [classError, setClassError] = useState(false)
    const [errRegister, setErrRegister] = useState('')
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    const setData = (key, e) => {
        dispatch({type: 'set_data', key: key, value: e.target.value})
    }

    useEffect(() => {
        api.authApi.register(state).then(goToBack)
            .catch((err)=>{
                setErrRegister(err.response.data)
            });
    }, [state]);


    const goToBack = () => {
        setIsRegistered(true)
        setTimeout(()=>{
            navigate("/")
        }, 2000)
    }

    const registerAction = () => {
        createOrder()
        setClassError(true)
        api.authApi.register(state).then(goToBack)
            .catch((err)=>{
                console.log(err)
            });
    }

    const createOrder = () => {
        if (!state.email || errRegister.email) {
            alert(`Почта: ${errRegister.email}`)
            return
        }
        if (!state.first_name || errRegister.first_name) {
            alert(`Имя: ${errRegister.first_name}`)
            return
        }
        if (!state.password || errRegister.password) {
            alert(`Пароль: ${errRegister.password}`)
            return
        }
        if (!state.last_name || errRegister.last_name) {
            alert(`Фамилия: ${errRegister.last_name}`)
            return
        }
        if (!state.re_password || errRegister.re_password) {
            alert(`Повторить пароль: ${errRegister.re_password}`)
            return
        }
        if (!state.phone || errRegister.phone) {
            alert(`Телефон: ${errRegister.phone}`)
            return
        }
    }

    return (
        <div className="registration">
            {
                isRegistered
                    ? <RegisterActive desc="Вы успешно зарегистрировались"/>
                    : <div className="registration__container registration__container_login">
                        <h3 className="registration__container_title registration__container_title_login">Регистрация</h3>
                        <div className="registration__container_inputs">
                            <div className="registration__container_inputs_block">
                                <div className={classError && errRegister.email ? "inputError" : ''}>
                                    <input
                                        value={state.email}
                                        type="email"
                                        placeholder="Почта"
                                        onChange={e => setData("email", e)}
                                    />
                                </div>
                                <div className={classError && errRegister.first_name ? "inputError" : ''}>
                                    <input
                                        value={state.first_name}
                                        type="text"
                                        placeholder="Имя"
                                        onChange={e => setData("first_name", e)}
                                    />
                                </div>
                                <div className={classError && errRegister.password ? "inputError" : ''}>
                                    <input
                                        value={state.password}
                                        type="password"
                                        placeholder="Пароль"
                                        onChange={e => setData("password", e)}
                                    />
                                </div>
                                <div className={classError && errRegister.last_name ? "inputError" : ''}>
                                    <input
                                        value={state.last_name}
                                        type="text"
                                        placeholder="Фамилия"
                                        onChange={e => setData("last_name", e)}
                                    />
                                </div>
                                <div className={classError && errRegister.re_password ? "inputError" : ''}>
                                    <input
                                        value={state.re_password}
                                        type="password"
                                        placeholder="Повторить пароль"
                                        onChange={e => setData("re_password", e)}
                                    />
                                </div>
                                <div className={classError && errRegister.phone ? "inputError" : ''}>
                                    <InputMask
                                        mask="+7 999 999 99 99"
                                        value={state.phone}
                                        type="text"
                                        placeholder="Телефон"
                                        onChange={e => setData("phone", e)}>
                                    </InputMask>
                                </div>
                            </div>
                        </div>
                        <div className="registration__container_signIn">
                            <p className="assss">Есть аккаунт?</p>
                            <Link to={"/login"}>Войдите!</Link>
                        </div>
                        <button onClick={registerAction} className="registration__container_button">Зарегистрироваться</button>
                    </div>
            }
        </div>
    );
};

export default Register;
