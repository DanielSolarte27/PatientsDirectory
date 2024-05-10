import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { patientDirectory, patientUpdate } from "./service/Directory";
import "primeicons/primeicons.css";

interface Patient {
  id: number;
  name: string;
  identification: string;
  identificationType: string;
  birthDate: string;
  age: number;
  phone: string;
  address: string;
  mobilePhone: string;
  entity: string;
  healthStatus: string;
  ocupation: string;
  lastCheckInDate: Date;
  attentionType: string;
  observation: string;
}

interface Description {
  text: string;
  date: Date;
}

const PatientDirectory: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [descriptions, setDescriptions] = useState<Description[]>([]);
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await patientDirectory();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleRowClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDescription(e.target.value);
  };

  const handleAddDescription = () => {
    if (newDescription.trim()) {
      const newDesc: Description = {
        text: newDescription.trim(),
        date: new Date(),
      };
      setDescriptions([...descriptions, newDesc]);
      setNewDescription("");
    }
  };

  const handleRemoveDescription = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  const [isEditing, setIsEditing] = useState(false);
  const [mobilePhone, setMobilePhone] = useState(
    selectedPatient?.mobilePhone || ""
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    if (selectedPatient) {
      const patientUpdated = { ...selectedPatient, mobilePhone };
      setSelectedPatient(patientUpdated);
      await patientUpdate(patientUpdated);
      const patientsData = await patientDirectory();
      setPatients(patientsData);
    }
  };

  const handleInputChange = (e: any) => {
    setMobilePhone(e.target.value);
    console.log(e.target.value);
  };

  
  return (
    <div className="w-screen">
      <h3 className="text-blue-800 ml-6">Directorio de Pacientes</h3>
      <div className="flex justify-content-center align-items-center">
        <DataTable className="shadow-5"
          value={patients}
          onRowClick={(e) => handleRowClick(e.data as Patient)}
        >
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Paciente"></Column>
          <Column field="identification" header="Identificación"></Column>
          <Column field="mobilePhone" header="Celular"></Column>
          <Column field="entity" header="Entidad"></Column>
          <Column field="lastCheckInDate" header="Ultima Atención"></Column>
          <Column field="attentionType" header="Tipo de Atención"></Column>
          <Column field="healthStatus" header="Estado"></Column>
        </DataTable>

        <Dialog
          className="w-4"
          visible={!!selectedPatient}
          onHide={() => setSelectedPatient(null)}
          header={
            <div className="flex w-full">
              <div className="flex justify-content-center ml-6">
                <h3 className="text-blue-800">Información Paciente</h3>
              </div>
              <div className="flex justify-content-end absolute w-11 z-5">
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="bg-white text-red-500"
                >
                  X
                </button>
              </div>
            </div>
          }
        >
          <div className="w-full">
            <div className="block">
              <div>
                <b className="text-blue-800">Paciente</b>
              </div>
              <div> {selectedPatient?.name}</div>
            </div>
            <div className="grid">
              <div className="col-6">
                <div className="block">
                  <div className="mt-3">
                    <b className="text-blue-800">Fecha de nacimiento</b>
                  </div>
                  <div> {selectedPatient?.birthDate}</div>
                  <div className="mt-3">
                    <b className="text-blue-800">Tipo de Identificación</b>
                  </div>
                  <div> {selectedPatient?.identificationType}</div>
                  <div>
                    <div className="mt-3">
                      <b className="text-blue-800">
                        Celular
                        <button
                          onClick={
                            isEditing ? handleSaveClick : handleEditClick
                          }
                          className="bg-white text-green-500"
                        >
                          <i className="pi pi-pen-to-square"></i>
                        </button>
                      </b>
                    </div>
                    {isEditing ? (
                      <input value={mobilePhone} onChange={handleInputChange} />
                    ) : (
                      <div>{selectedPatient?.mobilePhone}</div>
                    )}
                  </div>
                  <div className="mt-3">
                    <b className="text-blue-800">Dirección</b>
                  </div>
                  <div> {selectedPatient?.address}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="block">
                  <div className="mt-3">
                    <b className="text-blue-800">Edad</b>
                  </div>
                  <div> {selectedPatient?.age}</div>
                  <div className="mt-3">
                    <b className="text-blue-800">N° de Identificación</b>
                  </div>
                  <div> {selectedPatient?.identification}</div>
                  <div className="mt-3">
                    <b className="text-blue-800">Teléfono</b>
                  </div>
                  <div> {selectedPatient?.phone}</div>
                  <div className="mt-3">
                    <b className="text-blue-800">Ocupación</b>
                  </div>
                  <div> {selectedPatient?.ocupation}</div>
                </div>
              </div>
            </div>
            <div className="block w-full mt-3">
              <div>
                <b className="text-blue-800">Agregar Observación</b>
              </div>
              <InputTextarea
                className="w-full border-round"
                value={newDescription}
                onChange={handleDescriptionChange}
                rows={5}
                autoResize
              />
            </div>
          </div>

          <div className="w-full flex justify-content-end mb-4">
            <button
              onClick={handleAddDescription}
              className="bg-white text-green-500"
            >
              Guardar
            </button>
          </div>
          {descriptions.map((desc, index) => (
            <div key={index}>
              <div className="block">
                <div className="flex">
                  <b className="w-8 text-blue-800">
                    Dra. Camila Zapata Zuñiga{" "}
                  </b>
                  <div className="w-4 flex justify-content-end">
                    <button
                      onClick={() => handleRemoveDescription(index)}
                      className="bg-white text-red-500"
                    >
                      <i className="pi pi-trash"></i>
                    </button>
                  </div>
                </div>
                <div className="mb-3">Medico General </div>

                <div className="description">{desc.text}</div>
              </div>
            </div>
          ))}
        </Dialog>
      </div>
    </div>
  );
};

export default PatientDirectory;
