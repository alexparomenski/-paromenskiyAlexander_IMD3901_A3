

// game variables
var Picked_UP = false;
var Ball_Thrown = false;
var Player1_Points = 0;
var Player2_Points = 0;

// throw ball variables
var lastPosition = new CANNON.Vec3(0, 0, 0);
var currentPosition = new CANNON.Vec3(0, 0, 0);

// reference variables
const scene = document.querySelector('a-scene');
let camera = document.getElementById('camera');

AFRAME.registerComponent( 'throwball_component',{
    init:function(){
        const Context_AF = this;

        //------ First we look at the instance (which ball is being thrown player1 or player2), then we send the points respectevily, it will mess up if this is done without checking first
        if(Context_AF.el.id == 'player1_ball'){
            setInterval(function(){
                socket.emit('sendPlayer1Points', Player1_Points);
            }, 1000)  

        }
        if(Context_AF.el.id == 'player2_ball'){
            setInterval(function(){
                socket.emit('sendPlayer2Points', Player2_Points);
            }, 1000)  

        }
        
        
        
        console.log("Init component");
        
        Context_AF.el.addEventListener('click', function(event){
            // if the ball is clicked and it is not already picked up then call the pick up function
            if(!Picked_UP){
                Context_AF.pickUpObject();
            }  
        });
        target_1.addEventListener('click', function(event){
            // this is mostly for phone but user can tap the targets to throw ball as well as prace space (on computer)
            if(Picked_UP){
                Context_AF.throwObject();
            }  
        });
        target_2.addEventListener('click', function(event){
            if(Picked_UP){
                Context_AF.throwObject();
            }  
        });
        target_3.addEventListener('click', function(event){
            if(Picked_UP){
                Context_AF.throwObject();
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
                Context_AF.throwObject(Context_AF.el.id);
            }
        });
        
    },
    pickUpObject : function() {
        const attachment = document.querySelector('#visible_attachment');
        const Context_AF = this;
        let camera = document.getElementById('camera');

        // remove physics from the object 
        Context_AF.el.removeAttribute('dynamic-body');
        //camera.object3D.localToWorld(attachment.object3D.position);
        attachment.object3D.localToWorld(Context_AF.el.object3D.position);
        attachment.object3D.add(Context_AF.el.object3D);
        Context_AF.el.setAttribute('position',attachment.getAttribute('position'));
        // Ball is picked up -> can throw
        Picked_UP = true;
        
    },
    throwObject: function (data){
        src="/socket.io/socket.io.js"
        const attachment = document.querySelector('#attachment');
        let scene = document.querySelector('a-scene');
        // remove the ball we're holding 
        let element = document.getElementById(data);
        element.parentNode.removeChild(element);
        
        let impulseAmount = 100;
        let camera = document.getElementById('camera');

        // creating a ball to throw
        let throwElem = document.createElement('a-sphere');
        throwElem.setAttribute('radius', 0.3);
        // Set initial position of projectile to that of the camera.
        throwElem.setAttribute('position', camera.object3D.position);
        throwElem.setAttribute('color', 'red');
        //entity.setAttribute('shader', 'flat');
        throwElem.setAttribute('mass', 1);

        // add the ball to the scene and give it a dynamic body
        scene.appendChild(throwElem);
        throwElem.setAttribute('dynamic-body', '');
        
        throwElem.addEventListener('body-loaded', function(){
            setTimeout(function () {
              let pStart = new CANNON.Vec3();
              pStart.copy(attachment.object3D.getWorldPosition());
              let force = throwElem.body.position.vsub(pStart);
              force.normalize(); 
              force.scale(impulseAmount, force);
              throwElem.body.applyImpulse(force, throwElem.body.position);
            }, 0);
          });
        
          // checking if the ball has collided with any objects
        throwElem.addEventListener('collide', function (event) {
           // here I check whether the object that is hit has a class 'hitable' if it does then proceed. 
            if(event.detail.body.el.classList.contains('hitable')){
                // playing sound
                var sound = document.querySelector('#target_1');
                sound.components.sound.playSound();
                event.detail.body.el.setAttribute('material', 'color:green;');
                socket.emit('changeColor', event.detail.body.el.id);
                event.detail.body.el.classList.remove('hitable');
                if(data == "player1_ball"){
                    Player1_Points ++;
                }
                if(data == "player2_ball"){
                    Player2_Points ++; 
                }
            }
         });
         Picked_UP = false;
             
    },
    
});