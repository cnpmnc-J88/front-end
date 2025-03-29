import PerformanceAssessmentForm from "@/components/form/PerformanceAssessmentForm";
import { submitAnswers } from "@/assessment/actions";


export default function Home() {
  // Create the assessment form with criteria
  const assessmentForm: AssessmentForm = {
    id: "q2025-performance",
    criterias: [
      "Technical Skills & Knowledge",
      "Quality of Work",
      "Communication & Collaboration",
      "Problem Solving & Innovation",
      "Leadership & Initiative"
    ]
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Quarterly Performance Review</h1>
      <PerformanceAssessmentForm
        assessment={assessmentForm}
        formAction={submitAnswers}
      />
    </div>
  );
}
