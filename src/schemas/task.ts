import { z } from "zod";

export const addTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Task name must be at least 3 characters")
    .max(100, "Task name must be less than 100 characters"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export type AddTask = z.infer<typeof addTaskSchema>;
