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
    username: "test123",
    password: "password"
  },
  {
    username: "test2",
    password: "test"
  },

  {
    username: "SomeGuy",
    password: "test"
  }

];

var commentData = [
  { text: "Wow check out this campground, That lake looks pretty nice!" },
  { text: "I went here last summer, the sunrise was fantastic, but there were too many mosquitos :("},
  { text: "So far so good.  First day here.  All the staff are super friendly and the facilities really cater to families."},
  { text: "Great price, clean campsites and well located. Unfortunately the campground floated the week before we arrived and the site had quite a bit of water especially for us staying in a tent. Also their quiet hours policies exist but isn't enforced we had extremely loud abnoxious neighbors.  Still a great campground."},
  { text: "Great view of the lake and clean showers and washrooms."},
  { text: "Great place. Well looked after. Great people"},
  { text: "Summer or winter it's a great campground."},
  { text: "Beautiful!! The campsites are huge! A quiet campground..can't wait to come back!"},
  { text: "I survived - 47C with wind chill in a hot tent, and got to see a woodpecker to boot"},
  { text: "Great camping. Large lots. Good showers."},
  { text: "This is a beautiful campground. We saw a family of ducks. My cousin saw a moose and another camper saw a beaver. We stayed at 114 in the radio and dog free zone. The frog symphony played us to sleep. The beach is lovely. Wish it had brought my paddle board."},
  { text: "Beautiful layout, easy to register and get into. No issues whatsoever."},
  { text: "Campground is amazing, very well maintained year round. The staff are very friendly and helpful. There are lot of trails, canoe routes, and activities to do there."},
  { text: "Beautiful campground. The radio free zone is always my favourite area to camp. The little lake is so nice to way up to."},
  { text: "Love this park. Park staff and host, Tom was so helpful."},
  { text: "Our family loves this campground! The bathrooms are clean, showers have nice, hot water and the hospitality station is great too! It's fairly central to most hiking trails which is a bonus."},
  { text: "Pleasant staff, clean sites, reasonable price, good experience. Would stay again. Easy to make reservation over the phone. Stayed on a Monday night, so not busy"},
  { text: "First trip here, stayed from Friday to Tuesday. Had a great time, it is a little tight backing into your site but once you're in, there's plenty of room"},
  { text: "We spent the month of October at Apache. The staff and facilities are above average. The location is excellent. The campground is well managed"},
  { text: "We shared the place with my friend & her family. This trip was the best time I have had. I loved the location & the view. I could stay here often for sure. I loved the pool area. There was a place for adults & for kids."},
  { text: "Stayed 4 nights in a tent. Nice staff, very clean, well kept facilities and grounds. Showers and restrooms were clean and well kept. Pool is small, but nice. Close to beautiful beaches and amenities."},
  { text: "I went here last summer, the sunrise was fantastic, but there were too many mosquitos :("},
  { text: "Beautiful campground with spacious sites. This was our first time here and we thoroughly enjoyed our stay. The folks running the place were very accommodating. Our site was clean and the entire campground was well maintained. We will certainly be back the next time we visit the area."},
  { text: "Overall, we had a great stay, the only complaint we might have is the standing water around the drives. Unfortunately we had rain the first night and day we were there, and there was standing water all around our campsite. The site was high enough and level enough to keep any pooling off the site, but there were large puddles all around, making it difficult to walk to the facilities on site. "},
  { text: "I have to say, this campground was a great place to stay! Keep in mind, this is our first experience, but the reservation process was great, and they were very accommodating."},
  { text: "We went up for the May 24 weekend, tons of people, tons of fun. The bathrooms got pretty bad though."},
  { text: "We would totally recommend this campground to anyone coming to this area and have enjoyed the time we have been here and hope to stay as long as possible and would certainly come back!!"},
  { text: "I enjoyed the beautiful starry nights by the campfire."},
  { text: "We had a very nice stay. My wife and kids loved all the activities. Everyone was soooo nice. Your lake will always be remembered for the first time my boys went fishing. (My one son even got a nibble!)."},
  { text: "The campsites were too public, would have appreciated more forest coverage."},
  { text: "The water was perfect! Be going again next year"},
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
        // image: "/icons/hike.png"
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fhike.png?1526418533245"
      },
      {
        title: "Fishing",
        // image: "/icons/fish.png"
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Ffish.png?1526418530949"
      },
      {
        title: "Canoeing",
        // image: "/icons/canoe.png"
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fcanoe.png?1526418526612"
      },
      {
        title: "Bike Trails",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fbike.png?1526418520286"
      },
      {
        title: "Boating",
        // image: "/icons/boat.png"
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fboat.png?1526418528585"
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
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fhike.png?1526418533245"
      },
      {
        title: "Fishing",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Ffish.png?1526418530949"
      },
      {
        title: "Canoeing",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fcanoe.png?1526418526612"
      },
      {
        title: "Boating",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fboat.png?1526418528585"
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
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fhike.png?1526418533245"
      },
      {
        title: "Fishing",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Ffish.png?1526418530949"
      },
      {
        title: "Canoeing",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fcanoe.png?1526418526612"
      },
      {
        title: "Beach Access",
        // image: "/icons/beach.png"
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fbeach.png?1526418518874"
      },
      {
        title: "Bike Trails",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fbike.png?1526418520286"
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
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fhike.png?1526418533245"
      },
      {
        title: "Fishing",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Ffish.png?1526418530949"
      },
      {
        title: "Canoeing",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fcanoe.png?1526418526612"
      },
      {
        title: "Beach Access",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fbeach.png?1526418518874"
      },
      {
        title: "Bike Trails",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fbike.png?1526418520286"
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
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fhike.png?1526418533245"
      },
      {
        title: "Fishing",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Ffish.png?1526418530949"
      },
      {
        title: "Canoeing",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fcanoe.png?1526418526612"
      },
      {
        title: "Beach Access",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fbeach.png?1526418518874"
      },
      {
        title: "Bike Trails",
        image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fbike.png?1526418520286"
      }
    ]
  }

];

activityData = [
  {
    title: "Hiking",
    image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fhike.png?1526418533245"
  },
  {
    title: "Fishing",
    image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Ffish.png?1526418530949"
  },
  {
    title: "Canoeing",
    image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fcanoe.png?1526418526612"
  },
  {
    title: "Beach Access",
    image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fbeach.png?1526418518874"
  },
  {
    title: "Bike Trails",
    image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fbike.png?1526418520286"
  },
  {
    title: "Boating",
    image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fboat.png?1526418528585"
  },
  {
    title: "Pool",
    image: "https://cdn.glitch.com/f9f1cb62-3c58-4034-9015-b33d618d38d5%2Fpool.png?1526418535204"
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
