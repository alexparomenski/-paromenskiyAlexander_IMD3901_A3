AFRAME.registerComponent( 'spawnball_component',{
    init:function(){
        console.log("Init component");

        const Context_AF = this;

        Context_AF.el.addEventListener('click', function(event){
            console.log('click');
            Context_AF.spawnBall();
        });
        Context_AF.el.addEventListener('mouseenter', function(event){
            //e1 = html enitity or element
            //object3D = three.js (rendering engine) 3D element
            Context_AF.el.object3D.scale.set(0.6,0.6,0.6);
        });
        Context_AF.el.addEventListener('mouseleave', function(event){
            Context_AF.el.object3D.scale.set(0.5,0.5,0.5);
        });
    },
    spawnBall: function() {

        
        const Context_AF = this;
        //console.log(Context_AF.el.id);
        let ballElem = document.createElement('a-entity');
        // depending on which button is clicked we spawn a ball and give it an id for either player 1 or player2 ball
        if(Context_AF.el.id == 'ball_button'){
            ballElem.setAttribute('id', 'player1_ball');
            ballElem.setAttribute('class','clickable');
            ballElem.setAttribute('dynamic-body','');
            ballElem.setAttribute('position',{x:-2,y:5,z:0});
            ballElem.setAttribute('geometry',"primitive:sphere; radius:0.3;");
            ballElem.setAttribute('material',"color:red;");
            ballElem.setAttribute('throwball_component','');
        }
        if(Context_AF.el.id == 'ball_button2'){
            ballElem.setAttribute('id', 'player2_ball');
            ballElem.setAttribute('class','clickable');
            ballElem.setAttribute('dynamic-body','');
            ballElem.setAttribute('position',{x:2,y:5,z:0});
            ballElem.setAttribute('geometry',"primitive:sphere; radius:0.3;");
            ballElem.setAttribute('material',"color:red;");
            ballElem.setAttribute('throwball_component','');
        }
        
        //console.log(ballElem.id);
        //add to scene
        let scene = document.querySelector('a-scene');
        scene.appendChild(ballElem);
    }
});