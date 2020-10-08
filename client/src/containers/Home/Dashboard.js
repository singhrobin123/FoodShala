import React,{Component} from 'react';
import { Header, NavBarComp } from '../../components/header';
// import { logoutUser,getCartItem } from './page.action';
import '../../include/css/main.css';
import jwt_decode from "jwt-decode";
import {connect} from 'react-redux';
import Home from './Item';
import Navbar from '../pages/navbar';
import {getCartItem,logoutUser} from '../pages/page.action';
import Item from './Item';
class Deshboard extends Component{
  constructor(props){
    super()
    this.state={
         
      user:null,
      type:null,
      size:0,
      cart:[]
    }
    console.error("Hello",this.props);
}
LogoutHandle = (e) =>{

    e.preventDefault();
    console.error("Handle CLick");
    this.props.logoutUser();
}
componentDidMount(){
   // this.props.logoutUser();
  if (localStorage.getItem("jwtToken") != null) {

            // this.props.getAllProduct(1);
            let decode = jwt_decode(localStorage.getItem("jwtToken"));
            console.error("login_type",decode);
            this.setState({user:decode,type:decode.login_type});
          if(decode.login_type == 'Customers'){
              console.error("fatching",localStorage.getItem("userCartId"))
             this.props.getCartItem(localStorage.getItem("userCartId"));
          }
            // this.props.history.push('/auth/login');
   }
    else{
     this.props.history.push("/auth");
    }
}
componentWillReceiveProps(nextProps) {
    if (localStorage.getItem("jwtToken") == null) {
       this.props.history.push('/auth');
}   if(this.props.data.cartResponseIdentifer != nextProps.data.cartResponseIdentifer){
       this.setState({cart:nextProps.data.cartItem,size:nextProps.data.cartItem.length});      
}
}

    render(){
        console.error("Home my",this.state.user);
      let total = 0;
      let size = 0;
      console.error('user',this.state.user);
        if(this.state.type == 'Customers'){
            
        if(this.state.cart.data){
        this.state.cart.data.map(key =>{
            size = size+1;
            total = total+key.p_price;
        });
        console.error("Homennnnnnnnnnn",size);
    }
  }
   return(
        <>
        <Navbar
        type = {this.state.type}
        user = {this.state.user}
        size = {size}
        LogoutHandle = {this.LogoutHandle}
        />
        <Item />
        </>
    );
    }
}

const mapStateToProps = state => {
  console.error("Store State1===>",state);
  return{user:state.auth.user, data : state.auth}
}
const mapDispatchToProps = dispatch => {
  return {
    logoutUser:()=>dispatch(logoutUser()),
   getCartItem:(cart_id)=>dispatch(getCartItem(cart_id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Deshboard);