"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { tokenService } from "@/services/auth";

// Define interfaces for API data

interface Form {
  id: number;
  form_name: string;
  form_description: string;
  former_position: string;
}

interface Assessment {
  assID: number;
  formId: number;
  rating: number | null;
  evaluationDate: string;
  comment: string | null;
  status: string | null;
  assessor_email: string;
  labelNames: string[];
  answers: any[];
  form_email: string;
  former_position: string;
  assessor_position: string | null;
}

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const accessToken = tokenService.getToken();
const headers = {
  Authorization: "Bearer " + accessToken,
  "Content-Type": "application/json",
};

export default function Home() {
  const [forms, setForms] = useState<Form[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/api/form?page=0`, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setForms(data);
        if (data.length > 0) setSelectedForm(data[0].id.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching forms:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedForm) {
      setLoading(true);
      fetch(`${url}/api/getassessment/${selectedForm}`, {
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          setAssessments(data);
          setLoading(false);
        })
        .catch((err) => {
          setAssessments([]);
          console.error("Error fetching assessments:", err);
          setLoading(false);
        });
    }
  }, [selectedForm]);

  const handleFormChange = (value: string) => {
    setSelectedForm(value);
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Form Selection */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedForm || undefined}
            onValueChange={handleFormChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a Form" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(forms) && forms.length > 0 ? (
                forms.map((form) => (
                  <SelectItem key={form.id} value={form.id.toString()}>
                    {form.form_name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="loading" disabled>
                  No forms available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Assessments Display */}
      <div className="w-full">
        {loading ? (
          <Skeleton className="h-32 w-full" />
        ) : assessments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assess) => (
              <Card key={assess.assID} className="col-span-1">
                <CardHeader>
                  <CardTitle>{assess.assessor_email}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Evaluation Date:</strong> {assess.evaluationDate}
                  </p>
                  <p>
                    <strong>Rating:</strong> {assess.rating ?? "N/A"}
                  </p>
                  <p>
                    <strong>Comment:</strong> {assess.comment ?? "No Comment"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="w-full">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No assessments found for this form
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
