"use client";

import { useState, use } from "react";
"use client";

import { EvaluationItem } from "@/components/EvaluationCard";
import { Button } from "@/components/ui/button";
import { AssessmentForm } from "@/components/AssessmentForm";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Params {
  id: number;
  employeeName: string;
  evaluationDate: string;
  criteria: string[];
  image?: string;
}

interface History {
  content: string;
  label: {
    id: number;
    label_name: string;
  };
}

export default function EvaluationDetailPage() {
  const searchParams = useSearchParams();
  const [evaluation, setEvaluation] = useState<any>({});
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    const id = searchParams.get("id");
    const employeeName = searchParams.get("employeeName");
    const evaluationDate = searchParams.get("evaluationDate");
    const criteria = searchParams.get("criteria");

    if (id && employeeName && evaluationDate && criteria) {
      setEvaluation({
        id: Number(id),
        employeeName,
        evaluationDate,
        criteria: JSON.parse(criteria),
      });
    }

    const accessToken = localStorage.getItem("access_token");

    const apiCall = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/history/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching history by id");
      }
      const responseJson = await response.json();
      setHistory(responseJson);
    };

    apiCall();
  }, [searchParams]);

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button asChild variant="link" className="px-0">
            <Link href="/evaluations">
              <ArrowLeft className="mr-1" /> Quay lại danh sách
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-2 flex-col">
              <div>
                <h1 className="text-3xl font-bold">
                  {evaluation.employeeName}
                </h1>
              </div>
              <span className="text-sm text-muted-foreground">
                Ngày đánh giá:{" "}
                {new Date(evaluation.evaluationDate).toLocaleDateString(
                  "vi-VN"
                )}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* <div>
                <h3 className="text-lg font-semibold mb-2">
                  Thông tin đánh giá
                </h3>
              </div> */}

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Tiêu chí đánh giá
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {history.map((criterion, index) => (
                    <li key={index}>
                      {criterion.label.label_name + ": " + criterion.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* <div>
              <h3 className="text-lg font-semibold mb-2">Nhận xét chi tiết</h3>
              <p className="text-gray-600 leading-relaxed">
                {evaluation.comment}
              </p>
            </div> */}

            {/* <div>
              <h3 className="text-lg font-semibold mb-2">Biểu đồ đánh giá</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="h-32 flex items-center justify-center text-muted-foreground">
                  (Biểu đồ đánh giá)
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
