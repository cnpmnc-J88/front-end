// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form Types
export type FormCreateRequest = {
  form_name: string;
  form_description: string;
}

export interface FormResponse {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

// Label/Question Types
export interface LabelCreateRequest {
  label_name: string;
}

export interface LabelResponse {
  id: number;
  form_id: number;
  name: string;
  created_at: string;
}
