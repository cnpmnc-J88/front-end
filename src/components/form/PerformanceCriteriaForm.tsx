"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { PlusCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formApi, labelApi } from "@/services/api";

// Update the form schema to match the API requirements
const formSchema = z.object({
  form_name: z.string().min(1, { message: "Form name is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form description is required." }),
  criterias: z
    .array(z.string().min(1, { message: "Criteria cannot be empty." }))
    .min(1, { message: "At least one criteria is required." }),
});

export default function PerformanceCriteriaForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      form_name: "",
      form_description: "",
      criterias: [""],
    },
  });

  // Use fieldArray for better performance with dynamic fields
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "criterias",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      // First, create the form
      const formResponse = await formApi.createForm({
        form_name: values.form_name,
        form_description: values.form_description,
      });

      if (!formResponse.success || !formResponse.data) {
        setSubmitStatus({
          success: false,
          message: formResponse.error || "Failed to create form",
        });
        return;
      }

      const formId = formResponse.data.id;

      // Then add each criterion as a label
      const labelPromises = values.criterias.map((criteria) =>
        labelApi.createLabel(formId, { label_name: criteria })
      );

      // Wait for all labels to be added
      const labelResults = await Promise.all(labelPromises);

      // Check if any label failed to create
      const failedLabels = labelResults.filter((result) => !result.success);

      if (failedLabels.length > 0) {
        setSubmitStatus({
          success: true,
          message: "Form created but some criteria could not be added.",
        });
      } else {
        setSubmitStatus({
          success: true,
          message: "Form and all criteria created successfully!",
        });
        form.reset({
          form_name: "",
          form_description: "",
          criterias: [""],
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "An error occurred while submitting the form.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Assessment Form</CardTitle>
      </CardHeader>
      <CardContent>
        {submitStatus.message && (
          <div
            className={`p-4 mb-4 rounded-md ${
              submitStatus.success
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Form Name Field */}
            <FormField
              control={form.control}
              name="form_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a name for this assessment form..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Description Field */}
            <FormField
              control={form.control}
              name="form_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a description of this assessment form..."
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Criteria Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium">Assessment Criteria</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => append("")}
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Criteria
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <FormField
                    control={form.control}
                    name={`criterias.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{`Criteria ${index + 1}`}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter assessment criteria..."
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length >= 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-8"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Assessment Form"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
