"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitAnswers } from "@/actions/assessment/actions";
import TemplateSelector from "@/components/form/TemplateSelector";
import PerformanceAssessmentForm from "@/components/form/PerformanceAssessmentForm";
import { Button } from "@/components/ui/button";
import { formApi, labelApi } from "@/services/api";
import { FormResponse, LabelResponse } from "@/services/api";

// Helper function for transforming API responses
function apiFormToAssessmentForm(form: FormResponse, labels: LabelResponse[]): AssessmentForm {
  return {
    id: form.id.toString(),
    formName: form.name,
    criterias: labels.map(label => ({
      id: label.id.toString(),
      label_name: label.name
    }))
  };
}

// Fallback templates to use if API fails
const fallbackTemplates: AssessmentForm[] = [
  {
    id: "standard",
    formName: "Standard Assessment",
    criterias: [
      { id: "technical_skills", label_name: "Technical Skills & Knowledge" },
      { id: "quality_work", label_name: "Quality of Work" },
      { id: "communication", label_name: "Communication & Collaboration" },
      { id: "problem_solving", label_name: "Problem Solving & Innovation" },
      { id: "leadership", label_name: "Leadership & Initiative" }
    ]
  }
];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const [selectedTemplate, setSelectedTemplate] = useState<AssessmentForm | null>(null);
  const [templates, setTemplates] = useState<AssessmentForm[]>(fallbackTemplates);
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch all available forms/templates
  useEffect(() => {
    const fetchForms = async () => {
      setIsLoading(true);
      try {
        const response = await formApi.getAllForms();
        if (response.success && response.data && response.data.length > 0) {
          // Transform API data
          const mappedTemplates = await Promise.all(
            response.data.map(async (form) => {
              const labelsResponse = await labelApi.getFormLabels(form.id);
              return apiFormToAssessmentForm(
                form,
                labelsResponse.success && labelsResponse.data ? labelsResponse.data : []
              );
            })
          );

          setTemplates(mappedTemplates.length > 0 ? mappedTemplates : fallbackTemplates);
          setUsingFallback(mappedTemplates.length === 0);
        } else {
          setTemplates(fallbackTemplates);
          setUsingFallback(true);
        }
      } catch (err) {
        setTemplates(fallbackTemplates);
        setUsingFallback(true);
        console.error("Error fetching templates:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);

  // Set the selected template based on the URL query parameter
  useEffect(() => {
    if (templateId && templates.length > 0) {
      const foundTemplate = templates.find(t => t.id === templateId);
      setSelectedTemplate(foundTemplate || null);
    }
  }, [templateId, templates]);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
    router.push(`/form/assessment?template=${templateId}`);
  };

  const assessmentForm: AssessmentForm | null = selectedTemplate
    ? {
      id: `q2025-performance-${selectedTemplate.id}`,
      formName: `q2025-performance-${selectedTemplate.formName}`,
      criterias: selectedTemplate.criterias
    }
    : null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Performance Review</h1>

      {isLoading ? (
        <div>Loading templates...</div>
      ) : !assessmentForm ? (
        <>
          {usingFallback}
          <TemplateSelector
            templates={templates}
            selectedId={selectedTemplate?.id || null}
            onTemplateSelect={handleTemplateSelect}
          />
        </>
      ) : (
        <PerformanceAssessmentFormWrapper
          assessment={assessmentForm}
          formAction={submitAnswers}
        />
      )}

      <Button onClick={() => router.push('/form/template')} className="mt-4">
        Create new template
      </Button>
    </div>
  );
}

// Client-side wrapper for the form
function PerformanceAssessmentFormWrapper({
  assessment,
  formAction
}: {
  assessment: AssessmentForm;
  formAction: (formData: FormData) => Promise<any>;
}) {
  return (
    <>
      <div className="mb-4">
        <a href="/form/assessment" className="text-blue-500 hover:underline flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to templates
        </a>
      </div>
      <PerformanceAssessmentForm assessment={assessment} formAction={formAction} />
    </>
  );
}
