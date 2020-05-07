import { Socket } from 'socket.io';
import SocketIO from 'socket.io';
import { UsersList } from '../class/usersList';
import { User } from '../class/user';



export const usersConnected = new UsersList();

export const connectingUser = (client: Socket) => {
    
    const user = new User(client.id);
    usersConnected.addUser(user);

}

export const disconnect = (client: Socket) => {

    client.on('disconnect', () => {
        usersConnected.removeUser(client.id);
    });
}

// listen socket emited
export const message = (client: Socket, io: SocketIO.Server) => {

    client.on('message', (payload: { from: string, body: string }) => {
        console.log(payload);

        io.emit('new-message', payload);
    });

}

export const setUsers = (client: Socket, io: SocketIO.Server) => {

    client.on('set-user', (payload: { name: string}, callback:Function) => {
       
        usersConnected.updateName(client.id,payload.name);

        callback({
            status: true,
            message: `User ${payload.name} is ready`
        })
    });

}