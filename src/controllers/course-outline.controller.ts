import { Request, Response, NextFunction } from "express";
import { LoggerUtil } from "../common/logger";
import { OK } from "http-status-codes";
import { CourseOutlineService } from "../services";

export class Course {
  /**
   * Get /getCourseOutline
   * handling getCourseOutline
   */
  public static async getCourseOutline(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const courseOutline = await CourseOutlineService.findCourseOutlineTree();
      res.status(OK).json({ courseOutline, success: OK });
    } catch (err) {
      LoggerUtil.error("error inside redirection params", err);
      next(err);
    }
  }
}
