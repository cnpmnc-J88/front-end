"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitAnswers } from "@/actions/assessment/actions";
import TemplateSelector from "@/components/form/TemplateSelector";
import PerformanceAssessmentForm from "@/components/form/PerformanceAssessmentForm";
import { Button } from "@/components/ui/button"; // Import the custom Button component


// Define serializable template type
interface TemplateItem {
  id: string;
  formName: string;
  criterias: Array<{
    id: string;
    label_name: string;
  }>;
}

// Example Templates
const templates: TemplateItem[] = [
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
  },
  {
    id: "management",
    formName: "Management Assessment",
    criterias: [
      { id: "team_leadership", label_name: "Team Leadership" },
      { id: "strategic_planning", label_name: "Strategic Planning" },
      { id: "resource_management", label_name: "Resource Management" },
      { id: "performance_management", label_name: "Performance Management" },
      { id: "decision_making", label_name: "Decision Making" },
      { id: "communication_influence", label_name: "Communication & Influence" }
    ]
  },
  {
    id: "technical",
    formName: "Technical Assessment",
    criterias: [
      { id: "technical_expertise", label_name: "Technical Expertise" },
      { id: "code_quality", label_name: "Code Quality" },
      { id: "problem_solving", label_name: "Problem Solving" },
      { id: "technical_documentation", label_name: "Technical Documentation" },
      { id: "innovation_learning", label_name: "Innovation & Learning" },
      { id: "technical_collaboration", label_name: "Technical Collaboration" }
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
      formName: `q2025-performance-${selectedTemplate.formName}`,
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
      <Button
        onClick={() => router.push('/form/template')}
      >
        Create new template
      </Button>

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
