"use client";

import { Globe } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { country: "Brasil", clicks: 420 },
  { country: "Estados Unidos", clicks: 310 },
  { country: "Portugal", clicks: 180 },
  { country: "Canadá", clicks: 150 },
  { country: "Alemanha", clicks: 120 },
  { country: "Japão", clicks: 95 },
];

const chartConfig = {
  clicks: {
    label: "Cliques",
    color: "oklch(var(--chart-3))",
  },
  label: {
    color: "oklch(var(--background))",
  },
} satisfies ChartConfig;

export function LinkLocationAnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cliques por localização</CardTitle>
        <CardDescription>Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ right: 16 }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="country"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4}>
                <LabelList
                  dataKey="country"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey="clicks"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Dados simulados <Globe className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Baseado em cliques por país
        </div>
      </CardFooter>
    </Card>
  );
}
