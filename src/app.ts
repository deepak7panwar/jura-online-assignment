/**
 * Module dependencies.
 */

import { urlencoded, json } from "body-parser";
import * as compression from "compression"; // compresses requests
import * as express from "express";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import * as responseTime from "response-time";

/**
 * Routes
 */
import { HandlerAllErrors, courseRoute } from "./routes";

import { LoggerUtil, streams } from "./common/logger";
import { ConfigCorrelationId } from "./common/middleware";
import { mkConnection } from "./utils/db/db-helper";
import { CourseOutlineService } from "./services";
import { AppError } from "./utils/errors/app-error";
import { INTERNAL_SERVER_ERROR, getStatusText } from "http-status-codes";

class App {
  // ref to Express instance
  public express: express.Express;
  private commonErrorHandler: HandlerAllErrors = new HandlerAllErrors();

  constructor() {
    this.express = express();
    this.configureMiddleware();
    this.configureRoutes();
    mkConnection()
      .then(connection => {
        // here you can start to work with your entities
        LoggerUtil.info("succefully created connection");
        CourseOutlineService.generateDummyDataInDatabase()
          .then(data => {
            LoggerUtil.info("inserted data successfully");
          })
          .catch(error => {
            LoggerUtil.error(error);
          });
      })
      .catch(error => {
        LoggerUtil.error(error);
        throw new AppError(
          "cannot insert data in db",
          INTERNAL_SERVER_ERROR,
          getStatusText(INTERNAL_SERVER_ERROR),
          error,
          false
        );
      });
    this.commonErrorHandler.registerAndHandleAllErrors(this.express);
  }

  private configureMiddleware(): void {
    this.express.use(morgan("combined", { stream: streams }));
    this.express.use(helmet());
    this.express.use(
      cors({
        origin: true,
        credentials: true
      })
    );
    this.express.use(responseTime());
    // set a cookie
    this.express.use(cookieParser());
    this.express.use(compression());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(json());
    LoggerUtil.info("middleware initialized");
  }

  /**
   * Primary app routes.
   */
  private configureRoutes(): void {
    this.express.use("/api/v1", ConfigCorrelationId.configLogging, courseRoute);
  }
}

export default new App().express;
