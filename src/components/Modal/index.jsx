import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({ children, title }) => {
  return (
    <div className={styles.ModalContainer}>
      <div className={styles.Modal}>
        <div className={styles.ModalTitle}>
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
