import EvaluationPage, { EvaluationItem } from "@/components/EvaluationCard";

export default function Home() {
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

  return (
    <div>
      <EvaluationPage items={mockEvaluations} />
    </div>
  );
}
