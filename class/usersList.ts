import { User } from './user';
export class UsersList {

    private list: User[] = [];

    constructor() { }

    // add user
    public addUser(user: User) {
        this.list.push(user);
        console.log(this.list)
        return user;
    }

    public updateName(id: string, name: string) {

        for (let user of this.list) {
            if (user.id === id) {

                user.name = name;
                break;
            }
        }

        console.log('======== update user ========');
        console.log(this.list);

    }

    // get list of the user
    public getList() {
        return this.list.filter(usr => usr.name !== 'no-name')
    }

    // get user from the list
    public getUser(id: string) {
        return this.list.find(usr => usr.id === id);
    }

    // get users in a room
    public getAllUsersInRoom(room: string) {
        return this.list.filter(usr => usr.room === room);
    }

    // remove user

    public removeUser(id: string) {
        const tempUser = this.getUser(id);
        this.list = this.list.filter(usr => usr.id !== id);
        console.log(this.list);
        return tempUser;
    }

}