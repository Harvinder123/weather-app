const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const login = require('./utils/login');
const register = require('./utils/register');
const contact = require('./utils/contact');
//Define Path for Express config
const public_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path);

//Setup static directory to serve
app.use(express.static(public_path));

app.get('', (req, res) => {
    res.render('index', {
        title:'Home',
        name:'Weather',
        content:'Weather App shows you the weather update about particular place.'
    })
})

app.get('/login', (req,res) => {
    res.render('login', {
        title:'Login',
        name:'Login',
        content: ''
    })
})

app.get('/register', (req,res) => {
    res.render('register', {
        title:'Register',
        name:'Register',
        content:''
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        name:'About',
        content:'About Me'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title:'Contact',
        name:'Contact',
        content:''
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error) {
            return res.send({error})
        }
        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            res.send({
                title:'Weather App',
                name:location,
                content:forecastData
            })
        })
    })
})

app.get('/signin', (req,res) => {
    if(!req.query.username || !req.query.password) {
        return res.send({
            error:'Please enter username and password'
        })
    }
    login.login(req.query.username, req.query.password, (error,data) => {
        if(error) {
            return res.send({error});
        }
        res.send({
            title:'SignIn',
            name:req.query.username,
            content:data
        })
    })
})


app.get('/registration', (req,res) => {
    if(!req.query.username || !req.query.password) {
         return res.send({
            error:'Please enter username and password'
        });
    } 
    register.register(req.query.username,req.query.password, (error, data) => {
        if(error) {
            return res.send({
                error:error
            })
        }
        res.send({
            title:'Registration',
            name:req.query.username,
            content:data
        })
    })
})


app.get('/send_mail', (req,res) => {
    if(!req.query.first_name) {
        return res.send({
           error:'Please enter first name'
       });
    } 
    if(!req.query.last_name) {
        return res.send({
           error:'Please enter last name'
       });
    } 
    if(!req.query.email) {
        return res.send({
           error:'Please enter email'
       });
    } 
    if(!req.query.message) {
        return res.send({
           error:'Please enter message'
       });
    } 
    contact.contact(req.query.first_name,req.query.last_name,req.query.email,req.query.message, (error, data) => {
        if(error) {
            return res.send({
                error:error
            })
        }
        res.send({
            title:'Registration',
            name:req.query.first_name,
            content:data
        })
    })
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name:'Help',
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus, magna ac lacinia iaculis, elit lacus pulvinar ligula, vitae lacinia est urna ac nibh. Donec lectus purus, cursus eget feugiat ut, cursus vitae risus. Etiam semper et nulla sit amet facilisis. Nullam eget nulla dapibus, condimentum nunc sed, finibus erat. Sed dignissim lobortis neque vel commodo. Ut volutpat, diam quis tristique finibus, leo magna tempus est, eget iaculis metus velit bibendum felis. Morbi faucibus vestibulum purus, ut interdum metus bibendum sed. Proin porta venenatis nulla, quis feugiat metus suscipit egestas. Duis et erat vitae quam facilisis euismod vitae a dui. In mattis, justo quis vulputate lacinia, ipsum lacus cursus enim, ac aliquet ipsum tellus a diam. Pellentesque ac euismod velit. Vivamus id sapien dui. Integer placerat sem facilisis est faucibus, sed dapibus orci ultrices. Aenean pellentesque lacus vitae aliquet finibus.'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        name:'404 Not Found',
        content:'Help Page Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404 Error',
        name:'404 Not Found',
        content:'Page Not Found'
    })
})

app.listen(port, () => { 
    console.log('Server starts running on port '+ port);
 });