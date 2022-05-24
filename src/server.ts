import cors from 'cors';
import "express-async-errors";
import express, { application, NextFunction, Request, Response } from "express";
import { router_clients } from './routes/clients/router';
import { router_lawyers } from './routes/lawyers/router';
import { router_user } from './routes/user/router';
import { NotFoundError, DomainError, UnauthorizedError } from "./errors";

const app = express();
app.use(cors);
app.use(express.json());
app.use(router_clients);
app.use(router_lawyers);
app.use(router_user);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof NotFoundError) {
        return response.status(404).json({
            status: "Not found",
            message: error.message,
        });
    }

    if (error instanceof DomainError) {
        return response.status(400).json({
            status: "Bad request",
            message: error.message,
        });
    }

    if (error instanceof UnauthorizedError) {
        return response.status(401).json({
            status: "Unauthorized",
            message: error.message,
        });
    }

    return response.status(500).json({
        status: "Internal Server Error",
        message: error.message
    });
});

const port = process.env.PORT || 3333;

app.listen(port, () => 'server running on port 3333')