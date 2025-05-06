import { useState, useEffect } from "react";
import style from "./App.module.css";
import Warning from "./components/Warning";

function App() {
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [estado, setEstado] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [erro, setErro] = useState(false);

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
          setErro(true);
          return;
        }
        setErro(false);
        const { logradouro, localidade, uf, bairro } = data;
        setBairro(bairro);
        setRua(logradouro);
        setEstado(uf); // Corrigido: usar `uf` e não `estado`
        setLocalidade(localidade);

        const address = `${logradouro ? logradouro + "," : ""}${localidade}, ${uf}`;
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      });
  }, [cep]);

  return (
    <>
      <h2>Cep Encontrado</h2>
      <input type="number" placeholder="Inserir o CEP" onChange={handleCep} />

   

      <br />
      {cep && cep.length === 8 && !erro && (
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
         {erro && <Warning close={() => setErro(false)} />}
    </>
  );
}

export default App;
