import React, {useReducer} from 'react';
import './PersonalAreaEdit.scss'
import {useDispatch, useSelector} from "react-redux";
import {reducer} from "./reducers";
import {api} from "../../api";
import {authGetMe, authLogin} from "../../redux/auth/thunk";

const PersonalAreaEdit = () => {
    const {me} = useSelector((state) => state.auth)
    const [state, dispatch] = useReducer(reducer, me);
    const dispatchStore = useDispatch()

    const setData = (key, e) => {
        dispatch({type: 'set_data', key: key, value: e.target.value})
    }

    const editAction = () => {
        api.authApi.edit(state).then(()=>dispatchStore(authGetMe()))
    }

    return (
        <div className="personalAreaEdit">
            <div>
                <p>Имя</p>
                <input
                    value={state.first_name}
                    onChange={e => setData("first_name", e)}
                    type="text"
                    placeholder="Имя"
                />
            </div>
            <div>
                <p>Фамилия</p>
                <input
                    value={state.last_name}
                    onChange={e => setData("last_name", e)}
                    type="text"
                    placeholder="Фамилия"
                />
            </div>
            <div>
                <p>Телефон</p>
                <input
                    value={state.phone}
                    onChange={e => setData("phone", e)}
                    type="text"
                    placeholder="Телефон"
                />
            </div>
            <div>
                <p>Почта</p>
                <input
                    value={state.email}
                    onChange={e => setData("email", e)}
                    type="text"
                    placeholder="Почта"

                />
            </div>
            <button onClick={editAction}>Сохранить</button>
        </div>
    );
};

export default PersonalAreaEdit;
