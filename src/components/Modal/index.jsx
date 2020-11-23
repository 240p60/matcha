import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({ children, title, onClose }) => {
  return (
    <form action="" method="POST" name="deleteUser" className={styles.ModalContainer}>
      <div className={styles.Modal}>
        <div className={styles.ModalTitle}>
          <h3>{title}</h3>
        </div>
        {children}
        <div className={styles.ModalClose} onClick={() => onClose()}>X</div>
      </div>
    </form>
  );
};

export default Modal;
