import axios, { AxiosResponse } from "axios";

const API_URL: string = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

export const patientDirectory = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.get("/patients");
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const patientUpdate = async (patientUpdate: any): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.put(
      `/patients/update`,
      patientUpdate
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
