import React, { useState } from "react";
import axios from "axios";

const Command: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendCommand = async () => {
    setLoading(true);
    setError(null);
    axios({
      method: "PUT",
      url: "api/cmd",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ a: "a", b: "b" }),
    }).then((res) => {
      if (res.status === 200) {
        console.log(res.data.a);
        setResponse(JSON.stringify(res.data));
      } else {
        throw new Error("Failed to fetch");
      }
    }).catch((e) => {
      setError(e);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div>
      <button onClick={sendCommand} disabled={loading}>
        {loading ? "Sending..." : "Send Command"}
      </button>

      {response && <p>Response: {response}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Command;