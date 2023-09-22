import {request} from "../config";

async function getList(data = {}){
   return request('get', "/goods", data, false)
}

async function getGoodsTypes(data = {}){
   return request('get', "/goods/types", data, false)
}
async function getGoodsSubTypes(data = {}){
   return request('get', "/goods/subtypes", data, false)
}

export const goodsApi = {
    getList,
    getGoodsTypes,
    getGoodsSubTypes
}
