AFRAME.registerComponent('navigate_component', {
    init:function() {
       const Context_AF = this;
       Context_AF.el.addEventListener('click', function(event){
         // playing jump sound
         var sound = document.querySelector("#navigate");
         sound.components.sound.playSound();
         // if the button is clicked then move move the player to that position
         console.log(Context_AF.el.object3D.position);
         let Camera = document.getElementById("camera");
         Camera.setAttribute('position', {x:Context_AF.el.object3D.position.x,y:1.5,z:Context_AF.el.object3D.position.z});
     });
    }
  })