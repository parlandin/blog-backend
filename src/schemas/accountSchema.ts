import { z } from "zod";

export const accountCreateSchema = z.object({
  username: z
    .string()
    .min(3, "No mínimo 3 caracteres")
    .max(10, "No máximo 10 caracteres"),
  password: z
    .string()
    .min(8, "No mínimo 8 caracteres")
    .max(80, "No máximo 80 caracteres"),
  code: z.string().length(6, "O código deve ter exatamente 6 caracteres"),
});

export const accountLoginSchema = z.object({
  username: z
    .string()
    .min(3, "No mínimo 3 caracteres")
    .max(10, "No máximo 10 caracteres"),
  password: z
    .string()
    .min(8, "No mínimo 8 caracteres")
    .max(80, "No máximo 80 caracteres"),
});

export const accountCodeSchema = z.object({
  username: z
    .string()
    .min(3, "No mínimo 3 caracteres")
    .max(10, "No máximo 10 caracteres"),
});

export const getAccountParamsSchema = z.object({
  param: z.string().length(10, "O parâmetro deve ter exatamente 10 caracteres"),
});
