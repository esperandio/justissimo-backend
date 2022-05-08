
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { router } from './routes'
import { NotFoundError, DomainError } from "./errors";

const app = express();

app.use(express.json());
app.use(router);
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

    return response.status(500).json({
        status: "Internal Server Error",
        message: error.message
    });
});

const port = process.env.PORT || 3333;

app.listen(port, () => 'server running on port 3333')