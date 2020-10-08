import React, { Component } from 'react'

class Footer extends Component {
    constructor(props){
        super();
    }
    render() {
        return (
            <div>
               <div className="page-content d-flex align-items-stretch">
  {/* Side Navbar */}
  <nav className="side-navbar">
    {/* Sidebar Header*/}
    <div className="sidebar-header d-flex align-items-center">
      <div className="avatar">
        <img
          src="img/admin.png"
          alt="..."
          className="img-fluid rounded-circle"
        />
      </div>
      <div className="title">
        <h1 className="h4">{/*?php echo $_SESSION['admin']; ?*/}</h1>
        <p>Bussiness Man</p>
      </div>
    </div>
    <ul className="list-unstyled">
      <li className="active">
        <a href="view_customer.php">
          <i className="icon-user"></i>View Customer
        </a>
      </li>
      <li className>
        <a href="add_product.php">
          <i className="icon-padnote"></i>Add Product
        </a>
      </li>
      <li>
        <a href="add_category.php">
          <i className="icon-bill" />
          Add Category
        </a>
      </li>
      <li>
        <a href="view_orders.php">
          <i className="icon-interface-windows" />
          View Orders
        </a>
      </li>
      <li>
        <a href="change_slider.php">
          <i className="icon-picture" />
          Change Slider
        </a>
      </li>
      <li>
        <a href="logout.php">
          <i className="icon-paper-airplane" />
          Logout{" "}
        </a>
      </li>
    </ul>
  </nav>
</div>
            </div>
        )
    }
}

export default Footer;