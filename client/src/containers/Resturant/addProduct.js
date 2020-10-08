import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Add_Product } from './resturant.actions';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import swal from 'sweetalert';
import Navbar from '../pages/navbar';
import jwt_decode from "jwt-decode";
import {getCartItem,logoutUser} from '../pages/page.action';
class AddProduct extends Component {
  constructor(props){
    super()
    this.state={
      product_name:null,
      product_category:null,
      price:null,
      file:null,
      size:null,
      desc:null,
        user:null,
        type:null,
        size1:0,
        cart:[],
      success:false,
      isloding:false
    }
}
LogoutHandle = (e) =>{

  e.preventDefault();
  console.log("Handle CLick");
  this.props.logoutUser();
}
onChangeHandler = ({target}) =>{
  let {name,value} = target;
  this.setState({[name]:value});
}

submitBtnHandler = ({target}) => {
  this.setState({isloding:true},()=>
    this.props.Add_Product({product_name:this.state.product_name,category:this.state.product_category, price:this.state.price,product_desc:this.state.desc,product_title:this.state.size,product_image:"https://images.everydayhealth.com/images/diet-nutrition/paleo-diet/paleo-diet-sample-menu-where-to-find-recipes-722x406.jpg"},"register")
  );
}
componentDidMount(){
 if (localStorage.getItem("jwtToken") != null) {
           let decode = jwt_decode(localStorage.getItem("jwtToken"));
           console.log("login_type",decode);
           this.setState({user:decode,type:decode.login_type});
  }
   else{
    this.props.history.push("/auth");
   }
}
componentWillReceiveProps(nextProps) {
   if (localStorage.getItem("jwtToken") == null) {
      this.props.history.push('/auth');
}  
if(this.props.auth.AddProductResponseIdentifer != nextProps.auth.AddProductResponseIdentifer){
  if(this.state.isloding){

  this.setState({isloding:false,success:true},()=>{
      setTimeout(()=>{
        this.setState({success:false})
      },5000)
     });
  }
}

}

    render() {  console.log("Alert Add Product",this.props.product);
        return ( 
          <>
          <Navbar
        type = {this.state.type}
        user = {this.state.user}
        size = {0}
        LogoutHandle = {this.LogoutHandle}
        />
         <div className="container">
          {this.state.success && <div className ="row justify-content-center">
            <p style = {{color:'green',marginTop:'10%'}}>  Order Created Successfully...</p>
            </div> }
          <Add_Product_Component 
            isloding = {this.state.isloding}
            product_name={this.state.product_name}
            product_category={this.state.product_category}
            desc={this.state.desc}
            size={this.state.size}
            price={this.state.price}
            file={this.state.file}
            onChangeHandler={this.onChangeHandler}
            submitBtnHandler={this.submitBtnHandler}
          />
          </div>
          {/* </div>
          {this.props.product &&<Progress type="circle" percent={100} status="success" />} */}
          </>
         );
    }
}


const Add_Product_Component = props =>{

  return (
  
    <section className="updates padding-top">
    <div className="container-fluid">
      <div className="row justify-content-center">
        {/* Recent Updates*/}
        <div className="col-lg-12">
          <div className="recent-updates card" style={{paddingBottom: '21px'}}>
            <div className="card-close">
            </div>
            <div className="card-header">
              <h3 className="h4">Add Product</h3>
            </div>
            <div className="card-body padding">
              <form action method="post" encType="multipart/form-data">
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="p_name" className="font-weight-bold grand">Product-Name(Title OF Food) :</label>
                    <div className="form-group">
                      <input type="text" id="p_name" name="product_name" value={props.product_name || ""} onChange={props.onChangeHandler} className="form-control" placeholder="Enter Product name..." required />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="product_category" className="font-weight-bold grand">Product-Category :</label>
                    <div className="form-group">
                      <select name="product_category" value={props.product_category || ""} onChange={props.onChangeHandler} className="form-control text-dark" required>
                        <option value>Select product category</option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  
                  <div className="col-sm-6">
                    <label htmlFor="price" className="font-weight-bold grand">Product-Price</label>
                    <div className="form-group">
                      <input type="text" id="price" name="price" value={props.price || ""} onChange={props.onChangeHandler} className="form-control text-dark" placeholder="Enter product price Rs..." required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="size" className="font-weight-bold grand">Title fo food (Size,Thalis,Jambo,Mini,fries,Pasta,Maggi Berger,Pizza)</label>
                    <div className="form-group">
                      <input type="text" name="size" value={props.size || ""} onChange={props.onChangeHandler} className="form-control" placeholder="Enter the food of the name ,Size,Thalis,Jambo,Mini,fries,Pasta,Maggi Berger,Pizza" required />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="desc" className="font-weight-bold grand">Product-Description:</label>
                    <div className="form-group">
                      <textarea id="desc" name="desc" value={props.desc || ""} onChange={props.onChangeHandler} className="form-control" placeholder="Enter product description..." required cols={30} rows={3} defaultValue={""} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group text-right" style={{position: 'relative', top: '10px'}}>
                      <button type="button" name="add_product" onClick={props.submitBtnHandler} className="btn btn-primary px-5 font-weight-bold btn-dark BtnSet">
                      {props.isloding?"Loding...": "Add Product"}  </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

const mapStateToProps = state => {
  console.log("Store State===>",state);
  return{product:state.auth.isProductAdded,auth:state.auth}
}
const mapDispatchToProps = dispatch => {
  return {
    Add_Product:(userData)=>dispatch( Add_Product(userData)),
    logoutUser:()=>dispatch(logoutUser())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddProduct);

