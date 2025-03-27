"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  evaluation: {
    id: string;
    period: string;
    criteria: { name: string; score: number }[];
  };
  employee: {
    id: string;
    name: string;
    email: string;
  };
}

export default function SendNotificationForm({ evaluation, employee }: Props) {
  const [message, setMessage] = useState("");
  const [includeEmail, setIncludeEmail] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("/api/evaluations/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: employee.id,
          message,
          sendEmail: includeEmail,
        }),
      });

      if (!response.ok) throw new Error("Gửi thất bại");

      toast.success("Đã gửi đánh giá thành công!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nhận xét</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded-md h-32"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={includeEmail}
          onChange={(e) => setIncludeEmail(e.target.checked)}
          className="mr-2"
        />
        <span>Gửi email tới {employee.email}</span>
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        {isSending ? "Đang gửi..." : "Xác nhận gửi"}
      </button>
    </form>
  );
}
