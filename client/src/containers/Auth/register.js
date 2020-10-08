import React, { Component } from "react";
import "../../include/css/main.css";
import { authUser,setStore } from "./auth.actions";
import { connect } from "react-redux";
class Register extends Component {
    constructor(props) {
        super();
        this.state = {
            isCart: false,
            user_type: null,
            name: null,
            phone: null,
            preference: null,
            email: null,
            address: null,
            password: null,
        };
    }
    onChangeHandlerCustomer = ({ target }) => {
        let { name, value } = target;
        this.setState({ [name]: value });
    };
    onChangeHandlerResturant = ({ target }) => {
        let { name, value } = target;
        this.setState({ [name]: value });
    };
    submitBtnHandlerCustomer = ({ target }) => {
        this.props.authUser({ user_type: "Customer", name: this.state.name, phone: this.state.phone, email: this.state.email, password: this.state.password, address: this.state.address, preference: this.state.preference }, "register");
    };
    submitBtnHandlerResturant = ({ target }) => {
        this.props.authUser({ user_type: "Resturant", name: this.state.name, phone: this.state.phone, email: this.state.email, password: this.state.password, address: this.state.address }, "register");
    };
    componentDidMount() {
       if (localStorage.getItem("jwtToken") != null) {
        console.log("History My", localStorage.getItem("jwtToken"));
                this.props.setStore();
       }
    
        }
    componentWillReceiveProps(nextProps) {
        if (localStorage.getItem("jwtToken") != null) {
        console.log("componentWillReceiveProps123556", nextProps);
        console.log("NEw login", nextProps.data.isAuthenticated);
        window.$("#myModal1").modal("hide");
        window.$("#myModal2").modal("hide");
        this.props.history.push('/home/Dashboard');
        }
        else{
           // this.props.history.push('/auth');
        }
    }

    render() {
        return (
            <>
                <RegistrationHeader />
                <RegistrationBody />
                <RegisterCustomerForm
                    name={this.state.name}
                    phone={this.state.phone}
                    preference={this.state.preference}
                    email={this.state.email}
                    address={this.state.address}
                    password={this.state.password}
                    onChangeHandlerCustomer={this.onChangeHandlerCustomer}
                    submitBtnHandlerCustomer={this.submitBtnHandlerCustomer}
                />
                <RegisterResturantForm
                    name={this.state.name}
                    phone={this.state.phone}
                    email={this.state.email}
                    address={this.state.address}
                    password={this.state.password}
                    onChangeHandlerResturant={this.onChangeHandlerResturant}
                    submitBtnHandlerResturant={this.submitBtnHandlerResturant}
                />
            </>
        );
    }
}

const RegistrationHeader = (props) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow-md">
                        <div className="card-body bg-info">
                            <h2 className="text-white text-uppercase mx-4 ">
                                <i className="fas fa-users mx-3" />
                                Register Here
                                <i className="far fa-hand-point-right ml-4" />
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RegistrationBody = (props) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-4 mt-5 card-1">
                    <a href="#" className="btn rounded hover:opacity-75 " data-toggle="modal" data-target="#myModal1">
                        <div className="card shadow-lg card-1">
                            <div className="card-body bg-info card-1">
                                <h2 className="p-5 text-center text-white">CUSTOMER</h2>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-md-4 mt-5">
                    <a href="#" className="btn" data-toggle="modal" data-target="#myModal2">
                        <div className="card shadow-lg rounded card-2">
                            <div className="card-body bg-info card-2">
                                <h2 className="p-5 text-center text-white">RESTURANT</h2>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};
const RegisterCustomerForm = (props) => {
    return (
        <div id="myModal1" className="modal fade" role="dialog">
            <div className="modal-dialog modal-md">
                {/* Modal content*/}
                <div className="modal-content">
                    <div className="modal-header bg-info">
                        <h4 className="modal-title text-white">Customer Register</h4>
                        <button type="button" className="close text-white" data-dismiss="modal">
                            ×
                        </button>
                    </div>
                    <form action="#" method="POST">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor className="font-weight-bold">
                                        Name:
                                    </label>
                                    <div className="form-group">
                                        <input type="text" name="name" value={props.name || ""} onChange={props.onChangeHandlerCustomer} className="form-control" placeholder="Enter the Name.." required="required" autofocus />
                                    </div>
                                    <label htmlFor className="font-weight-bold">
                                        Phone:
                                    </label>
                                    <div className="form-group">
                                        <input type="text" name="phone" value={props.phone || ""} onChange={props.onChangeHandlerCustomer} className="form-control" placeholder="Enter the Phone.." required="required" />
                                    </div>
                                    <label htmlFor="Preference">Preference:</label>
                                    <div className="form-group">
                                        <select name="preference" id="Preference" className="form-control" value={props.preference || ""} onChange={props.onChangeHandlerCustomer} required>
                                            <option value>Select Preference..</option>
                                            <option value="veg">Veg</option>
                                            <option value="nonveg">NonVeg</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor className="font-weight-bold">
                                        Email:
                                    </label>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={props.email || ""}
                                            onChange={props.onChangeHandlerCustomer}
                                            placeholder="Enter the Email.."
                                            required="required"
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            title="Please Enter Currect Email.."
                                        />
                                    </div>
                                    <label htmlFor className="font-weight-bold">
                                        Address:
                                    </label>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="address" value={props.address || ""} onChange={props.onChangeHandlerCustomer} placeholder="Enter the Address.." required="required" />
                                    </div>
                                    <label htmlFor className="font-weight-bold">
                                        Password:
                                    </label>
                                    <div className="form-group">
                                        <input type="password" name="password" value={props.password || ""} onChange={props.onChangeHandlerCustomer} className="form-control" placeholder="Enter the Password.." required="required" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group text-right">
                                <button type="button" onClick={props.submitBtnHandlerCustomer} name="Customer" className="btn btn-success font-weight-bold p-1 px-3">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const RegisterResturantForm = (props) => {
    return (
        <div id="myModal2" className="modal fade" role="dialog">
            <div className="modal-dialog modal-md">
                {/* Modal content*/}
                <div className="modal-content">
                    <div className="modal-header bg-info">
                        <h4 className="modal-title text-white">Resturant Register</h4>
                        <button type="button" className="close text-white" data-dismiss="modal">
                            ×
                        </button>
                    </div>
                    <form action="#" method="POST">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor className="font-weight-bold">
                                                Name:
                                            </label>
                                            <div className="form-group">
                                                <input type="text" name="name" value={props.name || ""} onChange={props.onChangeHandlerResturant} className="form-control" placeholder="Enter the Name.." required="required" autofocus />
                                            </div>
                                            <label htmlFor className="font-weight-bold">
                                                Phone:
                                            </label>
                                            <div className="form-group">
                                                <input type="text" name="phone" value={props.phone || ""} onChange={props.onChangeHandlerResturant} className="form-control" placeholder="Enter the Phone.." required="required" />
                                            </div>
                                            <label htmlFor className="font-weight-bold">
                                                Password:
                                            </label>
                                            <div className="form-group">
                                                <input type="password" name="password" value={props.password || ""} onChange={props.onChangeHandlerResturant} className="form-control" placeholder="Enter the Password.." required="required" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor className="font-weight-bold">
                                                Email:
                                            </label>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={props.email || ""}
                                                    onChange={props.onChangeHandlerResturant}
                                                    placeholder="Enter the Email.."
                                                    required="required"
                                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                    title="Please Enter Currect Email.."
                                                />
                                            </div>
                                            <label htmlFor className="font-weight-bold">
                                                Address:
                                            </label>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="address" value={props.address || ""} onChange={props.onChangeHandlerResturant} placeholder="Enter the Address.." required="required" />
                                            </div>
                                            <div className="form-group mt-5 text-center">
                                                <button type="button" onClick={props.submitBtnHandlerResturant} name="resturant" className="btn btn-block btn-success font-weight-bold">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div class="modal-footer">
            <button type="button" class="btn btn-dark btn-sm font-weight-bold" data-dismiss="modal">Close</button>
          </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log("Store State===>", state);
    return { user: state.auth.user, data: state.auth, userCartId: state.auth.userCartId, registerResponseIdentifier: state.auth.registerResponseIdentifier };
};
const mapDispatchToProps = (dispatch) => {
    return {
        authUser: (userData, authType) => dispatch(authUser(userData, authType)),
        setStore:() => dispatch(setStore())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
