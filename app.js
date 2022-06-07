//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolist");

const itemsSchema={
  name:String
}
const Item= mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to the to do list"
});



const item2 = new Item({
  name: "Hit the + button to add new item"
});
const item3 = new Item({
  name: "<-- Hit this to delete the item"
});

const defaultItems = [item1, item2, item3];



// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems){
    if(foundItems.length === 0){
        Item.insertMany(defaultItems, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Sucessfully saved item to DB.");
  }
  
});
   res.redirect("/");   

    }else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});

    }

    });



  

});

app.post("/", function(req, res){

  const itemName =  req.body.newItem;

  const item = new Item({
    name: itemName
  });
  item.save();

  res.redirect("/");
  

 
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
