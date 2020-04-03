module.exports = function(io){
    io.on("connection" ,function(socket){
        // console.log("User connected");
        socket.on('join chat', (params) => {
            // console.log("params",params);
            socket.join(params.room1);
            socket.join(params.room2);
        });
        socket.on('start_typing', data => {
            // console.log("data22",data);
            io.to(data.reciever).emit('is_typing' , data);
        });
        socket.on('stop_typing', data => {
            // console.log("data22",data);
            io.to(data.reciever).emit('stop_typing_data' , data);
        });
    });
};