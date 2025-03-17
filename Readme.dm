# 🚀 Dashboard WSL2 - Interface IA Locale

![GitHub repo](https://img.shields.io/github/repo-size/olinux68/dashboard-wsl2?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/olinux68/dashboard-wsl2?style=flat-square)
![GitHub license](https://img.shields.io/github/license/olinux68/dashboard-wsl2?style=flat-square)

## 📝 Description
**Dashboard WSL2** est une interface web permettant aux utilisateurs de **visualiser l'état de leur machine WSL2**, gérer les processus en cours, surveiller les ports ouverts et interagir avec une **intelligence artificielle locale (Ollama)**.

L'application est **divisée en deux parties** :
- **Backend (Node.js + Express.js)** pour récupérer les informations système.
- **Frontend (React.js)** pour afficher les données et interagir avec l'IA.

---

## 🎯 **Fonctionnalités**
✅ Affichage des **ressources système** (CPU, RAM, disque).  
✅ Visualisation des **processus actifs**.  
✅ Liste des **ports ouverts et services en cours d’exécution**.  
✅ **Interface IA locale** via Ollama, avec un historique de conversation.  
✅ Interface **moderne et réactive** avec **effet de fenêtres flottantes**.  

---

## 📂 **Architecture du projet**
```
dashboard-wsl2/
│── backend/                 # Serveur Node.js (Express)
│   ├── server.js            # Point d'entrée du backend
│   ├── routes/              # Routes API
│   ├── services/            # Gestion des données système
│   ├── package.json         # Dépendances et scripts
│   └── README.md            # Documentation backend
│
│── frontend/                # Application React.js
│   ├── src/                 # Code source React
│   │   ├── components/      # Composants réutilisables
│   │   ├── hooks/           # Hooks personnalisés
│   │   ├── App.js           # Point d’entrée React
│   │   ├── styles/          # Fichiers CSS
│   │   └── index.js         # Chargement de l'application
│   ├── package.json         # Dépendances frontend
│   └── README.md            # Documentation frontend
│
└── README.md                # Documentation globale du projet
```

---

## 🚀 **Installation et Exécution**
### 🛠️ **1. Prérequis**
- **WSL2 sous Debian**
- **ollama curl -fsSL https://ollama.com/install.sh | sh
- **Node.js** (version 22+)
- **npm** ou **yarn**
- **Git** installé

### 📌 **2. Cloner le projet**
```bash
git clone https://github.com/olinux68/dashboard-wsl2.git
cd dashboard-wsl2
```

### 🔧 **3. Installation du Backend**
```bash
cd backend
npm install
```

### ▶️ **4. Lancer le Backend**
```bash
node server.js
```
> Le backend écoute sur `http://localhost:7500`.

### 🔧 **5. Installation du Frontend**
```bash
cd ../frontend
npm install
```

### ▶️ **6. Lancer le Frontend**
```bash
npm start
```
> L’application est accessible sur `http://localhost:3000`.

---

## ⚡ **Déploiement en service systemd**
Tu peux lancer le backend et le frontend en **services systemd** pour qu’ils démarrent au boot.

### 📌 **Service Backend**
```bash
sudo nano /etc/systemd/system/dashboard-backend.service
```
Ajoute ceci :
```ini
[Unit]
Description=Dashboard Backend Service
After=network.target

[Service]
ExecStart=/usr/bin/node /opt/dashboard-backend/server.js
Restart=always
User=olinux
WorkingDirectory=/opt/dashboard-backend

[Install]
WantedBy=multi-user.target
```
Puis active et démarre :
```bash
sudo systemctl daemon-reload
sudo systemctl enable dashboard-backend
sudo systemctl start dashboard-backend
```

### 📌 **Service Frontend**
```bash
sudo nano /etc/systemd/system/dashboard-frontend.service
```
Ajoute ceci :
```ini
[Unit]
Description=Dashboard Frontend Service
After=network.target

[Service]
ExecStart=/home/olinux/.nvm/versions/node/v22.14.0/bin/serve -s /opt/dashboard-frontend/build --single -l 3000
Restart=always
User=olinux
WorkingDirectory=/opt/dashboard-frontend

[Install]
WantedBy=multi-user.target
```
Puis active et démarre :
```bash
sudo systemctl daemon-reload
sudo systemctl enable dashboard-frontend
sudo systemctl start dashboard-frontend
```

---

## 📌 **API Endpoints**
| **Méthode** | **Route**                | **Description** |
|------------|-------------------------|---------------|
| `GET`      | `/api/system`            | Infos CPU, RAM, disque |
| `GET`      | `/api/processes`         | Liste des processus |
| `GET`      | `/api/ports`             | Ports ouverts |
| `POST`     | `/api/ollama/run`        | Envoi d'un message à l'IA |

---

## 📜 **License**
Ce projet est sous licence **MIT**.

---

## 🤝 **Contributions**
Les contributions sont **les bienvenues** !  
- Fork le repo  
- Crée une branche (`git checkout -b feature-amélioration`)
- Commit tes changements (`git commit -m "Ajout d'une nouvelle fonctionnalité"`)
- Push la branche (`git push origin feature-amélioration`)
- Ouvre une **Pull Request**

---

## ✉️ **Contact**
📧 **Email** : olinux@hotmail.com  
🌐 **GitHub** : [olinux68](https://github.com/olinux68)

---

🎉 **Merci d'utiliser Dashboard WSL2 !** 🎉  
🚀 *Développé avec ❤️ par Olinux68*  
