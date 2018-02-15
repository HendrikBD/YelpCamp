var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var middleware = require("../middleware");


// New Comment form
router.get("/new", middleware.isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else{
      res.render("comments/new", {campground: campground});
    }
  })
})

// Create comment
router.post("/", middleware.isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else{
          //add username & id to comment & save
          comment.author.id = req.user._id;
          comment.author.username = req.user.username
          comment.save()

          campground.comments.push(comment._id);
          campground.save();

          req.flash("success", "Added Comment!");
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  })
  
})

// Edit comment form
router.get("/:comment_id/edit",  middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else{
      res.render("comments/edit",{campground_id: req.params.id, comment: foundComment})
    }
  })
})


// Update Comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else{ 
      res.redirect("/campgrounds/"+req.params.id)
    }
  })
})


// DESTROY!!!!
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else{
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/"+req.params.id)
    }
  })
})




// Middleware to check if logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
