import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import "express-async-errors";
import express, { application, NextFunction, Request, Response } from "express";
import { router_clients } from './routes/clients/router';
import { router_lawyers } from './routes/lawyers/router';
import { router_user } from './routes/user/router';
import { router_areas } from './routes/areas/router';
import { router_schedulings } from './routes/schedulings/router';
import { NotFoundError, DomainError, UnauthorizedError } from "./errors";
import { router_divulgations } from './routes/divulgations/router';
import { router_messages } from './routes/messages/router';


const app = express();
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000', 'https://justissimo-frontend.herokuapp.com'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());
app.use(router_clients);
app.use(router_lawyers);
app.use(router_user);
app.use(router_areas);
app.use(router_schedulings);
app.use(router_divulgations);
app.use(router_messages);

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

    const base = "production";
    if (process.env.NODE_ENV !== base) {
        return response.status(500).json({
            status: "Internal Server Error",
            message: error.message
        });
    }

    return response.status(500).json({
        status: "Internal Server Error",
        message: `🤨 Algo deu errado! Tente novamente mais tarde`
    });
});

const port = process.env.PORT || 3333;

app.listen(port, () => 'server running on port 3333')