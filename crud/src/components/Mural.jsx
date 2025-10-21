import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import "../style/Mural.css";

export default function Mural() {
  const [recados, setRecados] = useState([]);
  const [recado, setRecado] = useState("");

  const recadosCollectionRef = collection(db, "recados");

  useEffect(() => {
    // Atualização em tempo real
    const unsubscribe = onSnapshot(recadosCollectionRef, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecados(lista);
    });

    return () => unsubscribe();
  }, []);

  const addRecado = async () => {
    if (!recado.trim()) {
      alert("Preencha o campo antes de adicionar!");
      return;
    }

    try {
      await addDoc(recadosCollectionRef, { recado });
      setRecado("");
    } catch (error) {
      console.error("Erro ao adicionar recado:", error);
    }
  };

  const updateRecado = async (id) => {
    const novoConteudo = prompt("Atualize o conteúdo do recado:");
    if (novoConteudo) {
      try {
        const recadoDoc = doc(db, "recados", id);
        await updateDoc(recadoDoc, { recado: novoConteudo });
      } catch (error) {
        console.error("Erro ao atualizar recado:", error);
      }
    }
  };

  const deleteRecado = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este recado?")) {
      try {
        const recadoDoc = doc(db, "recados", id);
        await deleteDoc(recadoDoc);
      } catch (error) {
        console.error("Erro ao deletar recado:", error);
      }
    }
  };

  return (
    <div className="mural-container">
      <h1>Mural de Recados</h1>

      <textarea
        className="mural-textarea"
        placeholder="Escreva seu recado..."
        value={recado}
        onChange={(e) => setRecado(e.target.value)}
      />

      <button className="mural-button" onClick={addRecado}>
        Fixar Recado
      </button>

      <div className="mural-grid">
        {recados.map((rec) => (
          <div key={rec.id} className="mural-card">
            <p>{rec.recado}</p>
            <div className="mural-actions">
              <button
                className="update-button"
                onClick={() => updateRecado(rec.id)}
              >
                ✏️
              </button>
              <button
                className="delete-button"
                onClick={() => deleteRecado(rec.id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
