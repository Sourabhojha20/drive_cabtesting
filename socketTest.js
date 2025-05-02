const socket = io('http://localhost:3000');

// Join room (after booking is created/accepted)
socket.emit('joinRideRoom', {
  rideId: 123,
  userType: 'user' // or 'driver'
});

// Share location every 5 seconds (example)
setInterval(() => {
  socket.emit('shareLocation', {
    rideId: 123,
    userType: 'user',
    location: { lat: 23.2599, lng: 77.4126 }
  });
}, 5000);

// Listen to receive other party's location
socket.on('receiveLocation', (data) => {
  console.log('📍 Received location from:', data.from, data.location);
});
