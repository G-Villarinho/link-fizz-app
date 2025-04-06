import { api } from "@/lib/axios";
import { LinkResponse } from "./responses/link";

export async function getLinks() {
  const response = await api.get<LinkResponse[]>("/me/links");

  return response.data;
}
