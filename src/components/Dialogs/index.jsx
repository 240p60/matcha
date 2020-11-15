import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { DialogItem } from './DialogItem';
import styles from './Dialogs.module.scss';

const Dialogs = ({ title, onClick }) => {
  const dialogs = useSelector((store) => store.dialogs);

  return (
    <div className={styles.Dialog} onClick={onClick}>
      {title && <h2>{title}</h2>}
      {Array.isArray(dialogs) && dialogs.length && dialogs.map((item) => {
        return <DialogItem key={item.uid} dialog={item} />;
      })}
    </div>
  )
}

Dialogs.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.number),
}

Dialogs.defaultProps = {
  chats: [],
}

export default Dialogs;