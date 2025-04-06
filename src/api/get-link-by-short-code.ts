import { api } from "@/lib/axios";
import { LinkResponse } from "./responses/link";

export interface GetLinkByShortCodeParams {
  shortCode: string;
}

export async function getLinkByShortCode({
  shortCode,
}: GetLinkByShortCodeParams) {
  const response = await api.get<LinkResponse>(`/links/${shortCode}`);

  return response.data;
}
