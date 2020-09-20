const socket = io('http://localhost:8000');

// Get DOM elements  in a respective JS variables
const from = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");

// Audio that will be play while receiving the messsage 
var audio =  new Audio('tune.mp3');

//Func which will append the event info to the container 

const append = (message , position)=>{
    const messageElement  =  document.createElement('div');
    messageElement.innerText = message ;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position ='left'){

        audio.play();
    }
}

// If the forms gets submitted sends the message to the server 
from.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value ;
    append(`You : ${message}` , `right`);
    socket.emit(`send` , message);
    messageInput.value ='';
})

//Ask new user for his /her name let the server know 
const name = prompt("Enter the your name to Join ");
socket.emit('new-user-joined', name);

//If a new user joins receive his name from the server 
socket.on('user-joined', name =>{
    append(`${name} joined the chat ` , 'right'); 
})

//If aserver sends a message , receive it 
socket.on('receive', data =>{
   append(`${data.name}:${data.message}` , 'left')
})

// If the user leaves a chat , appends the message to the container 
socket.on('left', name =>{
   append(`${name} left the chat ` , 'left')
})

