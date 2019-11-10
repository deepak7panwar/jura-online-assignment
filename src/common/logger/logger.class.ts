import { Request, Response } from 'express';
import { logger } from './loger-conf';

export class LoggerUtil {
  public static correlationId: any = null;

  public static setCorrelationId(id: string) {
    LoggerUtil.correlationId = id;
  }

  public static log(level: string, ...payload: any[]) {
    const meta: any = {};
    if (payload) {
      meta.payload = payload;
    }
    if (LoggerUtil.correlationId) {
      meta.correlationId = LoggerUtil.correlationId;
    }
    logger.log(level, `\n${JSON.stringify({ msg: [...payload], ...meta })}`);
  }
  public static info(...payload: any[]) {
    LoggerUtil.log('info', ...payload);
  }
  public static debug(...payload: any[]) {
    LoggerUtil.log('debug', ...payload);
  }
  public static warn(...payload: any[]) {
    LoggerUtil.log('warn', ...payload);
  }
  public static error(...payload: any[]) {
    LoggerUtil.log('error', ...payload);
  }

  /**
   * x-response-time header is added by express response
   * time middleware the correlationId
   * both of it is added to log
   */
  public static logAPITraceOut(request: Request, response: Response, messages?: any) {
    const responseTime = response.getHeader('x-response-time');
    const responseStatus = response.status;
    const requestCorrelationId = LoggerUtil.correlationId;
    const fullUrl = `${request.protocol}://${request.get('host')}${
      request.originalUrl
      }`;

    if (messages) {
      LoggerUtil.info({
        requestCorrelationId,
        fullUrl,
        responseStatus,
        responseTime,
        messages,
      });
    } else {
      LoggerUtil.info({
        requestCorrelationId,
        fullUrl,
        responseStatus,
        responseTime,
      });
    }
  }

  public static logAPITrace(
    request: Request,
    res: Response,
    statusCode: number,
    message?: any,
  ) {
    const responseTime = res.getHeader('x-response-time');
    const correlationId = LoggerUtil.correlationId;
    const requestedUrl = `${request.protocol}://${request.get('host')}${
      request.originalUrl
      }`;

    if (message) {
      LoggerUtil.info({
        correlationId,
        requestedUrl,
        statusCode,
        responseTime,
        message,
      });
    } else {
      LoggerUtil.info({
        correlationId,
        requestedUrl,
        statusCode,
        responseTime,
      });
    }
  }
}
