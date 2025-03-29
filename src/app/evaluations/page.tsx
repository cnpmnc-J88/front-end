"use client";
import EvaluationPage, { EvaluationItem } from "@/components/EvaluationCard";
import { useEffect, useState } from "react";

interface FormItem {
  id: number;
  user: {
    displayName: string;
  };
  form: {
    id: number;
  };
  createdAt: string;
  status: string;
  comment: string;
}

interface FormItemList {
  content: FormItem[];
}

interface AssessmentInterface {
  labelNames: string[];
}

export default function Evaluation() {
  const [evaluations, setEvaluations] = useState<EvaluationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormData = async (
      accessToken: string
    ): Promise<FormItemList> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/history`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch form: ${response.statusText}`);
      }

      return response.json();
    };

    const fetchAssessment = async (
      accessToken: string,
      formId: number
    ): Promise<AssessmentInterface> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getassessment/${formId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch assessment for form ${formId}`);
      }

      return response.json();
    };

    const callApi = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const forms = await fetchFormData(accessToken);

        const evaluationsWithAssessments: EvaluationItem[] = await Promise.all(
          forms.content.map(async (form) => {
            const assessment = await fetchAssessment(accessToken, form.form.id);
            return {
              id: form.id,
              employeeName: form.user.displayName,
              evaluationDate: form.createdAt,
              criteria: assessment.labelNames,
              status: form.status,
              comment: form.comment,
            };
          })
        );

        setEvaluations(evaluationsWithAssessments);
      } catch (err) {
        console.error("API call failed:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    callApi();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <EvaluationPage items={evaluations} />
    </div>
  );
}
