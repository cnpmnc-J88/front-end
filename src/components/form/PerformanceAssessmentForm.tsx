"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { submitAnswers } from "@/actions/assessment/actions";

// Define the assessment form schema with Zod
const assessmentSchema = z.object({
  shortAssessment: z.string().min(1, { message: "Short assessment is required" }),
  point: z.number().min(0.1, { message: "Point must be greater than zero" }),
  answers: z.array(
    z.object({
      qId: z.string(),
      criteria: z.string(),
      ansValue: z.string().min(1, { message: "Assessment details are required" })
    })
  ).min(1)
});

// Define the interface for the assessment form props
interface AssessmentFormProps {
  assessment: {
    id: string;
    formName: string;
    criterias: Array<{
      id: string;
      label_name: string;
    }>;
  };
}

export default function PerformanceAssessmentForm({ assessment }: AssessmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // Initialize the form with default values
  const form = useForm<z.infer<typeof assessmentSchema>>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      shortAssessment: "",
      point: 0,
      answers: assessment.criterias.map(criteria => ({
        qId: criteria.id,
        criteria: criteria.label_name,
        ansValue: ""
      }))
    }
  });

  async function onSubmit(values: z.infer<typeof assessmentSchema>) {
    console.log("Submitting assessment with values:", values);
    setIsSubmitting(true);
    setSubmitStatus({});
    try {
      // Create FormData object
      const formData = new FormData();

      // Add the form ID
      formData.append("formId", assessment.id.toString());

      // Add each answer to the form data using the appropriate field naming
      values.answers.forEach(answer => {
        formData.append(`q${answer.qId}`, answer.ansValue);
      });

      // Add the shortAssessment and point as additional fields
      formData.append("qShortAssessment", values.shortAssessment);
      formData.append("qPoint", values.point.toString());

      // Log the constructed FormData
      console.log("FormData before submission:", Object.fromEntries(formData.entries()));

      // Submit to the API using the server action
      const result = await submitAnswers(formData);

      console.log("Submission result:", result);

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Assessment submitted successfully!",
        });
        form.reset();
      } else {
        setSubmitStatus({
          success: false,
          message: result.error || "Failed to submit assessment",
        });
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setSubmitStatus({
        success: false,
        message: "An error occurred while submitting the assessment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Assessment</CardTitle>
        <CardDescription className="mt-1">
          Using the {assessment.formName} template
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitStatus.message && (
          <div
            className={`p-4 mb-4 rounded-md ${submitStatus.success
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
              }`}
          >
            {submitStatus.message}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Short Assessment Field */}
            <FormField
              control={form.control}
              name="shortAssessment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Assessment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief assessment..."
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Point Field */}
            <FormField
              control={form.control}
              name="point"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment Score</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter score"
                      min="0"
                      step="0.1"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Detail Assessments */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Detailed Assessment by Criteria</h3>

              {form.getValues().answers.map((answer, index) => (
                <FormField
                  key={answer.qId}
                  control={form.control}
                  name={`answers.${index}.ansValue`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`${index + 1}. ${answer.criteria}`}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide detailed assessment for this criteria..."
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Assessment"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
