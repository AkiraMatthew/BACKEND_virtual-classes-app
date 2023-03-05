import express from "express";
import { categoriesController } from "./controllers/categoriesController";

const router = express.Router();

//get routes - categories
router.get('/categories', categoriesController.index);

export { router }