import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const ModalContext = React.createContext();

const ModalHeader = ({ title, onClose }) => (
  <div className="modal-header">
    <h3>{title}</h3>
    <button onClick={onClose}>&times;</button>
  </div>
);

const ModalFooter = ({ cancelLabel, callToActionLabel, onCancel, onCallToAction }) => (
  <div className="modal-footer">
    <button onClick={onCancel}>{cancelLabel}</button>
    <button onClick={onCallToAction}>{callToActionLabel}</button>
  </div>
);

const ModalContent = ({ children }) => <div className="modal-content">{children}</div>;

const Modal = ({ isOpen, onClose, title, children, cancelLabel, callToActionLabel }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleCallToAction = () => {
    setIsAlertOpen(true);
    setTimeout(() => setIsAlertOpen(false), 3000);
  };

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-container">
          <ModalHeader title={title} onClose={onClose} />
          <ModalContent>{children}</ModalContent>
          <ModalFooter
            cancelLabel={cancelLabel}
            callToActionLabel={callToActionLabel}
            onCancel={onClose}
            onCallToAction={handleCallToAction}
          />
        </div>
      </div>
      {isAlertOpen && <div className="alert">OK</div>}
    </ModalContext.Provider>
  );
};

const ModalComponent = ({ isOpen, onClose, title, children, cancelLabel, callToActionLabel }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      children={children}
      cancelLabel={cancelLabel}
      callToActionLabel={callToActionLabel}
    />
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <button onClick={toggleModal}>Open Modal</button>
      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={toggleModal}
          title="My Modal"
          children="This is modal content"
          cancelLabel="Cancel"
          callToActionLabel="OK"
        />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
