const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = 8000;


// Database Config

const sequelize = new Sequelize('fountane', 'navaneethnivol', 'Admin123', {
    host: 'localhost',
    dialect: 'postgres'
});

// Database connection 

sequelize.authenticate()
.then( ()=> {
    console.log("Database Connected");
}).catch( err => {
    console.error('unable to connect to Database');
});


// Creating DB schemas and Creating Tables


const User = sequelize.define('users',{

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

const Car = sequelize.define('cars',{

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


app.get('/api/user/data',async function (req,res) {

    let query = {};

   try {

       if(req.query.id)
       {
           query.id = req.query.id;
       }
      
       values =  await User.findAll();

        res.status(200).json({
            success: true,
            data: values
        })

   } catch(err){
    
        console.log(err);

        res.status(500).json({
            success: false,
            error: `internal server ERROR: ${err} `
        });
   }
})

app.get('/api/car/data', async function (req,res) {

    let query = {};

   try {

        if(req.query.id)
        {
            query.id = req.query.id;
        }

       values = await Car.findAll({
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