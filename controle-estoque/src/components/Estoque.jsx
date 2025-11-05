import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(true);
  const produtosCollectionRef = collection(db, "produtos");

  // Carrega os produtos
  const carregarProdutos = async () => {
    setLoading(true);
    const snapshot = await getDocs(produtosCollectionRef);
    setProdutos(snapshot.docs.map((d) => ({ ...d.data(), id: d.id })));
    setLoading(false);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  // Adiciona novo produto
  const addProduto = async () => {
    if (!nome.trim() || !quantidade) {
      alert("Preencha todos os campos!");
      return;
    }

    await addDoc(produtosCollectionRef, {
      nome: nome.trim(),
      quantidade: Number(quantidade),
    });

    setNome("");
    setQuantidade("");
    carregarProdutos();
  };

  // Atualiza quantidade
  const updateProduto = async (id, nomeAtual) => {
    const novaQtd = prompt(`Digite a nova quantidade para "${nomeAtual}":`);
    if (!novaQtd) return;

    const produtoDoc = doc(db, "produtos", id);
    await updateDoc(produtoDoc, { quantidade: Number(novaQtd) });

    carregarProdutos();
  };

  // Deleta produto
  const deleteProduto = async (id, nomeProduto) => {
    if (!window.confirm(`Tem certeza que deseja excluir "${nomeProduto}"?`))
      return;

    const produtoDoc = doc(db, "produtos", id);
    await deleteDoc(produtoDoc);
    carregarProdutos();
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
      <h1>📦 Controle de Estoque</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ margin: 5, padding: 8 }}
        />
        <input
          placeholder="Quantidade"
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          style={{ margin: 5, padding: 8 }}
        />
        <button onClick={addProduto} style={{ padding: "8px 16px" }}>
          ➕ Adicionar
        </button>
      </div>

      {loading ? (
        <p>Carregando produtos...</p>
      ) : produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {produtos.map((prod) => (
            <li
              key={prod.id}
              style={{
                border: "1px solid #ccc",
                marginBottom: 10,
                padding: 10,
                borderRadius: 6,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <strong>{prod.nome}</strong> — {prod.quantidade} unid.
              </span>
              <span>
                <button
                  onClick={() => updateProduto(prod.id, prod.nome)}
                  style={{ marginRight: 8 }}
                >
                  ✏️ Atualizar
                </button>
                <button
                  onClick={() => deleteProduto(prod.id, prod.nome)}
                  style={{ color: "red" }}
                >
                  🗑️ Deletar
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
