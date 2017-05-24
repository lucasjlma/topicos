//Construtor, liga o socket ao objeto
var ToDoList = function(socket) {
  this.socket = socket;
};

//Função que envia uma mensagem ao servidor para ser repassada aos demais
ToDoList.prototype.sendMessage = function(text) {
  var message = {
  	room: "Lobby",
  	text: text
  };
  //Emite o evento message ao servidor
  this.socket.emit('message', message);
};

ToDoList.prototype.addTask = function(message){
  this.socket.emit('message', message);
}

//Emite ao servidor um evento de mudança de sala
// ToDoList.prototype.changeRoom = function(room) {
//   this.socket.emit('join', {
//     newRoom: room
//   });
// };

//Verifica qual é o comando e toma a ação apropriada
// ToDoList.prototype.processCommand = function(command) {
//   var words = command.split(' ');
//   var command = words[0]
//                 .substring(1, words[0].length)
//                 .toLowerCase();
//   var message = false;

//   switch(command) {
//     case 'join':
//       words.shift();
//       var room = words.join(' ');
//       this.changeRoom(room);
//       break;
//     case 'nick':
//       words.shift();
//       var name = words.join(' ');
//       this.socket.emit('nameAttempt', name);
//       break;
//     default:
//       message = 'Unrecognized command.';
//       break;
//   };

//   return message;
// };
