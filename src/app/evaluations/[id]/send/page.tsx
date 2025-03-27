import Link from "next/link";
import SendNotificationForm from "../../../../components/emails/SendNotificationForm";

export default function SendEvaluationPage() {
  const mockEvaluation = {
    id: "1",
    period: "Tháng 8/2023",
    criteria: [
      { name: "Hiệu suất", score: 4.5 },
      { name: "Giao tiếp", score: 4.0 },
    ],
    employee: {
      id: "emp1",
      name: "Nguyễn Văn A",
      email: "a.nguyen@company.com",
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">
          Gửi Đánh Giá {mockEvaluation.period}
        </h2>
        <Link
          href="/evaluations" // Thay đổi đường dẫn này theo routing của bạn
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Quay lại
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Chi tiết đánh giá</h3>
          <ul className="space-y-3">
            {mockEvaluation.criteria.map((criteria, index) => (
              <li key={index} className="flex justify-between">
                <span>{criteria.name}</span>
                <span>{criteria.score}/5</span>
              </li>
            ))}
          </ul>
        </div>

        <SendNotificationForm
          evaluation={mockEvaluation}
          employee={mockEvaluation.employee}
        />
      </div>
    </div>
  );
}
