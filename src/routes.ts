import express from "express";
import { authController } from "./controllers/authController";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";

const router = express.Router();

//post routes - user auth
router.post('/auth/register', authController.register);

//get routes - categories
router.get('/categories', categoriesController.index);
router.get('/categories/:id', categoriesController.show);

//get routes - courses
router.get('/courses/featured', coursesController.featured);
router.get('/courses/newest', coursesController.newest);
router.get('/courses/search', coursesController.search);
router.get('/courses/:id', coursesController.show);

//get routes - episodes
router.get('/episodes/stream', episodesController.stream);

export { router }