import React from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveNotice } from '../../store/actions';
import { NoticeItem } from './NoticeItem';
import styles from './Notices.module.scss';

const Notices = ({ type, title, onClick }) => {
  const dispatch = useDispatch();
  const notice = useSelector((store) => store.notice);

  const removeNotice = React.useCallback((nid) => {
    dispatch(fetchRemoveNotice(nid));
  }, [dispatch]);

  return (
    <div className={styles.Dialog} onClick={onClick}>
      {title && <h2>{title}</h2>}
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