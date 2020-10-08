import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProduct from './addProduct';
import ViewOrder from './viewOrders';
import ViewProduct from './viewProduct';

class Resturant extends Component{
    constructor(props){
        super()
        this.state={}
    }
    render(){
        return(  
            <>
            {this.props.location.pathname=="/resturant/addProduct" && <AddProduct history={this.props.history} />}
            {this.props.location.pathname=="/resturant/viewProduct" && <ViewProduct history={this.props.history} /> }
            {this.props.location.pathname=="/resturant/viewOrder" && <ViewOrder history={this.props.history} /> }
              </>
        )
    }
}

export default Resturant;