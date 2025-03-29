"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface EvaluationItem {
  id: number;
  employeeName: string;
  position: string;
  evaluationDate: string;
  rating: number;
  criteria: string[];
  status: "completed" | "needs-improvement" | "good";
  comment: string;
  image?: string;
}

interface StatusColors {
  [key: string]: string;
}

export function EvaluationCard({ item }: { item: EvaluationItem }) {
  const statusColors: StatusColors = {
    completed: "bg-green-100 text-green-800",
    "needs-improvement": "bg-red-100 text-red-800",
    good: "bg-yellow-100 text-yellow-800",
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : index < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300 fill-current"
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              {item.image && (
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.image} />
                  <AvatarFallback>{item.employeeName[0]}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <CardTitle>{item.employeeName}</CardTitle>
                <CardDescription>{item.position}</CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Ngày đánh giá:</span>
              <time dateTime={item.evaluationDate}>
                {new Date(item.evaluationDate).toLocaleDateString("vi-VN")}
              </time>
            </div>
          </div>

          <Badge className={`${statusColors[item.status]} capitalize`}>
            {item.status === "completed" && "Đã hoàn thành"}
            {item.status === "needs-improvement" && "Cần cải thiện"}
            {item.status === "good" && "Tốt"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* <div className="flex items-center gap-2">
          <span className="font-medium">Đánh giá:</span>
          <div className="flex items-center gap-1">
            {renderStars(item.rating)}
            <span className="ml-2 text-sm text-muted-foreground">
              ({item.rating}/5)
            </span>
          </div>
        </div> */}

        <div>
          <h4 className="font-medium mb-2">Tiêu chí chính:</h4>
          <div className="flex flex-wrap gap-2">
            {item.criteria.map((criterion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm px-3 py-1 rounded-full"
              >
                {criterion}
              </Badge>
            ))}
          </div>
        </div>

        {/* <blockquote className="pl-4 border-l-4 border-gray-200 italic text-muted-foreground">
          &ldquo;{item.comment}&ldquo;
        </blockquote> */}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href={`/evaluations/${item.id}`}>Xem chi tiết</Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/evaluations/${item.id}/send`}>Gửi đánh giá</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface EvaluationPageProps {
  items: any;
}

export default function EvaluationPage({ items }: EvaluationPageProps) {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-6 max-w-4xl mx-auto">
        {items.map((item: any) => (
          <EvaluationCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
