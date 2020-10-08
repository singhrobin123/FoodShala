const {
	deleteProduct,
	addProduct,
	createOrdersService,
	getAllUsers,
	getAllProductsByCartId,
	deleteFromCart,
	createCartByCustId,
	addToCart,
	findCartByCustId,
	getUsersService,
	update_user,
	checkUser,
	registerUser,
	delete_cart,
	get_user_by_id,
	getAllOrder,
	getAllProduct,
	getAllCartItem,
	updateProduct
} = require("./users.service");
const {
	hash,
	compare
} = require("bcrypt");
const {
	sign
} = require("jsonwebtoken");
const {
	use
} = require("passport");
const registerController = async (req, res) => {
	try {
		let user_type = req.body.user_type;
		console.log("getting",req.body);
		if (user_type == 'Customer') {

			console.log('Customer', req.body);
			let db = req.app.get("db");
			let user = await checkUser(db, req.body.email);
			console.log("get User",user);
			if (user && user.length == 0) {
				let password = req.body.password;
				let hashedPassword = await hash(password, 10);
				let registerdUser = await registerUser(db, {
					name: req.body.name,
					email: req.body.email,
					phone: req.body.phone,
					address: req.body.address,
					res_type: req.body.preference,
					password: hashedPassword
				});
				console.log("which error",registerdUser.insertId);
				if (registerdUser.insertId) {
					let user_ = await checkUser(db, req.body.email);
					let getCartId = await createCartByCustId(db, user_[0].id);
			     	console.log("cart id",getCartId);
					let jwtToken = sign({
						customer_id: user_[0].id,
						resturant: user_[0].name,
						preference: user_[0].res_type,
						login_type: 'Customers'
					}, process.env.JWT_KEY);
					return res.json({
						success: true,
						message: "User logged in successfully",
						accessToken: jwtToken,
						userCartId : getCartId.insertId,
						type : "Customers"
					})
				} else {
					res.status(200).json({
						success: false,
						data: "something went wrong!",
						type : "Customers"
					});
				}
			} else {
				res.status(200).json({
					success: true,
					message: "User already exist.",
					data: null,
					type : "Customers"
				});
			}
		} else if (user_type == 'Resturant') {
			console.log('Res', req.body);
			let db = req.app.get("db");
			let user = await checkUser(db, req.body.email);
			if (user && user.length == 0) {
				let password = req.body.password;
				let hashedPassword = await hash(password, 10);
				let registerdUser = await registerUser(db, {
					name: req.body.name,
					email: req.body.email,
					phone: req.body.phone,
					address: req.body.address,
					password: hashedPassword
				});
				if (registerdUser.insertId) {
					let user_ = await checkUser(db, req.body.email);
					let jwtToken = sign({
						resturant_id: user_[0].id,
						resturant: user_[0].name,
						login_type: 'Resturants'
					}, process.env.JWT_KEY);
					return res.json({
						success: true,
						message: "User logged in successfully",
						accessToken: jwtToken,
						type : "Resturants"
					})
				} else {
					res.status(200).json({
						success: false,
						data: "something went wrong",
						type : "Resturants"
					});
				}
			} else {
				res.status(200).json({
					success: true,
					message: "User already exist.",
					data: null,
					type : "Resturants"
				});
			}
		} else {
			console.log('Error', req.body);
			return res.status(500).json({
				success: false,
				message: "Something went wrong!",
				type : ""
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something went wrong",
			type : ""
		})
	}
}
const loginUserController = async (req, res) => {
	try {
		let db = req.app.get("db");
		let usertype = req.body.usertype;
		let email = req.body.email;
		let password = req.body.password;
		let res_type = req.body.res_type;
		let hashpass = await hash(password, 10);
		if (usertype == 'Customer') {
			let user = await checkUser(db, req.body.email);
			let isPasswordValid = await compare(password, user[0].password);
			if (user && user.length == 1) {
				if (!isPasswordValid) {
					return res.json({
						success: false,
						message: "Invalid password",
						type :" Customers"
					});
				}
				// if (res_type != user[0].res_type) {
				// 	return res.json({
				// 		success: false,
				// 		message: "Invalid res_type"
				// 	});
				// }
				let getCartId = await createCartByCustId(db, user[0].id);
				console.log("cart id",getCartId);
				let jwtToken = sign({
					customer_id: user[0].id,
					resturant: user[0].name,
					preference: user[0].res_type,
					login_type: 'Customers'
				}, process.env.JWT_KEY);
				return res.json({
					success: true,
					message: "User logged in successfully",
					accessToken: jwtToken,
					userCartId:getCartId.insertId,
					type :" Customers"
				})
			} else {
				return res.status(200).json({
					message: "Email not found",
					type :" Customers"
				});
			}
		} else if (usertype == 'Resturant') {
			console.log(req.body);
			let user = await checkUser(db, req.body.email);
			console.log(user);
			console.log(hashpass);
			let isPasswordValid = await compare(password, user[0].password);
			if (user && user.length == 1) {
				if (!isPasswordValid) {
					return res.json({
						success: false,
						message: "Invalid password",
						type :"Resturants"
					});
				}
				let jwtToken = sign({
					resturant_id: user[0].id,
					resturant: user[0].name,
					login_type: 'Resturants'
				}, process.env.JWT_KEY);
				return res.json({
					success: true,
					message: "User logged in successfully",
					accessToken: jwtToken,
					type :"Resturants"
				})
			} else {
				return res.status(200).json({
					message: "Email not found",
					type :"Resturants"
				});
			}
		} else {
			return res.status(500).json({
				message: "Something went wrong!",
				type :"Resturants"
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "something went wrong.",
			type :""
		});
	}
}
const getUsersController = async (req, res) => {
	try {
		let db = req.app.get("db");
		let response = await getUsersService(db);
		console.log(req.app.get('user'));
		if (response.length > 0) {
			return res.json({
				success: true,
				data: response
			})
		} else {
			return res.status(500).json({
				success: false,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: "Something went wrong"
		})
	}
}
const createOrderController = async (req, res) => {
	try {
		console.log("createOrder");
		let db = req.app.get("db");
		let cart_id = req.body.cart_id;
		let user = req.app.get('user');
		let customer_id = user.customer_id;
		let response = await getAllProductsByCartId(db, parseInt(cart_id));
		let list = [];
		if (response.length > 0) {
			for (let i = 0; i < response.length; i++) {
				console.log('payment ', response[i].payment);
				let params = [cart_id, response[i].product_id, customer_id, response[i].payment];
				let serviceResponce = await createOrdersService(db, params);
				if (serviceResponce.insertId) {
					list.push(true);
				} else {
					list.push(false);
				}
			}
			for (let i = 0; i < list.length; i++) {
				if (list[i] === false) {
					return res.status(500).json({
						success: false,
						message: "Something went wrong during insert"
					})
				}
			}
			for (let i = 0; i < response.length; i++) {
				let deleteResponse = await deleteFromCart(db, cart_id, response[i].product_id);
			}
			return res.json({
				success: true,
				message: "Order Created successfully"
			})
		} else {
			return res.status(500).json({
				success: false,
				message: "Something went wrong because"
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something went wrong!"
		})
	}
}
const createCart = async (req, res) => {
	try {
		let db = req.app.get("db");
		let user = req.app.get('user');
		let cust_id = user.customer_id;
		console.log('cust = ', user);
		let iscart = await findCartByCustId(db, cust_id);
		if (iscart.length > 0) {
			return res.json({
				success: true,
				data: {
					cart_id: iscart[0].cart_id
				}
			})
		}
		let response = await createCartByCustId(db, cust_id);
		console.log(req.app.get('user'));
		if (response.insertId) {
			return res.json({
				success: true,
				data: {
					cart_id: response.insertId
				}
			})
		} else {
			return res.status(500).json({
				success: false,
				message: "Something went wrong",
				data: null
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something went wrong!",
			data: null
		})
	}
}
const addCart = async (req, res) => {
	try {
		let db = req.app.get("db");
		let user = req.app.get('user');
		let prod_id = req.body.product_id;
		let cart_id = req.body.cart_id;
		let payment = req.body.price;
		let iscart = await addToCart(db, parseInt(cart_id), parseInt(prod_id), parseInt(payment));
		if (iscart.insertId) {
			let iscart = await getAllCartItem (db, cart_id)
			console.log("iscart item",iscart);
			return res.json({
				success: true,
				data:iscart,
				message: "Product added succesfully"
			})
		} else {
			return res.status(500).json({
				success: false,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something went wrong!"
		})
	}
}
const deleteCart = async (req, res) => {
	try {
		let db = req.app.get("db");
		let prod_id = req.body.prod_id;
		let cart_id = req.body.cart_id;
		let iscart = await deleteFromCart(db, cart_id, prod_id);
		console.log(iscart);
		if (iscart) {
			let iscart = await getAllCartItem (db, cart_id)
			console.error("delete Producg",iscart);
			return res.json({
				success: true,
				data:iscart,
				message: "Product deleted succesfully"
			})
		} else {
			return res.status(500).json({
				success: false,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something went wrong!"
		})
	}
}
const getAllItemController = async (req, res) => {
	try {
		let db = req.app.get("db");
		let page_no = req.params.page_no;
		let s = "veg";
		if(page_no == 0){
             s= "non-veg"
		}
		if(page_no == 1){
			s = 'all';
		}
		console.log("Hello all item",page_no);
		let iscart = await getAllUsers(db, s);
		console.log(iscart);
		if (iscart) {
			return res.json({
				success: true,
				data: iscart,
				message: "Successfully get data"
			})
		} else {
			return res.status(500).json({
				success: false,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something went wrong!"
		})
	}
}
//[p_name,p_category,p_price,p_description,p_title,p_image]
const updateProductController = async (req, res) => {
	try {
		let db = req.app.get("db");
		let user = req.app.get('user');
		let p_id = req.body.p_id;
		let Product_name = req.body.product_name;
		let category = req.body.category;
		let Product_price = req.body.price;
		let Product_desc = req.body.product_desc;
		let Product_image = req.body.product_image;
		//[p_name,p_category,p_price,p_description,p_title,p_image]
        
		let params = [Product_name, category,parseInt(Product_price), Product_desc,parseInt(p_id)];
		let iscart = await updateProduct(db, params);
		if (iscart) {
			let iscart2 = await getAllProduct(db);
			let  resturant_id = parseInt(user.resturant_id);
			if (iscart2) {
				let data = iscart2.filter((key)=>{
					return (key.rest_id == resturant_id )
				});
			return res.json({
				success: true,
				data:data,
				message: "Product added succesfully"
			})
		}
		} else {
			return res.status(500).json({
				success: false,
				data:null,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something went wrong!"
		})
	}
}

const addProductController = async (req, res) => {
	try {
		let db = req.app.get("db");
		let user = req.app.get('user');
		let rest_id = user.resturant_id;
		let Product_name = req.body.product_name;
		let category = req.body.category;
		let Product_price = req.body.price;
		let Product_desc = req.body.product_desc;
		let Product_title = req.body.product_title;
		let Product_image = req.body.product_image;
		let params = [rest_id, Product_name, category, Product_price, Product_desc, Product_title, Product_image];
		let iscart = await addProduct(db, params);
		if (iscart.insertId) {
			return res.json({
				success: true,
				message: "Product added succesfully"
			})
		} else {
			return res.status(500).json({
				success: false,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something went wrong!"
		})
	}
}

const deleteProductController = async (req, res) => {
	try {
		let db = req.app.get("db");
		let user = req.app.get('user');
		let p_id = req.body.p_id;
		let iscart = await deleteProduct(db,parseInt(p_id));
		if (iscart) {
			let iscart2 = await getAllProduct(db);
			let  resturant_id = parseInt(user.resturant_id);
			if (iscart2) {
				let data = iscart2.filter((key)=>{
					return (key.rest_id == resturant_id )
				});
			return res.json({
				success: true,
				data:data,
				message: "Product delete succesfully"
			})
		}
		} else {
			return res.status(500).json({
				success: false,
				data:null,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			data:null,
			message: "Something went wrong!"
		})
	}
}


const historyOrderController = async (req, res) => {
	try {
		let db = req.app.get("db");
	    console.log("database controller",req.params);
		let user = req.app.get('user');
		customer_id = user.customer_id;
		console.log("Hello all itemmmmm",customer_id);
		let iscart = await getAllOrder(db);
		if (iscart) {
			let data = iscart.filter((key)=>{
				return (key.customer_id == parseInt(customer_id ))
			});
			return res.json({
				success: true,
				data: data,
				message: "Successfully get data"
			})
		} else {
			return res.status(500).json({
				success: false,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		console.log('hello jaan');
		return res.status(500).json({
			success: false,
			message: "Something went wrong!"
		})
	}
}
const getAllOrderController = async (req, res) => {
	try {
		let db = req.app.get("db");
		console.log("database controller",req.params);
		resturant_id = req.params.resturant_id;
		console.log("Hello all item");
		let iscart = await getAllOrder(db);
		console.log(iscart);
		if (iscart) {
			let data = iscart.filter((key)=>{
				return (key.rest_id == resturant_id )
			});
			console.log(data);
			return res.json({
				success: true,
				data: data,
				message: "Successfully get data"
			})
		} else {
			return res.status(500).json({
				success: false,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something went wrong!"
		})
	}
}
const getAllProductController = async (req, res) => {
	try {
		let db = req.app.get("db");
		let user = req.app.get('user');
		console.log("Hello all Product",user);
		let iscart = await getAllProduct(db);
		let  resturant_id = parseInt(user.resturant_id);
		console.log(iscart);
		if (iscart) {
			let data = iscart.filter((key)=>{
				return (key.rest_id == resturant_id )
			});
			return res.json({
				success: true,
				data: data,
				message: "Successfully get data"
			})
		} else {
			return res.status(500).json({
				success: false,
				data:null,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			data:null,
			message: "Something went wrong!"
		})
	}
}

const getCartItemController = async (req, res) => {
	try {
		let db = req.app.get("db");
		let cart_id = req.params.cart_id;
		console.log("Hello all item",cart_id);
		let iscart = await getAllCartItem (db, cart_id);
		console.log(iscart);
		if (iscart.length>=0) {
			return res.json({
				success: true,
				data: iscart,
				message: "Successfully get Cart data"
			})
		} else {
			return res.status(500).json({
				success: false,
				message: "Something went wrong"
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Something went wrong!"
		})
	}
}

// api
module.exports = {
	getAllProductController,
	getAllOrderController,
	addProductController,
	deleteProductController,
	getAllItemController,
	createOrderController,
	deleteCart,
	addCart,
	createCart,
	getUsersController,
	registerController,
	loginUserController,
	getCartItemController,
	updateProductController,
	historyOrderController
};