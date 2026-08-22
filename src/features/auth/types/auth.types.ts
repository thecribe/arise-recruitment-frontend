export type UserRole =
  | "APPLICANT" | "COMPLIANCE_MANAGER" 
  | "RECRUITMENT_MANAGER"
  | "TOP_ADMIN"
  | "STAFF_MANAGER";

  export interface jobType {
    id:string,
    name:string
  }
export interface AuthUser {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  role: UserRole;

  phone?: string;

  avatar?: string;
  jobType?:jobType;

  createdAt?: string;

  permissions: string[];

  updatedAt?: string;
}

export interface LoginPayload {
  email: string;

  password: string;
}

export interface RegisterPayload {
  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  address: string;

  postcode: string;

  jobTypeId: string;

  // password: string;

  // confirmPassword: string;

  acceptTerms: boolean;
}
export interface LoginResponse {
  user: AuthUser;
}
