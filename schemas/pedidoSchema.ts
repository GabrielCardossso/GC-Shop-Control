import { z } from "zod";

export const pedidoSchema = z.object({
  orcamento_id: z.number(),
});