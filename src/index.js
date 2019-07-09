const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require ('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
//initializations
const app = express();
require('./database');
require('./controller/useraccess');
//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'templates'),
    extname:'.hbs'
}));
app.set('view engine', '.hbs');

//Midlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//Global Variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user= req.user || null;
    next();

})

//Routes
app.use(require('./controller/index'));
app.use(require('./controller/appointment'));
app.use(require('./controller/users'));
//Static Files
app.use(express.static(path.join(__dirname, 'public')));
//Server is listening
app.listen(app.get('port'), ()=> {
    console.log('VirtualServer conectado en el puerto', app.get('port'));
});