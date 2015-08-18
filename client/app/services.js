app.factory('playerSocket', function (socketFactory) {
  var myIoSocket = window.io.connect('http://dp23.com:9000/', {transports:['websocket']});
  var mySocket = socketFactory({
      ioSocket: myIoSocket
  });
  mySocket.forward('pong');
  return mySocket;
});
