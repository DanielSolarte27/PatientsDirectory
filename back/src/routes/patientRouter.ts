import { Router } from "express";
import { getPatients, updatePatient } from "../controllers/patientController";

const patientRouter = Router();

patientRouter.get("/", getPatients);
patientRouter.put("/update", updatePatient);


export default patientRouter;
