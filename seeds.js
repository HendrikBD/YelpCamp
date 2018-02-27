var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user.js"),
    Activity = require("./models/activity.js");



var numUsers = 0;


var userData = [
  {
    username: "test",
    password: "test"
  },
  {
    username: "HendrikBD",
    password: "password"
  },
  {
    username: "test2",
    password: "test"
  }

];

var commentData = [
  { text: "Wow check out this campground, That lake looks pretty nice!" },
  { text: "I went here last summer, the sunrise was fantastic, but there were too many mosquitos :("},
  { text: "Look at that view, consider it on my list!!!" }
];


var campData = [

  {
    name: "Algonquin",
    image: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F_ZjmS5VRh7UY%2FTL7rmwpJAPI%2FAAAAAAAAAis%2FvYuQLsBXXE0%2Fs1600%2Ftent.jpg&f=1",
    description: "Canada's largest park containing countless rivers and lakes, and campsites throughout the park. Perfect for a simple camping trip, or a portaging adventure!",
    activities: [
      {
        title: "Hiking",
        image: "/icons/hike.png"
      },
      {
        title: "Fishing",
        image: "/icons/fish.png"
      },
      {
        title: "Canoeing",
        image: "/icons/canoe.png"
      },
      {
        title: "Bike Trails",
        image: "/icons/bike.png"
      },
      {
        title: "Boating",
        image: "/icons/boat.png"
      }
    ]
  },

  {
    name: "Kawartha",
    image: "https://proxy.duckduckgo.com/iur/?f=1&image_host=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2F17%2Fe9%2F39%2F17e9399c831afafab2040d1fb163b76b.jpg&u=https://i.pinimg.com/736x/17/e9/39/17e9399c831afafab2040d1fb163b76b.jpg",
    description: "Explore the outdoors at Kwartha, with adventures to be had down each river!",
    activities: [
      {
        title: "Hiking",
        image: "/icons/hike.png"
      },
      {
        title: "Fishing",
        image: "/icons/fish.png"
      },
      {
        title: "Canoeing",
        image: "/icons/canoe.png"
      },
      {
        title: "Boating",
        image: "/icons/boat.png"
      }
    ]
  },

  {
    name: "Macgregor Point",
    image: "https://www.ontarioparks.com/parcsblog/wp-content/uploads/2016/04/10-raisons-pour-essayer-le-camping-de-printemps.jpg",
    description: "Come to one of Ontario's most popular campgrounds, with tons of activities and beautiful beaches!",
    activities: [
      {
        title: "Hiking",
        image: "/icons/hike.png"
      },
      {
        title: "Fishing",
        image: "/icons/fish.png"
      },
      {
        title: "Canoeing",
        image: "/icons/canoe.png"
      },
      {
        title: "Beach Access",
        image: "/icons/beach.png"
      },
      {
        title: "Bike Trails",
        image: "/icons/bike.png"
      }
    ]
  },

  {
    name: "Arrowhead",
    image: "https://farm6.staticflickr.com/5639/20330043700_73c30b3970.jpg",
    description: "Come visit Arrowhead provincial park, with large private sites, and great beaches. Open year round, for all types of activities.",
    activities: [
      {
        title: "Hiking",
        image: "/icons/hike.png"
      },
      {
        title: "Fishing",
        image: "/icons/fish.png"
      },
      {
        title: "Canoeing",
        image: "/icons/canoe.png"
      },
      {
        title: "Beach Access",
        image: "/icons/beach.png"
      },
      {
        title: "Bike Trails",
        image: "/icons/bike.png"
      }
    ]
  },

  {
    name: "Pinery",
    image: "https://3.bp.blogspot.com/-YjABd6awsBo/UyyJnGB2KEI/AAAAAAAAAVw/JpTAPgdeRBE/s1600/IMG_2801.JPG",
    description: "A beautiful park for year round visits, filled with sandy beaches and amazing sunsets. Filled with wildlife and rare plantlife to discover.",
    activities: [
      {
        title: "Hiking",
        image: "/icons/hike.png"
      },
      {
        title: "Fishing",
        image: "/icons/fish.png"
      },
      {
        title: "Canoeing",
        image: "/icons/canoe.png"
      },
      {
        title: "Beach Access",
        image: "/icons/beach.png"
      },
      {
        title: "Bike Trails",
        image: "/icons/bike.png"
      }
    ]
  }

];

activityData = [
  {
    title: "Hiking",
    image: "/icons/hike.png"
  },
  {
    title: "Fishing",
    image: "/icons/fish.png"
  },
  {
    title: "Canoeing",
    image: "/icons/canoe.png"
  },
  {
    title: "Beach Access",
    image: "/icons/beach.png"
  },
  {
    title: "Bike Trails",
    image: "/icons/bike.png"
  },
  {
    title: "Boating",
    image: "/icons/boat.png"
  },
  {
    title: "Pool",
    image: "/icons/pool.png"
  }
]

function seedDB(){

  seedUsers();

}


function seedUsers(){

  // Remove all users
  User.remove({}, function(err){
    if(err){
      console.log("Error removing users: " + err);
    }
    else {
      console.log("Old users Removed");

      // Map functions to each seeded user that returns a promise
      var userSeeds = userData.map(function(seed) {
        return new Promise(function(resolve, reject) {
        
          var newUser = new User({username: seed.username})
          User.register(newUser, seed.password, function(err, user){
            if(err){
              console.log("Error creating user: " + err);
              reject(err)
            }
            else {
              console.log("User Created");
              // Resolve promise once user has been added to db
              resolve();
            }
          })
        })
      })
      // Once all promises are fulfilled, call campground seeding fcn
      Promise.all(userSeeds)
      .then(function(){ seedComments();})
      .catch(function(err){console.log("promise error: " + err)})
    }
  });

}


function seedCampgrounds(){
  // Remove campgrounds from db
  Campground.remove({}, function(err){
    if(err){ console.log('Campground Removal Error');
    } else {
      console.log("Campgrounds removed");
      
      // Map functions to each seeded campground that return promises
      var campSeeds = campData.map(function(seed) {
        return new Promise(function(resolve, reject) {
          resolve();

          Campground.create(seed, function(err, campground){
            if(err){
              console.log(err);
              reject(err);
            } else{
              console.log("Added a campground");
              // Resolve promise once campground has been added to db
              resolve();
            }
          })
        })
      })
      // Once all promises fulfilled, call comment seeding fcn
      Promise.all(campSeeds)
      .then(function(){seedActivities()})
      .catch(function(err){console.log("Promise Error: " + err);})
    }
  });
}


function seedComments(){
  Comment.remove({}, function(err){
    if(err){
      console.log("Error removing commenst: " + err);
    }
    else {
      console.log("Comments removed");

      var commSeeds = commentData.map(function(seed){
        return new Promise(function(resolve, reject) {

          Comment.create(seed, function(err, comment){
            if(err){
              console.log("Error creating comment: " + err)
              reject(err);
            }
            else {
              console.log("Comment Created!");
              resolve();
            }
          })
        })
      })
      Promise.all(commSeeds)
      .then(function(){seedCampgrounds()})
      .catch(function(err){console.log("Promise error: " + err)});
    }
  });
}


function seedActivities(){
  Activity.remove({}, function(err){
    if(err){
      console.log("ERROR! " + err);
    } else {
      console.log("Activities Removed");

      var actSeeds = activityData.map(function(seed){
        return new Promise(function(resolve, reject){

          Activity.create(seed, function(err, activity){
            if(err){
              console.log("Err: " + err);
              reject(err);
            } else {
              console.log("Activity Created!");
              resolve();
            }
          })
        })
      })
      Promise.all(actSeeds)
      .then(function(){
        associateComments()})
      .catch(function(err){console.log("promise error: " + err)});
    }
  });
}


function associateComments(){
  Comment.find({}, function(err, comments){
    if(err){
      reject(err)
    } else {
      var commentAss = comments.map(function(comment){
        return new Promise(function(resolve, reject){
          User.find({},function(err, users){
            if(err){
              reject(err);
            } else {
              var userNum = Math.floor(Math.random()*users.length);
              var user = users[userNum];
              comment.author.username = user.username;
              comment.author.id = user._id;
              comment.save()
              resolve();
            }
          })
          Campground.find({}, function(err, campgrounds){
            var campNum = Math.floor(Math.random()*campgrounds.length);
            var camp = campgrounds[campNum];
            camp.comments.push(comment._id);
            camp.save();
          })
        })
      })
      Promise.all(commentAss)
      .then(function(){associateCampgrounds();})
      .catch(function(err){console.log(err)});
    }
  })
}


function associateCampgrounds(){
  Campground.find({},function(err, campgrounds){
    if(err){
      console.log(err);
    } else {
      var campAss = campgrounds.map(function(camp) {
        return new Promise(function(resolve, reject) {
          User.find({}, function(err, users) {
            if(err){
              reject(err);
            } else {
              var userNum = Math.floor(Math.random()*users.length);
              var user = users[userNum];

              camp.author.id = user._id;
              camp.author.username = user.username;
              camp.save()
              resolve();
            }
          })
        })
      })
    Promise.all(campAss)
    .then(function(){console.log("Seed finished!");})
    .catch(function(err){console.log(err)});
    }
  })
}


module.exports = seedDB;
