var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String, 
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema); // makes model that uses schema

Campground.create(
    {
        name: "Salmon Greek",
        image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg",
        description: "This is perfect campground!"
    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND");
            console.log(campground);
        }
});
/*
var campgrounds = [
    {name: "Salmon Greek", image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg"},
    {name: "Granite Hill", image:"https://manofmany.com/wp-content/uploads/2015/06/Sápmi-Nature-Camp-1.jpg"},
    {name: "Mountain Goat`s Rest", image:"http://www.sapminature.com/wp-content/uploads/2018/05/Autumnmagic_SapmiNature-3.jpg"},
    {name: "Salmon Greek", image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg"},
    {name: "Granite Hill", image:"https://manofmany.com/wp-content/uploads/2015/06/Sápmi-Nature-Camp-1.jpg"},
    {name: "Mountain Goat`s Rest", image:"http://www.sapminature.com/wp-content/uploads/2018/05/Autumnmagic_SapmiNature-3.jpg"},
    {name: "Salmon Greek", image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg"},
    {name: "Granite Hill", image:"https://manofmany.com/wp-content/uploads/2015/06/Sápmi-Nature-Camp-1.jpg"},
    {name: "Mountain Goat`s Rest", image:"http://www.sapminature.com/wp-content/uploads/2018/05/Autumnmagic_SapmiNature-3.jpg"}
];
*/
app.get("/", function(req,res){
    res.render("landing");
});

// shows all campgrounds
app.get("/campgrounds", function(req,res){
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        };
    });
 });

// making new campground
app.post("/campgrounds", function(req,res){
    // get data from form and add to campgrounds array
    var newCampground = {
        name: req.body.name, 
        image: req.body.image, 
        description: req.body.description
    };
    
   // Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           // redirect back to campground page
           res.redirect("/campgrounds");
       }
   });
});

// shows the form which helps us add new campground
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campground/:id", function(req,res){
    // find campground with provided id
    //render show template with that campground
    res.render("show");
});

app.listen(3000);