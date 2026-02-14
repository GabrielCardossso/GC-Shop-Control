'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Produtos</h1>
      <Link 
        href="/produtos/create" 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Novo Produto
      </Link>

      <ul className="space-y-2">
        {produtos.map(produto => (
          <li 
            key={produto.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>
              {produto.nome} - R$ {produto.preco.toFixed(2)} - Estoque: {produto.estoque} 
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}