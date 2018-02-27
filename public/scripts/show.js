var navBtns = document.querySelector(".navBtns");
var listItems = document.querySelectorAll(".list-group-item");


setNavBtns();

window.onresize = function(event){
  setNavBtns();
}


function setNavBtns(){
  jumpLocs = [
    document.getElementById("activities").offsetTop + 70 - window.innerHeight,
    document.getElementById("comments").offsetTop + 70 - window.innerHeight,
    document.getElementById("comments").offsetTop + 70
  ];

  for(var i=0; i<listItems.length; i++){
    listItems[i].jumpLoc = jumpLocs[i];
    listItems[i].addEventListener("click", function(){
      listItems.forEach(function(item){ item.classList.remove("act") })
      this.classList.add("act");
      window.scroll(0, this.jumpLoc);
    })
  }
}

// window.addEventListener("scroll",function(){
//   navBtns.style.marginTop = window.scrollY + "px";
//   console.log("Scrolling,")
// })
//
