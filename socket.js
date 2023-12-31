let io;
module.exports={
    init:httpServer=>{
        io=require("socket.io")(httpServer,{  cors: {
            pingTimeout: 30000,
            origin: 'http://localhost:3000',
            methods: ['GET', 'PUT', 'POST']
          }});
        return io
    },
    getIO:()=>{
        if(!io){
            throw new Error("socket.io not initialized")
        }
        return io;
    }
}