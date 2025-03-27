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
      const page = 0;
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/form?page=${page}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setEvaluations(data);
      console.log(data);
    };

    callApi();
  }, []);
  return (
    <div>
      <EvaluationPage items={evaluations} />
    </div>
  );
}
