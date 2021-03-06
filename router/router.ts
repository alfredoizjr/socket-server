import { Router, Request, Response } from 'express';
import Server from '../class/server';
import { usersConnected } from '../sockets/sockets';

const router = Router();
const server = Server.instance;

router.get('/message', (req: Request, res: Response) => {

    res.json({ status: true, message: 'All is ok' })

});

router.post('/message', (req: Request, res: Response) => {

    const body = req.body.body;
    const from = req.body.from

    const payload = { from, body }

    server.io.emit('new-message', payload)

    res.json({ status: true, message: 'All is ok in post', body, from })

});

router.post('/message/:id', (req: Request, res: Response) => {

    const id = req.params.id;
    const body = req.body.body;
    const from = req.body.from



    const payload = {
        from,
        body
    }

    server.io.in(id).emit('new-message-private', payload)

    res.json({ status: true, message: 'All is ok in post', id, body, from })

});

// get list of client ids are connected
router.get('/users', (req: Request, res: Response) => {

    server.io.clients((err:any, clients: string[]) => {
        if(err) {
           return res.json({
                status: false,
                err
            })
        }

        res.json({
            status: true,
            clients
        });
    });

});


// get users list are connected

router.get('/users/details', (req: Request, res: Response) => {

    res.json({
        status: true,
        users: usersConnected.getList()
    });

});


export default router;