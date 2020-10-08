import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CUSTOMER_HISTORY, SET_CUSTOMER_LOGOUT, DELETE_ORDER_FROM_CART,CREATE_ORDER, SET_CART_ITEM,SET_CUSTOMER_AUTH, SET_RESTURANT_AUTH, USER_LOADING } from "./page.constants.js";
export const authUser = (userData,authType) => dispatch => {
   
    const apiEndPoint = (authType == 'login')?"http://localhost/api/auth/login":"http://localhost/api/auth/register";
    axios
      .post(apiEndPoint, userData)
      .then(res => {console.error(res);
        // Save to localStorage
  
        // Set token to localStorage
        const { accessToken,type } = res.data;
        localStorage.setItem("jwtToken", accessToken);
        // Set token to Auth header
        setAuthToken(accessToken);
        // Decode token to get user data
        const decoded = jwt_decode(accessToken);
        // Set current user
        
           if(type == 'Customer'){
            const  userCartId  = res.data.userCartId;
              if(authType == 'register'){
            localStorage.setItem("userCartId", userCartId);
              }
            console.error("Set auth",userCartId)
            dispatch(setCurrentUser({decoded,userCartId}));
              }
           else{
               dispatch(setCurrentResturant(decoded));
              }
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: null
        })
      );
  };

  
  export const getCustomerHistory = () => dispatch => {
    console.error("history action");
    const apiEndPoint = "http://localhost/api/auth/get-history-order";
    axios
      .post(apiEndPoint)
      .then(res => {console.error(res);
       
        console.error("hello History Cart",res);
        dispatch(setCurrentHistory(res.data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const getCartItem = (cart_id) => dispatch => {

    const apiEndPoint = "http://localhost/api/auth/get-cart-item";
    axios
      .get(apiEndPoint+`/${cart_id}`)
      .then(res => {console.error(res);
       
        console.error("hello Res Cart",res.data,cart_id);
        dispatch(setCurrentCart(res.data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  export const deleteFromCart = (data) => dispatch => {

    const apiEndPoint = "http://localhost/api/auth/delete-product-from-cart";
    axios
      .post(apiEndPoint,data)
      .then(res => {console.error(res);
       
        console.error("Delete Res Cart",res);
        dispatch(setCurrentCart(res.data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const createOrder = (data) => dispatch => {

    const apiEndPoint = "http://localhost/api/auth/create-order";
    axios
      .post(apiEndPoint,data)
      .then(res => {console.error(res);
       
        console.error("hello Res Cart",res);
        dispatch(setCurrentCart(res.data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userCartId");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    
        dispatch(setCurrentLogout());
  };

  // Set logged in user
export const setCurrentUser = data => {
     console.error("AUTH SUCCESSFULL",data);
    return {
      type:  SET_CUSTOMER_AUTH,
      payload: data
    };
  };
  export const setCurrentHistory = data => {
    console.error("History",data);
   return {
     type:  SET_CUSTOMER_HISTORY,
     payload: data
   };
 };
  
  export const setCurrentLogout = () => {
    console.error("Logout SUCCESSFULL");
   return {
     type: SET_CUSTOMER_LOGOUT
   };
 };
  export const setCurrentResturant = payload => {

    return {
      type:  SET_RESTURANT_AUTH,
      payload: payload
    };
  };

  export const setCurrentCart = payload => {
           console.error("setcartitem",payload)
    return {
      type:  SET_CART_ITEM,
      payload: payload
    };
  };

  export const  setCurrentCreate = payload => {

    return {
      type:  CREATE_ORDER,
      payload: payload
    };
  };
  export const  setCurrentDelete = payload => {

    return {
      type:  DELETE_ORDER_FROM_CART,
      payload: payload
    };
  };
  
  

  // registration success call create cart action call jha cart create krna ke liya and local m store and state m bhi 
  // backend se login vla ke res m cart id send 
  // order page par component jo cart m added m
  // delete cart
  //proced to check out par cart id;
