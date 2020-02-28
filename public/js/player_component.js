AFRAME.registerComponent( 'player_component',{
    init:function(){
        console.log("Init component");
        const Context_AF = this;
        
    },

    tick: function (time, timeDelta) {
        const Context_AF = this;
        const Camera = document.getElementById("camera");
        var worldPosition = new THREE.Vector3();
        Camera.object3D.getWorldPosition(worldPosition);
        //setting the position of the player to the position of the camera
        document.getElementById("player").setAttribute('position', {x:worldPosition.x, y:-0.2, z:worldPosition.z})
        
        //console.log(Player.object3D.position);
        //console.log(Context_AF.el.object3D.position);
       
        
    },

});