'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

type Orcamento = {
  id: number;
  data: string;
  total: number;
};

export default function OrcamentosPage() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);

  const fetchOrcamentos = async () => {
    const res = await fetch("/api/orcamentos");
    const data = await res.json();
    setOrcamentos(data);
  };

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  const converterEmPedido = async (id: number) => {
    const response = await fetch(`/api/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orcamento_id: id })
    });

    if (response.ok) {
      alert("Orçamento convertido em pedido!");
      fetchOrcamentos(); // opcional, atualizar lista
    } else {
      const data = await response.json();
      alert("Erro: " + data.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orçamentos</h1>

      <Link href="/orcamentos/create">
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Novo Orçamento
        </button>
      </Link>

      <ul className="space-y-2">
        {orcamentos.map(o => (
          <li key={o.id} className="border p-2 rounded flex justify-between items-center">
            <span>{new Date(o.data).toLocaleString()} - R$ {o.total.toFixed(2)}</span>
            <button
              className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => converterEmPedido(o.id)}
            >
              Converter em Pedido
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}