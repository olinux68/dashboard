import React from "react";
import "./Navbar.css";
const Navbar = ({ openModal, user }) => {
    return (
        <nav className="bg-gray-800 p-6 flex justify-between items-center shadow-md border-b border-gray-700">
            <h1 className="text-2xl font-bold">🚀 Interface IA Locale</h1>
            <div className="flex space-x-6">
                <button onClick={() => openModal("system")} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow">🔹 Système</button>
                <button onClick={() => openModal("processes")} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow">🔹 Processus</button>
                <button onClick={() => openModal("network")} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow">🔹 Réseau</button>
                <button onClick={() => openModal("ai")} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow">🤖 IA</button>
            </div>
            <span className="text-gray-300 font-medium">👤 {user}</span>
        </nav>
    );
};

export default Navbar;
