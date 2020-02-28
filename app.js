const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/collaborative', function(req,res) {
    res.sendFile(__dirname + '/public/collaborative.html');
});

app.get('/collaborative2', function(req,res) {
    res.sendFile(__dirname + '/public/collaborative2.html');
});

app.get('/competitive', function(req,res) {
    res.sendFile(__dirname + '/public/competetive.html');
});

app.get('/competitive2', function(req,res) {
    res.sendFile(__dirname + '/public/competetive2.html');
});


//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });

    //custom events
    //socket = one client
    //socketIO.sockets = all clients

    socket.on('givePlayerPosition', function(data){
        //console.log(data);
        socketIO.sockets.emit('receive_position', data);
        //socketIO.sockets.emit('color_change', {data});

    });

    socket.on('givePlayerPosition2', function(data){
        //console.log(data);
        socketIO.sockets.emit('receive_position2', data);
        //socketIO.sockets.emit('color_change', {data});

    });

    socket.on('openDoor', function(){
        //console.log(data);
        socketIO.sockets.emit('open_door');
        //socketIO.sockets.emit('color_change', {data});

    });

    socket.on('changeColor', function(data){
        console.log('changing color...');
        socketIO.sockets.emit('change_color', data);

    });

    socket.on('sendPlayer1Points', function(data){
        console.log(data);
        console.log('sending player 1 points.. ')
        socketIO.sockets.emit("ReceivePlayer1Points",data);
    });

    socket.on('sendPlayer2Points', function(data){
        console.log('sending player 2 points.. ')
        socketIO.sockets.emit("ReceivePlayer2Points",data);
    });
});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);