import { Router } from "express";
import {
  getWordOfDayImageController,
  getWordOfDayJsonController,
} from "../controller/wordOfTheDay.controller";

const dayRoute = Router();

dayRoute.get("/json/word", getWordOfDayJsonController);

dayRoute.get("/image/word", getWordOfDayImageController);

export default dayRoute;
