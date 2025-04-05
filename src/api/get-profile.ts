import { api } from "@/lib/axios";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export async function getProfile() {
  const response = await api.get<UserProfile>("/me");

  return response.data;
}
