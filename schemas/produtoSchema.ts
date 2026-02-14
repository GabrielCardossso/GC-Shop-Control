import { z } from "zod";

export const produtoSchema = z.object({
  nome: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  preco: z.number().gt(0, { message: "Preço deve ser maior que 0" }),
  estoque: z.number().min(0, { message: "Estoque não pode ser negativo" }),
});