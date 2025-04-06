"use client";

import { Smartphone } from "lucide-react";
import { PieChart, Pie, LabelList } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { device: "mobile", visitors: 380, fill: "var(--color-mobile)" },
  { device: "desktop", visitors: 290, fill: "var(--color-desktop)" },
  { device: "tablet", visitors: 130, fill: "var(--color-tablet)" },
  { device: "other", visitors: 65, fill: "var(--color-other)" },
];

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "oklch(var(--chart-1))",
  },
  desktop: {
    label: "Desktop",
    color: "oklch(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "oklch(var(--chart-3))",
  },
  other: {
    label: "Outros",
    color: "oklch(var(--chart-4))",
  },
} satisfies ChartConfig;

export function LinkDeviceAnalyticsChart() {
  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Dispositivos</CardTitle>
        <CardDescription>Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="device"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Dados simulados <Smartphone className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Baseado nos acessos por tipo de dispositivo
        </div>
      </CardFooter>
    </Card>
  );
}
