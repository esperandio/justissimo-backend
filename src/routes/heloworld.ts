import { Router, Request, Response } from 'express'
import client from '../database/index'

const route = Router()

route.get('/', async(req: Request, res: Response) => {
    const dados = await client.user.findMany();
    res.status(200).json({ message: dados})
})

export default route;