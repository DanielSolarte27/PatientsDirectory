import { Router } from "express";
import patientRouter from "./patientRouter";

const indexRouter = Router();

indexRouter.use("/patients", patientRouter);

export default indexRouter;
