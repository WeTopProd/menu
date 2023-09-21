import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    me: {
        id: 0,
        phone: "",
        email: "",
        first_name: "",
        last_name: "",
    },
    isAuth: false,
    token: localStorage.getItem("token")
}

export const authStore = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken: (state, action) => {
            state.token = action.payload
            if (action.payload === "") {
                state.me = initialState.me
                state.isAuth = false
            }
        },
        setMe: (state, action) => {
            state.me = action.payload
            state.isAuth = true
        }
    },
})

const {actions, reducer} = authStore;

export const {setAuthToken, setMe} = actions

export default reducer
