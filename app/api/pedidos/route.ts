import { NextRequest, NextResponse } from "next/server";
import banco from "@/lib/db";
import { pedidoSchema } from "@/schemas/pedidoSchema";

// Listar pedidos
export async function GET() {
  const pedidos = banco.prepare("SELECT * FROM pedidos").all();
  return NextResponse.json(pedidos);
}

// Criar pedido a partir de orçamento
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = pedidoSchema.parse(body);

    const orcamento = banco
      .prepare("SELECT * FROM orcamentos WHERE id = ?")
      .get(data.orcamento_id);

    if (!orcamento) throw new Error("Orçamento não encontrado");

    const itens = banco
      .prepare("SELECT * FROM orcamentos_itens WHERE orcamento_id = ?")
      .all(data.orcamento_id);

    const total = itens.reduce(
      (sum: number, item: any) => sum + item.preco_unitario * item.quantidade,
      0
    );

    const pedidoStmt = banco.prepare(
      "INSERT INTO pedidos (data, total, status) VALUES (?, ?, ?)"
    );
    const info = pedidoStmt.run(new Date().toISOString(), total, "Pendente");

    return NextResponse.json({
      id: info.lastInsertRowid,
      data: new Date().toISOString(),
      total,
      status: "Pendente",
      itens,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}