import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

interface CustomCardProps {
  basicProps: React.ComponentProps<typeof Card>;
  url: string;
  subtitle: string;
}

export function ReportCard({
  basicProps,
  subtitle,
  url,
  ...props
}: CustomCardProps) {
  return (
    <Card className={cn("w-[380px]", basicProps.className)} {...props}>
      <Link to={url}>
        <CardHeader>
          <CardTitle>{basicProps.title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-orange-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {basicProps.content}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
