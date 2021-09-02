const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./models/user');
const { response } = require('express');
const { findOne, findOneAndUpdate } = require('./models/user');

mongoose.connect('mongodb+srv://banao:banao123@cluster0.hyvso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
,{useNewUrlParser: true,useUnifiedTopology: true})


const db = mongoose.connection
db.on('error',(err) => {
    console.log(err);

})

db.once('open',() => {
    console.log("Db Connection successs");
})


const port = process.env.PORT || 3000


const app = express();
app.listen(port, () => {
console.log("Server is run");
});

app.set("view engine", "ejs");



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
     res.render('login.ejs');
});

app.get('/login,',(req,res) => {
    console.log("wufgwjbwejrbvbebvnvnnwvnwnevnwnvnwklwfo")
    res.render('login.ejs');
})

app.get('/register',(req,res) => {
    res.render('signup.ejs');
});

app.post('/register', (req,res) => {

    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
     
    var data = new user({
        username : username,
        email: email,
        password: password
    })
    data.save()
    .then((response) => {
        // res.json({
        //     response: response
        // })
        return res.render('login.ejs');
    })
    .catch((error) => {
        // res.json({
        //     err: error
        // })
        console.log(error)
        return res.render('register.ejs')
    })

    
});


app.post('/login', (req,res) => {
   
    var username = req.body.username;
    var password = req.body.password;

    user.findOne({username: username})
    .then((response) => {
        if(response.password == password){
            res.render('home.ejs');
        }
        else{
            res.render('login.ejs')
        }
    })
    .catch((error) => {
        console.log(error);
        res.render('login.ejs')
    })
    

});


app.get('/logout',(req,res) => {
    res.render('login.ejs');
})

app.get('/forgotPassword',(req,res) => {
    res.render('forgotPassword.ejs')
})

app.post('/forgotPassword',(req,res) => {

    var username = req.body.username;
    var password = req.body.password;

    user.findOne({username: username})
    .then((response) => {
        console.log(response);
        response['password'] = password;
        user.findOneAndUpdate({username: username},{$set: response})
        .then((response) => {

            console.log(response)
            return res.render('login.ejs')
        })
        .catch((error) => {
            console.log(error)
            return res.render('forgotPassword.ejs');
        })
       // console.log(response);
        
    })
    .catch((error) => {
    console.log(error)
    return res.render('forgotPassword.ejs')
    })
})

app.get('/newPassord/:username',(req,res) => {
    
     var username = req.params['username'];
      console.log(username);
})