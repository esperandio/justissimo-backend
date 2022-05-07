
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";

// import route from './routes/heloworld'
import {router} from './routes'

const app = express();

app.use(express.json());
app.use(router);
app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
        return response.status(401).json({
            status: "Error",
            message: error.message,
        });
    }
);

const port = process.env.PORT || 3333;

app.listen(port, () => 'server running on port 3333')