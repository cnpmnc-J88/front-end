import { EvaluationItem } from "@/components/EvaluationCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Params {
  id: string;
}

const getEvaluationDetail = (id: string): EvaluationItem | undefined => {
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

  return mockEvaluations.find((item) => item.id === Number(id));
};

export default async function EvaluationDetailPage({
  params,
}: {
  params: Params;
}) {
  const evaluation = await getEvaluationDetail(params.id);

  if (!evaluation) {
    return notFound();
  }

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
            <div className="flex items-start gap-6">
              {evaluation.image && (
                <img
                  src={evaluation.image}
                  alt={evaluation.employeeName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold">
                  {evaluation.employeeName}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {evaluation.position}
                </p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              Ngày đánh giá:{" "}
              {new Date(evaluation.evaluationDate).toLocaleDateString("vi-VN")}
            </span>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Thông tin đánh giá
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Trạng thái:</span>{" "}
                    <span className="capitalize">{evaluation.status}</span>
                  </p>
                  <p>
                    <span className="font-medium">Điểm đánh giá:</span>{" "}
                    {evaluation.rating}/5
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Tiêu chí đánh giá
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {evaluation.criteria.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Nhận xét chi tiết</h3>
              <p className="text-gray-600 leading-relaxed">
                {evaluation.comment}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Biểu đồ đánh giá</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {/* Thêm biểu đồ hoặc visual tại đây */}
                <div className="h-32 flex items-center justify-center text-muted-foreground">
                  (Biểu đồ đánh giá)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
