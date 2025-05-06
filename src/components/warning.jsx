
import style from "./Warning.module.css";

const Warning = ({ close }) => {
  return (
    <div className={style.alerta}>
      ⚠️ CEP não encontrado. Verifique e tente novamente.
      <button onClick={close}>❌</button>
    </div>
  );
};

export default Warning;
