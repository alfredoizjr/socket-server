import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO, { Socket } from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default  class Server {

    private static _instance: Server;

    public app: express.Application;
    public port:number;

    public io: socketIO.Server;
    private _httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this._httpServer = new http.Server(this.app);
        this.io = socketIO( this._httpServer );
        this._listenSocket();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());       
    }

    private _listenSocket(){
        console.log('listen connection');

        this.io.on('connect',(client:Socket) => {
           
            // connecting user
            socket.connectingUser(client, this.io);
            // get user
            socket.setUsers(client, this.io);
            // get user actives
            socket.getUsers(client,this.io);
            // get emited
            socket.message(client, this.io);
            // disconnect
            socket.disconnect(client, this.io);
        })
    }

    public start(callback: any):void {
        this._httpServer.listen(this.port, callback);
    }

}