const router = require("express").Router();
const {
    authorization
} = require("../../config/middlewares/authorization");

const {
    addProductController,
    deleteProductController,
    getAllItemController,
    createOrderController,
    deleteCart,
    addCart,
    createCart,
    registerController,
    loginUserController,
    getUsersController,
    getAllOrderController,
    getAllProductController,
    getCartItemController,
    updateProductController,
    historyOrderController
} = require("./users.controller");

router.route("/").get(authorization, getUsersController);
router.route("/get-all-order/:resturant_id").get(authorization,getAllOrderController);
router.route("/get-all-product").get(authorization,getAllProductController);
router.route("/add-product").post(authorization,addProductController);
router.route("/get-history-order").post(authorization,historyOrderController);
router.route("/delete-product").post(authorization, deleteProductController);
router.route("/update-product").post(authorization, updateProductController);
router.route("/get-all-Item/:page_no").get(getAllItemController);
router.route("/get-cart-Item/:cart_id").get(getCartItemController);
router.route("/register").post(registerController);
router.route("/login").post(loginUserController);
router.route('/create-cart').get(authorization, createCart);
router.route('/add-product-to-cart').post(authorization, addCart);
router.route('/delete-product-from-cart').post(authorization, deleteCart);
router.route('/create-order').post(authorization, createOrderController);

// router.route("/update").put(authorization,updateUserController);
// router.route("/delete").delete(authorization,deleteUserController);
module.exports = router;