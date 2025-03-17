import { useEffect, useState } from "react";
import axios from "axios";

const useDashboardData = () => {
    const [user, setUser] = useState("");
    const [system, setSystem] = useState(null);
    const [disk, setDisk] = useState(null);
    const [processes, setProcesses] = useState(null);
    const [ports, setPorts] = useState(null);
    const [models, setModels] = useState(null);

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

    return { user, system, disk, processes, ports, models };
};

export default useDashboardData;
