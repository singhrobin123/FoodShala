import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CUSTOMER_AUTH, SET_RESTURANT_AUTH, USER_LOADING } from "./auth.constants.js";
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
           if(decoded.login_type == 'Customers'){
            const  userCartId  = res.data.userCartId;
            localStorage.setItem("userCartId", userCartId);
            console.error("get Item id in login",userCartId);
            
              
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
  export const setStore = () => dispatch => {
  
      let accessToken = localStorage.getItem("jwtToken");
      // Set token to Auth header
      setAuthToken(accessToken);
      // Decode token to get user data
      const decoded = jwt_decode(accessToken);
      // Set current user
     let type =  decoded.type;
         if(type == 'Customer'){
         

           let userCartId = localStorage.getItem("userCartId");

          console.error("Set without login auth",userCartId)
          dispatch(setCurrentUser({decoded,userCartId}));
            }
         else{
             dispatch(setCurrentResturant(decoded));
            }
};
  // Set logged in user
export const setCurrentUser = data => {
     console.error("AUTH SUCCESSFULL",data);
    return {
      type:  SET_CUSTOMER_AUTH,
      payload: data
    };
  };
  export const setCurrentResturant = payload => {
    return {
      type:  SET_RESTURANT_AUTH,
      payload: payload
    };
  };

