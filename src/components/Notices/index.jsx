import React from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveNotice, fetchRemoveAllNotices } from '../../store/actions';
import { NoticeItem } from './NoticeItem';
import { Pagination } from '../index';
import styles from './Notices.module.scss';

const Notices = ({ type, title, onClick }) => {
  const length = 10;
  const [itemsAmount, setItemsAmount] = React.useState({min: 1, max: length});
  const dispatch = useDispatch();
  const notice = useSelector((store) => store.notice);

  const removeNotice = React.useCallback((nid) => {
    dispatch(fetchRemoveNotice(nid));
  }, [dispatch]);

  const removeAllNotice = React.useCallback(() => {
    dispatch(fetchRemoveAllNotices());
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
      <div className={styles.TitleBlock}>
        {title && <h2>{title}</h2>}
        <div onClick={() => removeAllNotice()} className={styles.RemoveNotices}>
          Remove all
        </div>
      </div>
      {(Array.isArray(notice) && notice.length) ? notice.map((item, index) => {
          if (index + 1 >= itemsAmount.min && index + 1 <= itemsAmount.max) {
            return <NoticeItem remove={removeNotice} key={item.nid} item={item} />;
          } else return null;
        }) : <div className={styles.EmptyDialogs}>You have no notifications</div>}
      {(Array.isArray(notice) && notice.length) ? <Pagination changePage={changeAmount} pages={Math.ceil(notice.length / length)}/> : null}
    </div>
  )
}

Notices.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.number),
}

Notices.defaultProps = {
  chats: [],
}

export default Notices;