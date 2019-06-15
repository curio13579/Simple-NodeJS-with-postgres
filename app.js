var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var nunjucks = require("nunjucks");
// var session = require('express-session');
// var fileUpload = require('express-fileupload');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(logger('dev'));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileUpload());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


const port = 8000;


// Database Config

const sequelize = new Sequelize('fountane', 'postgres', 'Sai123', {
    host: 'localhost',
    dialect: 'postgres'
  });

// Database connection 

sequelize.authenticate().then( ()=> {
    console.log("Database Connected");
}).catch( err => {
    console.error('unable to connect to Database');
});


// Creating DB schemas and Creating Tables


const User = sequelize.define('user',{

    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    mono: Sequelize.STRING,
    
    },{
        timestamps: false
});

const Car = sequelize.define('car',{

    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cName: Sequelize.STRING,
    model: Sequelize.STRING,
    year: Sequelize.STRING
    
    },{
        timestamps: false
});


// sequelize.sync({
//     force: true
// });


// Done with Database


app.listen(port, (req,res) => {
    console.log(`server started on port ${port}`);
});


app.get('/', function (req,res) {
    res.status(200).json({
        success: true,
        data: "Home Url"
    });
});


app.get('/api/user/data', function (req,res) {

    let query = {};

   try {

       if(req.query.id)
       {
           query.id = req.query.id;
       }
      
       values = User.findAll({
           raw: true,
           plain: true
       });

        console.log("Values Are:");
        console.log(values);

        res.status(200).json({
            success: true,
            data: values
        })

   } catch (err) {

        res.status(500).json({
            success: false,
            error: `internal server ERROR: ${err} `
        });
   }
})

app.get('/api/car/data', function (req,res) {

    let query = {};

   try {

       values = Car.findAll({
           where: query
        })

        res.status(200).json({
            success: true,
            data: values
        })

   } catch (err) {

        res.status(500).json({
            success: false,
            error: `internal server ERROR: ${err} `
        });
   }
})


app.post('/api/post/user', async function (req, res) {

    try {

        let dataObj = {
            id: req.body.id,
            name: req.body.name,
            mono: req.body.mono
        }
    
        let createdData = await User.create(dataObj);

        res.status(200).json({
            success: true,
            data: createdData
        })
        
    } catch (err) {

        res.status(500).json({
            success: false,
            error: `internal server ERROR: ${err} `
        });   
    }
})


app.post('/api/post/car', async function (req, res) {

    try {

        let dataObj = {
            id: req.body.id,
            cName: req.body.cName,
            model: req.body.model,
            year: req.body.year
        }
    
        let createdData = await Car.create(dataObj);

        res.status(200).json({
            success: true,
            data: createdData
        })
        
    } catch (err) {

        res.status(500).json({
            success: false,
            error: `internal server ERROR: ${err} `
        });   
    }
})