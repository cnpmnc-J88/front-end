
import {
  ApiResponse,
  UserResponse,
  AnswerResponse,
  AnswerSubmitRequest,
  AssessmentResponse,
  HistoryResponse,
} from './types';
import { apiRequest } from './apiUtils';


/**
 * Answer-related API functions
 */
export const answerApi = {
  // Submit answers to a form
  submitAnswers: async (formId: string | number, params: AnswerSubmitRequest): Promise<ApiResponse<AnswerResponse>> => {
    return apiRequest<AnswerResponse>(`/ans/${formId}`, 'POST', {}, params);
  }
};

/**
 * History-related API functions
 */
export const historyApi = {
  // Get answer submission history
  getHistory: async (page: number = 0): Promise<ApiResponse<HistoryResponse[]>> => {
    return apiRequest<HistoryResponse[]>(`/history?page=${page}`, 'GET');
  },

  // Get specific answer submission details
  getHistoryEntry: async (historyId: string | number): Promise<ApiResponse<HistoryResponse>> => {
    return apiRequest<HistoryResponse>(`/history/${historyId}`, 'GET');
  }
};

/**
 * Assessment-related API functions
 */
export const assessmentApi = {
  // Create an assessment
  createAssessment: async (): Promise<ApiResponse<AssessmentResponse>> => {
    return apiRequest<AssessmentResponse>('/assessment/create', 'GET');
  },

  // Get assessment data
  getAssessment: async (): Promise<ApiResponse<AssessmentResponse>> => {
    return apiRequest<AssessmentResponse>('/assessment/get', 'GET');
  }
};

/**
 * User-related API functions
 */
export const userApi = {
  // Add a user to the system
  addUser: async (): Promise<ApiResponse<UserResponse>> => {
    return apiRequest<UserResponse>('/addUser', 'GET');
  }
};

