import { Request, Response } from "express";
import VisitCounter from "../services/VisitCounter.service";
import logger from "../configs/pinoLogger.config";

class VisitController {
  static async countVisits(req: Request, res: Response) {
    try {
      await VisitCounter.countVisitor(req);
      return res.status(200).json({ message: "Visit incremented" });
    } catch (error) {
      logger.error(`Increment visit error: ${error}`);
      return res.status(500).json({ message: "Failed to increment visit" });
    }
  }

  static async getAllVisits(req: Request, res: Response) {
    try {
      const visits = await VisitCounter.getAllVisits();
      return res.status(200).json(visits);
    } catch (error) {
      logger.error(`Get all visits error: ${error}`);
      return res.status(500).json({ message: "Failed to get all visits" });
    }
  }

  static async countSimpleVisit(req: Request, res: Response) {
    const path = req.body.path as string;

    if (!path) {
      logger.error("Path is required");
      return res.status(400).json({ message: "Path is required" });
    }

    try {
      const visit = await VisitCounter.simpleCountVisitor(path);
      return res.status(200).json({ total: visit });
    } catch (error) {
      logger.error(`Increment visit error: ${error}`);
      return res.status(500).json({ message: "Failed to increment visit" });
    }
  }

  static async getSimpleVisits(req: Request, res: Response) {
    const path = req.query.path as string;

    if (!path) {
      logger.error("Path is required");
      return res.status(400).json({ message: "Path is required" });
    }

    try {
      const visits = await VisitCounter.getSimpleVisitByPath(path);
      return res.status(200).json({ total: visits });
    } catch (error) {
      logger.error(`Get all visits error: ${error}`);
      return res.status(500).json({ message: "Failed to get all visits" });
    }
  }
}

export default VisitController;
