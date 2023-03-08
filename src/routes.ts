import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";

const router = express.Router();

//get routes - categories
router.get('/categories', categoriesController.index);
router.get('/categories/:id', categoriesController.show);

//get routes - courses
router.get('/courses/featured', coursesController.featured);
router.get('/courses/newest', coursesController.newest);
router.get('/courses/search', coursesController.search);
router.get('/courses/:id', coursesController.show);

export { router }