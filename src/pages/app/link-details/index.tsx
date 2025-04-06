import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LinkSuccessEffect } from "./link-success-efect";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { LinkResponse } from "@/api/responses/link";
import { LinkCard } from "@/components/link-card";
import { Meta, Title } from "react-head";
import { isAxiosError } from "axios";
import { LinkMonthClickAnalyticsChart } from "./link-month-clicks-analytics-chart";
import { getLinkDetails } from "@/api/get-link-details";
import { LinkLocationAnalyticsChart } from "./link-location-analytics-chart";
import { LinkDeviceAnalyticsChart } from "./link-device-analytics-chart";
import { LinkDeviceReachRadarChart } from "./link-device-reach-radar-chart";

const mockMonthlyClicks = [
  { month: "Janeiro", views: 220 },
  { month: "Fevereiro", views: 95 },
  { month: "Março", views: 234 },
  { month: "Abril", views: 188 },
  { month: "Maio", views: 142 },
  { month: "Junho", views: 101 },
  { month: "Julho", views: 101 },
  { month: "Agosto", views: 101 },
  { month: "Setembro", views: 301 },
  { month: "Outubro", views: 141 },
  { month: "Novembro", views: 301 },
  { month: "Dezembro", views: 1 },
];

export function LinkDetailsPage() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cachedLink = useMemo(() => {
    return queryClient
      .getQueryData<LinkResponse[]>(["links"])
      ?.find((link) => link.shortCode === shortCode);
  }, [queryClient, shortCode]);

  async function fetchLinkWithRedirect() {
    if (!shortCode) {
      throw new Error("Short code is required");
    }

    try {
      return await getLinkDetails({ shortCode });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        navigate("/not-found", { replace: true });
      }
      throw error;
    }
  }

  const { data: link } = useQuery({
    queryKey: ["link", shortCode],
    queryFn: fetchLinkWithRedirect,
    enabled: !!shortCode && !cachedLink,
    initialData: cachedLink,
    retry: false,
  });

  if (!shortCode) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Title>Links | Link Fizz</Title>
      <Meta
        name="description"
        content="Acesse seus links encurtados no Link Fizz"
      />
      <LinkSuccessEffect shortCode={shortCode} />
      <div className="w-full space-y-6">
        {link && (
          <>
            <LinkCard link={link} />
            <LinkMonthClickAnalyticsChart data={mockMonthlyClicks} />
            <LinkLocationAnalyticsChart />
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <LinkDeviceAnalyticsChart />
              <LinkDeviceReachRadarChart />
            </div>
          </>
        )}
      </div>
    </>
  );
}
