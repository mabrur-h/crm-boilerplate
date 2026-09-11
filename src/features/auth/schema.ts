import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "To‘g‘ri email kiriting" }),
  password: z
    .string()
    .min(8, { message: "Parol kamida 8 ta belgidan iborat bo‘lsin" }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Ismingizni kiriting" }),
  email: z.email({ message: "To‘g‘ri email kiriting" }),
  password: z
    .string()
    .min(8, { message: "Parol kamida 8 ta belgidan iborat bo‘lsin" }),
});

export type SignupInput = z.infer<typeof signupSchema>;
