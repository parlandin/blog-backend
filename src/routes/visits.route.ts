import { Router } from "express";
import VisitController from "../controllers/visit.controller";

const visits = Router();

visits.post("/count-global", VisitController.countVisits);
visits.get("/get-stats", VisitController.getAllVisits);

visits.post("/count", VisitController.countSimpleVisit);
visits.get("/get", VisitController.getSimpleVisits);

export default visits;
