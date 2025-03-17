import React, { useState } from "react";
import "./AIInteraction.css";

const AIInteraction = ({ models, sendMessage, conversation, setSelectedModel, selectedModel, isLoading }) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim() !== "") {
            sendMessage(message);
            setMessage("");
        }
    };

    return (
        <div className="ai-container">
            <h2>🤖 Interaction avec l'IA - <span className="ai-model">{selectedModel}</span></h2>
            
            <label htmlFor="model-select">⚙️ Modèle IA :</label>
            <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="ai-select"
            >
                {models.map((model, index) => (
                    <option key={index} value={model}>{model}</option>
                ))}
            </select>

            <div className="conversation-container">
                {conversation.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === "user" ? "user" : "ia"}`}>
                        <strong className="message-sender">{msg.sender === "user" ? "👤 Vous" : "🤖 IA"} :</strong>
                        <span className="message-text">{msg.text}</span>
                    </div>
                ))}
                {isLoading && (
                    <div className="message ia loading">
                        <strong className="message-sender">🤖 IA :</strong>
                        <span className="message-text">⏳ L'IA réfléchit...</span>
                    </div>
                )}
            </div>

            <div className="input-container">
                <textarea
                    placeholder="Écrivez votre message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="ai-input"
                    rows="4"
                    style={{ height: "120px", padding: "10px", fontSize: "16px", borderRadius: "8px" }}
                />
                <button onClick={handleSend} className="ai-send">🚀 Envoyer</button>
            </div>
        </div>
    );
};

export default AIInteraction;
