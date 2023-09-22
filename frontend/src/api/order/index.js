import {request} from "../config";

async function createOrder(data = {}){
    return request('post', `/goods/create_order`, data, true)
}
async function getOrderHistory(data = {}){
    return request('get', `/goods/order_history`, data, true)
}

export const orderApi = {
    createOrder,
    getOrderHistory
}
