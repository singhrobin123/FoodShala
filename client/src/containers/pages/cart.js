import React,{Component} from 'react';
import { Header, NavBarComp } from '../../components/header';
import { logoutUser,getCustomerHistory } from './page.action';
import '../../include/css/main.css';
import jwt_decode from "jwt-decode";
import {connect} from 'react-redux';
import { getCartItem ,createOrder,deleteFromCart } from './page.action';
import Navbar from './navbar';
class Cart extends Component{
 
  constructor(props){
    const decoded = jwt_decode(localStorage.getItem("jwtToken"));
    super()
    this.state={
         
      user:decoded,
      type:decoded.login_type,
      cart:null,
      orderFlag:false ,
      isloding:false,
      success:false,
      order:[],
    }
}

OrderPlaced = () =>{
   if(Object.keys(this.state.cart).length>0){

  console.log("clicked");
  this.setState({isloding:true},()=>{
    this.props.createOrder({cart_id:localStorage.getItem("userCartId")
  })});
}
       
}

deleteCart = (e)=>{
  e.preventDefault();
  let s = localStorage.getItem("userCartId");
  this.props.deleteFromCart({prod_id:e.target.value,cart_id:s});
  
  console.log("Delete from cart details",s,e);
}

LogoutHandle = (e) =>{

  e.preventDefault();
  console.log("Handle CLick");
  this.props.logoutUser();
}

view = ()=>{
  this.setState({show:true},()=>{
     window.$('#myModal').modal('show');
  })
 
  console.log("view")
}
hide = ()=>{
  this.setState({show:false},()=>{
     window.$('#myModal').modal('hide');
  })
 
  console.log("view")
}

componentDidMount(){
       if(!this.state.user){
        this.props.history.push('/auth/login');
       }
       this.props.getCustomerHistory();
       this.props.getCartItem(localStorage.getItem("userCartId"));
      console.log("history called");
         
}
componentWillReceiveProps(nextProps) {
     
    console.log('componentWillReceiveProps', nextProps,nextProps.data.cartResponseIdentifer,this.props.data.cartResponseIdentifer);
    if (localStorage.getItem("jwtToken") == null) {
      this.props.history.push('/auth');
    }
   if(this.props.data.historyResponseIdentifer != nextProps.data.historyResponseIdentifer){
          console.log("History data nextprops",nextProps.data.history);
          this.setState({order:nextProps.data.history.data});
   }
   if(this.props.data.cartResponseIdentifer != nextProps.data.cartResponseIdentifer){
     console.log("Cart",nextProps.data.cartItem.data);
     if(this.state.isloding){

     this.setState({cart:nextProps.data.cartItem.data,isloding:false,success:true},()=>{
      setTimeout(()=>{
        this.setState({success:false})
      },5000)
     });
     }
     else{
      this.setState({cart:nextProps.data.cartItem.data});
     }
   }
}

    render(){
        
      console.log("hello c cart",this.state.order);
      let total = 0;
      let size = 0;
        if(this.state.cart != null){
        this.state.cart.map(key =>{
            size = size+1;
            
            total = total+key.p_price;
        });
    }
        return(
        <>
        <Navbar 
        type = {this.state.type}
        user = {this.state.user}
        size = {size}
        LogoutHandle = {this.LogoutHandle}
         />
          {this.state.show ? <Comp hide = {this.hide} view = {this.view} order = {this.state.order} />:
        <div className="container">
          {this.state.success && <div className ="row justify-content-center">
            <p style = {{color:'green',marginTop:'10%'}}>  Order Created Successfully...</p>
            </div> }
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="middle" style={{padding: '60px', width: '100%'}}>
                Cart
                <ul className="nav nav-tabs nabbar_inverse bg-info InlineSet" id="myTab" style={{borderRadius: '10px 10px 10px 10px'}} role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" style={{color: '#BDDEFD'}} id="viewitem-tab" data-toggle="tab" href="#viewitem" role="tab" aria-controls="viewitem" aria-selected="true">View Cart</a>
                  </li>
                 
                  <li className="nav-item">
                    
                    <a className="nav-link" onClick ={this.view} style={{color: '#BDDEFD'}} id="orders-tab" data-toggle="tab" href="" role="tab" aria-controls="orders" aria-selected="false">View Orders</a>
                  </li>
                </ul>
                <br /><br />
                 
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="viewitem" role="tabpanel" aria-labelledby="home-tab">
                   {size == 0 && <button type="button" className="btn btn-outline-success">
                      <a href="/home/Dashboard" style={{color: 'green', textDecoration: 'none'}}>No Items In cart Let's Shop Now</a>
                    </button>
                   }
                    <table className="table table-bordered text-center TableResponsive">
                      <tbody>
                        
                        { this.state.cart && this.state.cart.map(((key) =>(
                         
                         <tr className="font-weight-bold">
                          <td>
                            <img className="rounded img-thumbnail" src = "" height="100px" width="100px" />
                          </td>
                          <td className="grand">{key.p_name}</td>
                          <td className="grand"><i className="fas fa-rupee-sign">
                              {key.p_price}</i></td>
                          <td className="grand">{key.p_title}</td>
              
                          <td>
                            <button type="button" name="del" onClick = {this.deleteCart} value={key.product_id} className="btn btn-danger btn-sm px-3 grand">Delete</button>
                          </td>
                          
                        </tr> 
                

                        ))
                        )
}
			
                        <tr>
                          <td colSpan={2}>
                            <h5 style={{color: 'red'}} className="grand">Grand Total</h5>
                          </td>
                          <td>
                            <h5 className="grand"><i className="fas fa-rupee-sign" />&nbsp;
                              {total}
                            </h5>
                          </td>
                          <td colSpan={3} style={{padding: '30px', textAlign: 'center'}}>
                           
                              <button type="button"  onClick = {this.OrderPlaced} style={{color: 'white', fontWeight: 'bold', textTransform: 'uppercase'}} className="btn btn-primary 
					  	       	         	Process-to-check">{this.state.isloding?"Loding...": "Proceed to checkout"}
              
                              </button>
                      
                          </td>
                        </tr>
                    
                        <tr>
                        </tr>
                       
                      </tbody>
                    </table>	
                    <span style={{color: 'green', textAlign: 'centre'}}>
                     </span>
                  </div>	 
                </div>
              </div>
            </div>
          </div>
</div>  }
       </>
       
    );
    }
}

const Comp = props =>{

  return (
    <>
       <div id="myModal" style ={{top:'61px'}} className="modal fade" role="dialog" >
      <div className="modal-dialog modal-md" style = {{maxWidth:'1160px'}}>
        {/* Modal content*/}
        <div className="modal-content">
          <div className="modal-header bg-info">
            <h4 className="modal-title text-white">Order Details</h4>
            <button onClick = {props.hide} type="button" className="close text-white" data-dismiss="modal">×</button>
          </div>
          <div className="card-body no-padding">
                    {/* Item*/}
                    <div className="item d-flex justify-content-between">
                      <div className="info d-flex"></div>
          <table id="example" className="table table-hover display TableResponsive table-responsive-sm table-responsive-lg table-striped" style={{width: '100%'}}>
                          <thead>
  
                            <tr>
                            <th className="th-sm text-center"><br />Product Price</th>
                            <th className="th-sm text-center"><br />Product Name</th>
                              <th className="th-sm text-center">Customer<br /> Name</th>
                              <th className="th-sm text-center">Customer<br />Email</th>
                              <th className="th-sm text-center">Customer <br />Phone</th>
                              <th style = {{paddingLeft:'70px'}}>Order <br />Date</th>
                              <th style = {{paddingLeft:'70px'}}> Order <br />status</th>
                              
                            </tr>
                          </thead>
                          <tbody className="text-center">
                          {props.order && (
                                      <> {props.order.map((order) => ( 
                                       
                                        <tr style={{height: '100px !important', overflowY: 'scroll'}}>
                               <td>{order.p_price}</td>
                              <td>{order.p_name}</td>
                              <td>{order.name}</td>
                              <td>{order.email}</td>
                              <td style = {{padding:'-2.75rem'}}>{order.phone}</td>
                              <td >
                               {order.created_at}                
                              </td>
                              <td>
                              <img className="rounded img-thumbnail" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3SnRkh8oIdFmeKLMunMt8FS9qN34FJT2u5A&usqp=CAU" style={{width: '100px', height: '100px',borderRadius:'50.25rem'}} />
                              </td>
                              
                              
                              <td>  
                              </td>
                            </tr>
                                    
                                      ))}
                                      </>
                                      )     
                            }
                          </tbody>
                        </table>
           </div></div>
        </div>
      </div>
    </div>
    </>
  )
}
const mapStateToProps = state => {
  console.log("Store State1===>",state);
  return{user:state.auth.user, data:state.auth}
}
const mapDispatchToProps = dispatch => {
  return {
    getCartItem:(cart_id)=>dispatch(getCartItem(cart_id)),
    createOrder:(cart_id)=>dispatch(createOrder(cart_id)),
    deleteFromCart:(data)=>dispatch(deleteFromCart(data)),
    logoutUser:()=>dispatch(logoutUser()),
    getCustomerHistory:()=>dispatch(getCustomerHistory())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);