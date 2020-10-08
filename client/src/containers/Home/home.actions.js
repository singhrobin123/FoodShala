import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CART_ITEM, SET_ALL_PRODUCT, USER_LOADING } from "./home.constant.js";
import { setCurrentCart } from "../pages/page.action";
export const getAllProduct = (page_no) => (dispatch) => {
    const apiEndPoint = "/api/auth/get-all-Item";
    axios
        .get(apiEndPoint + `/${page_no}`)
        .then((res) => {
            console.log(res);
            
            console.log("hello Res", res.data);
            dispatch(setCurrentUser(res.data));
           
        })
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
export const addTocart = (data) => (dispatch) => {
    const apiEndPoint = "/api/auth/add-product-to-cart";
    axios
        .post(apiEndPoint, data)
        .then((res) => {
            console.log(res);

            console.log("AddTocart====>", res.data);
            dispatch(setCurrentCart(res.data));
        })
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_ALL_PRODUCT,
        payload: decoded,
    };
};
export const setCurrentAdd = (decoded) => {
  console.log("Getting ",decoded);
    return {
        type: SET_CART_ITEM,
        payload: decoded,
    };
};
