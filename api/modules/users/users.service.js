const SQL_QUERIES = {
  GET_USERS: "select * from register",
  GET_USER_BY_EMAIL: "select * from register where email = ?",
  GET_USER_BY_ID: "select * from users where user_id = ?",
  UPDATE_USER: "UPADTE register SET name = ?, phone = ?, password = ? WHERE id = ? ",
  DELETE_USER: "delete from users where user_id = ?",
  CREATE_USER: "INSERT INTO register SET ?",
  ORDER_JOIN: "SELECT product_id,payment FROM cart_product_mapping WHERE cart_id = ? ",
  ORDER_INSERT: "INSERT INTO `orders` (cart_id,product_id,customer_id,payment) VALUES (?,?,?,?)",
  DELETE_CART: "DELETE FROM cart WHERE cart_id = ? ",
  GET_USER_BY_ID: "select * from register where id = ? ",
  CART_INSERT: "INSERT INTO `cart` (product_id,register_id) value (?,?) ",
  CART_DELETE: "DELETE FROM cart WHERE cart_id=$del AND register_id = ? ",
  CREATE_CART: "INSERT INTO cart (register_id) VALUE (?)",
  GET_CART_BY_CUST_ID: "SELECT cart_id FROM cart WHERE register_id = ?",
  ADD_TO_CART: "INSERT INTO cart_product_mapping (cart_id,product_id,payment) VALUE (?,?,?)",
  DELETE_FROM_CART: "DELETE FROM cart_product_mapping  WHERE cart_id=? AND product_id = ? ",
  GET_ALL_USERS: "SELECT register.name,register.address,product.p_id,product.p_name,product.p_category,product.p_price,product.p_description,product.p_title,product.p_image FROM product INNER JOIN register ON  product.rest_id = register.id ",
  GET_ALL_USERS_VEG: "SELECT register.name,register.address,product.p_id,product.p_name,product.p_category,product.p_price,product.p_description,product.p_title,product.p_image FROM product INNER JOIN register ON  product.rest_id = register.id WHERE product.p_category = 'veg' ",
  GET_ALL_USERS_NON: "SELECT register.name,register.address,product.p_id,product.p_name,product.p_category,product.p_price,product.p_description,product.p_title,product.p_image FROM product INNER JOIN register ON  product.rest_id = register.id WHERE product.p_category = 'non-veg' ",
  INSERT_INTO_PRODUCT: "INSERT INTO product (rest_id,p_name,p_category,p_price,p_description,p_title,p_image) VALUES (?,?,?,?,?,?,?)",
  DELETE_FROM_PRODUCT: "DELETE FROM product WHERE p_id=?",
  GET_ALL_ORDER: "SELECT orders.customer_id, product.rest_id,product.p_id,product.p_name,product.p_description,product.p_category,product.p_price,product.p_title,product.p_image,register.id,register.name,register.address,orders.order_id,register.email,register.phone,register.res_type,orders.created_at FROM ((orders INNER JOIN product ON orders.product_id = product.p_id) INNER JOIN register ON orders.customer_id = register.id )",
  GET_ALL_PRODUCT:"SELECT *FROM product ",
  GET_USER_CART_ITEM: "SELECT product.p_name,product.p_category,product.p_price,product.p_description,product.p_title,product.p_image,cart_product_mapping.product_id FROM product INNER JOIN cart_product_mapping ON product.p_id = cart_product_mapping.product_id WHERE cart_product_mapping.cart_id=?",
  UPDATE_PRODUCT : "UPDATE product SET  p_name=? ,p_category=?, p_price=? , p_description=?  WHERE p_id=?",
  
}


/**
* API to create new user 
*/

const getAllCartItem = (db,cart_id) => {

  return db.query(SQL_QUERIES.GET_USER_CART_ITEM,parseInt(cart_id));

}
const getAllOrder = (db) => {

  return db.query(SQL_QUERIES.GET_ALL_ORDER);

}
const getAllProduct = (db) => {

  return db.query(SQL_QUERIES.GET_ALL_PRODUCT);

}
const updateProduct = (db,data)=>{

    return  db.query(SQL_QUERIES.UPDATE_PRODUCT,data);
}
const addProduct = (db, parms) => {

  return db.query(SQL_QUERIES.INSERT_INTO_PRODUCT, parms);

}
const deleteProduct = (db, parms) => {

  return db.query(SQL_QUERIES.DELETE_FROM_PRODUCT, parms);

}
const getAllUsers = (db, page_name) => {
      if(page_name == 'all'){
        return db.query(SQL_QUERIES.GET_ALL_USERS);
      }
      else if(page_name == 'veg'){
        return db.query(SQL_QUERIES.GET_ALL_USERS_VEG);
      }
      else{
        return db.query(SQL_QUERIES.GET_ALL_USERS_NON);
      }
 
}

const getUsersService = (db) => {
  return db.query(SQL_QUERIES.GET_USERS);
}

const checkUser = (db, email) => {

  return db.query(SQL_QUERIES.GET_USER_BY_EMAIL, email);
}



const registerUser = (db, newUser) => {

  let params = Object.keys(newUser).map(key => newUser[key]);
  return db.query(SQL_QUERIES.CREATE_USER, newUser);
}


const getAllProductsByCartId = (db, cart_id) => {

  return db.query(SQL_QUERIES.ORDER_JOIN, cart_id);

}

const createOrdersService = (db, params) => {

  return db.query(SQL_QUERIES.ORDER_INSERT, params);
}

const delete_cart = (db, id) => {

  return db.query(SQL_QUERIES.DELETE_CART, id);
}

const createCartByCustId = (db, reg_id) => {

  return db.query(SQL_QUERIES.CREATE_CART, reg_id);
}

const findCartByCustId = (db, cust_id) => {

  console.log('cust id', cust_id);
  return db.query(SQL_QUERIES.GET_CART_BY_CUST_ID, cust_id);

}
const get_user_by_id = (db, id) => {
  
  return db.query(SQL_QUERIES.GET_USER_BY_ID, id);
}

const update_user = (db, user) => {


  let params = Object.keys(user).map(key => user[key]);
  return db.query(SQL_QUERIES.UPDATE_USER, params);
}

const addToCart = (db, cart_id, prod_id, payment) => {

  return db.query(SQL_QUERIES.ADD_TO_CART, [cart_id, prod_id, payment]);
}


const deleteFromCart = (db, cart_id, prod_id) => {

  return db.query(SQL_QUERIES.DELETE_FROM_CART, [cart_id, prod_id]);
}



module.exports = {
  deleteProduct,
  addProduct,
  getAllUsers,
  createOrdersService,
  deleteFromCart,
  addToCart,
  findCartByCustId,
  createCartByCustId,
  getUsersService,
  update_user,
  checkUser,
  registerUser,
  getAllProductsByCartId,
  delete_cart,
  get_user_by_id,
  getAllOrder,
  getAllProduct,
  getAllCartItem,
  updateProduct
};