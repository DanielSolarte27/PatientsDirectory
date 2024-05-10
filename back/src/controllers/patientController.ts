import { Request, Response } from "express";
import IPatient from "../interfaces/IPatient";
import { getAllPatientsService, updatedPatient } from "../services/patientService";

export const getPatients = async (req: Request, res: Response) => {
    const patients: IPatient[] = await getAllPatientsService();
    res.status(200).json(patients)
}

export const updatePatient = async (req: Request, res: Response) => {
    const patientToUpdate = req.body;
    try {
        const patientUpdated = await updatedPatient(patientToUpdate);
        res.status(200).json(patientUpdated)
    } catch (error: any) {
        res.status(400).json({ message: error.message})
    }
}