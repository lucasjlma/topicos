//Escapa os caracteres para evitar uma injeção de código malicioso
function divEscapedContentElement(tasks) {
  return $('<div></div>').text(tasks);
}

//Retorna uma mensagem contida em uma div específica
function divSystemContentElement(tasks) {
  return $('<div></div>').html('<i>' + tasks + '</i>');
}

//Verifica o input do usuário e toma a ação desejada
function processUserInput(todolist, socket) {
  var title = $('#title').val();
  var author = $('#author').val();
  var date = $('#date').val();
  var priority = $('#priority').val();
  var lixo2 = title + "|" + author + "|" + date + "|" + priority;

  var $tarefa = $('\
    <div class="task-container">\
      <div class="checkbox">\
      <label>\
        <input type="checkbox" name="task" value="">\
        <div class="task-content">\
          <h4 class="title">'+ title +'</h4>\
          <span class="author">' +author +'</span>\
          <span class="date">' + date +'</span>\
          <span class="priority" data-priority="'+ priority+ '">'+ priority+ '</span>\
        </div>\
      </label>\
    </div>\
  ');

  todolist.sendMessage(lixo2);
  $('#tasks').append(lixo2);
  $('#tasks').scrollTop($('#tasks').prop('scrollHeight'));


    // limpar os inputs
  $('#title').val('');
  $('#author').val('');
  $('#date').val('');
  $('#priority').val('');
}

//Estabelece a conexão ao servidor
var socket = io.connect();

$(document).ready(function() {
  //Cria uma instância de chat no lado cliente
  var todolist = new ToDoList(socket);

  //Lida com o evento nameResult, que contém o resultado da tentativa
  //De mudança de nome
  // socket.on('nameResult', function(result) {
  //   var message;

  //   if (result.success) {
  //     message = 'You are now known as ' + result.name + '.';
  //   } else {
  //     message = result.message;
  //   }
  //   //Insere a mensagem na tela
  //   $('#messages').append(divSystemContentElement(message));
  // });

  //Lida com o evento joinresult, que recebe o resultado de
  //uma mudança de sala
  // socket.on('joinResult', function(result) {
  //   //Muda o nome da sala
  //   $('#room').text(result.room);
  //   //Insere a mensagem de que a sala foi alterada
  //   $('#messages').append(divSystemContentElement('Room changed.'));
  // });

  //Lida com o evento message
  socket.on('message', function (message) {
    //Imprime a mensagem na tela
    var newElement = $('<div></div>').text(message.text);
    $('#tasks').append(newElement);
  });

  //Lida com as salas disponíveis
  // socket.on('rooms', function(rooms) {
  //   $('#room-list').empty();

  //   //Varre as salas disponíveis e as imprime na tela
  //   for(var room in rooms) {
  //     room = room.substring(1, room.length);
  //     if (room != '') {
  //       $('#room-list').append(divEscapedContentElement(room));
  //     }
  //   }

  //   //Ao clicar no nome de uma sala, executa-se um join
  //   $('#room-list div').click(function() {
  //     todolist.processCommand('/join ' + $(this).text());
  //     $('#send-message').focus();
  //   });
  // });

  //Função que periodicamente emite o evento rooms ao servidor, requisitando
  //as salas disponíveis
  // setInterval(function() {
  //   socket.emit('rooms');
  // }, 1000);

  //Cria efeito de focus na caixa de mensagens

  //Submete a entrada de usuário ao tratador de input
  $('#send-form').submit(function() {
    processUserInput(todolist, socket);
    return false;
  });
});
