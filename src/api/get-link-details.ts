import { api } from "@/lib/axios";
import { LinkResponse } from "./responses/link";

export interface GetLinkDetailsParam {
  shortCode: string;
}

export async function getLinkDetails({ shortCode }: GetLinkDetailsParam) {
  const response = await api.get<LinkResponse>(`/me/links/${shortCode}`);

  return response.data;
}
