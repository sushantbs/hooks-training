// @ts-check
import React, { useState, useEffect } from "react";
import socketLibrary from "../../lib/socketLibrary";
import "./Landing.css";

function HomeHook() {
  const [messages, setMessages] = useState([]);
  const [inputString, setInputString] = useState("");
  const [meta, setMeta] = useState(null);
  const [postingMessage, setPostingMessage] = useState(false);
  const [connection, setConnection] = useState(null);

  const consumeMessage = (msg) => {
    setMessages([
      ...messages,
      msg
    ])
  }

  const consumeMetadata = (meta) => {
    setMeta(meta);
  }

  const postMessage = async () => {
    setPostingMessage(true);

    const resp = await connection.post("message", inputString);
    if (resp.success) {
      setInputString("");
    } else {
      // handle post errors here
    }
  }

  const detectAndHandleEnter = (e) => {
    if (e.keyCode === 13) {
      postMessage();
    }
  }

  const makeSocketConnection = async () => {
    const conn = await socketLibrary.connect({
      url: "/socket/endpoint"
    });

    conn.on("message", msg => consumeMessage(msg));
    conn.on("meta", meta => consumeMetadata(meta));

    setConnection(conn);
  }

  useEffect(() => {

    makeSocketConnection();
    return () => {
      connection.disconnect();
    }
  }, []);

  return (
    <div className="app-container">
      <div className="chat-container">
        {
          messages.map(message => (
            <div className={`message ${message.sender === "me" ? `my-message` : `others-message`}`}>
              <div className="sender-name">{message.sender}</div>
              <div className="message-content">{message.content}</div>
            </div>
          ))
        }
      </div>
      <div className="chat-input">
        <input type="text" value={inputString} onKeyDown={e => detectAndHandleEnter(e)} onChange={e => setInputString(e.target.value)} />
        <input type="button" value="Send" onClick={e => postMessage()} />
      </div>
    </div>
  )
}

export default HomeHook;