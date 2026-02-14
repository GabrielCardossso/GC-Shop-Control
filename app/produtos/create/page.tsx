'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch('/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        preco: Number(preco),
        estoque: Number(estoque)
      })
    });

    if (response.ok) {
      alert('Produto criado!');
      router.push('/produtos');
    } else {
      const data = await response.json();
      alert('Erro: ' + data.error);
    }
  }

  return (
    <form className="p-4 space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-2">Criar Produto</h1>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={e => setPreco(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Estoque"
        value={estoque}
        onChange={e => setEstoque(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Criar
      </button>
    </form>
  );
}