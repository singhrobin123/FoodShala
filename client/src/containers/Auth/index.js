import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBarComp } from '../../components/header';
import Item from '../Home/Item';
import Navbar from '../pages/navbar';
import Login from './login';
import Register from './register';


class Auth extends Component{
    constructor(props){
        super()
        this.state={

        }
    }
    render(){
        return(  
            <>
             {/* <NavBarComp /> */}
             <Navbar />
            {this.props.location.pathname=="/auth/login" && <Login history={this.props.history} />}
            {this.props.location.pathname=="/auth/register" && <Register history={this.props.history} />}
            <Item />
              </>
        )
    }
}

export default Auth;