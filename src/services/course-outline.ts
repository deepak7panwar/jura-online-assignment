import { CourseHerarchy } from "../entities/course-herarchy.entity";
import { getConnection } from "typeorm";
import { LoggerUtil } from "../common/logger/logger.class";
import { AppError } from "../utils/errors/app-error";
import { INTERNAL_SERVER_ERROR, getStatusText } from "http-status-codes";
export class CourseOutlineService {
    public static async generateDummyDataInDatabase() {
        try {
            const courseRepository = CourseOutlineService.getCourseOutlineRepository();
            const course = new CourseHerarchy();
            course.title = "course one";
            course.description = "course one description";
            await courseRepository.save(course);
            const chapter1 = new CourseHerarchy();
            chapter1.title = "chapter one";
            chapter1.description = "chapter one description";
            chapter1.parent = course;
            await courseRepository.save(chapter1);
            const chapter2 = new CourseHerarchy();
            chapter2.title = "chapter two";
            chapter2.description = "chapter three description";
            chapter2.parent = course;
            await courseRepository.save(chapter2);
            const chapter3 = new CourseHerarchy();
            chapter3.title = "chapter two";
            chapter3.description = "chapter three description";
            chapter3.parent = course;
            await courseRepository.save(chapter3);
            const chapter4 = new CourseHerarchy();
            chapter4.title = "chapter four";
            chapter4.description = "chapter four description";
            chapter4.parent = course;
            await courseRepository.save(chapter4);
            const unit11 = new CourseHerarchy();
            unit11.title = "unit one";
            unit11.description = "unit one description";
            unit11.parent = chapter1;
            await courseRepository.save(unit11);
            const unit12 = new CourseHerarchy();
            unit12.title = "unit one";
            unit12.description = "unit one description";
            unit12.parent = chapter1;
            await courseRepository.save(unit12);
            const unit13 = new CourseHerarchy();
            unit13.title = "unit one";
            unit13.description = "unit one description";
            unit13.parent = chapter1;
            await courseRepository.save(unit13);
            const unit21 = new CourseHerarchy();
            unit21.title = "unit one";
            unit21.description = "unit one description";
            unit21.parent = chapter2;
            await courseRepository.save(unit21);
            const unit22 = new CourseHerarchy();
            unit22.title = "unit one";
            unit22.description = "unit one description";
            unit22.parent = chapter2;
            await courseRepository.save(unit22);
            const unit31 = new CourseHerarchy();
            unit31.title = "unit one";
            unit31.description = "unit one description";
            unit31.parent = chapter3;
            await courseRepository.save(unit31);
            const subunit111 = new CourseHerarchy();
            subunit111.title = "cousubunitrse one";
            subunit111.description = "subunit one description";
            subunit111.parent = unit11;
            await courseRepository.save(subunit111);
            const subunit112 = new CourseHerarchy();
            subunit112.title = "subunit one";
            subunit112.description = "subunit one description";
            subunit112.parent = unit11;
            await courseRepository.save(subunit112);
            const subunit211 = new CourseHerarchy();
            subunit211.title = "subunit one";
            subunit211.description = "subunit one description";
            subunit211.parent = unit21;
            await courseRepository.save(subunit211);
            const subunit212 = new CourseHerarchy();
            subunit212.title = "subunit one";
            subunit212.description = "subunit one description";
            subunit212.parent = unit21;
            await courseRepository.save(subunit212);
            const subunit311 = new CourseHerarchy();
            subunit311.title = "subunit one";
            subunit311.description = "subunit one description";
            subunit311.parent = unit31;
            await courseRepository.save(subunit311);
        } catch (err) {
            LoggerUtil.error("error in inserting data", err);
            throw new AppError(
                "data insertion error",
                INTERNAL_SERVER_ERROR,
                getStatusText(INTERNAL_SERVER_ERROR),
                err
            );
        }
    }

    public static async findCourseOutlineTree() {
        try {
            const courseRepository = CourseOutlineService.getCourseOutlineRepository();
            return courseRepository.findTrees();
        } catch (err) {
            LoggerUtil.error("error in finding data", err);
            throw new AppError(
                "table drop error",
                INTERNAL_SERVER_ERROR,
                getStatusText(INTERNAL_SERVER_ERROR),
                err
            );
        }
    }

    public static async deleteTemporaryData() {
        try {
            const queryRunner = getConnection().createQueryRunner();
            const courseHerarchyClosure = await queryRunner.getTable(
                "course_herarchy_closure"
            );
            const courseHerarchy = await queryRunner.getTable("course_herarchy");
            if (courseHerarchyClosure) {
                await queryRunner.query(`DELETE FROM course_herarchy_closure;`);
                await queryRunner.query(`ALTER TABLE course_herarchy_closure AUTO_INCREMENT = 1;`);
            }
            if (courseHerarchy) {
                await queryRunner.query(`DELETE FROM course_herarchy; ALTER TABLE course_herarchy AUTO_INCREMENT = 1;`);
            }
            await queryRunner.executeMemoryDownSql();
            await queryRunner.release();
        } catch (err) {
            LoggerUtil.error("error in finding data", err);
            throw new AppError(
                "error in geting repository",
                INTERNAL_SERVER_ERROR,
                getStatusText(INTERNAL_SERVER_ERROR),
                err
            );
        }
    }

    private static getCourseOutlineRepository() {
        try {
            const connection = getConnection();
            return connection.getTreeRepository(CourseHerarchy);
        } catch (err) {
            LoggerUtil.error("error in finding data", err);
            throw new AppError(
                "error in geting repository",
                INTERNAL_SERVER_ERROR,
                getStatusText(INTERNAL_SERVER_ERROR),
                err
            );
        }
    }
}
