import React, {useReducer, useState} from 'react';
import "./Register.scss"
import RegisterActive from "../../components/RegisterActive/RegisterActive";
import {Link, useNavigate} from "react-router-dom";
import {initialState, reducer} from "./reducers";
import {api} from "../../api";


const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false)
    const [password, setPassword] = useState(true)
    const [errRegister, setErrRegister] = useState('')
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
        setPassword(false)
        api.authApi.register(state).then(goToBack)
            .catch((err)=>{
                setErrRegister(err.response.data)
            });
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
                                <div>
                                    <input
                                        value={state.email}
                                        type="email"
                                        placeholder="Почта"
                                        onChange={e => setData("email", e)}
                                    />
                                    <span>{errRegister.email}</span>
                                </div>
                                <div>
                                    <input
                                        value={state.first_name}
                                        type="text"
                                        placeholder="Имя"
                                        onChange={e => setData("first_name", e)}
                                    />
                                    <span>{errRegister.first_name}</span>
                                </div>
                                <div>
                                    <input
                                        value={state.password}
                                        type="password"
                                        placeholder="Пароль"
                                        onChange={e => setData("password", e)}
                                    />
                                    <span>{errRegister.password}</span>
                                </div>
                                <div>
                                    <input
                                        value={state.last_name}
                                        type="text"
                                        placeholder="Фамилия"
                                        onChange={e => setData("last_name", e)}
                                    />
                                    <span>{errRegister.last_name}</span>
                                </div>
                                <div>
                                    <input
                                        value={state.re_password}
                                        type="password"
                                        placeholder="Повторить пароль"
                                        onChange={e => setData("re_password", e)}
                                    />
                                    <span>{state.password === state.re_password || password ?  '' :  "Пароль не совподает"}</span>
                                    {/*<span>{state.password && state.re_password ?  '' :  "Это поле не может быть пустым."}</span>*/}
                                </div>
                                <div>
                                    <input
                                        value={state.phone}
                                        type="text"
                                        placeholder="Телефон"
                                        onChange={e => setData("phone", e)}
                                    />
                                    <span>{errRegister.phone}</span>
                                </div>
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
