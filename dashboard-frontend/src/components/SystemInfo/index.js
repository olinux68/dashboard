import React from "react";
import "./SystemInfo.css";

const SystemInfo = ({ system, disk }) => {
    return (
        <div className="system-container">
            <h2>⚙️ Informations Système</h2>
            <div className="system-grid">
                <div className="system-card">
                    <h3>📊 CPU</h3>
                    <p><strong>Charge CPU :</strong> {system.cpuLoad.toFixed(2)}%</p>
                </div>
                <div className="system-card">
                    <h3>💾 Mémoire</h3>
                    <p><strong>RAM Totale :</strong> {(system.totalMem / (1024 * 1024 * 1024)).toFixed(2)} Go</p>
                    <p><strong>RAM Utilisée :</strong> {(system.usedMem / (1024 * 1024 * 1024)).toFixed(2)} Go</p>
                </div>
                <div className="system-card">
                    <h3>🖴 Disque</h3>
                    <p><strong>Capacité :</strong> {disk.total}</p>
                    <p><strong>Utilisé :</strong> {disk.used}</p>
                    <p><strong>Disponible :</strong> {disk.available}</p>
                </div>
            </div>
        </div>
    );
};

export default SystemInfo;
