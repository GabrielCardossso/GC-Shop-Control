import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "database", "database.db");
const banco = new Database(dbPath);

banco.exec(`PRAGMA foreign_keys = ON;`)

    // Produtos
banco.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL CHECK (preco >= 0),
    estoque INTEGER NOT NULL CHECK (estoque >= 0)
    );
    `);

    // Orçamentos
banco.exec(`
    CREATE TABLE IF NOT EXISTS orcamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT DEFAULT CURRENT_TIMESTAMP,
    total REAL NOT NULL CHECK (total >= 0))`);

    // Pedidos
banco.exec(`
    CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total REAL NOT NULL CHECK (total >= 0),
    status TEXT NOT NULL)
    `);

    // Itens de Orçamentos
banco.exec(`
        CREATE TABLE IF NOT EXISTS orcamentos_itens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orcamento_id INTEGER NOT NULL,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL CHECK (quantidade > 0),
        preco_unitario REAL NOT NULL CHECK (preco_unitario >= 0),

        FOREIGN KEY (orcamento_id) REFERENCES orcamentos(id) ON DELETE CASCADE ,
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
        )`);

export default banco;
