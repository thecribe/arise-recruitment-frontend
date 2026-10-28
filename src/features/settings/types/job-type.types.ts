export interface JobType {
  id: string;
  name: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobTypeApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
