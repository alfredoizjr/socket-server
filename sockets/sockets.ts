import { Socket } from 'socket.io';
import SocketIO from 'socket.io';
import { UsersList } from '../class/usersList';
import { User } from '../class/user';



export const usersConnected = new UsersList();

export const connectingUser = (client: Socket, io: SocketIO.Server) => {

    const user = new User(client.id);
    usersConnected.addUser(user);

}

export const disconnect = (client: Socket, io: SocketIO.Server) => {

    client.on('disconnect', () => {
        usersConnected.removeUser(client.id);
        io.emit('active-users', usersConnected.getList())
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

    client.on('set-user', (payload: { name: string }, callback: Function) => {

        usersConnected.updateName(client.id, payload.name);

        io.emit('active-users', usersConnected.getList());

        callback({
            status: true,
            message: `User ${payload.name} is ready`
        })
    });
}

// get users

export const getUsers = (client: Socket, io: SocketIO.Server) => {

    client.on('get-users', () => {
        io.emit('active-users', usersConnected.getList());
    });
}
