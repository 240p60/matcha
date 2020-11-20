import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { fetchInitIgnoreList, fetchInitBlackList, fetchRemoveFromIgnore, fetchRemoveFromBlackList } from '../../store/actions';
import { IgnoreItem } from './IngoreItem';
import styles from './Ignore.module.scss';

const Ignore = ({ type, title, onClick }) => {
  const dispatch = useDispatch();
  const blackList = useSelector((store) => store.blackList);
  const ignoreList = useSelector((store) => store.ignoreList);

  React.useEffect(() => {
    if (type === "ignore") {
      dispatch(fetchInitIgnoreList());
    } else if (type === "blacklist") {
      dispatch(fetchInitBlackList());
    }
  }, [dispatch, type]);

  const removeFromBlackList = React.useCallback((uid) => {
    dispatch(fetchRemoveFromBlackList(uid));
  }, [dispatch]);

  const removeFromIgnore = React.useCallback((uid) => {
    dispatch(fetchRemoveFromIgnore(uid));
  }, [dispatch]);

  return (
    <div className={styles.Dialog} onClick={onClick}>
      {title && <h2>{title}</h2>}
      {type === 'ignore' && ((Array.isArray(ignoreList) && ignoreList.length) ? ignoreList.map((item) => {
          return <IgnoreItem unset={removeFromIgnore} key={item.uid} item={item} />;
        }) : <div className={styles.EmptyDialogs}>You have no users in ignore list</div>)}
      {type === 'blacklist' && ((Array.isArray(blackList) && blackList.length) ? blackList.map((item) => {
          return <IgnoreItem unset={removeFromBlackList} key={item.uid} item={item} />;
        }) : <div className={styles.EmptyDialogs}>You have no users in black list</div>)}
    </div>
  )
}

Ignore.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.number),
}

Ignore.defaultProps = {
  chats: [],
}

export default Ignore;