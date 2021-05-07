var path = require('path');
var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var formatMessage = require('./routes/messages');
var cors = require('cors');

var {
  userEnters,
  getCurrentUser,
  userQuits,
  getRoomUsers
} = require('./routes/users');


var app = express();
app.use(cors());
var server = http.createServer(app);
var io = socketio(server);

/* Dossier ou se situe les dépendances */
app.use(express.static(path.join(__dirname, '../front/public')));


/* lien vers le serveur lorsque le bouton connexion est */
io.on('connection', socket => {
  socket.on('EnterRoom', ({ pseudo, room }) => {
    var user = userEnters(socket.id, pseudo, room);

    socket.join(user.room);

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  /* Envoye du message à tous les utilisateurs sur le serveur */ 
  socket.on('chatMessage', msg => {
    var user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.pseudo, msg));
  });

  
  socket.on('disconnect', () => {
    var user = userQuits(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(user.pseudo, '${user.pseudo} à quitté la salle')
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

var PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log('Server running on port 3000'));
console.log('http://localhost:3000/');
