"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitAnswers } from "@/assessment/actions";
import TemplateSelector from "@/components/form/TemplateSelector";
import PerformanceAssessmentForm from "@/components/form/PerformanceAssessmentForm";


// Define serializable template type
interface TemplateItem {
  id: string;
  name: string;
  criterias: string[];
}

// Example Templates
const templates: TemplateItem[] = [
  {
    id: "standard",
    name: "Standard Assessment",
    criterias: [
      "Technical Skills & Knowledge",
      "Quality of Work",
      "Communication & Collaboration",
      "Problem Solving & Innovation",
      "Leadership & Initiative"
    ]
  },
  {
    id: "management",
    name: "Management Assessment",
    criterias: [
      "Team Leadership",
      "Strategic Planning",
      "Resource Management",
      "Performance Management",
      "Decision Making",
      "Communication & Influence"
    ]
  },
  {
    id: "technical",
    name: "Technical Assessment",
    criterias: [
      "Technical Expertise",
      "Code Quality",
      "Problem Solving",
      "Technical Documentation",
      "Innovation & Learning",
      "Technical Collaboration"
    ]
  }
];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get('template'); // Access the query parameter
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);

  // Set the selected template based on the URL query parameter
  useEffect(() => {
    if (typeof template === "string") {
      const foundTemplate = templates.find(t => t.id === template);
      setSelectedTemplate(foundTemplate || null);
    }
  }, [template]);

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
    // Update the URL with the selected template
    router.push(`/form/assessment?template=${templateId}`);
  };

  // Convert to AssessmentForm format if template is found
  const assessmentForm: AssessmentForm | null = selectedTemplate
    ? {
      id: `q2025-performance-${selectedTemplate.id}`,
      criterias: selectedTemplate.criterias
    }
    : null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Performance Review</h1>

      {!assessmentForm ? (
        <TemplateSelector
          templates={templates}
          selectedId={selectedTemplate?.id || null}
          onTemplateSelect={handleTemplateSelect} // Pass the handler to TemplateSelector
        />
      ) : (
        <PerformanceAssessmentFormWrapper
          assessment={assessmentForm}
          formAction={submitAnswers}
        />
      )}
    </div>
  );
}

// Client-side wrapper for the form
// TODO: đoạn này nhờ chatgpt code nên hơi lỏ 
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
        <a
          href="/form/assessment"
          className="text-blue-500 hover:underline flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to templates
        </a>
      </div>
      <PerformanceAssessmentForm
        assessment={assessment}
        formAction={formAction}
      />
    </>
  );
}
