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
import { PlusCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const formSchema = z.object({
  id: z.string().min(1, { message: "Form ID is required." }),
  criterias: z.array(
    z.string().min(1, { message: "Criteria cannot be empty." })
  ).min(1, { message: "At least one criteria is required." })
});

export default function PerformanceCriteriaForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: `form-${Date.now()}`, // Generate a default ID
      criterias: [""]
    },
  });

  // Use fieldArray for better performance with dynamic fields
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "criterias",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Create the AssessmentForm object
    const assessmentForm: AssessmentForm = {
      id: values.id,
      criterias: values.criterias
    };

    // Do something with the form values
    console.log("Assessment Form Created:", assessmentForm);

    // Here you would typically send the form to your backend
    // For example: saveAssessmentForm(assessmentForm);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Assessment Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Form ID Field */}
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a unique form ID..." {...field} />
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
                          <Input
                            placeholder="Enter assessment criteria..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
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

            <Button type="submit">Create Assessment Form</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
