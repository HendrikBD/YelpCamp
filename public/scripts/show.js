var navBtns = document.querySelector(".navBtns");
var listItems = document.querySelectorAll(".list-group-item");
var currLoc = -1;
var JumpLocs = [];


setNavBtns();
setActiveButton();

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

window.addEventListener("scroll",function(){
  setActiveButton()
})

function setActiveButton(){
  var scrollLoc = window.scrollY;
  console.log(scrollLoc)
  if(scrollLoc<jumpLocs[1] && currLoc!=0){
    currLoc = 0;
    listItems[0].classList.add("act");
    listItems[1].classList.remove("act");
  } else if(scrollLoc<(jumpLocs[1]+400) && scrollLoc>jumpLocs[1] && currLoc!=1 && scrollLoc!=window.scrollMaxY){
    currLoc = 1;
    listItems[0].classList.remove("act");
    listItems[1].classList.add("act");
    listItems[2].classList.remove("act");
  } else if((scrollLoc>(jumpLocs[1]+400))||scrollLoc==window.scrollMaxY && currLoc!=2){
    currLoc=2;
    listItems[1].classList.remove("act");
    listItems[2].classList.add("act");
  }
}
