import React, {useReducer, useState} from 'react';
import "./Login.scss"
import RegisterActive from "../../components/RegisterActive/RegisterActive";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux'
import {authLogin} from "../../redux/auth/thunk";
import {initialState, reducer} from "./reducers";


const Login = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchStore = useDispatch()
    const navigate = useNavigate();

    const loginAction = () => {
        const login = state.login
        if (String(login).match(/^.*@.*$/)) {
            dispatchStore(authLogin("email", {email: state.login, password: state.password})).then(goToBack)
        } else {
            dispatchStore(authLogin("phone", {phone: state.login, password: state.password})).then(goToBack)
        }
    }

    const setData = (key, e) => {
        dispatch({type: 'set_data', key: key, value: e.target.value})
    }
    const goToBack = () => {
        setIsLogin(true)
        setTimeout(()=>{
            navigate("/")
        }, 3000)
    }

    return (
        <div className="login">
            {
                isLogin
                    ? <RegisterActive desc="Вы успешно зарегистрировались"/>
                    : <div className={"login__container login__container_login"}>
                        <h3 className={"login__container_title login__container_title_login"}>
                            Вход в личный кабинет
                        </h3>
                        <div className={"login__container_inputs login__container_inputs_login"}>
                            <input
                                value={state.login}
                                onChange={e => setData("login", e)}
                                type="text"
                                placeholder="Почта или телефон"
                            />
                            <input
                                value={state.password}
                                onChange={e => setData("password", e)}
                                type="password"
                                placeholder="Пароль"
                            />
                        </div>
                        <div className={"login__container_signIn login__container_signIn_login"}>
                            <p>Еще нет аккаунта?</p>
                            <Link to={"/register"}>Зарегистрируйтесь!</Link>
                        </div>
                        <button onClick={loginAction}
                                className={"login__container_button login__container_button_login"}
                        >
                            Войти
                        </button>
                    </div>
            }
        </div>
    );
};

export default Login;
