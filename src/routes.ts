import express from "express";
import { authController } from "./controllers/authController";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { favoritesController } from "./controllers/favoritesController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";

const router = express.Router();

//POST routes - user auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

//GET routes - categories
router.get('/categories', ensureAuth, categoriesController.index);
router.get('/categories/:id', categoriesController.show);

//GET routes - courses
router.get('/courses/featured', ensureAuth, coursesController.featured);
router.get('/courses/newest', coursesController.newest);
router.get('/courses/search', ensureAuth, coursesController.search);
router.get('/courses/:id', ensureAuth, coursesController.show);

//GET routes - episodes
router.get('/episodes/stream', ensureAuthViaQuery,episodesController.stream);

//POST routes - favorites
router.post('/favorites', ensureAuth, favoritesController.save);

export { router }