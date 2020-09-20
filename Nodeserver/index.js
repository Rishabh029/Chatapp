// Node Server which handle socket io program 

const io = require('socket.io')(8000)
const users = {};

io.on('connection' , socket =>{
    //If any new users joined , let others users connected to the server know !
    socket.on('new-user-joined' , name =>{ 
        console.log("New User",name);
        users[socket.id] = name ;
        socket.broadcast.emit('user-joined' , name);
    });
    //If someone sends a message , boradcast to the other people 

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    //If someone lefts the chat other to known 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})