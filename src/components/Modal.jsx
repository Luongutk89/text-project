import { useState, useEffect } from 'react';
import { FiX } from "react-icons/fi";


const ModalHeader = ({ onClose, children, modalTitle }) => {
    return (
        <div className="modal__header">
            {children ? children : (

                <>
                    <h2 className="modal__title">{modalTitle ? modalTitle : 'Modal Title'}</h2>
                    <button className="modal__btn-close" onClick={onClose}>
                        <FiX className="icon__close" />
                    </button>
                </>
            )}
        </div>
    );
}


const ModalBody = ({ children }) => {
    return (
        <div className="modal__body">
            {children ? children : (
                <p className="text__demo">Modal body text goes here</p>
            )}
        </div>
    )
}


const ModalFooter = ({ children, onFinish, onClose, finishTitle, closeTitle }) => {
    return (
        <div className="modal__footer">
            {children ? children : (
                <>
                    <button className="btn__close-modal" onClick={onClose}> {closeTitle ? closeTitle : 'Finish'}</button>
                    <button className="btn__finish-modal" onClick={onFinish}>{finishTitle ? finishTitle : 'Close'}</button>
                </>
            )}
        </div>
    );
}


const Modal = ({ show, children, modalClass }) => {
    const [modalStyles, setModalStyles] = useState({
        opacity: 0,
        pointerEvents: 'none',
    });

    useEffect(() => {
        if (show) {
            setModalStyles({
                opacity: 1,
                pointerEvents: 'auto',
            });
        } else {
            setModalStyles({
                opacity: 0,
                pointerEvents: 'none',
            });
        }
    }, [show]);

    return (
        <div className={`modal__overlay ${modalClass}`} style={modalStyles}>
            <div className={`modal ${show ? 'active' : ''}`}>
                {children}
            </div>
        </div>
    );
}

export { ModalHeader, ModalBody, ModalFooter, Modal };
