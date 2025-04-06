import { api } from "@/lib/axios";

export interface CreateLinkRequest {
  title?: string | null;
  destinationUrl: string;
  customCode?: string | null;
}

export interface CreateLinkResponse {
  shortCode: string;
}

export async function createLink({
  title,
  destinationUrl,
  customCode,
}: CreateLinkRequest) {
  const response = await api.post<CreateLinkResponse>("/links", {
    title,
    destination_url: destinationUrl,
    custom_code: customCode,
  });

  return response.data;
}
