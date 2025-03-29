import { ApiResponse } from './types';
import { apiRequest } from './apiUtils';

export interface CreateAssessmentRequest {
  rating: string;
  comment: string;
  status: "completed" | "needs-improvement" | "good";
  assessor_position: string;
}

export interface AssessmentResponse {
  id: number;
  rating: number;
  comment: string;
  status: string;
  assessor_position: string;
  createdAt: string;
}

/**
 * Assessment-related API functions
 */
export const assessmentApi = {
  // Create a new assessment - now using formID as a query parameter
  createAssessment: async (formId: number, body: CreateAssessmentRequest): Promise<ApiResponse<AssessmentResponse>> => {
    // Using query parameter instead of path parameter
    return apiRequest<AssessmentResponse>('/create_assessment', 'POST', { formID: formId.toString() }, body);
  },

  // Get assessment by ID
  getAssessment: async (id: string | number): Promise<ApiResponse<AssessmentResponse>> => {
    return apiRequest<AssessmentResponse>(`/assessment/${id}`, 'GET');
  },
};
