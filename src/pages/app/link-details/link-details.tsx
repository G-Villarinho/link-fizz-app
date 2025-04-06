import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LinkSuccessEffect } from "./link-success-efect";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { LinkResponse } from "@/api/responses/link";
import { getLinkByShortCode } from "@/api/get-link-by-short-code";
import { LinkCard } from "@/components/link-card";
import { Meta, Title } from "react-head";
import { isAxiosError } from "axios";
import { LinkAnalyticsChart } from "./link-analytics-chart";

const mockMonthlyClicks = [
  { month: "Janeiro", views: 120 },
  { month: "Fevereiro", views: 95 },
  { month: "Março", views: 134 },
  { month: "Abril", views: 88 },
  { month: "Maio", views: 142 },
  { month: "Junho", views: 101 },
  { month: "Julho", views: 101 },
  { month: "Agosto", views: 101 },
  { month: "Setembro", views: 401 },
  { month: "Outubro", views: 141 },
  { month: "Novembro", views: 901 },
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
      return await getLinkByShortCode({ shortCode });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        navigate("/not-found", { replace: true });
      }
      throw error;
    }
  }

  const { data: link, isLoading } = useQuery({
    queryKey: ["link", shortCode],
    queryFn: fetchLinkWithRedirect,
    enabled: !!shortCode && !cachedLink,
    initialData: cachedLink,
    retry: false,
  });

  if (!shortCode || (!link && !isLoading)) {
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
            <LinkAnalyticsChart data={mockMonthlyClicks} />
          </>
        )}
      </div>
    </>
  );
}
