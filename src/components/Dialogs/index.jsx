import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { fetchInitDialogs } from '../../store/actions';
import { DialogItem } from './DialogItem';
import { Pagination } from '../index';
import styles from './Dialogs.module.scss';

const Dialogs = ({ title, onClick }) => {
  const length = 10;
  const [itemsAmount, setItemsAmount] = React.useState({min: 1, max: length});
  const dispatch = useDispatch();
  const dialogs = useSelector((store) => store.dialogs);

  React.useEffect(() => {
    dispatch(fetchInitDialogs());
  }, [dispatch]);

  const changeAmount = (page) => {
    if (page === 1) {
      setItemsAmount({
        min: page,
        max: page * length,
      })
    } else {
      setItemsAmount({
        min: (page - 1) * length + 1,
        max: page * length,
      })
    }
  }

  return (
    <div className={styles.Dialog} onClick={onClick}>
      {title && <h2>{title}</h2>}
      {(Array.isArray(dialogs) && dialogs.length) ? dialogs.map((item, index) => {
        if (index + 1 >= itemsAmount.min && index + 1 <= itemsAmount.max) {
          return <DialogItem key={item.uid} dialog={item} />;
        } else return null;
      }) : <div className={styles.EmptyDialogs}>You have no chats</div>}
      {(Array.isArray(dialogs) && dialogs.length && title) ? <Pagination changePage={changeAmount} pages={Math.ceil(dialogs.length / length)}/> : null}
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