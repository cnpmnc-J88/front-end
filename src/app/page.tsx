"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { period: "Jan", score: 75 },
  { period: "Feb", score: 80 },
  { period: "Mar", score: 78 },
  { period: "Apr", score: 85 },
];

const historyData = [
  { date: "2025-01-15", score: 75 },
  { date: "2025-02-15", score: 80 },
  { date: "2025-03-15", score: 78 },
  { date: "2025-04-15", score: 85 },
];

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/form/performanceAssessment");
  // }, [router]);
  // return (
  //   <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //     {/* Assessment Overview */}
  //     <Card className="col-span-1 md:col-span-2">
  //       <CardHeader>
  //         <CardTitle>Employee Performance Overview</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <ResponsiveContainer width="100%" height={300}>
  //           <LineChart data={data}>
  //             <XAxis dataKey="period" />
  //             <YAxis domain={[70, 90]} />
  //             <Tooltip />
  //             <Line
  //               type="monotone"
  //               dataKey="score"
  //               stroke="#8884d8"
  //               strokeWidth={2}
  //             />
  //           </LineChart>
  //         </ResponsiveContainer>
  //       </CardContent>
  //     </Card>

  //     {/* Assessment Frequency Selector */}
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Assessment Frequency</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <Select>
  //           <SelectTrigger className="w-full">Select Frequency</SelectTrigger>
  //           <SelectContent>
  //             <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
  //             <SelectItem value="monthly">Monthly</SelectItem>
  //             <SelectItem value="quarterly">Quarterly</SelectItem>
  //             <SelectItem value="yearly">Yearly</SelectItem>
  //           </SelectContent>
  //         </Select>
  //       </CardContent>
  //     </Card>

  //     {/* Criteria Selection */}
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Assessment Criteria</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <Button variant="outline" className="w-full">
  //           Choose Criteria
  //         </Button>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Assessment Overview */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Employee Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="period" />
              <YAxis domain={[70, 90]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Assessment Frequency Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger className="w-full">Select Frequency</SelectTrigger>
            <SelectContent>
              <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Criteria Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">
            Choose Criteria
          </Button>
        </CardContent>
      </Card>

      {/* Assessment History */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Assessment History</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {historyData.map((entry, index) => (
              <li
                key={index}
                className="flex justify-between border-b pb-2 last:border-b-0"
              >
                <span>{entry.date}</span>
                <span className="font-semibold">{entry.score}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Start New Assessment */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Start New Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/form/assessment")}
          >
            Start Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
