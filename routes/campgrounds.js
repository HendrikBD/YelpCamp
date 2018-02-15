var express = require("express");
var router = express.Router();
var Campground = require("../models/campground.js");
var middleware = require("../middleware"); 


// Shows all campgrounds
router.get("/", function(req, res){
  Campground.find({}, function(err,allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  })

})


// Creates a new campground
router.post("/", middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {
    name: name, 
    price: price,
    image: image, 
    description: desc,
    author: {
      id: req.user._id,
      username: req.user.username
    }
  };
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log("We have a problem here!");
      console.log(err);
    } else{
      res.redirect("/campgrounds")
      console.log(newlyCreated);
    }
  })

})


router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new")
})


//SHOW - shows info about a specific campground
router.get("/:id", function(req, res){

  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      req.flash("error", "Something went wrong.")
      console.log(err);
    } else{
      res.render("campgrounds/show", {campground: foundCampground})
    }
  })
})


// Edit form
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
  })
})


// Update capmground
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    } else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

// Destroy campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else{
      res.redirect("/campgrounds");
    }
  })
})



module.exports = router;
