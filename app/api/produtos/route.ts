import { NextRequest, NextResponse } from "next/server";
import banco from "@/lib/db";
import { produtoSchema } from "@/schemas/produtoSchema";

// Listar produtos
export async function GET() {
  const produtos = banco.prepare("SELECT * FROM produtos").all();
  return NextResponse.json(produtos);
}

// Criar produto
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = produtoSchema.parse(body);

    const stmt = banco.prepare(
      "INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)"
    );
    const info = stmt.run(data.nome, data.preco, data.estoque);

    return NextResponse.json({ id: info.lastInsertRowid, ...data });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}