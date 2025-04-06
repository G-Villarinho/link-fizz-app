import { api } from "@/lib/axios";

export interface GetLinksResponse {
  id: string;
  title: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt: string;
}

export async function getLinks() {
  const response = await api.get<GetLinksResponse[]>("/me/links");

  return response.data;
}
