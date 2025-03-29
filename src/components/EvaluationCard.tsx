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
  evaluationDate: string;
  criteria: string[];

  image?: string;
}

export function EvaluationCard({ item }: { item: EvaluationItem }) {
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
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Ngày đánh giá:</span>
              <time dateTime={item.evaluationDate}>
                {new Date(item.evaluationDate).toLocaleDateString("vi-VN")}
              </time>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
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
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button asChild variant="outline" size="sm">
          <Link
            href={{
              pathname: `/evaluations/${item.id}`,
              query: {
                id: item.id,
                employeeName: item.employeeName,
                evaluationDate: item.evaluationDate,
                criteria: JSON.stringify(item.criteria),
              },
            }}
          >
            Xem chi tiết
          </Link>
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
