var navBtns = document.querySelector(".navBtns");
var listItems = document.querySelectorAll(".list-group-item");

listItems[0].addEventListener("click", function(){
  listItems.forEach(function(item){
    item.classList.remove("act")
  })
  this.classList.add("act")
  var jump = document.getElementById("activities").offsetTop;
  window.scrollTo(0, jump+70-window.innerHeight);
})

listItems[1].addEventListener("click", function(){
  listItems.forEach(function(item){
    item.classList.remove("act")
  })
  this.classList.add("act")
  var jump = document.getElementById("comments").offsetTop;
  window.scrollTo(0, jump+70-window.innerHeight);
})

listItems[2].addEventListener("click", function(){
  listItems.forEach(function(item){
    item.classList.remove("act")
  })
  this.classList.add("act")
  var jump = document.getElementById("comments").offsetTop;
  window.scrollTo(0, jump+70);
})

// window.addEventListener("scroll",function(){
//   navBtns.style.marginTop = window.scrollY + "px";
//   console.log("Scrolling,")
// })
