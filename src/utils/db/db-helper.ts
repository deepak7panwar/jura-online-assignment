import { createConnection } from "typeorm";
import { CourseHerarchy } from '../../entities';
import * as path from 'path';
import { currentEnvironment } from "../../config";
export async function mkConnection() {
    const config = {
        ...currentEnvironment.dbConnection,
        synchronize: true,
        logging: false,
        entities: [
            CourseHerarchy
        ]
    };
    return createConnection(config);
}
