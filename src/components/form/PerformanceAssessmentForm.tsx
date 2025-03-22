"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";


interface AnswerFormProps {
  assessment: AssessmentForm;
  // We'll use a serverAction URL string or form action instead of a function
  formAction: (formData: FormData) => Promise<void>;
}

export default function PerformanceAssessmentForm({
  assessment,
  formAction
}: AnswerFormProps) {
  // Create state to manage form data
  const [formState, setFormState] = useState<Assessment>(() => {
    return {
      id: assessment.id,
      shortAssessment: "",
      point: 0,
      detailAssessment: assessment.criterias.map(criteria => ({
        id: `${assessment.id}-${criteria.replace(/\s+/g, '-').toLowerCase()}`,
        criteria,
        details: ""
      }))
    };
  });

  // Create state for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle short assessment change
  const handleShortAssessmentChange = (value: string) => {
    setFormState(prev => ({
      ...prev,
      shortAssessment: value
    }));

    // Clear error when user types
    if (errors["shortAssessment"]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors["shortAssessment"];
        return newErrors;
      });
    }
  };

  // Handle point change
  const handlePointChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormState(prev => ({
      ...prev,
      point: numValue
    }));

    // Clear error when user types
    if (errors["point"]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors["point"];
        return newErrors;
      });
    }
  };

  // Handle detail assessment change
  const handleDetailChange = (index: number, value: string) => {
    setFormState(prev => {
      const newDetailAssessment = [...prev.detailAssessment];
      newDetailAssessment[index] = {
        ...newDetailAssessment[index],
        details: value
      };
      return {
        ...prev,
        detailAssessment: newDetailAssessment
      };
    });

    // Clear error when user types
    const errorKey = `detail-${index}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate short assessment
    if (!formState.shortAssessment || formState.shortAssessment.trim() === "") {
      newErrors["shortAssessment"] = "Short assessment cannot be empty.";
    }

    // Validate point
    if (formState.point <= 0) {
      newErrors["point"] = "Point must be greater than zero.";
    }

    // Validate detail assessments
    formState.detailAssessment.forEach((detail, index) => {
      if (!detail.details || detail.details.trim() === "") {
        newErrors[`detail-${index}`] = "Detail assessment cannot be empty.";
      }
    });

    // If there are errors, update state and return false
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }

    // Create FormData object for submission
    const formData = new FormData();
    formData.append("id", formState.id);
    formData.append("shortAssessment", formState.shortAssessment);
    formData.append("point", formState.point.toString());
    formData.append("detailAssessment", JSON.stringify(formState.detailAssessment));

    // Submit the form
    formAction(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Short Assessment */}
          <div className="space-y-2">
            <label
              htmlFor="shortAssessment"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Short Assessment
            </label>
            <Textarea
              id="shortAssessment"
              name="shortAssessment"
              placeholder="Provide a brief assessment..."
              className="min-h-24"
              value={formState.shortAssessment}
              onChange={(e) => handleShortAssessmentChange(e.target.value)}
            />
            {errors["shortAssessment"] && (
              <p className="text-sm font-medium text-red-500">
                {errors["shortAssessment"]}
              </p>
            )}
          </div>

          {/* Point */}
          <div className="space-y-2">
            <label
              htmlFor="point"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Assessment Score
            </label>
            <Input
              id="point"
              name="point"
              type="number"
              placeholder="Enter score"
              value={formState.point || ""}
              onChange={(e) => handlePointChange(e.target.value)}
              min="0"
              step="0.1"
            />
            {errors["point"] && (
              <p className="text-sm font-medium text-red-500">
                {errors["point"]}
              </p>
            )}
          </div>

          {/* Detail Assessments */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Detailed Assessment by Criteria</h3>

            {formState.detailAssessment.map((detail, index) => (
              <div key={detail.id} className="space-y-2">
                <label
                  htmlFor={detail.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {`${index + 1}. ${detail.criteria}`}
                </label>
                <Textarea
                  id={detail.id}
                  name={`detail-${index}`}
                  placeholder="Provide detailed assessment for this criteria..."
                  className="min-h-24"
                  value={detail.details}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                />
                {errors[`detail-${index}`] && (
                  <p className="text-sm font-medium text-red-500">
                    {errors[`detail-${index}`]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <Button type="submit">Submit Assessment</Button>
        </form>
      </CardContent>
    </Card>
  );
}
