'use strict';
import { Router } from "express";
import { Course } from "../controllers/";
import { validateRequestMiddleware } from '../middlewares/validate-request/validate-request';


export const courseRoute = Router().get(
  "/courseOutline",
  validateRequestMiddleware,
  Course.getCourseOutline
);
