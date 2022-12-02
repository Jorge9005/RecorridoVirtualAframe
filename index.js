AFRAME.registerComponent('change', {
  schema: {
    img: {
      default: "", type: "string"
    },
    sound: {
      default: "", type: "string"
    },
    zone: {
      default: "", type: "string"
    }
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    this.el.addEventListener('click', function () {
      console.log("clickió");

      var parentEntity = el.parentNode;
      var grandParentEntity = parentEntity.parentNode;

      var thisAImage = parentEntity.querySelector("a-image");
      thisAImage.classList.remove("clickable");
      console.log("thisAImage: " + JSON.stringify(thisAImage.classList));

      var allAImage = grandParentEntity.querySelectorAll("a-image");
      Object.keys(allAImage).forEach(function(key){
        if(allAImage[key] != thisAImage) {
          allAImage[key].classList.add("clickable");
        }
      });

      var allABox = grandParentEntity.querySelectorAll("a-box");
      Object.keys(allABox).forEach(function(key){
        allABox[key].setAttribute("visible", "false");
      });

      var parentEntityABox = parentEntity.querySelector("a-box");
      parentEntityABox.setAttribute("visible", "true");

      var allAText = grandParentEntity.querySelectorAll("a-text");
      Object.keys(allAText).forEach(function(key){
        allAText[key].setAttribute("color", "gray");
      });

      var aText = thisAImage.querySelector("a-text");
      if(aText) aText.setAttribute("color", "white");

      var allACircle = grandParentEntity.querySelectorAll("a-circle");
      Object.keys(allACircle).forEach(function(key){
        allACircle[key].setAttribute("visible", "false");
        allACircle[key].classList.remove("clickable");
      });

      var allACircleInThisZone = parentEntity.querySelectorAll(data.zone);
      Object.keys(allACircleInThisZone).forEach(function(key){
        allACircleInThisZone[key].setAttribute("visible", "true");
        allACircleInThisZone[key].classList.add("clickable");
      });

      var mySky = document.querySelector("#my-sky");
      mySky.setAttribute("sound", "src", data.sound);
      mySky.setAttribute("material", "src", data.img);

      if(mySky.getAttribute("sounding") == "true"){
        mySky.components.sound.playSound();
      }

      console.log("terminó clickió");
    });
  },
  
});