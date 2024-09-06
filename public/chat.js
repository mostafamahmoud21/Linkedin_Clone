const socket = io();

const token = 'YOUR_JWT_TOKEN_HERE'; 
const receiverId = 'RECEIVER_USER_ID';

socket.emit('joinRoom', { token });

const chatBox = document.getElementById('chat-box');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

socket.on('receiveMessage', (message) => {
  displayMessage(message, message.senderId === receiverId ? 'received' : 'sent');
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = messageInput.value.trim();
  if (content) {
    socket.emit('sendMessage', { token, receiverId, content });
    displayMessage({ senderId: receiverId, content }, 'sent');
    messageInput.value = '';
  }
});

function displayMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);
  messageElement.innerText = message.content;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchMessages() {
  try {
    const response = await fetch(`/api/messages/${receiverId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const messages = await response.json();
    messages.forEach((message) => {
      displayMessage(message, message.senderId === receiverId ? 'received' : 'sent');
    });
  } catch (error) {
    console.error('Failed to fetch messages:', error);
  }
}

fetchMessages();
