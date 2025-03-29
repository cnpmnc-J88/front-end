import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define serializable template type
interface TemplateItem {
  id: string;
  formName: string;
  criterias: Array<{
    id: string;
    label_name: string;
  }>;
}

interface TemplateSelectorProps {
  templates: TemplateItem[];
  selectedId: string | null;
  onTemplateSelect: (templateId: string) => void; // New prop for handling selection
}

export default function TemplateSelector({
  templates,
  selectedId,
  onTemplateSelect, // Destructure the new prop
}: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select Assessment Template</h2>
      <p className="text-muted-foreground">
        Choose the template that best fits the role you're assessing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer hover:border-primary ${selectedId === template.id ? "border-primary" : ""
              }`}
            onClick={() => onTemplateSelect(template.id)} // Call the selection handler
          >
            <CardHeader>
              <CardTitle>{template.formName}</CardTitle>
              <CardDescription>
                {template.criterias.length} criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {template.criterias.slice(0, 3).map((criteria) => (
                  <li key={criteria.label_name}>{criteria.label_name}</li>
                ))}
                {template.criterias.length > 3 && (
                  <li className="text-muted-foreground">
                    +{template.criterias.length - 3} more
                  </li>
                )}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => onTemplateSelect(template.id)}>
                Select Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
