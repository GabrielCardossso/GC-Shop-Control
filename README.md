Sistema de Orçamentos e Pedidos (Versão Inicial Publicada)
🎯 Finalidade do Projeto

Este projeto é um mini sistema para gerenciar produtos, orçamentos e pedidos, criado com foco em aprendizado de sistemas web completos. Ele já permite realizar operações básicas e serve como base para futuras melhorias.

Na versão atual, você consegue:

Cadastrar produtos

Criar orçamentos adicionando produtos

Converter orçamentos em pedidos

Visualizar listagens de produtos, orçamentos e pedidos

Salvar todos os dados em um banco SQLite local

Obs: O sistema ainda não está hospedado; o acesso é local via localhost.

🛠 Tecnologias Utilizadas

Next.js
 (TypeScript, App Router)

Tailwind CSS
 para estilização moderna

Zod
 para validação de dados

SQLite como banco de dados relacional leve

📂 Estrutura do Projeto
app/
components/
lib/
schemas/
database/

app/ → telas e rotas do Next.js

components/ → componentes visuais reutilizáveis

lib/ → conexão com o banco (db.ts)

schemas/ → validação de dados com Zod

database/ → arquivo SQLite (database.db)

⚡ Funcionalidades Atuais

Produtos: Listagem, criação e validação

Orçamentos: Adição de produtos, cálculo de total e armazenamento

Pedidos: Conversão de orçamentos em pedidos, visualização e status inicial

🧠 Aprendizados até agora

Estrutura de sistemas web modernos com Next.js e App Router

Implementação de CRUD completo (Produtos, Orçamentos, Pedidos)

Uso de banco relacional SQLite com tabelas e relações

Validação de formulários e dados com Zod

Separação entre Front-end e API

Implementação do fluxo real de negócio: Orçamento → Pedido