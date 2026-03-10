-- Garante que as chaves estrangeiras sejam respeitadas na estutura do banco de dados
PRAGMA foreign_keys = ON;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    senha_hash TEXT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias dos chamados
CREATE TABLE categorias(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
);

-- Tabela de chamados
CREATE TABLE chamados(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    descricao TEXT NOT NULL,
    cep TEXT NOT NULL,
    cidade TEXT,
    uf TEXT,
    prioridade TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'EM ABERTO',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME,
    concluido_em DATETIME

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabela de histórico de status dos chamados
CREATE TABLE historico_status(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chamado_id INTEGER NOT NULL,
    status_anterior TEXT NOT NULL,
    status_novo TEXT NOT NULL,
    alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (chamado_id) REFERENCES chamados(id)
);

-- Seed incial de categorias
INSERT INTO categorias (nome) VALUES ('FALTA_DE_ENERGIA'), ('VAZAMENTO'), ('QUEDA_DE_ARVORE'), ('OUTROS');