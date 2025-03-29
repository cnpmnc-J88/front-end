"use client";
import EvaluationPage, { EvaluationItem } from "@/components/EvaluationCard";
import { useEffect, useState } from "react";

const mockEvaluations: EvaluationItem[] = [
  {
    id: 1,
    employeeName: "Nguyễn Văn A",
    position: "Nhân viên kinh doanh",
    evaluationDate: "2024-03-20",
    rating: 4.5,
    criteria: ["Hiệu suất", "Teamwork", "Sáng tạo"],
    status: "good",
    comment: "Thể hiện xuất sắc trong quý này, cần duy trì phong độ",
    image: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    employeeName: "Trần Thị B",
    position: "Kế toán trưởng",
    evaluationDate: "2024-03-19",
    rating: 3.2,
    criteria: ["Độ chính xác", "Quản lý thời gian"],
    status: "needs-improvement",
    comment: "Cần cải thiện tốc độ xử lý chứng từ",
    image:
      "https://play-lh.googleusercontent.com/EiMYfsI4wBmE8IC5M_SD2Rm7jWIv3F3bp1oabo0ShgnQdJmZuzzbXJYELWCqXZi8lA=w240-h480-rw",
  },
];

export default function Evaluation() {
  const [evaluations, setEvaluations] =
    useState<EvaluationItem[]>(mockEvaluations);
  useEffect(() => {
    const callApi = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          throw new Error("Không tìm thấy access token trong cookie");
        }

        const page = 0;

        const responseUser = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!responseUser.ok) {
          throw new Error("Failed to get user");
        }

        const userInfo = await responseUser.json();

        const responseForm = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/form?page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!responseForm.ok) {
          throw new Error("Failed to fetch form");
        }

        const data = await responseForm.json();

        const response_assessment = await Promise.all(
          data.map(async (item: any) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getassessment/${item.id}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error(`Failed to fetch assessment for form ${item.id}`);
            }

            return response.json();
          })
        );

        const flattenedArray = response_assessment.flat();
        const evaluationList = flattenedArray.map((item) => ({
          id: item.assId,
          employeeName: userInfo.name,
          position: item.former_position,
          evaluationDate: item.evaluationDate,
          rating: item.rating,
          criteria: item.labelNames,
          status: item.status,
          comment: item.comment,
          image: userInfo.picture,
        }));

        setEvaluations(evaluationList);
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    callApi();
  }, []);
  return (
    <div>
      <EvaluationPage items={evaluations} />
    </div>
  );
}
