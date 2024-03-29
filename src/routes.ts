import express from 'express';
import { authController } from './controllers/authController';
import { categoriesController } from './controllers/categoriesController';
import { coursesController } from './controllers/coursesController';
import { episodesController } from './controllers/episodesController';
import { favoritesController } from './controllers/favoritesController';
import { likesController } from './controllers/likesController';
import { usersController } from './controllers/usersController';
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth';

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
router.get('/courses/popular', ensureAuth, coursesController.popular);
router.get('/courses/:id', ensureAuth, coursesController.show);

//GET routes - episodes
router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream);
router.get(
    '/episodes/:id/watchTime',
    ensureAuth,
    episodesController.getWatchTime
);
//POST routes - episodes
router.post(
    '/episodes/:id/watchTime',
    ensureAuth,
    episodesController.setWatchTime
);

//GET routes - favorites
router.get('/favorites', ensureAuth, favoritesController.index);
//POST routes - favorites
router.post('/favorites', ensureAuth, favoritesController.save);
//DELETE routes - favorites
router.delete('/favorites/:id', ensureAuth, favoritesController.delete);

//POST - likes
router.post('/likes', ensureAuth, likesController.post);
//DELETE - likes
router.delete('/likes/', ensureAuth, likesController.delete);

//GET - users
router.get('/users/current', ensureAuth, usersController.show);
router.get('/users/current/watching', ensureAuth, usersController.watching);
//PUT - users
router.put('/users/current', ensureAuth, usersController.update);
router.put(
    '/users/current/accountPassword',
    ensureAuth,
    usersController.updatePassword
);

export { router };
