import { io } from "../../../";

export default class SocketRooms{
    static async room (room: string | string[]){
        io.on('connection', (socket) => {
            // console.log('A client has connected.');
          
            // Handle the 'join' event, which is sent by the client
            socket.on('join', () => {
              // console.log(`Client has joined room ${room}.`);
              // Join the room
              socket.join(room);
            });
          });
    }
}

