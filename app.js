//------------------------------------------------------------------------------
// Assumed ideal scenario! Try to incorporste the error handling mechanism!
//------------------------------------------------------------------------------
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
//------------------------------------------------------------------------------
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
//------------------------------------------------------------------------------
// The static files are stored in the "public" directory!
//------------------------------------------------------------------------------
app.use(express.static("public"));
//------------------------------------------------------------------------------
// Connecting to the database!
//------------------------------------------------------------------------------
mongoose.connect("mongodb://localhost:27017/todoDB",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
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
// Third Schems!
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
   // Either the handle or password is wrong!
   // res.sendFile(__dirname+"/index.html");
   // detailsAreWrong: 0, because we have not yet verified the details!
   res.render("index.ejs",{someMsg: 0, message: ""});
});
app.get("/signin",function(req,res)
{
  res.render("index.ejs",{someMsg: 0, message: ""});
});
app.get("/signup",function(req,res)
{
  // res.sendFile(__dirname+"/public/signup.html");
  res.render("signup.ejs",{someMsg: 0, message: ""});
});
//------------------------------------------------------------------------------
// Post requests!
//------------------------------------------------------------------------------
// Log in request!
app.post("/",function(req,res1)
{
  // Log info!
  console.log("The information entered to login is: ");
  console.log("Handle: "+req.body.handle);
  console.log("Password: "+req.body.pw);
  //
  var inputHandle = req.body.handle;
  var inputPw = req.body.pw;
  // const inputLoginInfo = new loginInfo({handle: inputHandle, pw: inputPw}); --> Login object!
  loginInfo.exists({handle: inputHandle, pw: inputPw}, function(err2,res2)
  {
    if(err2)
      res1.render("index.ejs",{someMsg: 1, message: "There seems to be some error! Please try later!"});
    else
    {
      console.log("The result of login is: ");
      console.log(res2);
      if(res2)
      {
        listInfo.find({handle: inputHandle},function(err3,res3)
        {
          if(err3)
            res1.render("index.ejs",{someMsg: 1, message: "There seems to be some error! Please try later!"});
          else
          {
            console.log("The folowing content has been rendered:");
            console.log(res3[0].handle);
            console.log(res3[0].lists);
            res1.render("home.ejs",{userHandle: res3[0].handle,userLists: res3[0].lists});
          }
        });
      }
      else
        res1.render("index.ejs",{someMsg: 1, message: "Either the username or password is wrong!"});
    }
  });
});
//
// Sign up request!
app.post("/signup",function(req,res1)
{
  // Log info!
  console.log("The information entered to signup is: ");
  console.log("Name: "+req.body.name);
  console.log("Password: "+req.body.pw);
  console.log("Handle: "+req.body.handle);
  //
  var inputName = req.body.name;
  var inputPw = req.body.pw;
  var inputHandle = req.body.handle;
  // Check if the "handle" is a unique one or not!
  loginInfo.exists({handle: inputHandle},function(errLoginInfo,resLoginInfo)
  {
      if(errLoginInfo)
        res1.render("signup.ejs",{someMsg: 1, message: "There seems to be some error! Please try later!"});
      else
      {
        console.log("Stage1-No Error!");
        if(resLoginInfo)
          res1.render("signup.ejs",{someMsg: 1, message: "This handle already exists!"});
        else
        {
            // If the data can be used to signup someone then the below code works!
            const inputNameInfo = new nameInfo({handle: inputHandle, name: inputName});
            const inputLoginInfo = new loginInfo({handle: inputHandle, pw: inputPw});
            const inputListInfo = new listInfo({handle: inputHandle, lists: []});
            console.log("Stage2-No Error!");
            nameInfo.create(inputNameInfo,function(errName,resName)
            {
              if(errName)
                res1.render("signup.ejs",{someMsg: 1, message: "There seems to be some error! Please try later!"});
              else
              {
                console.log("Stag3-No Error!");
                console.log("The result of nameInfo entering is: ")
                console.log(resName);
              }
            });
            loginInfo.create(inputLoginInfo,function(errLogin,resLogin)
            {
              if(errLogin)
                res1.render("signup.ejs",{someMsg: 1, message: "There seems to be some error! Please try later!"});
              else
              {
                console.log("Stag4-No Error!");
                console.log("The result of loginInfo entering is: ");
                console.log(resLogin);
              }
            });
            listInfo.create(inputListInfo,function(errList,resList)
            {
              if(errList)
                res1.render("signup.ejs",{someMsg: 1, message: "There seems to be some error! Please try later!"});
              else
              {
                console.log("Stag5-No Error!");
                console.log("The result of listInfo entering is: ");
                console.log(resList);
                res1.render("signup.ejs",{someMsg: 1, message: "Successfully, signed up!"});
              }
            });
        }
      }
  });
});
// Route for changing the content in the database - the list items in the todo list!
app.post("/update",function(req,res1)
{
  // Update info!
  console.log("The information entered for update is: ");
  console.log("Handle: "+req.body.handle);
  console.log("New List entry: "+req.body.newEntry);
  var inputHandle = req.body.handle;
  var inputNewEntry = req.body.newEntry;
  // Finding the record in the DB!
  listInfo.findOne({handle: inputHandle},function(err1,res2)
  {
    if(err1)
      res1.send("notOk");
    else if(res2 != null) // Do this type of handling at other places too!
    {
      console.log("Found an entry with the given handle!");
      console.log("The result of find is:");
      console.log(res2);
      var oldList = res2.lists;
      oldList.push(inputNewEntry);
      // Updating the DB!
      listInfo.findOneAndUpdate({handle: inputHandle},{lists: oldList},function(err2,res3)
      {
        if(err2)
          res1.send("notOk");
        else
        {
          console.log("The update is successful!");
          res1.send("ok");
        }
      });
    }
    else
      res1.send("notOk");
  });
});
//
//------------------------------------------------------------------------------
// Server is listening!
//------------------------------------------------------------------------------
app.listen(3000,function()
{
  console.log("Server is running on the port 3000!");
});
//------------------------------------------------------------------------------
