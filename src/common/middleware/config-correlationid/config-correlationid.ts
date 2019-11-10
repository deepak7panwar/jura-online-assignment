import { NextFunction, Request, Response } from 'express';
import { LoggerUtil } from '../../logger';
import * as uuid from 'uuid';

export class ConfigCorrelationId {
    public static configLogging = (req: Request, res: Response, next: NextFunction) => {
        LoggerUtil.debug('setting request id');
        res.cookie['x-request-id'] = req.cookies['x-request-id'] || uuid();
        LoggerUtil.setCorrelationId(res.cookie['x-request-id']);
        LoggerUtil.info(`x-request-id set ${LoggerUtil.correlationId}`);
        next();
    }
}