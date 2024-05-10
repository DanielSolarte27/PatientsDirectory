import IPatient from "../interfaces/IPatient";

const patients: IPatient[] = [
  {
    id: 1,
    name: "Javier Andrés Caicedo Rodríguez",
    identification: "123456789",
    identificationType: "Cédula de Ciudadanía",
    birthDate: "01/01/1998",
    age: 26,
    mobilePhone: "3015896358",
    phone: "7367448",
    address: "Calle 20 # 20-20",
    entity: "EPS SANITAS",
    healthStatus: "Estable",
    ocupation: "Independiente",
    lastCheckInDate: new Date("2023-05-02T10:30:00Z"),
    attentionType: "Consulta de Psiquiatría",
    observation:
      "Consulta por dolor de cabeza intermitente, sin otros síntomas asociados. Recomendado reposo y seguimiento.",
  },
  {
    id: 2,
    name: "Daniel Alejandro Solarte Criollo",
    identification: "1085339166",
    identificationType: "Cédula de Ciudadanía",
    birthDate: "01/03/1998",
    age: 26,
    mobilePhone: "3176527399",
    phone: "7230053",
    address: "Calle 20 # 20-20",
    entity: "EPS SANITAS",
    healthStatus: "Estable",
    ocupation: "Empleado",
    lastCheckInDate: new Date("2023-05-02T10:30:00Z"),
    attentionType: "Consulta de Psicología",
    observation:
      "Consulta por dolor de cabeza intermitente, sin otros síntomas asociados. Recomendado reposo y seguimiento.",
  },
];
export const getAllPatientsService = async () => {
  const allPatients: IPatient[] = patients;
  return allPatients;
};

export const updatedPatient = async (patientToUpdate: IPatient) => {
  const patientIndex = patients.findIndex(
    (patient: IPatient) => patient.id === patientToUpdate.id
  );

  patients[patientIndex] = patientToUpdate;

  return patientToUpdate;
};
