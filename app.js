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
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema); // makes model that uses schema

Campground.create(
    {
        name: "Salmon Greek",
        image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg"
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
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
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

app.listen(3000);