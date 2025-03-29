"use server";
import { answerApi } from '@/services/api/answerService';
import { AnswerSubmitRequest } from '@/services/api';

export async function submitAnswers(formData: FormData) {
  try {
    // Extract the form ID from the form data
    const formId = formData.get("formId") as string;
    if (!formId) {
      return { success: false, error: "Form ID is required" };
    }

    // Log form data contents
    console.log("Submitting form with ID:", formId);
    for (const [key, value] of formData.entries()) {
      console.log(`Field: ${key}, Value: ${value}`);
    }

    // Prepare answers array for the request
    const answers = [];

    // Process form data to extract question IDs and answers
    for (const [key, value] of formData.entries()) {
      // Skip the formId field
      if (key !== "formId") {
        // Assuming key is in the format "q123" where 123 is the question ID
        const match = key.match(/^q(\d+)$/);
        if (match) {
          const qId = parseInt(match[1], 10);
          answers.push({
            qId: qId,
            ansValue: value as string
          });
        }
      }
    }

    // Create the properly structured request object
    const requestData: AnswerSubmitRequest = {
      answers: answers
    };

    // Use the answerApi utility to submit the form
    const response = await answerApi.submitAnswers(formId, requestData);

    // Log the API response
    console.log("API Response:", response);

    if (!response.success) {
      return {
        success: false,
        error: response.error || "Failed to submit answers"
      };
    }

    return { success: true, data: response.data };

  } catch (error) {
    console.error("Error submitting assessment:", error);
    return { success: false, error: "Failed to submit assessment" };
  }
}
