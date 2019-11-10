import * as path from "path";
import { IEnvironmentConfig } from "./IEnvironmentConfig";

/**
 *  file contains configurations for all the environments
 *  the number of environments are as follows :-
 *  1.)LOCAL
 *  2.)PROD
 */

const config: { [key: string]: any } = {
  LOCAL: {
    dbConnection: {
      host: process.env.DB_HOST || "localhost",
      type: "mysql",
      port: process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "test",
    }
  },
  PROD: {
    dbConnection: {
      host: process.env.DB_HOST || "localhost",
      type: "mysql",
      port: process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "test",
    }
  }
};
export const currentEnvironment: IEnvironmentConfig =
  config[process.env.env || "LOCAL"];


