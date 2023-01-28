import React, { useState } from "react";
import "./Insert.css";

function Insert() {
  const [data, setData] = useState({
    number: "",
    ptTitle: "",
    enTitle: "",
  });
  const [error, setError] = useState("");

  const handleData = (e) => {
    setData((oldData) => {
      return {
        ...oldData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const sendData = async () => {
    const dataToSend = { ...data, number: Number(data.number) };
    if (dataToSend.enTitle && dataToSend.number && dataToSend.ptTitle) {
      const response = await fetch("http://localhost:1234/salvar", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: { "Content-Type": "application/json", mode: "no-cors" },
      });
      if (response.status === 200) {
        setData({ ptTitle: "", number: "", enTitle: "" });
        setError("");
      }
    }

    console.log(isNaN(dataToSend.number));
    if (isNaN(dataToSend.number)) return setError("Number must be a number lol");

    if (!dataToSend.enTitle || !dataToSend.number || !dataToSend.ptTitle) {
      setError("Some field is empty");
    }
  };

  return (
    <div className="container">
      <div className="form-div">
        <form className="form">
          <input
            className="input-field"
            placeholder="Numero"
            name="number"
            type="text"
            value={data.number}
            onChange={handleData}
          />
          <input
            className="input-field"
            placeholder="Nome Ingles"
            name="enTitle"
            type="text"
            value={data.enTitle}
            onChange={handleData}
          />
          <input
            className="input-field"
            placeholder="Nome Portugues"
            name="ptTitle"
            value={data.ptTitle}
            onChange={handleData}
          />
        </form>
        <button type="submit" className="button" onClick={sendData}>
          {error ? error : "Add Movie"}
        </button>
      </div>
    </div>
  );
}
export default Insert;
