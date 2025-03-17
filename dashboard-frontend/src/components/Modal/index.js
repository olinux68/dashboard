import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ title, content, closeModal }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 10); // Effet d'apparition
    }, []);

    const handleBackgroundClick = (event) => {
        if (event.target.classList.contains("modal-overlay")) {
            setVisible(false);
            setTimeout(closeModal, 200); // Délai pour l'effet de sortie
        }
    };

    return (
        <div className={`modal-overlay ${visible ? "show" : ""}`} onClick={handleBackgroundClick}>
            <div className={`modal-content ${visible ? "zoom-in" : "zoom-out"}`}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={() => {
                        setVisible(false);
                        setTimeout(closeModal, 200);
                    }}>✖</button>
                </div>
                <div className="modal-body">{content}</div>
            </div>
        </div>
    );
};

export default Modal;
