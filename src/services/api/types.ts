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
export type LabelCreateRequest = {
  label_name: string;
}

export interface LabelResponse {
  id: number;
  form_id: number;
  name: string;
  created_at: string;
}

/**
 * Answer Types
 */
export type AnswerSubmitRequest = {
  answers: { qId: number; ansValue: string }[];
};

export interface AnswerResponse {
  submission_id: number;
  form_id: number;
  submitted_at: string;
}

/**
 * History Types
 */
export interface HistoryResponse {
  id: number;
  form_id: number;
  answers: { qId: number; ansValue: string }[];
  submitted_at: string;
}

/**
 * Assessment Types
 */
export interface AssessmentResponse {
  id: number;
  form_id: number;
  result: string;
  created_at: string;
}

/**
 * User Types
 */
export interface UserResponse {
  id: number;
  email: string;
  registered_at: string;
}
