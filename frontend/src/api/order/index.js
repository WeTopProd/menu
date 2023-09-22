import {request} from "../config";

async function createOrder(data = {}){
    return request('post', `/goods/create_order`, data, true)
}

export const orderApi = {
    createOrder,
}
