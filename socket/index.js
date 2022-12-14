const io = require('socket.io')(9000 , {
    cors:{
        origin : 'http://localhost:3000'
    }
});


let users = []



const addUser = (socketId , userId) => {

    !users.some((user) => user.userId === userId) &&
    users.push({ userId , socketId })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== sockeId )
} 

const getUser = (userId) => {
    return users.find((user => user.userId === userId))
}

io.on("connection" , (socket) => {

    //connect

    console.log('user connected')

    //take userId and socketId from user

    socket.on("addUser" , (userId) => {
        addUser( socket.id, userId)
        io.emit('getUser' , users)
    })


    // send and get messages

    socket.on("sendMesssage" , ({senderId , recieverId , text}) => {

        const user = getUser(recieverId)

        io.to(user.socketId).emit("getMessage" , {
            senderId,
            text
        })

    })



    // diconnect

    socket.on("disconnection" , () => {
        cosole.log("user disconnected")
        removeUser(socket.id)
        io.emit('getUser' , users)
        console.log(users)
    })


})