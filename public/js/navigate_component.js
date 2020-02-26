AFRAME.registerComponent('navigate_component', {
    init:function() {
       const Context_AF = this;
       Context_AF.el.addEventListener('click', function(event){
         // if the button is clicked then move move the player to that position
         console.log(Context_AF.el.object3D.position);
         let Camera = document.getElementById("camera");
         Camera.setAttribute('position', {x:Context_AF.el.object3D.position.x,y:1.2,z:Context_AF.el.object3D.position.z});
     });
    }
  })