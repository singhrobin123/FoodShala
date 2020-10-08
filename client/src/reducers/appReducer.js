import {
  SET_CUSTOMER_AUTH,
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_ORDERS_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  SET_RESTURANT_AUTH,
  USER_LOADING,
  SET_ALL_PRODUCT,
  SET_CART_ITEM,
  CREATE_ORDER,
  SET_CUSTOMER_LOGOUT,
  SET_CUSTOMER_HISTORY
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  cartItem:[],
  cartResponseIdentifer:0,
  userCartId: null,
  user: {},
  allProduct: [],
  loading: false,
  isProductAdded: false,
  resturantOrder: [],
  resturantProducts: [],
  registerResponseIdentifer:0,
  createOrderResponseIdentifer:false,
  AddProductResponseIdentifer:0,
  productResponseIdentifer:0,
  history:[],
  historyResponseIdentifer:0,
  setAllProductResponseIdentifer:0

};
//this.props.history.push()
export default function(state = initialState, action) {
  switch (action.type) {
      case SET_CUSTOMER_AUTH:
          return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            userCartId: action.payload.userCartId,
            user: action.payload.decoded,
            registerResponseIdentifer:(state.registerResponseIdentifer+1)
          };
          case SET_CUSTOMER_LOGOUT:
            return {
              ...state,
              isAuthenticated: !isEmpty(action.payload),
              userCartId: null,
              user: null,
              registerResponseIdentifer:(state.registerResponseIdentifer+1)
            };
            case SET_CUSTOMER_HISTORY:
              return {
                ...state,
                history: action.payload,
                historyResponseIdentifer:(state.historyResponseIdentifer+1)
              };
           
          case CREATE_ORDER:
          return {
            ...state,
            createOrderResponseIdentifer:true
          };
          case SET_RESTURANT_AUTH:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
            case SET_CART_ITEM:
              console.log("congrats carts",action.payload);
                return {
                  ...state,
                  cartItem: action.payload,
                  cartResponseIdentifer:(state.cartResponseIdentifer+1)
                };
                
      case SET_ALL_PRODUCT:
          return {
              ...state,
              allProduct: action.payload.data,
              setAllProductResponseIdentifer:(state.setAllProductResponseIdentifer)+1
          };
      case GET_ALL_ORDERS_SUCCESS:
          return {
              ...state,
              resturantOrder: action.payload.data
          };
      case GET_ALL_PRODUCT_SUCCESS:
        console.log("GET_ALL_PRODUCT",action.payload.data);
          return {
              ...state,
              resturantProducts: action.payload.data,
              productResponseIdentifer:(state.productResponseIdentifer+1)
          };

      case ADD_PRODUCT_SUCCESS:
          return {
              ...state,
              isProductAdded: true,
              AddProductResponseIdentifer:(state.AddProductResponseIdentifer+1)

          };
      case USER_LOADING:
          return {
              ...state,
              loading: true
          };
      default:
          return state;
  }
}

// what is valocity 
// what is accelation
// 