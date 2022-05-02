import express from 'express'

import route from './routes/heloworld'

const app = express()

app.use(express.json())
app.use(route)

const port = process.env.PORT || 3000;

app.listen(port, () => 'server running on port 3333')