import type { z } from "zod";
import type boardSchema from "@/validations/board-schema";

type FormData = z.infer<typeof boardSchema>;

export default FormData;
