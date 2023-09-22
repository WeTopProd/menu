import {request} from "../config";

async function addToBasket(id, data = {}){
    return request('post', `/goods/${id}/shopping_cart`, data, true)
}
async function updateBasket(id, data = {}){
    return request('patch', `/goods/${id}/shopping_cart`, data, true)
}
async function deleteBasket(id, data = {}){
    return request('delete', `/goods/${id}/shopping_cart`, data, true)
}

export const shoppingApi = {
    addToBasket,
    updateBasket,
    deleteBasket,
}
