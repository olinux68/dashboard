import React, { useState } from "react";
import "./Network.css";

const Network = ({ ports }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrer les ports selon la recherche
    const filteredPorts = ports.filter((port) =>
        `${port.port} ${port.process}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="network-container">
            <h2>🌐 Ports ouverts</h2>
            <input
                type="text"
                placeholder="🔍 Rechercher un port ou un processus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="network-search"
            />
            <div className="network-table">
                <table>
                    <thead>
                        <tr>
                            <th>Adresse</th>
                            <th>Processus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPorts.map((port, index) => (
                            <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                <td>{port.port}</td>
                                <td>{port.process || "Inconnu"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Network;
