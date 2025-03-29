"use client";

import React from "react";
import PerformanceCriteriaForm from "@/components/form/PerformanceCriteriaForm";

export default function CreateAssessmentPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Performance Assessment</h1>
        <p className="text-gray-600 max-w-2xl text-center">
          Use this form to create a new assessment template. Add the performance criteria 
          you want to evaluate, and this will generate an assessment form that can be used 
          for employee reviews.
        </p>
      </div>

      {/* Example of pre-defined criteria templates */}
      <div className="mb-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Template Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TemplateCard 
            title="Technical Staff" 
            criteria={[
              "Technical Knowledge & Skills",
              "Problem Solving",
              "Quality of Work",
              "Collaboration",
              "Communication"
            ]}
          />
          <TemplateCard 
            title="Leadership" 
            criteria={[
              "Strategic Thinking",
              "Team Development",
              "Decision Making",
              "Change Management",
              "Business Acumen"
            ]}
          />
        </div>
      </div>

      {/* The actual form */}
      <PerformanceCriteriaForm />
    </div>
  );
}

// Helper component for template examples
function TemplateCard({ title, criteria }: { title: string, criteria: string[] }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-medium mb-2">{title}</h3>
      <ul className="text-sm text-gray-600">
        {criteria.map((item, index) => (
          <li key={index} className="mb-1">• {item}</li>
        ))}
      </ul>
    </div>
  );
}
