import { z } from "zod";

export const gameSchema = z.object({
    title: z.string().min(1, "El título es obligatorio").max(100, "Máximo 100 caracteres"),
    developer: z.string().min(1, "El desarrollador es obligatorio").max(100, "Máximo 100 caracteres"),
    genre: z.string().min(1, "El género es obligatorio").max(50, "Máximo 50 caracteres"),
    console_id: z.number({ invalid_type_error: "Selecciona una consola" }).min(1, "Selecciona una consola"),
    price: z.number({ invalid_type_error: "El precio debe ser un número" }).min(0, "El precio no puede ser negativo").max(999, "Precio máximo 999"),
    releaseDate: z.string().min(1, "La fecha es obligatoria"),  // ← D mayúscula
    cover: z.string().optional(),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres").max(500, "Máximo 500 caracteres"),
});

export const consoleSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
    manuFacturer: z.string().min(1, "El fabricante es obligatorio").max(100, "Máximo 100 caracteres"),
    releaseDate: z.string().min(1, "La fecha es obligatoria"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres").max(500, "Máximo 500 caracteres"),
    cover: z.string().optional(),
});