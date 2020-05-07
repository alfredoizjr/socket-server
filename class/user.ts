export class User {

    constructor(
        public id: string,
        public name: string = 'no name',
        public room: string = 'no-room'
    ) {}
}