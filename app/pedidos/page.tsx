'use client';

import { useEffect, useState } from "react";

type Pedido = {
  id: number;
  data: string;
  total: number;
  status: string;
  itens?: { produto_id: number; quantidade: number; preco_unitario: number }[];
};

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const fetchPedidos = async () => {
    const res = await fetch('/api/pedidos');
    const data = await res.json();
    setPedidos(data);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>

      <ul className="space-y-2">
        {pedidos.map(p => (
          <li key={p.id} className="border p-2 rounded flex flex-col gap-2">
            <p>Data: {new Date(p.data).toLocaleString()}</p>
            <p>Total: R$ {p.total.toFixed(2)}</p>
            <p>Status: {p.status}</p>
            {p.itens && (
              <div className="ml-4">
                <h3 className="font-semibold">Itens:</h3>
                {p.itens.map(item => (
                  <p key={item.produto_id}>
                    Produto ID: {item.produto_id} | Qtd: {item.quantidade} | R$: {item.preco_unitario.toFixed(2)}
                  </p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}