import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("Falha ao buscar usuários");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    const name = prompt("Digite o nome do usuário:");
    if (!name) return;

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Falha ao adicionar usuário");
      }

      fetchUsers(); // Recarrega a lista
    } catch (err) {
      alert(
        "Erro ao adicionar usuário: " +
          (err instanceof Error ? err.message : "Erro desconhecido")
      );
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>🐳 Desafio Pós-Graduação Docker - FIAP</h1>
      <h2>Frontend React + Backend Node.js + PostgreSQL</h2>
      <div style={{ paddingLeft: "40px" }}>
        <h4>📊 Status da Aplicação:</h4>
        <p>✅ Frontend React rodando na porta 5174</p>
        <p>✅ Backend Node.js rodando na porta 3000</p>
        <p>✅ PostgreSQL rodando na porta 5432</p>
        <p>✅ Comunicação entre containers funcionando</p>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={addUser}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          ➕ Adicionar Usuário
        </button>
        <button
          onClick={fetchUsers}
          style={{ padding: "10px 20px", fontSize: "16px", marginLeft: "10px" }}
        >
          🔄 Atualizar Lista
        </button>
      </div>

      {loading && <p>Carregando usuários...</p>}
      {error && <p style={{ color: "red" }}>Erro: {error}</p>}

      <div>
        <h3>Lista de Usuários:</h3>
        {users.length === 0 && !loading ? (
          <p>Nenhum usuário encontrado. Adicione um usuário!</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id} style={{ marginBottom: "10px" }}>
                <strong>ID:</strong> {user.id} | <strong>Nome:</strong>{" "}
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
