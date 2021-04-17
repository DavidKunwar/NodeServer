const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://admin-david:test123@cluster0.i5tfi.mongodb.net/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = new mongoose.model('user', userSchema);

app.get('/', function(req, res){
    res.send('Successfully integrated Flutter and Node server')
});

app.post('/register', function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    //creating a new user
    const newUser = new User({
        email: email,
        password: password
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.send('Successfully created new user.')
        }
    });
});

app.post('/login', function(req, res){
    const password = req.body.password;

    User.findOne({email: req.body.email}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if(foundUser.password === password){
                    res.send('Successfully logged in.')
                }else{
                    res.send('Invalid password.')
                }
            }else{
                res.redirect('/');
            }
        }
    });
});

app.delete('/delete', function(req, res){
    User.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }else{
            res.send('Successfully delelted all users.');
        }
    });
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
    console.log("Server is up and running.");
});