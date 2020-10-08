import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProduct, addTocart } from "./home.actions";
import { Header, NavBarComp } from "../../components/header";
import Navbar from "../pages/navbar";
import jwt_decode from "jwt-decode";
class Item extends Component {
    constructor(props) {
        
        super();
        this.state = {
            products: [],
            isAuth: null,
            type: null,
            preference_type:'all'

        };
    }
    getNonVeg = ()=>{
           let nonVegProducts = this.props.product.filter((key)=> key.p_category == 'non-veg');
        
           this.setState({preference_type:'nonveg',product:nonVegProducts});
        //    this.props.getAllProduct(type);
    };
    getVeg = ()=>{
        let VegProducts = this.props.product.filter((key)=> key.p_category == 'veg');
        
        this.setState({preference_type:'veg',product:VegProducts});
        //    this.props.getAllProduct(type);
    };
    getAllVeg = ()=>{
        let allProducts = this.props.product.filter((key)=> true);
        
        this.setState({preference_type:'all',product:allProducts});
        //    this.props.getAllProduct(type);
    };
    addProduct = (e) => {
        if(this.state.type == 'Customers'){
        e.preventDefault();
        let s = localStorage.getItem("userCartId");
        this.props.addTocart({ product_id: e.target.value, cart_id: s, price: e.target.name });

        console.error("Add to cart details", s, this.state.isAuth.customer_id, e.target.name);
        }
    };
    componentDidMount() {
        if (localStorage.getItem("jwtToken") != null) {
            let decode = jwt_decode(localStorage.getItem("jwtToken"));
            this.setState({isAuth:decode,type:decode.login_type});
           
   }     this.props.getAllProduct(1);
    //    / this.props.history.push("/auth");
	}
	componentWillReceiveProps(nextProps) {
        if (localStorage.getItem("jwtToken") != null) {
            let decode = jwt_decode(localStorage.getItem("jwtToken"));
            this.setState({isAuth:decode,type:decode.login_type});
           
   } 
		    console.error('componentWillReceiveProps', nextProps);
		    if(this.props.auth.setAllProductResponseIdentifer != nextProps.auth.setAllProductResponseIdentifer){
              console.error("Congrats");
              this.setState({product:nextProps.product})
			}
		//    
	}
    render() {
        if (this.props.product) {
            this.props.product.map((key) => {
                key.p_image = "img/" + key.p_image;
            });
            this.props.product.map((key) => {
                console.log(key);
            });
        }
        return (
            <>
                <HomePageBodyComp 
                getNonVeg = {this.getNonVeg}
                getAllVeg = {this.getAllVeg}
                getVeg = {this.getVeg}
                data={this.state.product}
                addProduct={this.addProduct}
                type = {this.state.type} 
                preference_type = {this.state.preference_type}
                />
            </>
        );
    }
}

const HomePageBodyComp = (props) => {
    return (
        <div className="container" style={{marginTop:'10%'}}>
            <div className="row">
                <div className="col-lg-3">
                    <h1 className="my-4 font-mono textfood">FoodShala</h1>

                    <div className="list-group list">
                        <a className="list-group-item">
                       <b> Select Preference Type</b>
                        </a>
                    </div>
                    <div className={props.preference_type == 'veg'?"list-group list selected":"list-group list"}>
                    <button type="button" onClick ={props.getVeg} className={props.preference_type == 'veg'?"list-group-item selected":"list-group-item"}>
                            Veg
                        </button>
                    </div>
                    <div className={props.preference_type == 'nonveg'?"list-group list selected":"list-group list"}>
                        <button type="button" onClick ={props.getNonVeg} className={props.preference_type == 'nonveg'?"list-group-item selected":"list-group-item"}>
                            Non-veg
                        </button>
                    </div>
                    <div className={props.preference_type == 'all'?"list-group list selected":"list-group list"}>
                    <button type="button" onClick ={props.getAllVeg}  className={props.preference_type == 'all'?"list-group-item selected":"list-group-item"}>
                           All-Item
                        </button>
                    </div>
                </div>

                <div className="col-lg-9">
                
                    <div className="row">
                        {props.data && (
                            <>
                                {" "}
                                {props.data.map((book) => (
                                    <div className="col-lg-4 col-md-6 mb-4">
                                        <div className="card h-100">
                                            <a href="#">
                                                <img className="card-img-top productImg" src="https://images.everydayhealth.com/images/diet-nutrition/paleo-diet/paleo-diet-sample-menu-where-to-find-recipes-722x406.jpg" alt="product image" />
                                            </a>
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    <a href="#" style={{ fontSize: "18px" }}>
                                                        {book.p_name}
                                                    </a>
                                                    <span className="ml-4 uppercase badge badge-pill badge-success" style={{ fontSize: "12px", textTransform: "uppercase" }}>
                                                        {book.p_category}
                                                    </span>
                                                </h4>
                                                <p>
                                                    <span style={{ fontFamily: "Arial" }}>₹</span>
                                                    {book.p_price}
                                                </p>
                                                <p className="card-text more">{book.p_description}</p>
                                            </div>
                                            <div className="card-footer">
                                                <form action method="POST">
                                                    <small className="text-muted">
                                                        <span className="fa fa-star checked" />
                                                        <span className="fa fa-star checked" />
                                                        <span className="fa fa-star checked" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                    </small>
                                                    {props.type == "Customers" &&
                                                    <button type="button" onClick={props.addProduct} className="btn btn-primary btn-sm ml-4 addtocart" name={book.p_price} value={book.p_id}>
                                                        Add to Cart
                                                    </button>
                                                    }
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        <div className="row mt-2 mb-5 justify-content-center">
                            <div className="col-md-12 mb-5 text-right">
                                <nav aria-label="Page navigation" className="page">
                                    <ul className="pagination pageCenter">
                                       
                                        <li className="page-item">
                                            <a className="page-link" href="i"></a>
                                        </li>
                                       
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.error("Store State===>", state);
    return { product: state.auth.allProduct, auth: state.auth };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllProduct: (page_no) => dispatch(getAllProduct(page_no)),
        addTocart: (data) => dispatch(addTocart(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);
