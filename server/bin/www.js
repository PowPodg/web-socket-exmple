var app = require('../app');

var http = require('http');

const WebSocket = require('ws');

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

var server = http.createServer(app);

const wss = new WebSocket.Server({ server });


wss.on('connection',  connection =(ws)=> {
 
  
  ws.on('message',  incoming =(message)=> {
    console.log('received: %s', message);
    ws.send(`Echo from the server: '${message}'`);
  });
 
 ws.send('The connection is established - WebSocket Test - Hello from Sever!');

});


server.listen(port, () => console.log(`Server listens ${port}`));
server.on('error', onError);


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;


  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

