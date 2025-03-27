"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  evaluationPeriod: string;
}

// Mock data generator
const generateMockEmployees = (count: number): Employee[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `emp-${i + 1}`,
    name: `Nhân viên ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    position: i % 2 === 0 ? "Nhân viên kinh doanh" : "Kỹ thuật viên",
    evaluationPeriod: `Tháng 8/2023 - Kỳ ${(i % 4) + 1}`,
  }));
};

export default function BulkEvaluationSender() {
  // Sử dụng mock data thay vì fetch API
  const [employees] = useState<Employee[]>(() => generateMockEmployees(10));
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [template, setTemplate] = useState("");

  // Khởi tạo selected state từ mock data
  useState(() => {
    const initialSelected = employees.reduce(
      (acc, emp) => ({
        ...acc,
        [emp.id]: false,
      }),
      {}
    );
    setSelected(initialSelected);
  });

  const handleBulkSend = async () => {
    const selectedEmployees = employees.filter((emp) => selected[emp.id]);

    // Mock sending process
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          console.log("Đã gửi cho:", selectedEmployees);
          console.log("Nội dung mẫu:", template);
          resolve(true);
        }, 2000);
      }),
      {
        loading: `Đang gửi ${selectedEmployees.length} đánh giá...`,
        success: `Đã gửi thành công ${selectedEmployees.length} đánh giá`,
        error: "Có lỗi xảy ra khi gửi",
      }
    );
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Mẫu tin nhắn</h2>
        <textarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Ví dụ: Xin chào [Tên], đây là kết quả đánh giá của bạn..."
        />
        <p className="mt-2 text-sm text-gray-500">
          Sử dụng [Tên] để tự động thay thế bằng tên nhân viên
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-3"
              checked={Object.values(selected).every(Boolean)}
              onChange={(e) => {
                const newSelected = employees.reduce(
                  (acc, emp) => ({ ...acc, [emp.id]: e.target.checked }),
                  {}
                );
                setSelected(newSelected);
              }}
            />
            <span className="font-medium">Danh sách nhân viên</span>
          </div>
        </div>

        <div className="divide-y">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="flex items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                className="mr-4"
                checked={selected[employee.id]}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev,
                    [employee.id]: e.target.checked,
                  }))
                }
              />
              <div className="flex-1">
                <h3 className="font-medium">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.position}</p>
                <p className="text-sm text-gray-500">{employee.email}</p>
              </div>
              <span className="text-sm text-gray-500">
                {employee.evaluationPeriod}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white p-4 border-t shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            Đã chọn {Object.values(selected).filter(Boolean).length} nhân viên
          </div>
          <button
            onClick={handleBulkSend}
            disabled={!Object.values(selected).some(Boolean)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Gửi Đã Chọn
          </button>
        </div>
      </div>
    </div>
  );
}
