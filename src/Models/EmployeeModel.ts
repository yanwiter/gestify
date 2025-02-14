export interface EmployeeModel {
  id: string;
  fullName: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  cpf: string;
  rg: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  position: string;
  department: string;
  startDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  accessLevel: 'admin' | 'manager' | 'employee';
  createdAt: string;
  updatedAt: string;
}