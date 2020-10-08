import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './Dashboard';

class Home extends Component{
    constructor(props){
        super()
        this.state={
                 
        }
    }
    render(){console.log("getting")
        return(  
            <>
            {this.props.location.pathname == "/home/Dashboard" && <Dashboard history={this.props.history} />}
              </>
        )
    }
}

export default Home;