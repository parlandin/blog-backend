import { Response } from "express";
import logger from "../configs/pinoLogger.config";

const handleUnknownError = (res: Response, error: any) => {
  logger.error(error);
  return res.status(500).json({ error: "Ocorreu um error inesperado" });
};

export default handleUnknownError;
