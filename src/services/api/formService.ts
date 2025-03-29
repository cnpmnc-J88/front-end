import {
  ApiResponse,
  FormCreateRequest,
  FormResponse,
  LabelCreateRequest,
  LabelResponse
} from './types';
import { apiRequest } from './apiUtils';

/**
 * Form-related API functions
 */
export const formApi = {
  // Create a new form
  createForm: async (params: FormCreateRequest): Promise<ApiResponse<FormResponse>> => {
    const adhocParams = {
      ...params,
      // backend requirement, don't know why :pepe-hang:
      former_position: 'hehe'
    }
    return apiRequest<FormResponse>('/form', 'POST', adhocParams);
  },

  // Get form by ID
  getForm: async (formId: string | number): Promise<ApiResponse<FormResponse>> => {
    return apiRequest<FormResponse>(`/form/${formId}`, 'GET');
  },

  // Get all forms
  getAllForms: async (): Promise<ApiResponse<FormResponse[]>> => {
    return apiRequest<FormResponse[]>('/form', 'GET');
  },
};

/**
 * Label/Question-related API functions
 */
export const labelApi = {
  // Add a label/question to a form
  createLabel: async (formId: string | number, params: LabelCreateRequest): Promise<ApiResponse<LabelResponse>> => {
    return apiRequest<LabelResponse>(`/label/${formId}`, 'POST', params);
  },

  // Get all labels for a form
  getFormLabels: async (formId: string | number): Promise<ApiResponse<LabelResponse[]>> => {
    return apiRequest<LabelResponse[]>(`/label/form/${formId}`, 'GET');
  },

  // Delete a label
  deleteLabel: async (labelId: string | number): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/label/${labelId}`, 'DELETE');
  },
};
