import React, {useReducer, useState} from 'react';
import "./Register.scss"
import RegisterActive from "../../components/RegisterActive/RegisterActive";
import {Link, useNavigate} from "react-router-dom";
import {initialState, reducer} from "./reducers";
import {api} from "../../api";


const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    const setData = (key, e) => {
        dispatch({type: 'set_data', key: key, value: e.target.value})
    }

    const goToBack = () => {
        setIsRegistered(true)
        setTimeout(()=>{
            navigate("/")
        }, 3000)
    }

    const registerAction = () => {
        api.authApi.register(state).then(goToBack)
    }

    return (
        <div className="registration">
            {
                isRegistered
                    ? <RegisterActive desc="Вы успешно зарегистрировались"/>
                    : <div className="registration__container registration__container_login">
                        <h3 className="registration__container_title registration__container_title_login">Вход в личный
                            кабинет</h3>
                        <div className="registration__container_inputs">
                            <div className="registration__container_inputs_block">
                                <input
                                    value={state.email}
                                    type="email"
                                    placeholder="Почта"
                                    onChange={e => setData("email", e)}
                                />
                                <input
                                    value={state.first_name}
                                    type="text"
                                    placeholder="Имя"
                                    onChange={e => setData("first_name", e)}
                                />
                                <input
                                    value={state.password}
                                    type="password"
                                    placeholder="Пароль"
                                    onChange={e => setData("password", e)}
                                />
                                <input
                                    value={state.last_name}
                                    type="text"
                                    placeholder="Фамилия"
                                    onChange={e => setData("last_name", e)}
                                />
                                <input
                                    value={state.re_password}
                                    type="password"
                                    placeholder="Повторить пароль"
                                    onChange={e => setData("re_password", e)}
                                />
                                <input
                                    value={state.phone}
                                    type="text"
                                    placeholder="Телефон"
                                    onChange={e => setData("phone", e)}
                                />
                            </div>
                        </div>
                        <div className="registration__container_signIn">
                            <p>Есть аккаунт?</p>
                            <Link to={"/login"}>Войдите!</Link>
                        </div>
                        <button onClick={registerAction} className="registration__container_button">Зарегистрироваться</button>
                    </div>
            }
        </div>
    );
};

export default Register;
