import { Socket } from 'socket.io';

export const disconnect = (client: Socket) => {

    client.on('disconnect', () => {
        console.log('client disconnect');
    });

}

// listen socket emited
export const message = (client: Socket, io: SocketIO.Server) => {

    client.on('message', (payload: { from: string, body: string }) => {
        console.log(payload);

        io.emit('new-message', payload);
    })

}