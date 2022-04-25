import { Router, Request, Response } from 'express'

const route = Router()

route.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'hello world with Typescript12' })
})

export default route;