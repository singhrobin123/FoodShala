import React,{Component} from 'react';
import Navbar  from './navbar';
import Footer from './footer';
import Sidebar from './sidebar';
import Cart from './cart';

class Pages extends Component{
    constructor(props){
        super()
        this.state={
                 
        }
    }
    render(){
        return(  
            <>
            {this.props.location.pathname==="/pages/navbar" && <Navbar history={this.props.history} />}
            {this.props.location.pathname==="/pages/sidebar" && <Sidebar history={this.props.history} />}
            {this.props.location.pathname==="/pages/footer" && <Footer history={this.props.history} />}
            {this.props.location.pathname==="/pages/cart" && <Cart history={this.props.history} />}
            
              </>
        )
    }
}

export default Pages;