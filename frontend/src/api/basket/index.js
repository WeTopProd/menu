import {request} from "../config";

async function getGoods(id, data = {}){
    return request('get', `/goods/basket`, data, true)
}

export const basketApi = {
    getGoods,
}
