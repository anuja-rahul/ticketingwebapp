"use client";
import React, { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");

  const sendRequest = async () => {
    try {
      const res = await fetch("http://localhost:8080/test/hello");
      const text = await res.text();
      setResponse(text);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Error fetching data");
    }
  };

  return (
    <div>
      <h1>Hello, this is the home</h1>
      <button onClick={sendRequest}>Send Request</button>
      <p>Response: {response}</p>
    </div>
  );
}
