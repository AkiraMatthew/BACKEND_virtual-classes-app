import express from "express";
import { authController } from "./controllers/authController";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";

const router = express.Router();

//post routes - user auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

//get routes - categories
router.get('/categories', ensureAuth, categoriesController.index);
router.get('/categories/:id', categoriesController.show);

//get routes - courses
router.get('/courses/featured', ensureAuth, coursesController.featured);
router.get('/courses/newest', coursesController.newest);
router.get('/courses/search', ensureAuth, coursesController.search);
router.get('/courses/:id', ensureAuth, coursesController.show);

//get routes - episodes
router.get('/episodes/stream', ensureAuthViaQuery,episodesController.stream);

export { router }