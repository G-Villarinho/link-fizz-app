"use client";

import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type LinkAnalyticsChartProps = {
  data: {
    month: string;
    views: number;
  }[];
};

const chartConfig = {
  views: {
    label: "Visualizações",
    color: "oklch(var(--chart-1))",
  },
};

export function LinkMonthClickAnalyticsChart({
  data,
}: LinkAnalyticsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualizações mensais</CardTitle>
        <CardDescription>Últimos meses</CardDescription>
      </CardHeader>
      <CardContent className="h-[200px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="views" fill="var(--color-views)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Dados simulados <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Baseado em dados fictícios de acesso
        </div>
      </CardFooter>
    </Card>
  );
}
