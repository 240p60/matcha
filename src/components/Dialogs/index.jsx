import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { fetchInitDialogs } from "../../store/Dialogs/actions";
import { DialogItem } from './DialogItem';
import styles from './Dialogs.module.scss';

const Dialogs = ({ title, onClick }) => {
  const dispatch = useDispatch();
  const dialogs = useSelector((store) => store.dialogs);

  const initDialogs = React.useCallback(() => {
    dispatch(fetchInitDialogs());
  }, [dispatch]);

  React.useEffect(() => {
    initDialogs();
  }, []);
  return (
    <div className={styles.Dialog}>
      {title && <h2>{title}</h2>}
      {Array.isArray(dialogs) && dialogs.length && dialogs.map((item) => {
        return <DialogItem onClick={onClick} key={item} dialog={item} />;
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