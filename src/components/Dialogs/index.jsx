import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { fetchInitDialogs } from '../../store/actions';
import { DialogItem } from './DialogItem';
import styles from './Dialogs.module.scss';

const Dialogs = ({ title, onClick }) => {
  const dispatch = useDispatch();
  const dialogs = useSelector((store) => store.dialogs);

  React.useEffect(() => {
    dispatch(fetchInitDialogs());
  }, [dispatch]);

  return (
    <div className={styles.Dialog} onClick={onClick}>
      {title && <h2>{title}</h2>}
      {(Array.isArray(dialogs) && dialogs.length) ? dialogs.map((item) => {
        return <DialogItem key={item.uid} dialog={item} />;
      }) : <div className={styles.EmptyDialogs}>You have no chats</div>}
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