import * as http from "http";
import App from "./App";
import { LoggerUtil } from "./common/logger";
import { ErrorDecisionMaker } from "./utils/errors/error-decision-maker";

const normalizePort = (val: number | string): number | string | boolean => {
    const portValue: number = (typeof val === "string")
        ? parseInt(val, 10)
        : val;
    let retValue: string | number | boolean;
    if (isNaN(portValue)) {
        retValue = val;
    } else if (portValue >= 0) {
        retValue = portValue;
    } else {
        retValue = false;
    }
    return retValue;
}

const onError = (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== "listen") throw error;
    const bind = (typeof port === "string")
        ? `Pipe${port}`
        : `Port${port}`;
    switch (error.code) {
        case "EACCES":
            LoggerUtil.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            LoggerUtil.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = (): void => {
    const addr = server.address();
    const bind = (typeof addr === "string")
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    LoggerUtil.info(`Listening on ${bind}`);
}

const uncaughtExceptionHandler: NodeJS.UncaughtExceptionListener = error => {
    LoggerUtil.info(
        `Uncaught exception was caught with the following error ${error.name}: ${error.message}`
    );
    errorDecisionMaker.logAndNotifyAboutError(error);
    errorDecisionMaker.crashIfNotOperational(error);
};

const unhandledRejectionErrorHandler: NodeJS.UnhandledRejectionListener = reason => {
    LoggerUtil.error(
        "inside common error handler in undahdlerd rejectin of error section "
    );
    errorDecisionMaker.logAndNotifyAboutError(reason);
    errorDecisionMaker.crashIfNotOperational(reason);
}; 

const sigtermErrorHandler = async () => {
    LoggerUtil.info("Starting graceful shutdown");
    // health.shuttingDown();
    let exitCode = 0;
    // const shutdown = [App.closeServer(), db.closeDatabase()];
    const shutdown = [server.close()];
    for (const s of shutdown) {
        try {
            await s;
        } catch (e) {
            LoggerUtil.error("Error in graceful shutdown ", e);
            exitCode = 1;
        }
    }
    process.exit(exitCode);
};
const errorDecisionMaker: ErrorDecisionMaker = new ErrorDecisionMaker();
const port = normalizePort(process.env.PORT || 3000);
App.set("port", port);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const server = http.createServer(App);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
process.on("uncaughtException", uncaughtExceptionHandler);
process.on("unhandledRejection", unhandledRejectionErrorHandler);
process.on("SIGTERM", sigtermErrorHandler);
