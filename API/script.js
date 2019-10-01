const socket = io('http://localhost:3000')

socket.on('message', data =>{
    console.log(data)
})

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  });