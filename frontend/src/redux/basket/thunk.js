import {api} from "../../api";
import {setGoods} from "./index";

export const getGoods = (data) => (dispatch) => {
    return api.basketApi.getGoods(data).then(res => dispatch(setGoods(res.data)))
}
