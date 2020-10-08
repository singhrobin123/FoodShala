import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS,GET_ALL_PRODUCT_SUCCESS, ADD_PRODUCT_SUCCESS,GET_ALL_ORDERS_SUCCESS } from "./resturant.constant.js";
export const Add_Product = (userData) => dispatch => {

    const apiEndPoint = "/api/auth/add-product";
    axios
      .post(apiEndPoint, userData)
      .then(res => {console.log(res);
        // console.log("hello Res",res.data);
        dispatch(setCurrentUser());
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const update_Product = (userData) => dispatch => {
    
    console.log('update data',userData);
    const apiEndPoint = "/api/auth/update-product";
    axios
      .post(apiEndPoint, userData)
      .then(res => {console.log(res);
         console.log("hello Res",res.data);
        dispatch(setCurrentProduct(res.data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const getAllOrder = (resturant_id) => dispatch => {
    let decode = jwt_decode(localStorage.getItem("jwtToken"))
    console.log("getAll",decode.resturant_id);
    const apiEndPoint = "/api/auth/get-all-order";
    axios
      .get(`${apiEndPoint}/${decode.resturant_id}`)
      .then(res => {console.log(res);

        console.log("hello Res",res.data);
        dispatch(setCurrentOrder(res.data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const getAllProduct = () => dispatch => {

    const apiEndPoint = "/api/auth/get-all-product";
    axios
      .get(apiEndPoint)
      .then(res => {console.log(res);

        // console.log("hello Resk",res.data);
        dispatch(setCurrentProduct(res.data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
 
  export const deleteProduct = (data) => dispatch => {

    const apiEndPoint = "/api/auth/delete-product";
    axios
      .post(apiEndPoint,data)
      .then(res => {console.log(res);

        console.log("delete product response",res.data);
        dispatch(setCurrentProduct(res.data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  // Set logged in user
export const setCurrentUser = decoded => {
    return {
      type: ADD_PRODUCT_SUCCESS,
      payload: true
    };
  };
  export const setCurrentOrder = decoded => {
      console.log("decode ======>",decoded);
    return {
      type: GET_ALL_ORDERS_SUCCESS,
      payload: decoded
    };
  };
  export const setCurrentProduct = decoded => {
    console.log("decode ======>",decoded);
  return {
    type: GET_ALL_PRODUCT_SUCCESS,
    payload: decoded
  };
};
