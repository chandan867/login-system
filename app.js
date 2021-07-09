const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieSession = require("cookie-session");
const ConnectDb = require("./config/db");
const User=require('./models/UserModel')
const { isLoggedIn,notLoggedIn,randmString } = require("./middlewares/protect");
const passportGoogle=require('./auth/googleauth')
const passportLocal=require('./auth/localauth');
const verify  = require("./config/nodemailer");


//require("./passport-setup");
//const {localConfig,googleConfig}=require('./passport-setup')

// making common configurations
dotenv.config();
const app = express();
app.use(express.json());
ConnectDb();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))

// the middleware for protected routes can be exported


//setting the use of session
app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// all routes start here

app.get("/", (req, res) => res.render("pages/index"));
app.get("/failed", (req, res) => res.send("You Failed to log in!"));
app.get("/profile", isLoggedIn, (req, res) => {
  res.render("pages/profile", { name: req.user.name, email: req.user.email });
});

//login using google

app.get('/google',
  passportGoogle.authenticate('google', {scope: ["profile", "email"]}));

app.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

  //login using form
  app.post('/login',passportLocal.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });
app.get('/login',(req,res)=>{
  res.render('pages/index')
})

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});


// Auth Routes through google ouath


app.get('/register', notLoggedIn, (req, res) => {
  res.render('pages/register')
})

app.post('/register',notLoggedIn, async (req, res) => {
  const {name,email,password}=req.body
  const userExists=await User.findOne({email})
  if(userExists)
  {
  return res.status(400).send({message:"user already exists"})
  }
  const randString=randmString()
  verify(name,email,randString)
  const user=await User.create({
    name,
    email,
    password,
    randString,
  })
 
  res.send({message:'user created check your mail to verify'})
})

// now the route for email verification

app.get('/confirm/:secret',async(req,res)=>{
  const secret=req.params.secret
  const user=await User.findOne({randString:secret})
  if(user)
  {
   user.isValidated=true
   await user.save()
   res.send("user validated")
  }
 else
 {
   res.send("user not found")
 }
})
const port = process.env.PORT || 8000;
app.listen(port, console.log(`server running on port ${port}`));
