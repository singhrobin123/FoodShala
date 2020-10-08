import React,{Component} from 'react';
import { authUser ,setStore} from './auth.actions';
import {connect} from 'react-redux';
import Item from '../Home/Item';
class Login extends Component{
    constructor(props){
        super()
        this.state={
          usertype:null,
          preference:null,
          email:null,
          password:null
        }
    }
    onChangeHandler = ({target}) =>{
      let {name,value} = target;
      this.setState({[name]:value});
    }
    submitBtnHandler = ({target}) => {
        this.props.authUser({usertype:this.state.usertype,email:this.state.email,password:this.state.password},"login")
    }
    componentDidMount() {
      console.log("Called mount")
      if (localStorage.getItem("jwtToken") != null) {
        console.log("History My", localStorage.getItem("jwtToken"));
                this.props.setStore();
       }
      console.log("isMount");
      if (localStorage.getItem("jwtToken") == null)
      window.$('#myModal').modal('show');
      // this.props.history.push('/pages/navbar');
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        window.$('#myModal').modal('hide');
        console.log("Ready to move");
        this.props.history.push('/home/Dashboard');
      }
    }
    render(){
        return (
        <>
    {/* <a style={{marginTop:"80px",width:"250px",alignContent:"center"}} className="nav-link btn btn-success btn-sm font-weight-bold text-white p-1 px-3" data-toggle="modal" data-target="#myModal">Login</a> */}
          <LoginModel
            usertype={this.state.usertype}
            preference={this.state.preference}
            email={this.state.email}
            password={this.state.password}
            onChangeHandler={this.onChangeHandler}
            submitBtnHandler={this.submitBtnHandler}
          />
          </>
          );
    }
}

const LoginModel = props => {

    return (
        
        <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog modal-md">
          {/* Modal content*/}
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h4 className="modal-title text-white">Login</h4>
              <button type="button" className="close text-white" data-dismiss="modal">×</button>
            </div>
            <form action="login.php" method="post">
              <div className="modal-body">
                <label htmlFor="type" className="font-weight-bold">UserType:</label>
                <div className="form-group">
                  <select name="usertype" id="usertype" className="form-control " onChange={props.onChangeHandler} value={props.usertype || "select"} required>
                    <option value = "select" >---Select User Type---</option>
                    <option value="Customer">Customer</option>
                    <option value="Resturant">Resturant</option>
                  </select>
                </div>
                <div className="form-group" id="Preference">
                  <label htmlFor="Preference" className="font-weight-bold">Preference:</label>
                  <select name="preference" id="Preferenced" className="form-control " value={props.preference || ""} onChange={props.onChangeHandler}>
                    <option value>Select Preference..</option>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-veg</option>
                  </select>
                </div>
                <label htmlFor="email" className="font-weight-bold">Email:</label>
                <div className="form-group">
                  <input type="email" name="email" id="email" className="form-control " value={props.email || ""} onChange={props.onChangeHandler} placeholder="Enter the email..." required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please Enter Currect Email.." />
                </div>
                <label htmlFor="Password" className="font-weight-bold">Password:</label>
                <div className="form-group">
                  <input type="Password" name="password" value={props.password || ""} onChange={props.onChangeHandler} id="Password" className="form-control " placeholder="Enter " title="Please Enter Currect Password.." />
                </div>
                <div className="form-group text-right">
                  <button type="button" onClick={props.submitBtnHandler} name="login" className="btn btn-success btn-sm font-weight-bold px-3">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}
const mapStateToProps = state => {
  console.log("Store State===>",state);
  return{user:state.auth.user,auth: state.auth}
}
const mapDispatchToProps = dispatch => {
  return {
    authUser:(userData,authType)=>dispatch(authUser(userData,authType)),
    setStore:() => dispatch(setStore())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);