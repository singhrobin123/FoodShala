import React,{Component} from 'react';
import {connect} from 'react-redux';
import { getAllOrder } from './resturant.actions';
import {logoutUser} from '../pages/page.action';
import jwt_decode from "jwt-decode";
import Navbar from '../pages/navbar';

class ViewOrder extends Component {
  constructor(props){
    super()
    this.state={
      order:[],
      type:null,
      show:false,
      user:null,
      user_type:null,
}
}
LogoutHandle = (e) =>{

  e.preventDefault();
  console.log("Handle CLick");
  this.props.logoutUser();
}
hide = (e)=>{
  this.setState({show:false},()=>{
     window.$('#myModal').modal('hide');
  })
 
  console.log("view",e.target.value)
}
view = (e)=>{
  this.setState({show:true},()=>{
     window.$('#myModal').modal('show');
  })
 
  console.log("view",e.target.value)
}
componentDidMount() {
 // window.$('#myModal').modal('hide');
 
  if (localStorage.getItem("jwtToken") != null) {
            
    let decode = jwt_decode(localStorage.getItem("jwtToken"));
    console.log("login_type",decode.resturant_id);
    this.setState({user:decode,type:decode.login_type},()=>{
      console.log("login_typew",decode.resturant_id);
      this.props.getAllOrder({id:decode.resturant_id});
    });
   
}
}
componentWillReceiveProps(nextProps) {
  if (localStorage.getItem("jwtToken") == null) {
      this.props.history.push('/auth');
  }
  else{
   console.log("Nextprops",nextProps.order.resturantOrder);
   this.setState({order:nextProps.order.resturantOrder});
  }
}
    render() { 
                console.log("View Orders render = ",this.state.order);
        return ( 


      <div>
    
    <Navbar
        type = {this.state.type}
        user = {this.state.user}
        size = {0}
        LogoutHandle = {this.LogoutHandle}
        />
          {this.state.show ? <Comp hide = {this.hide} view = {this.view} order = {this.state.order} />:
          <>
        <section className="updates padding-top">
          <div className="container-fluid">
            <div className="row justify-content-center">
              {/* Recent Updates*/}
              <div className="col-lg-12">
                <div className="recent-updates card">
                  <div className="card-header">
                    <h3 className="h4">All Orders</h3>
                  </div>
                  <div className="card-body no-padding">
                    {/* Item*/}
                    <div className="item d-flex justify-content-between">
                      <div style = {{width:'100%'}} className="info d-flex">
                        <table id="example" className="table table-hover display TableResponsive table-responsive-sm table-responsive-lg table-striped" style={{width: '100%'}}>
                          <thead>
                            <tr>
                              <th>Order Id</th>
                              <th>Product Image </th>
                              <th>Product Name</th>
                              <th>Product Type</th>
                              <th>Product Price</th>
                              <th>Customer Name</th>
                              <th>Customer Email</th>
                              <th>Customer Phone</th>
                              <th>Customer Address</th>

                              <th style = {{paddingLeft:'20px'}} >Order  Date</th>
                              <th className="th-sm text-center"> Status</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                          {this.state.order && (
                                      <> {this.state.order.map((order) => ( 
                                       
                                        <tr style={{height: '100px !important', overflowY: 'scroll'}}>
                              <td  className="font-weight-bold">{order.order_id}</td>
                              <td>
                                <img className="rounded img-thumbnail" src="https://images.everydayhealth.com/images/diet-nutrition/paleo-diet/paleo-diet-sample-menu-where-to-find-recipes-722x406.jpg" style={{width: '100px', height: '80px'}} /></td>
                              <td>{order.p_name}</td>
                              <td>{order.p_category}</td>
                              <td>{order.p_price}</td>
                              <td>{order.name}</td>
                              <td>{order.email}</td>
                              <td style = {{padding:'-2.75rem'}}>{order.phone}</td>
                              <td>{order.address}</td>
                              <td >
                                {order.created_at.split("T")[0]}
                              </td>
                              <td>
                              <img className="rounded img-thumbnail" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3SnRkh8oIdFmeKLMunMt8FS9qN34FJT2u5A&usqp=CAU" style={{width: '100px', height: '100px',borderRadius:'50.25rem'}} />
                              </td>
                            </tr>
                                    
                                      ))}
                                      </>
                                      )     
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*-------Update product---------*/}
        <div className="modal fade" id="updateproduct">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header bg-dark">
                <h4 className="modal-title text-white">Veiw Orders</h4>
                <button type="button" className="close text-white" data-dismiss="modal">×</button>
              </div>
              {/* Modal body */}
              <div className="modal-body">
               
              </div>
      
              <div className="modal-footer">
      
              </div>
            </div>
          </div>
        </div>
        {/*------Delete product*/}
        <div className="modal fade" id="delproduct">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header bg-dark">
                <h5 className="modal-title text-white">Delete Product</h5>
                <button type="button" className="close text-white" data-dismiss="modal">×</button>
              </div>
              <form action method="post">
                {/* Modal body */}
                <div className="modal-body">
                  <input type="hidden" name="id" id="id" />
                  <h6>
                    You want to delete : <span className="mx-4 px-3 py-1  badge-pill badge-success" id="product_name" />
                  </h6>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                  <button type="submit" name="delete_product" className="btn btn-primary font-weight-bold btn-sm">Delete</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </>
    }
        </div>
       
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
                             
                              <th className="th-sm text-center">Customer<br />Name</th>
                              <th className="th-sm text-center">Customer <br /> Email</th>
                              <th style = {{paddingLeft:'70px'}}>Customer <br />Phone</th>
                              <th style = {{paddingLeft:'70px'}}> Customer <br />Address</th>
                              <th style = {{paddingLeft:'140px'}}>Order <br />Date</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                          {props.order && (
                                      <> {props.order.map((order) => ( 
                                       
                                        <tr style={{height: '100px !important', overflowY: 'scroll'}}>
        
                              <td>{order.name}</td>
                              <td>{order.email}</td>
                              <td style = {{padding:'-2.75rem'}}>{order.phone}</td>
                              <td>{order.address}</td>
                              <td >
                               {order.created_at.split("T")[0]}                
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
const mapStateToProps=(state)=>{
  console.log("Store State===>",state);
return{order:state.auth}
}
const mapDispatchToProps=(dispatch)=>{
  return {
    getAllOrder:()=>dispatch(getAllOrder()),
    logoutUser:()=>dispatch(logoutUser())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ViewOrder);