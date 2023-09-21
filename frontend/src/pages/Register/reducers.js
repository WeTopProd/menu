export function reducer(state, action) {
    switch (action.type) {
        case 'set_data':
            return {
                ...state,
                [action.key]: action.value,
            };
        default:
            return state;
    }
}

export const initialState = {
    phone: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: ""
};

