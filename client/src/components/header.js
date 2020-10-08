import React from "react";

export const Header = (props)=>{
    return(
        <nav aria-label="Page navigation" classNameName="page">
        <ul classNameName="pagination pageCenter">
          <li classNameName="page-item">
            <a href="" classNameName="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo; Previous</span>
            </a>
          </li>
          
            <li classNameName="page-item">
              <a href="" classNameName="page-link"></a>
            </li>
          
          <li classNameName="page-item">
            <a href="" classNameName="page-link" aria-label="Next">
              <span aria-hidden="true">Next &raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
}








export const NavBarComp = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container-fluid">
      <a className="navbar-brand" href="../index.php" className="font-weight-bold text-uppercase text-info">
        <img src="img/p2.png" alt="" width="50" height="50" className="imgSetIcon" />
      <span className="text-info font-weight-bold white-Shadow">FoodShala</span></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav mr-auto text-uppercase font-weight-bold mx-5">
          <li className="nav-item active">
            <a className="nav-link" href="../index.php" data-toggle="tooltip" data-placement="bottom" title="Home !">
              <i className="fas fa-home"></i> 
              <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto text-uppercase">
         
                <li className="nav-item">
                  <a className="nav-link btn btn-success btn-sm font-weight-bold text-white p-1 px-3" href="/auth/login" >Login</a>
                  </li>
                  <li className="nav-item mx-3">
                    <a className="nav-link btn btn-primary btn-sm font-weight-bold text-white p-1 px-3" href="/auth/register">Register</a>
                </li>
              
               {props.isAuthenticated &&
                <li className="nav-item dropdown bg-dark font-normal">
                  <a className="nav-link dropdown-toggle text-white font-weight-bold bg-info" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user-tie mx-2" style={{fontSize: "25px"}}></i> 
                  </a>
                  <div className="dropdown-menu bg-info" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item text-white linkHover bg-info" href="#">
                        <i className="fas fa-user px-1"></i>
                      </a>  
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item text-white linkHover bg-info" href="customer.php"><i className="fas fa-address-card px-1"></i> Profile</a>
                      <a className="dropdown-item text-white linkHover bg-info" href="../cart.php">
                        <i className="far fa-chart-bar px-1"></i> View Order</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item text-white linkHover bg-info" href="../logout.php"> <i className="fas fa-sign-out-alt"></i> Logout  </a>
                  </div>
                </li>
}
        </ul>
      </div>
    </div>
  </nav>        
    )
}
