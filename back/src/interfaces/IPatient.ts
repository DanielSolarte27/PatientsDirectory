export default interface IPatient {
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
