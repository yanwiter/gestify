import { Company } from "./Company";
import { UserPermissions } from "./Permission";

export interface AccessModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  permissions: UserPermissions;
  companies: Company[];
  selectedCompanies: string[];
}