var lastPosition = new CANNON.Vec3(0, 0, 0);
var currentPosition = new CANNON.Vec3(0, 0, 0);

// reference variables
const scene = document.querySelector('a-scene');
let camera = document.getElementById('camera');

var doorOpened = false;
var doorOpenAnimation = false;
var doorCloseAnimation = false;

AFRAME.registerComponent( 'button_component',{
    init:function(){
        console.log("Init component");
        const Context_AF = this;
        
    },

    tick: function (time, timeDelta) {
        const Context_AF = this;
        const Player = document.getElementById("camera");
        //console.log(Player.object3D.position);
        //console.log(Context_AF.el.object3D.position);
        let Magnitude = Context_AF.findMagnitude();
        let Magnitude2 = Context_AF.findMagnitude2();
        if(Magnitude < 1.8 || Magnitude2 <1.8){
            if(doorOpened == false){
                console.log("Player 1 or player 2 is on the button");
                Context_AF.openDoor();
            }
        }
        else{
            if(doorOpened == true){
                Context_AF.closeDoor();
            }
        }
    },

    // finding magnitude between player 1 and the button
    findMagnitude : function() {
        const Context_AF = this;
        const Player = document.getElementById("camera");

        //creating vectors
        let Button_Pos = Context_AF.el.object3D.position;
        let Player_Pos = Player.object3D.position;

        //Subtracting the two vectors 
        let Distance_Between = new THREE.Vector3();
        Distance_Between.copy(Button_Pos).sub(Player_Pos);

        //finding the magnitude
        let Magnitude = Math.sqrt((Math.pow(Distance_Between.x,2)) + (Math.pow(Distance_Between.y,2)) + (Math.pow(Distance_Between.z,2)));
        

        return Magnitude;

    },

    // finding magnitude between player 2 and the button
    findMagnitude2 : function() {
        const Context_AF = this;
        const Player2 = document.getElementById("player2");

        //creating vectors
        let Button_Pos = Context_AF.el.object3D.position;
        let Player_Pos = Player2.object3D.position;

        //Subtracting the two vectors 
        let Distance_Between = new THREE.Vector3();
        Distance_Between.copy(Button_Pos).sub(Player_Pos);

        //finding the magnitude
        let Magnitude = Math.sqrt((Math.pow(Distance_Between.x,2)) + (Math.pow(Distance_Between.y,2)) + (Math.pow(Distance_Between.z,2)));
        

        return Magnitude;

    },
    openDoor : function() {
        const Context_AF = this;
        let door = document.getElementById('door');
        // playing sound
        var sound = document.querySelector("#button");
        sound.components.sound.playSound();
        door.emit('open_door');
        doorOpened = true;
        doorCloseAnimation = false;

        // Spawning Navigation 
        Context_AF.createNavigation();

        
    },
    closeDoor: function() {
        let door = document.getElementById('door');
        // playing sound
        var sound = document.querySelector("#button");
        sound.components.sound.playSound();
        door.emit('close_door');
        doorOpened = false;
        doorOpenAnimation = false;

    },

    createNavigation: function(){
        let navigate = document.createElement('a-entity');
        let navigate1 = document.createElement('a-entity');
        let navigate2 = document.createElement('a-entity');

        navigate.setAttribute('class', 'clickable');
        navigate.setAttribute('geometry', 'primitive:cylinder; radius:1; height:0.3;');
        navigate.setAttribute('material', 'color:blue');
        navigate.setAttribute('navigate_component', {}); 
        navigate.setAttribute('position', {x:2, y:-0.2, z:-1});
        navigate.setAttribute('scale', {x:0.5, y:0.5, z:0.5});

        navigate1.setAttribute('class', 'clickable');
        navigate1.setAttribute('geometry', 'primitive:cylinder; radius:1; height:0.3;');
        navigate1.setAttribute('material', 'color:blue');
        navigate1.setAttribute('navigate_component', {}); 
        navigate1.setAttribute('position', {x:0, y:-0.2, z:-3});
        navigate1.setAttribute('scale', {x:0.5, y:0.5, z:0.5});

        navigate2.setAttribute('class', 'clickable');
        navigate2.setAttribute('geometry', 'primitive:cylinder; radius:1; height:0.3;');
        navigate2.setAttribute('material', 'color:blue');
        navigate2.setAttribute('navigate_component', {}); 
        navigate2.setAttribute('position', {x:-3, y:-0.2, z:-3});
        navigate2.setAttribute('scale', {x:0.5, y:0.5, z:0.5});
        
        let scene = document.querySelector('a-scene');
        scene.appendChild(navigate);
        scene.appendChild(navigate1);
        scene.appendChild(navigate2);



    }
    
});