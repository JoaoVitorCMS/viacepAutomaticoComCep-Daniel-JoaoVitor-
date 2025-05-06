import { useState, useEffect } from "react";

import style from "./App.module.css";

function App() {
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [estado, setEstado] = useState("");
  const [localidade, setLocalidade] = useState("");

  function handleCep(e) {
    setCep(e.target.value);
  }

  useEffect(() => {
    const sanitizedCep = cep.replace(/\D/g, "");
    if (sanitizedCep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          console.warn("CEP não encontrado");
          return;
        }
        const { logradouro, localidade, uf, bairro, estado } = data;
        setBairro(bairro);
        setRua(logradouro);
        setEstado(estado);
        setLocalidade(localidade);

        const address = `${
          logradouro ? logradouro + "," : ""
        }${localidade}, ${uf}`;
        fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
      });
  }, [cep]);

  return (
    <>
      <h2>Cep Encontrado</h2>
      <input type="number" placeholder="Inserir o CEP" onChange={handleCep} />

      <br />
      {cep && cep.length === 8 &&  (
        <>
         <h2>Localização:</h2>
        <div className={style.containerLoc}>
          {bairro}
          <br />
          <br />
          {rua}
          <br />
          <br />
          {estado}
          <br />
          <br />
          {localidade}
        </div>
        </>
       
      )}
    </>
  );
}

export default App;
