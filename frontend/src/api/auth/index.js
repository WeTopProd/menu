import {request} from "../config";

async function tokenEmail(data = {}) {
    return request('post', "/auth/token-email", data, false)
}

async function tokenPhone(data = {}) {
    return request('post', "/auth/token-phone", data, false)
}
async function logout(data = {}) {
    return request('post', "/auth/token/logout", data, true)
}

async function getMe() {
    return request('get', "/users/me", {}, true)
}
async function register(data = {}) {
    return request('post', "/users", data, false)
}
async function edit(data = {}) {
    return request('put', "/users/me", data, true)
}

export const authApi = {
    tokenEmail,
    tokenPhone,
    getMe,
    register,
    edit,
    logout
}
