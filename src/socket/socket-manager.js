import socketIOClient from 'socket.io-client';



export const socket = socketIOClient('http://localhost:5000');
// export const socket = socketIOClient('https://lost-temple-server.onrender.com');
// export const socket = socketIOClient('https://squid-games-pi-2024-1-websockets.onrender.com/');

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    socket.disconnect();
}

