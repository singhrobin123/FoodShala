import React,{Component} from 'react';
import {connect} from 'react-redux';
import { getAllProduct, deleteProduct,update_Product } from './resturant.actions';
import {getCartItem,logoutUser} from '../pages/page.action';
import jwt_decode from "jwt-decode";
import Navbar from '../pages/navbar';
class viewProduct extends Component {
  constructor(props){
    super()
    this.state={
      product_name:null,
      product_category:null,
      price:null,
      size:null,
      desc:null,
        order:[],
        type:null,
        show:false,
        user:null,
        user_type:null,
        p_id:null
  }
  }
  view = (e)=>{
    
    this.setState({show:true,p_id : e.target.value},()=>{
       window.$('#myModal').modal('show');
    })
   
     console.log("view",e.target.value)
  }
  deleteHandle = (e)=>{
    console.log("delete handele calles",e.target.value);
   this.props.deleteProduct({p_id:e.target.value});
  }
  LogoutHandle = (e) =>{
  
    e.preventDefault();
    console.log("Handle CLick");
    this.props.logoutUser();
  }
  onChangeHandler = ({target}) =>{
    console.log('name',target.value);
    let {name,value} = target;
    this.setState({[name]:value});
  }
  
  submitBtnHandler = ({target}) => {
    this.setState({isloding:true},()=>
      this.props.update_Product({product_name:this.state.product_name,category:this.state.product_category, price:this.state.price,product_desc:this.state.desc,product_image:"https://images.everydayhealth.com/images/diet-nutrition/paleo-diet/paleo-diet-sample-menu-where-to-find-recipes-722x406.jpg",p_id: this.state.p_id})
    );
  }

componentDidMount() {
  // window.$('#myModal').modal('hide');
  window.$('#myModal').modal('hide');
   if (localStorage.getItem("jwtToken") != null) {
             
     let decode = jwt_decode(localStorage.getItem("jwtToken"));
     console.log("login_type",decode.resturant_id);
     this.setState({user:decode,type:decode.login_type},()=>{
       console.log("login_typew",decode.resturant_id);
       this.props.getAllProduct();
     });
    
 }
 }
 componentWillReceiveProps(nextProps) {
    
    if (localStorage.getItem("jwtToken") == null) {
      this.props.history.push('/auth');
}  console.log("final task",this.props.order.productResponseIdentifer,nextProps.order.productResponseIdentifer);
if(this.props.order.productResponseIdentifer != nextProps.order.productResponseIdentifer){
  if(this.state.isloding){
  
  this.setState({order:nextProps.order.resturantProducts,isloding:false,success:true},()=>{
    window.$('#myModal').modal('hide');
      setTimeout(()=>{
        this.setState({success:false})
      },5000)
     });
  }
  else{
    this.setState({order:nextProps.order.resturantProducts});
  }
}

 }
    render() { 
       return(
         <>
        <Navbar
        type = {this.state.type}
        user = {this.state.user}
        size = {0}
        LogoutHandle = {this.LogoutHandle}
        />
        <div>
        <Header />
        <Section
        deleteHandle = {this.deleteHandle}
        products = {this.state.order}
        view = {this.view}
        />
        <UpdateProduct 
         isloding = {this.state.isloding}
         product_name={this.state.product_name}
         product_category={this.state.product_category}
         desc={this.state.desc}
         price={this.state.price}
         file={this.state.file}
         onChangeHandler={this.onChangeHandler}
         submitBtnHandler={this.submitBtnHandler}
        />
    </div>
        </>
       );
    }
}

const Header = props =>{

      return (
        <header className="page-header">
        <div className="container-fluid">
            <h2 className="no-margin-bottom">Resturant</h2>
        </div>

    </header>
      )
}
const Section = props =>{
  return(
    <section className="updates padding-top">
        <div className="container-fluid">
            <div className="row justify-content-center">
              
                <div className="col-lg-12">
                    <div className="recent-updates card">
                        <div style = {{marginBottom:'0.5rem',padding:'2.75rem'}} className="card-header">
                            <h3  className="h4">All Product</h3>
                        </div>
                        <div className="card-body no-padding">
                           
                            <div className="item d-flex justify-content-between">
                                <div style={{width:'100%'}} className="info d-flex">
                                    <table id="example" className="table table-bordered table-responsive TableResponsive" width="100%">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>
                                                    Product
                                                    <br /> Name
                                                </th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Description</th>
                                            
                                                <th>
                                                    Product
                                                    <br /> Image
                                                </th>
                                                <th>Date</th>
                                                <th>View</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                        {props.products && (
                                             <> {props.products.map((key) => ( 
                                        <tr style={{height: '120px !important', overflowY: 'scroll'}}>
                              <td>{key.p_id}</td>
                              <td>{key.p_name}</td>
                              <td>{key.p_category}</td>
                              <td>{key.p_price}</td>
                              <td width="20%" className="text-justify">{key.p_description}</td>
                              
                              <td className="text-center">
                                <img className="rounded img-thumbnail" src="https://images.everydayhealth.com/images/diet-nutrition/paleo-diet/paleo-diet-sample-menu-where-to-find-recipes-722x406.jpg" style={{width: '100px', height: '100px'}} />
                              </td>
                              <td width="9%">{key.created_at}</td>
                              <td>
                                <button onClick ={props.view} value = {key.p_id} className="btn btn-info btn-sm editProduct px-4 font-weight-bold">Edit</button>
                              </td>
                              <td className="text-center">
                                <button onClick = {props.deleteHandle} value = {key.p_id} className="btn btn-danger btn-sm deletproduct px-3 font-weight-bold">Delete</button></td>
                            </tr>
                                      ))
                              }
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
  )
}

const UpdateProduct = props =>{
    
  return(  
    <>
     <div id="myModal" className="modal fade">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header bg-dark">
                    <h4 className="modal-title text-white">Update Product</h4>
                    <button type="button" className="close text-white" data-dismiss="modal">
                        ×
                    </button>
                </div>
                {/* Modal body */}
                <div className="modal-body">
                    <form action method="post" encType="multipart/form-data">
                        {/* <input type="hidden" name="id" id="p_id" /> */}
                        <div className="row">
                            <div className="col-sm-6">
                                <label htmlFor="p_name">Product Name :</label>
                                <div className="form-group">
                                    <input type="text" id="p_name" name="product_name" value={props.product_name || ""} onChange={props.onChangeHandler} className="form-control" placeholder="Enter Product name..." required/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="product_category">Product Category :</label>
                                <div className="form-group">
                                    <select name="product_category" value={props.product_category || ""} onChange={props.onChangeHandler} required="required" id="p_cat" onchange="getSubCat(this.value);" className="form-control text-dark">
                                        <option value>Select product category</option>
                                        <option value="veg" selected>
                                            Veg
                                        </option>
                                        <option value="non-veg" selected>
                                            Non-Veg
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label htmlFor="p_type">Product SubCategory:</label>
                                <div className="form-group"></div>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="price">Product Price</label>
                                <div className="form-group">
                                    <input type="text" id="price" name="price" value={props.price || ""} onChange={props.onChangeHandler} className="form-control text-dark" placeholder="Enter product price Rs..." required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label htmlFor="desc">Product Description:</label>
                                <div className="form-group">
                                    <input type="text" id="p_desc" value={props.desc || ""} onChange={props.onChangeHandler} name="desc" className="form-control" placeholder="Enter product description..." />
                                </div>
                            </div>
                           
                        </div>
                        <div className="row">
                            
                            <div className="col-sm-6">
                                <div className="form-group text-right" style={{ position: "relative", top: 31 }}>
                                    <button type="button"  onClick={props.submitBtnHandler} name="update_product" className="btn btn-block btn-dark font-weight-bold">
                                    {props.isloding?"Loding...": "UpdateProduct"} 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
const mapStateToProps=(state)=>{
  console.log("Store State===>",state);
return{products:state.auth.products,order:state.auth}
}
const mapDispatchToProps=(dispatch)=>{
  return {
    getAllProduct:()=>dispatch(getAllProduct()),
    logoutUser:()=>dispatch(logoutUser()),
    deleteProduct:(data)=>dispatch(deleteProduct(data)),
    update_Product:(userData)=>dispatch( update_Product(userData))
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(viewProduct);