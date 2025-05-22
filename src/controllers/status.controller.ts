import { Request, Response } from "express";
import { Controller, CatchAll, ResponseJson, Get } from "../decorators";
import HttpError from "src/utils/httpError";
import { StatusCodes } from "http-status-codes";

@Controller()
@CatchAll()
class StatusController {
  @Get("/")
  @ResponseJson()
  async getApiStatus(req: Request, res: Response) {
    res.status(StatusCodes.EXPECTATION_FAILED);
    return {
      message: "API is running",
      status: "success",
    };
  }
}

export default StatusController;
