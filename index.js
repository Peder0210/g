const express = require('express');
const app = new express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Peder:0210db@cluster0-44h0p.mongodb.net/my_database',{useNewUrlParser:true});
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const customMiddleWare = (req,res,next) =>{
    console.log('Custom middle ware called');
    next()
};
const validateMiddleWare = (req,res,next)=>{
    if(req.files == null || req.body.title == null || req.body.title == null){
        return res.redirect('/posts/new')
    }
    next()
};
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const flash = require('connect-flash');

app.use(flash());
global.loggedIn = null;
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(customMiddleWare);
app.use('/posts/store',validateMiddleWare);
app.use(expressSession({
    secret: 'keyboard cat'
}));

app.use('*', (req, res, next)=>{
    loggedIn = req.session.userId;
    next()
    });
app.set('view engine','ejs');
app.use(express.static('puplic'));
app.listen(4000, () => {
    console.log('App listening on port 4000')
})
app.get('/',homeController);


app.get('/post/:id',getPostController);

app.get('/posts/new',authMiddleware,newPostController);

app.post('/posts/store', authMiddleware, storePostController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController);

app.get('/auth/logout', logoutController);

app.use((req,res)=>res.render('notfound'));