var doorOpened = false;
var buttonPressed = false;
AFRAME.registerComponent( 'open_component',{
    init:function(){

        src="/socket.io/socket.io.js"
        console.log("Init component");
        const Context_AF = this;

        Context_AF.el.addEventListener('click', function(event){
            // if the button is clicked the door will open
                // playing  victory sound
                var sound = document.querySelector("#button2");
                sound.components.sound.playSound();
                console.log("YOU WIN !!!");
                let door = document.getElementById('door');
                buttonPressed = true;
                door.setAttribute('scale', {x:0, y:0, z:0})
                doorOpened = true;
                socket.emit('openDoor');   

            
        });
    },
    
});

