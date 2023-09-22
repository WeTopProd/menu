import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    goods: [],
    num_table: "",
    num_person: 1,
    comment: ""
}

export const basketStore = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.goods = []
        },
        setGoods: (state, action) => {
            state.goods = action.payload
        },
        setNumTable: (state, action) => {
            state.num_table = action.payload
        },
        setNumPerson: (state, action) => {
            state.num_person = action.payload
        },
        setComment: (state, action) => {
            state.comment = action.payload
        },
    },
})

const {actions, reducer} = basketStore;

export const {
    setGoods,
    setNumTable,
    setNumPerson,
    setComment,
    reset
} = actions

export default reducer
