//------------------------------------------------------------------------------
// Assumed ideal scenario! Try to incorporste the error handling mechanism!
//------------------------------------------------------------------------------
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//------------------------------------------------------------------------------
// The static files are stored in the "public" directory!
//------------------------------------------------------------------------------
app.use(express.static("public"));
//------------------------------------------------------------------------------
// Connecting to the database!
//------------------------------------------------------------------------------
mongoose.connect("mongodb://localhost:27017/todoDB",{useNewUrlParser: true, useUnifiedTopology: true});
// First Schema!
const loginSchema = new mongoose.Schema({
  handle: String,
  pw: String
});
const loginInfo = mongoose.model("loginInfo", loginSchema);
//

// Second Schema!
const listSchema  = new mongoose.Schema({
  handle: String,
  lists: [String]
});
const listInfo = mongoose.model("listInfo",listSchema);
//

// Third Schema!
const todoSchema = new mongoose.Schema({
  handle: String,
  listName: String,
  content: String
});
const todoInfo = mongoose.model("todoInfo",todoSchema);

// Fourth Schems!
const nameSchema = new mongoose.Schema({
  handle: String,
  name: String
});
const nameInfo = mongoose.model("nameInfo",nameSchema);
//------------------------------------------------------------------------------
// Get requests!
//------------------------------------------------------------------------------
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});

app.get("/signup.html",function(req,res)
{
  res.sendFile(__dirname+"/public/signup.html");
});
//------------------------------------------------------------------------------
// Post requests!
//------------------------------------------------------------------------------
// Log in request!
app.post("/",function(req,res)
{
  // Log info!
  console.log("The information entered to login is: ");
  console.log("Handle: "+req.body.handle);
  console.log("Password: "+req.body.pw);
  //
  var inputHandle = req.body.handle;
  var inputPw = req.body.pw;
  // const inputLoginInfo = new loginInfo({handle: inputHandle, pw: inputPw}); --> Login object!
  loginInfo.exists({handle: inputHandle, pw: inputPw}, function(err,result)
  {
    if(err)
      res.send("There seems to be some error! Please try later!");
    else
    {
      console.log("The result of login is: ");
      console.log(result);
      if(result)
        res.send("You have logged in!");
      else
        res.send("Either the handle or password is incorrect!");
    }
  });
});
//
// Sign up request!
app.post("/signup.html",function(req,res)
{
  // Log info!
  console.log("The information entered to sign-up is: ");
  console.log("Name: "+req.body.name);
  console.log("Password: "+req.body.pw);
  console.log("Handle: "+req.body.handle);
  //
  var inputName = req.body.name;
  var inputPw = req.body.pw;
  var inputHandle = req.body.handle;
  // Check if the "handle" is a unique one or not!
  loginInfo.exists({handle: inputHandle},function(err,result)
  {
      if(err)
        res.send("There seems to be some error! Please try later!");
      else
      {
        console.log("Stage1-No Error!");
        if(result)
          res.send("This handle already exists!");
        else
        {
            // If the data can be used to signup some one then the below code works!
            const inputNameInfo = new nameInfo({handle: inputHandle, name: inputName});
            const inputLoginInfo = new loginInfo({handle: inputHandle, pw: inputPw});
            console.log("Stage2-No Error!");
            nameInfo.create(inputNameInfo,function(err1,result)
            {
              if(err1)
                res.send("There seems to be some error! Please try later!");
              else
              {
                console.log("Stag3-No Error!");
                console.log("The result of nameInfo entering is: ")
                console.log(result);
              }
            });
            loginInfo.create(inputLoginInfo,function(err2,result)
            {
              if(err2)
                res.send("There seems to be some error! Please try later!");
              else
              {
                console.log("Stag4-No Error!");
                console.log("The result loginInfo entering is: ");
                console.log(result);
                res.send("Successfully signed up!");
              }
            });
        }
      }
  });
});
//------------------------------------------------------------------------------
// Server is listening!
//------------------------------------------------------------------------------

app.listen(3000,function()
{
  console.log("Server is running on the port 3000!");
});
//------------------------------------------------------------------------------
