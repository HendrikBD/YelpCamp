var listItems = document.querySelectorAll(".list-group-item");

listItems[0].addEventListener("click", function(){
  listItems.forEach(function(item){
    item.classList.remove("act")
  })
  this.classList.add("act")
  var jump = document.getElementById("description").offsetTop;
  window.scrollTo(0, jump);
})

listItems[1].addEventListener("click", function(){
  listItems.forEach(function(item){
    item.classList.remove("act")
  })
  this.classList.add("act")
  var jump = document.getElementById("activities").offsetTop;
  window.scrollTo(0, jump);
})

listItems[2].addEventListener("click", function(){
  listItems.forEach(function(item){
    item.classList.remove("act")
  })
  this.classList.add("act")
  var jump = document.getElementById("comments").offsetTop;
  window.scrollTo(0, jump);
})

