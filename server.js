require("dotenv").config();
const express = require("express");
const db = require("./api/config/db");

const apiRouter = require("./api/index.route");
const cors = require('cors');
const path = require('path');


//Initialize the app
const app = express();
app.use(express.static(path.join(__dirname, 'client/build')))

// app.use(express.static(path.join(__dirname, 'build')));
//Setting database connection object on app
app.use(cors());
app.set("db",db);

//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",(req,res,next)=>{console.log("fgh78jgh");next()},apiRouter);
app.get('/*', function (req, res) {
    console.log("Hello req");
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
// app.get("/",(req,res)=>{
//     console.log("Hello");
//     res.send("HelloWorld");
// });



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})









// const express = require("express");
// require("dotenv").config();
// const bodyParser = require("body-parser");
// const path = require('path');
// const router = require('./app/routes/index.route')
// const db = require("./app/models/db");

// const app = express();

// app.set("db",db);


// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({limit: '50mb', extended: true}));


// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to phone book web application." });
// });


// app.use(passport.initialize());

// require("./app/config/passport")(passport);

// app.use("/api",router);

// // set port, listen for requests
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });





