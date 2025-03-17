// 📌 Mise à jour : Correction de l'affichage du champ de texte et gestion correcte du message "IA réfléchit..."
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Modal from "./components/Modal";
import SystemInfo from "./components/SystemInfo";
import Processes from "./components/Processes";
import Network from "./components/Network";
import AIInteraction from "./components/AIInteraction";

// Importation du fichier CSS global
import "./App.css";

const App = () => {
    const [user, setUser] = useState("");
    const [system, setSystem] = useState(null);
    const [disk, setDisk] = useState(null);
    const [processes, setProcesses] = useState(null);
    const [ports, setPorts] = useState(null);
    const [models, setModels] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [selectedModel, setSelectedModel] = useState("codellama");
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        axios.get("http://localhost:7500/api/user")
            .then((res) => setUser(res.data.user))
            .catch((err) => console.error("❌ Erreur API User:", err));

        axios.get("http://localhost:7500/api/system")
            .then((res) => setSystem(res.data))
            .catch((err) => console.error("❌ Erreur API System:", err));
        
        axios.get("http://localhost:7500/api/disk")
            .then((res) => setDisk(res.data))
            .catch((err) => console.error("❌ Erreur API Disk:", err));

        axios.get("http://localhost:7500/api/processes")
            .then((res) => setProcesses(res.data.processes))
            .catch((err) => console.error("❌ Erreur API Processes:", err));

        axios.get("http://localhost:7500/api/ports")
            .then((res) => setPorts(res.data.ports))
            .catch((err) => console.error("❌ Erreur API Ports:", err));

        axios.get("http://localhost:7500/api/ollama/models")
            .then((res) => setModels(res.data.models))
            .catch((err) => console.error("❌ Erreur API Models:", err));
    }, []);

    const sendMessage = async (message) => {
        const newConversation = [...conversation, { sender: "user", text: message }];
        setConversation([...newConversation]); // Ne pas afficher "L'IA réfléchit..." immédiatement
        setIsLoading(true);

        try {
            const res = await axios.post("http://localhost:7500/api/ollama/run", {
                model: selectedModel,
                prompt: message,
            });
            setConversation([...newConversation, { sender: "ia", text: res.data.response }]); // Remplace "L'IA réfléchit..." par la réponse réelle
        } catch (error) {
            console.error("❌ Erreur API IA:", error);
            setConversation([...newConversation, { sender: "ia", text: "⚠️ Erreur de réponse de l'IA" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar openModal={setModalContent} user={user} />
            <Hero user={user} />
            {modalContent && (
                <Modal 
                    title={modalContent === "ai" ? `IA - Modèle : ${selectedModel}` : modalContent} 
                    content={
                        modalContent === "system" ? (system ? <SystemInfo system={system} disk={disk} /> : <p>⏳ Chargement des informations système...</p>) :
                        modalContent === "processes" ? (processes ? <Processes processes={processes} /> : <p>⏳ Chargement des processus...</p>) :
                        modalContent === "network" ? (ports ? <Network ports={ports} /> : <p>⏳ Chargement des informations réseau...</p>) :
                        modalContent === "ai" ? (models ? <AIInteraction models={models} sendMessage={sendMessage} conversation={conversation} setSelectedModel={setSelectedModel} selectedModel={selectedModel} inputHeight="100px" isLoading={isLoading} /> : <p>⏳ Chargement des modèles IA...</p>) : null
                    }
                    closeModal={() => setModalContent(null)}
                    animated={true}
                />
            )}
        </div>
    );
};

export default App;
