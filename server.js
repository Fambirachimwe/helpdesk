const http = require('http');
const port = process.env.PORT || 4000;
const app = require('./app');
const socketIo = require("socket.io");
const  axios = require('axios');


const server = http.createServer(app);

const io = socketIo(server);

io.on("connect", (socket) => {
        socket.emit("test",'new User connected to the server');

        socket.on('update', (token) => {
            // console.log(token)
            const config = {
                headers: {
                  "X-Auth-Token": token
                }
            }
            
            axios.get("http://127.0.0.1:4000/app/tickets", config).then(data => {
                io.emit('update_confirm', data.data.tickets );

                // emmit event to change the mytickets table

                io.emit("update_mytickets_table");

                                
            });
        })
    }
);

// io.on("update", (socket) => {
   
// })

// io.on('update', (dt) => {
//     console.log(dt)
// });


server.listen(port, () => {
    console.log(`listening to port ${port}`);
});

 