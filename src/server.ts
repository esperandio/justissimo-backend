import express from 'express'

// import route from './routes/heloworld'
import {router} from './routes'

const app = express()

app.use(express.json())
app.use(router)

const port = process.env.PORT || 3000;

app.listen(port, () => 'server running on port 3333')