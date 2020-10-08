const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,

});
// console.log("connection =>",pool);
// test = async ()=>{
//     let s = await pool.query("Select *from register");
//    console.log("pool res=>",s);
// }
// test();
pool.query = util.promisify(pool.query);

module.exports = pool;