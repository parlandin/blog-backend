import { Router } from "express";
import WordOfTheDayController from "../controllers/wordOfTheDay.controller";

const dayRoute = Router();

dayRoute.get("/json/word", WordOfTheDayController.getWordOfDayJson);

dayRoute.get("/image/word", WordOfTheDayController.getWordOfDayImage);

export default dayRoute;
