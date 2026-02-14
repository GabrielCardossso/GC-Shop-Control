import { NextRequest, NextResponse } from "next/server";
import banco from "@/lib/db";
import { orcamentoSchema } from "@/schemas/orcamentoSchema";

// Listar orçamentos com itens
export async function GET() {
  const orcamentos = banco.prepare("SELECT * FROM orcamentos").all();
  const orcamentosComItens = orcamentos.map((orc: any) => {
    const itens = banco
      .prepare("SELECT * FROM orcamentos_itens WHERE orcamento_id = ?")
      .all(orc.id);
    return { ...orc, itens };
  });
  return NextResponse.json(orcamentosComItens);
}

// Criar orçamento
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = orcamentoSchema.parse(body);

    // Calcula total
    const total = data.itens.reduce(
      (sum: number, item: any) => sum + item.preco_unitario * item.quantidade,
      0
    );

    // Inserir orçamento
    const orcStmt = banco.prepare(
      "INSERT INTO orcamentos (data, total) VALUES (?, ?)"
    );
    const info = orcStmt.run(new Date().toISOString(), total);
    const orcamentoId = info.lastInsertRowid;

    // Inserir itens
    const itemStmt = banco.prepare(
      "INSERT INTO orcamentos_itens (orcamento_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)"
    );
    for (const item of data.itens) {
      itemStmt.run(orcamentoId, item.produto_id, item.quantidade, item.preco_unitario);
    }

    const itensSalvos = banco
      .prepare("SELECT * FROM orcamentos_itens WHERE orcamento_id = ?")
      .all(orcamentoId);

    return NextResponse.json({ id: orcamentoId, total, data: new Date().toISOString(), itens: itensSalvos });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}