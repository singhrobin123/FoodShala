import React from 'react';

  const Navbar = props =>{
        return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top smallDevice">
          <div className="container-fluid">
            <a className="navbar-brand" href="/home/Dashboard">
              <img  style ={{borderRadius:'50%',padding:'2px'}} src="data:image/jpeg;base64,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" alt="logo" width={50} height={50} className="imgSetIcon" />
              <span style = {{margin:'34px'}} className="text-info font-weight-bold white-Shadow">FoodShala</span>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav mr-auto text-uppercase font-weight-bold mx-5">
                
              </ul>
              <ul className="navbar-nav ml-auto text-uppercase">
                
                {props.type !== "Customers" && props.type !== "Resturants" &&
                <>
                <li className="nav-item">
                  <a className="nav-link btn btn-success btn-sm font-weight-bold text-white p-1 px-3 buttonLogin" href="/auth/login">Login</a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link btn btn-primary btn-sm font-weight-bold text-white p-1 px-3 buttonRegister" href="/auth/register">Register</a>
                </li> 
                </>}
               {props.type == 'Customers' && props.user.preference == 'veg' &&
             <>
             <li className="nav-item">
              <a href="/pages/cart" className="nav-link text-white  text-white pt-1 px-5 notification" data-toggle="tooltip" data-placement="bottom" >
               <svg className="svg-icon text-white" style={{fontSize: '35px', fontWeight: 'bold'}} viewBox="0 0 24 24">
                 <path fill="none" d="M9.941,4.515h1.671v1.671c0,0.231,0.187,0.417,0.417,0.417s0.418-0.187,0.418-0.417V4.515h1.672c0.229,0,0.417-0.187,0.417-0.418c0-0.23-0.188-0.417-0.417-0.417h-1.672V2.009c0-0.23-0.188-0.418-0.418-0.418s-0.417,0.188-0.417,0.418V3.68H9.941c-0.231,0-0.418,0.187-0.418,0.417C9.522,4.329,9.71,4.515,9.941,4.515 M17.445,15.479h0.003l1.672-7.52l-0.009-0.002c0.009-0.032,0.021-0.064,0.021-0.099c0-0.231-0.188-0.417-0.418-0.417H5.319L4.727,5.231L4.721,5.232C4.669,5.061,4.516,4.933,4.327,4.933H1.167c-0.23,0-0.418,0.188-0.418,0.417c0,0.231,0.188,0.418,0.418,0.418h2.839l2.609,9.729h0c0.036,0.118,0.122,0.214,0.233,0.263c-0.156,0.254-0.25,0.551-0.25,0.871c0,0.923,0.748,1.671,1.67,1.671c0.923,0,1.672-0.748,1.672-1.671c0-0.307-0.088-0.589-0.231-0.836h4.641c-0.144,0.247-0.231,0.529-0.231,0.836c0,0.923,0.747,1.671,1.671,1.671c0.922,0,1.671-0.748,1.671-1.671c0-0.32-0.095-0.617-0.252-0.871C17.327,15.709,17.414,15.604,17.445,15.479 M15.745,8.275h2.448l-0.371,1.672h-2.262L15.745,8.275z M5.543,8.275h2.77L8.5,9.947H5.992L5.543,8.275z M6.664,12.453l-0.448-1.671h2.375l0.187,1.671H6.664z M6.888,13.289h1.982l0.186,1.671h-1.72L6.888,13.289zM8.269,17.466c-0.461,0-0.835-0.374-0.835-0.835s0.374-0.836,0.835-0.836c0.462,0,0.836,0.375,0.836,0.836S8.731,17.466,8.269,17.466 M11.612,14.96H9.896l-0.186-1.671h1.901V14.96z M11.612,12.453H9.619l-0.186-1.671h2.18V12.453zM11.612,9.947H9.34L9.154,8.275h2.458V9.947z M14.162,14.96h-1.715v-1.671h1.9L14.162,14.96z M14.441,12.453h-1.994v-1.671h2.18L14.441,12.453z M14.72,9.947h-2.272V8.275h2.458L14.72,9.947z M15.79,17.466c-0.462,0-0.836-0.374-0.836-0.835s0.374-0.836,0.836-0.836c0.461,0,0.835,0.375,0.835,0.836S16.251,17.466,15.79,17.466 M16.708,14.96h-1.705l0.186-1.671h1.891L16.708,14.96z M15.281,12.453l0.187-1.671h2.169l-0.372,1.671H15.281z" />
               </svg>
               <span className="badge">
                {props.size}
               </span>
             </a> 
           </li>

             <li className="nav-item dropdown bg-dark font-normal">
             <a className="nav-link dropdown-toggle text-white font-weight-bold" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <i className="fas fa-user-tie mx-2" style={{fontSize: '25px'}} /> 
               {props.type}
             </a>
             <div className="dropdown-menu bg-info" aria-labelledby="navbarDropdown">
               <a className="dropdown-item text-white linkHover" href="#">
                 <i className="fas fa-user px-1" />
                 {props.type}
               </a>
               <div className="dropdown-divider" /> 
            
               <div className="dropdown-divider" />
      
               <a className="dropdown-item text-white linkHover" href="/pages/cart">
                 <i className="far fa-chart-bar px-1" /> View Order
               </a>
               <div className="dropdown-divider" />
               <button type = "button" className="dropdown-item text-white linkHover" onClick = {props.LogoutHandle} >Logout  
               
               </button>
             </div>
           </li>
             </>   }
              {props.type == 'Customers' && props.user.preference == 'nonveg' &&
             
             <>
             <li className="nav-item">
              <a href="" className="nav-link text-white  text-white pt-1 px-5 notification" data-toggle="tooltip" data-placement="bottom" >
               <svg className="svg-icon text-white" style={{fontSize: '35px', fontWeight: 'bold'}} viewBox="0 0 24 24">
                 <path fill="none" d="M9.941,4.515h1.671v1.671c0,0.231,0.187,0.417,0.417,0.417s0.418-0.187,0.418-0.417V4.515h1.672c0.229,0,0.417-0.187,0.417-0.418c0-0.23-0.188-0.417-0.417-0.417h-1.672V2.009c0-0.23-0.188-0.418-0.418-0.418s-0.417,0.188-0.417,0.418V3.68H9.941c-0.231,0-0.418,0.187-0.418,0.417C9.522,4.329,9.71,4.515,9.941,4.515 M17.445,15.479h0.003l1.672-7.52l-0.009-0.002c0.009-0.032,0.021-0.064,0.021-0.099c0-0.231-0.188-0.417-0.418-0.417H5.319L4.727,5.231L4.721,5.232C4.669,5.061,4.516,4.933,4.327,4.933H1.167c-0.23,0-0.418,0.188-0.418,0.417c0,0.231,0.188,0.418,0.418,0.418h2.839l2.609,9.729h0c0.036,0.118,0.122,0.214,0.233,0.263c-0.156,0.254-0.25,0.551-0.25,0.871c0,0.923,0.748,1.671,1.67,1.671c0.923,0,1.672-0.748,1.672-1.671c0-0.307-0.088-0.589-0.231-0.836h4.641c-0.144,0.247-0.231,0.529-0.231,0.836c0,0.923,0.747,1.671,1.671,1.671c0.922,0,1.671-0.748,1.671-1.671c0-0.32-0.095-0.617-0.252-0.871C17.327,15.709,17.414,15.604,17.445,15.479 M15.745,8.275h2.448l-0.371,1.672h-2.262L15.745,8.275z M5.543,8.275h2.77L8.5,9.947H5.992L5.543,8.275z M6.664,12.453l-0.448-1.671h2.375l0.187,1.671H6.664z M6.888,13.289h1.982l0.186,1.671h-1.72L6.888,13.289zM8.269,17.466c-0.461,0-0.835-0.374-0.835-0.835s0.374-0.836,0.835-0.836c0.462,0,0.836,0.375,0.836,0.836S8.731,17.466,8.269,17.466 M11.612,14.96H9.896l-0.186-1.671h1.901V14.96z M11.612,12.453H9.619l-0.186-1.671h2.18V12.453zM11.612,9.947H9.34L9.154,8.275h2.458V9.947z M14.162,14.96h-1.715v-1.671h1.9L14.162,14.96z M14.441,12.453h-1.994v-1.671h2.18L14.441,12.453z M14.72,9.947h-2.272V8.275h2.458L14.72,9.947z M15.79,17.466c-0.462,0-0.836-0.374-0.836-0.835s0.374-0.836,0.836-0.836c0.461,0,0.835,0.375,0.835,0.836S16.251,17.466,15.79,17.466 M16.708,14.96h-1.705l0.186-1.671h1.891L16.708,14.96z M15.281,12.453l0.187-1.671h2.169l-0.372,1.671H15.281z" />
               </svg>
               <span className="badge">
                {props.size}
               </span>
             </a> 
           </li>
             <li className="nav-item dropdown bg-dark font-normal">
             <a className="nav-link dropdown-toggle text-white font-weight-bold" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <i className="fas fa-user-tie mx-2" style={{fontSize: '25px'}} /> 
               {props.type}
             </a>
             <div className="dropdown-menu bg-info" aria-labelledby="navbarDropdown">
               <a className="dropdown-item text-white linkHover" href="#">
                 <i className="fas fa-user px-1" />
                 {props.type}
               </a>
               <div className="dropdown-divider" /> 
             
               <div className="dropdown-divider" />
              
               <a className="dropdown-item text-white linkHover" href="/pages/cart">
                 <i className="far fa-chart-bar px-1" /> View Order
               </a>
               <div className="dropdown-divider" />
               <button type = "button" className="dropdown-item text-white linkHover" onClick = {props.LogoutHandle} >Logout  
               
               </button>
             </div>
           </li>
             </>      }
              {props.type == "Resturants"  &&
             
             <li className="nav-item dropdown bg-dark font-normal">
             <a className="nav-link dropdown-toggle text-white font-weight-bold" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <i className="fas fa-user-tie mx-2" style={{fontSize: '25px'}} /> 
               {props.type}
             </a>
             <div className="dropdown-menu bg-info" aria-labelledby="navbarDropdown">
               <a className="dropdown-item text-white linkHover" href="#">
                 <i className="fas fa-utensils px-1" /> {props.type}
               </a>  
               <div className="dropdown-divider" />
               
               <a className="dropdown-item text-white linkHover" href="/resturant/viewOrder">
                 <i className="far fa-chart-bar px-1" /> View Order</a>
               <div className="dropdown-divider" />
               <a className="dropdown-item text-white linkHover" href="/resturant/viewProduct">
                 <i className="far fa-chart-bar px-1" /> View My Product</a>
               <div className="dropdown-divider" />
               <a className="dropdown-item text-white linkHover" href="/resturant/addProduct">
                 <i className="far fa-chart-bar px-1" /> Add Product Order</a>
                 <div className="dropdown-divider" />
               <button type = "button" className="dropdown-item text-white linkHover" onClick = {props.LogoutHandle} >Logout  
               </button>
             </div>
           </li>
                   }
                
              </ul>
            </div>
          </div>
        </nav>
        </>
    )
};


export default Navbar;