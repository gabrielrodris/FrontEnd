import { useState, useEffect } from "react";
import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./App.css";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [turma, setTurma] = useState("");
  const [foto, setFoto] = useState(null);

  const alunosCollectionRef = collection(db, "alunos");


  useEffect(() => {
    const fetchAlunos = async () => {
      const data = await getDocs(alunosCollectionRef);
      setAlunos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchAlunos();
  }, []);

 
  const cadastrarAluno = async () => {
    if (!nome || !dataNasc || !turma || !foto) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      // Upload da foto
      const storageRef = ref(storage, `fotos/${foto.name}`);
      await uploadBytes(storageRef, foto);
      const fotoURL = await getDownloadURL(storageRef);

      // Salva no Firestore
      await addDoc(alunosCollectionRef, {
        nome,
        dataNasc,
        turma,
        fotoURL,
      });

      // Atualiza a lista
      const data = await getDocs(alunosCollectionRef);
      setAlunos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // Limpa os campos
      setNome("");
      setDataNasc("");
      setTurma("");
      setFoto(null);
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
    }
  };

  // ❌ Deletar aluno
  const excluirAluno = async (id) => {
    await deleteDoc(doc(db, "alunos", id));
    setAlunos(alunos.filter((a) => a.id !== id));
  };

  return (
    <div className="app-container">
      <h1>🎓 Controle de Alunos</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Nome do aluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="date"
          value={dataNasc}
          onChange={(e) => setDataNasc(e.target.value)}
        />
        <input
          type="text"
          placeholder="Turma"
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files[0])}
        />
        <button onClick={cadastrarAluno}>Cadastrar</button>
      </div>

      <div className="cards-container">
        {alunos.map((a) => (
          <div key={a.id} className="aluno-card">
            <img src={a.fotoURL} alt={a.nome} />
            <h3>{a.nome}</h3>
            <p>📅 {a.dataNasc}</p>
            <p>📘 Turma: {a.turma}</p>
            <button className="delete-btn" onClick={() => excluirAluno(a.id)}>
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
