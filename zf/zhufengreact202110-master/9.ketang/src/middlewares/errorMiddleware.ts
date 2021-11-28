import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import StatusCodes from 'http-status-codes';
const errorMiddleware = (error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        errors: error.errors
    });
}
export default errorMiddleware;