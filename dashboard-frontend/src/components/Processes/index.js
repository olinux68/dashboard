import React, { useState } from "react";
import "./Processes.css";

const Processes = ({ processes }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrer les processus selon la recherche
    const filteredProcesses = processes.filter((process) =>
        process.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="processes-container">
            <h2>📌 Processus en cours</h2>
            <input
                type="text"
                placeholder="🔍 Rechercher un processus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="process-search"
            />
            <div className="process-table">
                <table>
                    <thead>
                        <tr>
                            <th>Utilisateur</th>
                            <th>PID</th>
                            <th>% CPU</th>
                            <th>% MEM</th>
                            <th>Commande</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProcesses.slice(1).map((process, index) => {
                            const columns = process.split(/\s+/);
                            return (
                                <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                    <td>{columns[0]}</td>
                                    <td>{columns[1]}</td>
                                    <td>{columns[2]}</td>
                                    <td>{columns[3]}</td>
                                    <td>{columns.slice(10).join(" ")}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Processes;
