
// var mongoose = require('mongoose'),
// Schema = mongoose.Schema;

// var UserSchema = new Schema({
// pseudo: { type: String, required: true, unique: true },
// password: { type: String, required: true }
// });

// UserSchema.methods.comparePassword = function (enteredPassword, callback) {
// if (enteredPassword == this.password)
//   callback(null, true);
// else
//   callback(null, false);
// }

var users = [];

/* ajouter l'utilisateur a la liste de la salle */
function userEnters(id, pseudo, room) {
  var user = { id, pseudo, room };

  users.push(user);

  return user;
}

/* utilisateur */
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

/* l'utilisateur quitte le chat */
function userQuits(id) {
  var index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}


function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

//module.exports = mongoose.model('User', UserSchema);
module.exports = {  
  userEnters,
  getCurrentUser,
  userQuits,
  getRoomUsers
};
