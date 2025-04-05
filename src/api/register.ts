import { api } from "@/lib/axios";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
}

export async function register({ name, email, password }: RegisterRequest) {
  const response = await api.post<RegisterResponse>("/register", {
    name,
    email,
    password,
  });

  return response.data;
}
