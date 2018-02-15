var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");


var data = [
  {
    name: "Pinery",
    image: "https://farm1.staticflickr.com/568/20757974852_aacba82aa3.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum, dolor sit amet accumsan blandit, tortor magna pharetra arcu, nec posuere ante ante et diam. Sed euismod urna quis metus maximus, non hendrerit tellus lacinia. Proin nec turpis sagittis, lobortis lacus ac, ultricies erat. Nulla laoreet mollis felis, nec scelerisque est ultricies ut. Phasellus eget tincidunt sem. Integer pretium rhoncus tortor quis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quam dui, congue ut mattis sit amet, mattis et turpis. Nunc dignissim nulla eu tortor varius facilisis. Etiam id odio urna. Suspendisse mattis nulla mi, a rutrum leo ullamcorper quis. Duis non fringilla mauris, iaculis eleifend lectus. Duis sed lacus lacinia, efficitur purus quis, imperdiet odio. Nunc porttitor, velit sit amet aliquet lobortis, orci orci varius mi, sit amet mollis ante diam sit amet lectus... One of Ontario's most southern campgrounds, with sandy beaches, showers and countless things to do"
  }, 

  {
    name: "Algonquin",
    image: "https://photos.smugmug.com/North-America/Ontario/i-BsbmnxB/0/X2/moose-safari-algonquin-park-ontario-5-X2.jpg",
    description: "Canada's largest park containing countless rivers and lakes, and campsites throughout the park. Perfect for a simple camping trip, or a portaging adventure!"
  },

  {
    name: "Kwartha",
    image: "https://2.bp.blogspot.com/-0Kqvp237AXw/T-vQXpqWrZI/AAAAAAAAAww/Jx6IZN2fvC0/s1600/IMG_1043.JPG",
    description: "Explore the outdoors at Kwartha, with adventures to be had down each river!"
  },

  {
    name: "Macgregor Point",
    image: "https://www.mycampsitereview.com/wp-content/comment-image/707.jpg",
    description: "Come to one of Ontario's most popular campgrounds, with tons of activities and beautiful beaches!"
  }

];

function seedDB(){

  Campground.remove({}, function(err){
    // if(err){ console.log();
    // } else {
    //   console.log("Campgrounds removed");
    //   data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //       if(err){
    //         console.log(err);
    //       } else{
    //         console.log("Added a campground");
    //         Comment.create(
    //           {
    //             text: "This place is pretty cool, but it needs better WiFi!",
    //             author: "Millenial"
    //           }, function(err, comment){
    //             if(err){
    //               console.log(err);
    //             } else{
    //               campground.comments.push(comment._id);
    //               campground.save();
    //               console.log("Comment added!");
    //             }
    //           })
    //       }
    //     })
    //   })
    // }
  });


}

module.exports = seedDB;
