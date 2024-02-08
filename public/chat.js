const socket = io();
let currentRoom = '';

function enterChat() {
    document.getElementById('usernameForm').style.display = 'none';
    document.getElementById('roomSelection').style.display = 'block';
}

function joinRoom() {
    const username = document.getElementById('username').value;
    currentRoom = document.getElementById('roomList').value;
    socket.emit('joinRoom', { username, room: currentRoom });

    document.getElementById('roomSelection').style.display = 'none';
    document.getElementById('chatWindow').style.display = 'block';
    document.getElementById('messages').innerHTML += `<div><strong>System:</strong>joined ${currentRoom}</div>`;
}

function leaveRoom() {
    socket.emit('leaveRoom', { username: document.getElementById('username').value, room: currentRoom });
    document.getElementById('chatWindow').style.display = 'none';
    document.getElementById('roomSelection').style.display = 'block';
    //document.getElementById('messages').innerHTML = ''; // Clear chat messages
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    socket.emit('chatMessage', { text: message, room: currentRoom });
    document.getElementById('messageInput').value = '';
}

socket.on('chatMessage', (msg) => {
    const messages = document.getElementById('messages');
    messages.innerHTML += `<div><strong>${msg.user}:</strong> ${msg.text}</div>`;
});
