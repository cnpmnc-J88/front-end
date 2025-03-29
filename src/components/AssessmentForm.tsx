"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { assessmentApi } from "@/services/api/assessmentService";

interface AssessmentFormProps {
  employeeId: number;
  onCancel: () => void;
  onSuccess?: () => void;
}

export function AssessmentForm({
  employeeId,
  onCancel,
  onSuccess,
}: AssessmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    rating: 5,
    comment: "",
    status: "good" as "completed" | "needs-improvement" | "good",
    assessor_position: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAssessmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (
    value: "completed" | "needs-improvement" | "good"
  ) => {
    setAssessmentData((prev) => ({ ...prev, status: value }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rating = Math.min(5, Math.max(1, parseInt(e.target.value, 10)));
    setAssessmentData((prev) => ({ ...prev, rating }));
  };

  const handleSubmitAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Pass employeeId in the URL path instead of request body
      const response = await assessmentApi.createAssessment(employeeId, {
        ...assessmentData,
        rating: assessmentData.rating.toString(),
      });

      if (response.success) {
        toast({
          title: "Đánh giá đã được gửi",
          description: "Cảm ơn bạn đã đánh giá nhân viên này.",
        });
        onSuccess?.();
      } else {
        toast({
          title: "Lỗi",
          description:
            response.error || "Không thể gửi đánh giá. Vui lòng thử lại.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmitAssessment}
      className="mt-4 border-t pt-4 space-y-4"
    >
      <h4 className="font-medium">Đánh giá nhân viên</h4>

      <div className="space-y-2">
        <Label htmlFor="rating">Điểm đánh giá (1-5)</Label>
        <Input
          id="rating"
          name="rating"
          type="number"
          value={assessmentData.rating}
          onChange={handleRatingChange}
          min="1"
          max="5"
          step="1"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Trạng thái</Label>
        <RadioGroup
          value={assessmentData.status}
          onValueChange={(value) => handleStatusChange(value as any)}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="good" id="good" />
            <Label htmlFor="good">Tốt</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="completed" id="completed" />
            <Label htmlFor="completed">Đã hoàn thành</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="needs-improvement" id="needs-improvement" />
            <Label htmlFor="needs-improvement">Cần cải thiện</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="assessor_position">Chức vụ người đánh giá</Label>
        <Input
          id="assessor_position"
          name="assessor_position"
          value={assessmentData.assessor_position}
          onChange={handleInputChange}
          placeholder="Giám đốc, Trưởng phòng, ..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Nhận xét</Label>
        <Textarea
          id="comment"
          name="comment"
          value={assessmentData.comment}
          onChange={handleInputChange}
          rows={3}
          placeholder="Nhập nhận xét của bạn về nhân viên này"
          required
        />
      </div>

      <div className="flex space-x-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
        </Button>
      </div>
    </form>
  );
}
