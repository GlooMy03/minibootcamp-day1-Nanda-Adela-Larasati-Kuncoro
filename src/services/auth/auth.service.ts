import { useMutation } from "@tanstack/react-query";
import { BASE_API } from "../api.config";

const useLoginUser = () => {
  return useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const response = await fetch(`${BASE_API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      return response.json();
    },
  });
}

const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (formData: { name: string; email: string; password: string }) => {
      const response = await fetch(`${BASE_API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      return response.json();
    },
  });
}

export {
  useLoginUser,
  useRegisterUser
};