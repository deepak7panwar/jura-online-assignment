
import { ErrorDecisionMaker } from '../utils/errors/error-decision-maker';
import { LoggerUtil } from '../common/logger';

/**
 * @description
 * Class which handels all the errors received from the service in one common area
 *
 * @export
 * @class HandlerAllErrors
 */
export class HandlerAllErrors {
  private errorDecisionMaker: ErrorDecisionMaker = new ErrorDecisionMaker();

  /**
   * @description
   * function which will handel all the errors in one place
   * @param {*} app
   * @returns
   * @memberof HandlerAllErrors
   */
  public registerAndHandleAllErrors(app) {
    LoggerUtil.debug('Error handler now registers to handle all errors');
    return app.use((err, req, res, next) => {
      LoggerUtil.info('Exception was caught by express middleware');
      this.errorDecisionMaker.logAndNotifyAboutError(err);
      res.status(err.httpCode).json(this.errorDecisionMaker.getFriendlyResponse(err));
      // since this error comes from an http request, we keep the
      // process alive by taking a risky call that the error is probably operational
      next();
    });
  }
}
