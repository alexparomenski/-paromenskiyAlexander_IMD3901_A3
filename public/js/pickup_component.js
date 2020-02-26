// game variables
var Picked_UP = false;

AFRAME.registerComponent( 'pickup_component',{
    init:function(){
        console.log("Init component");
        const Context_AF = this;
        
        Context_AF.el.addEventListener('click', function(event){
            // if the ball is clicked and it is not already picked up then call the pick up function
            if(!Picked_UP){
                Context_AF.pickUpObject();
            }  
        });
        Context_AF.el.addEventListener('mouseenter', function(event){
            Context_AF.el.object3D.scale.set(1.05,1.05,1.05);
        });
        Context_AF.el.addEventListener('mouseleave', function(event){
            Context_AF.el.object3D.scale.set(1.0,1.0,1.0);
        });
        document.addEventListener("keydown", function(event){
            
            if(event.keyCode == 32 && Picked_UP){
                Ball_Thrown = true;
                console.log("spacebar was pressed");
                Context_AF.throwObject();
            }
        });
        
    },
    pickUpObject : function() {
        const attachment = document.querySelector('#attachment');
        const Context_AF = this;
        let camera = document.getElementById('camera');

        // remove physics from the object 
        Context_AF.el.removeAttribute('dynamic-body');
        //camera.object3D.localToWorld(attachment.object3D.position);
        attachment.object3D.localToWorld(Context_AF.el.object3D.position);
        attachment.object3D.add(Context_AF.el.object3D);
        console.log(attachment.object3D.position);
        Context_AF.el.setAttribute('position',attachment.getAttribute('position'));
        // Ball is picked up -> can throw
        Picked_UP = true;
        console.log("item picked up");
        
    },
    throwObject : function() {
        let scene = document.querySelector('a-scene');
        const attachment = document.querySelector('#attachment');
        const Context_AF = this;
        scene.object3D.add(Context_AF.el.object3D);
        Context_AF.el.setAttribute('position',attachment.getAttribute('position'));


    },
    
    
});