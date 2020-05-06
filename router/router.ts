import { Router, Request, Response } from 'express';

const router = Router();

router.get('/message', (req: Request, res: Response) => { 

    res.json({status: true, message: 'All is ok'})

});

router.post('/message', (req: Request, res: Response) => { 

    const params = req.body.desde;
    const from = req.body.from

    res.json({status: true, message: 'All is ok in post', params, from})

});

router.post('/message/:id', (req: Request, res: Response) => { 

    const id = req.params.id;
    const params = req.body.desde;
    const from = req.body.from

    res.json({status: true, message: 'All is ok in post', id, params, from})

});


export default router;