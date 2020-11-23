import React from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveNotice, fetchRemoveAllNotices } from '../../store/actions';
import { NoticeItem } from './NoticeItem';
import styles from './Notices.module.scss';

const Notices = ({ type, title, onClick }) => {
  const dispatch = useDispatch();
  const notice = useSelector((store) => store.notice);

  const removeNotice = React.useCallback((nid) => {
    dispatch(fetchRemoveNotice(nid));
  }, [dispatch]);

  const removeAllNotice = React.useCallback(() => {
    dispatch(fetchRemoveAllNotices());
  }, [dispatch]);

  return (
    <div className={styles.Dialog} onClick={onClick}>
      <div className={styles.TitleBlock}>
        {title && <h2>{title}</h2>}
        <div onClick={() => removeAllNotice()} className={styles.RemoveNotices}>
          Remove all
        </div>
      </div>
      {(Array.isArray(notice) && notice.length) ? notice.reverse().map((item) => {
          return <NoticeItem remove={removeNotice} key={item.nid} item={item} />;
        }) : <div className={styles.EmptyDialogs}>You have no notifications</div>}
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