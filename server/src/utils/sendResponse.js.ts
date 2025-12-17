import { Response } from 'express';

export interface SendResponseOptions<T = any> {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
}

const sendResponse = <T = any>(res: Response, options: SendResponseOptions<T>) => {
    res.status(options.statusCode).json({
        statusCode: options.statusCode,
        success: options.success,
        message: options.message,
        data: options.data ?? null,
    });
};

export default sendResponse;
