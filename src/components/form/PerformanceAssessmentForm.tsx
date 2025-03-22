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


interface AnswerFormProps {
  questions: Question[];
  // We'll use a serverAction URL string or form action instead of a function
  formAction: string;
}

export default function PerformanceAssessmentForm({
  questions,
  formAction
}: AnswerFormProps) {
  // Create state to manage form data
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {};
    questions.forEach(question => {
      initialData[question.id] = "";
    });
    return initialData;
  });

  // Create state for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    questions.forEach(question => {
      if (!formData[question.id] || formData[question.id].trim() === "") {
        newErrors[question.id] = "Answer cannot be empty.";
      }
    });

    // If there are errors, update state and return false
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Please answer the following questions</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={formAction}
          method="POST"
          onSubmit={(e) => {
            if (!validateForm()) {
              e.preventDefault();
            }
          }}
          className="space-y-8"
        >
          {questions.map((question, index) => (
            <div key={question.id} className="space-y-2">
              <label
                htmlFor={question.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {`${index + 1}. ${question.value}`}
              </label>
              <Textarea
                id={question.id}
                name={question.id}
                placeholder="Your answer here..."
                className="min-h-24"
                value={formData[question.id] || ""}
                onChange={(e) => handleChange(question.id, e.target.value)}
              />
              {errors[question.id] && (
                <p className="text-sm font-medium text-red-500">
                  {errors[question.id]}
                </p>
              )}
            </div>
          ))}
          <Button type="submit">Submit Answers</Button>
        </form>
      </CardContent>
    </Card>
  );
}
