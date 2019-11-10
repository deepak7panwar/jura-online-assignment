'use strict';
import { LoggerUtil } from '../../common/logger/logger.class';



export class ErrorDecisionMaker {

  public crashIfNotOperational(error) {
    LoggerUtil.error(
      `inside common error handler in undahdlerd rejectin
       of error section inside crash in not operational`
    );

    // if (!operationalErrorDecider.isOperationalError(error)) {
    //   //process.exit(1);
    // }
  }

  public logAndNotifyAboutError(error) {
    LoggerUtil.error(
      `inside common error handler in undahdlerd
      rejectin of error section inside crash in not logandnotifyabouterror`,
      error
    );

    // if (!operationalErrorDecider.isOperationalError(error))
  }

  public getFriendlyResponse(error) {
    return { name: error.name, message: error.message }; // ||error.message if comes as status code
  }
}
