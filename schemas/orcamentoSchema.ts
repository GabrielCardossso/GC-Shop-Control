import { z } from "zod";

export const orcamentoSchema = z.object({
  itens: z.array(
    z.object({
      produto_id: z.number(),
      quantidade: z.number().min(1, { message: "Quantidade mínima é 1" }),
      preco_unitario: z.number().gt(0, { message: "Preço unitário deve ser maior que 0" }),
    })
  )
});