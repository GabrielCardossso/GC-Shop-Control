'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
};

type OrcamentoItem = {
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
};

export default function CreateOrcamento() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itens, setItens] = useState<OrcamentoItem[]>([]);

  useEffect(() => {
    fetch("/api/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  const addItem = (produto: Produto) => {
    const existing = itens.find(i => i.produto_id === produto.id);
    if (existing) {
      existing.quantidade += 1;
      setItens([...itens]);
    } else {
      setItens([...itens, { produto_id: produto.id, quantidade: 1, preco_unitario: produto.preco }]);
    }
  };

  const total = itens.reduce((acc, item) => acc + item.quantidade * item.preco_unitario, 0);

  const criarOrcamento = async () => {
    if (itens.length === 0) return;

    const response = await fetch("/api/orcamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itens }) // só itens
    });

    if (response.ok) {
      alert("Orçamento criado!");
      router.push("/orcamentos");
    } else {
      const data = await response.json();
      alert("Erro: " + data.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Novo Orçamento</h1>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Produtos</h2>
        <div className="grid grid-cols-3 gap-2">
          {produtos.map(prod => (
            <button
              key={prod.id}
              onClick={() => addItem(prod)}
              className="border p-2 rounded hover:bg-gray-100"
            >
              {prod.nome} - R$ {prod.preco.toFixed(2)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Itens do orçamento</h2>
        <ul>
          {itens.map(item => {
            const produto = produtos.find(p => p.id === item.produto_id);
            return (
              <li key={item.produto_id} className="flex items-center justify-between mb-1">
                <span>{produto?.nome}</span>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 bg-gray-200 rounded"
                    onClick={() =>
                      setItens(itens.map(i =>
                        i.produto_id === item.produto_id
                          ? { ...i, quantidade: Math.max(1, i.quantidade - 1) }
                          : i
                      ))
                    }
                  >-</button>
                  <span>{item.quantidade}</span>
                  <button
                    className="px-2 bg-gray-200 rounded"
                    onClick={() =>
                      setItens(itens.map(i =>
                        i.produto_id === item.produto_id
                          ? { ...i, quantidade: i.quantidade + 1 }
                          : i
                      ))
                    }
                  >+</button>
                  <span>R$ {(item.quantidade * item.preco_unitario).toFixed(2)}</span>
                  <button
                    className="text-red-500"
                    onClick={() => setItens(itens.filter(i => i.produto_id !== item.produto_id))}
                  >
                    Remover
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 font-bold">Total: R$ {total.toFixed(2)}</p>
        <button
          onClick={criarOrcamento}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={itens.length === 0}
        >
          Salvar Orçamento
        </button>
      </div>
    </div>
  );
}