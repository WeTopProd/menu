import {api} from "../../api";
import {setAuthToken, setMe} from "./index";

const setToken = (token) => (dispatch) => {
    dispatch(setAuthToken(token))
    localStorage.setItem("token", token)
}

export const authLogin = (type, data) => (dispatch) => {
    if (type === "email") {
        return api.authApi.tokenEmail(data).then(res => dispatch(setToken(res.data.auth_token)))
    } else {
        return api.authApi.tokenPhone(data).then(res => dispatch(setToken(res.data.auth_token)))
    }
}

export const authLogout = () => (dispatch) => {
    return api.authApi.logout({}).then(res => dispatch(setToken("")))
}

export const authGetMe = () => (dispatch) => {
    return api.authApi.getMe().then(res => dispatch(setMe(res.data))).catch(()=>{
        dispatch(setToken(""))
    })
}
