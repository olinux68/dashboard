import React from "react";
import "./Hero.css";

const Hero = ({ user }) => {
    return (
        <header className="p-16 text-center bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg">
            <h2 className="text-3xl font-bold">Bienvenue {user}, dans votre environnement IA local</h2>
            <p className="text-gray-400 mt-3">Une interface moderne et fluide pour gérer vos ressources et interagir avec l'intelligence artificielle locale.</p>
        </header>
    );
};

export default Hero;
