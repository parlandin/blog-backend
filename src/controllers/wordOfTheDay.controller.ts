import { Request, Response } from "express";
import WordOfTheDayService from "../services/wordOfTheDay.service";
import logger from "../configs/pinoLogger.config";

class WordOfTheDayController {
  static async getWordOfDayJson(req: Request, res: Response) {
    try {
      let data = await WordOfTheDayService.getWordInJson();

      res.setHeader("CDN-Cache-Control", "max-age=3600");
      res.setHeader("Cache-Control", "max-age=3600");

      res.json(data);
    } catch (error) {
      logger.error(error);
      res.status(500).send("Erro ao buscar palavra do dia");
    }
  }

  static async getWordOfDayImage(req: Request, res: Response) {
    try {
      let imgBuffer = await WordOfTheDayService.getWordImage();

      res.setHeader("CDN-Cache-Control", "max-age=3600");
      res.setHeader("Cache-Control", "max-age=3600");

      res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Length": imgBuffer.length,
      });

      res.end(imgBuffer);
    } catch (error) {
      logger.error(error);
      res.status(500).send("Erro ao buscar imagem");
    }
  }
}

export default WordOfTheDayController;
