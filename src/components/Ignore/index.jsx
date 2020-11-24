import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { 
  fetchInitIgnoreList, 
  fetchInitBlackList, 
  fetchInitHistory,
  fetchInitGuests,
  fetchInitFollowers,
  fetchRemoveFromIgnore, 
  fetchRemoveFromBlackList
} from '../../store/actions';
import { Pagination } from '../index';
import { IgnoreItem } from './IngoreItem';
import styles from './Ignore.module.scss';

const Ignore = ({ type, title, onClick }) => {
  const length = 10;
  const [itemsAmount, setItemsAmount] = React.useState({min: 1, max: length});
  const dispatch = useDispatch();
  const blackList = useSelector((store) => store.blackList);
  const ignoreList = useSelector((store) => store.ignoreList);
  const history = useSelector((store) => store.history);
  const guests = useSelector((store) => store.guests);
  const followers = useSelector((store) => store.followers);

  React.useEffect(() => {
    if (type === "ignore") {
      dispatch(fetchInitIgnoreList());
    } else if (type === "blacklist") {
      dispatch(fetchInitBlackList());
    } else if (type === "history") {
      dispatch(fetchInitHistory());
    } else if (type === "guests") {
      dispatch(fetchInitGuests());
    } else if (type === "followers") {
      dispatch(fetchInitFollowers());
    }
  }, [dispatch, type]);

  const removeFromBlackList = React.useCallback((uid) => {
    dispatch(fetchRemoveFromBlackList(uid));
  }, [dispatch]);

  const removeFromIgnore = React.useCallback((uid) => {
    dispatch(fetchRemoveFromIgnore(uid));
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
      {type === 'ignore' && ((Array.isArray(ignoreList) && ignoreList.length) ? (
        <>
          {ignoreList.map((item, index) => {
            if (index + 1 >= itemsAmount.min && index + 1 <= itemsAmount.max) {
              return <IgnoreItem unset={removeFromIgnore} key={item.uid} item={item} />;
            } else return null;
          })}
          {(Array.isArray(ignoreList) && ignoreList.length) ? <Pagination changePage={changeAmount} pages={Math.ceil(ignoreList.length / length)}/> : null}
        </>
      ) : <div className={styles.EmptyDialogs}>You have no users in ignore list</div>)}
      {type === 'blacklist' && ((Array.isArray(blackList) && blackList.length) ? (
        <>
          {blackList.map((item, index) => {
            if (index + 1 >= itemsAmount.min && index + 1 <= itemsAmount.max) {
              return <IgnoreItem unset={removeFromBlackList} key={item.uid} item={item} />;
            } else return null;
          })}
          {(Array.isArray(blackList) && blackList.length) ? <Pagination changePage={changeAmount} pages={Math.ceil(blackList.length / length)}/> : null}
        </>
      ) : <div className={styles.EmptyDialogs}>You have no users in black list</div>)}
      {type === 'history' && ((Array.isArray(history) && history.length) ? (
        <>
          {history.map((item, index) => {
            if (index + 1 >= itemsAmount.min && index + 1 <= itemsAmount.max) {
              return <IgnoreItem unset={removeFromBlackList} key={item.uid} item={item} />;
            } else return null;
          })}
          {(Array.isArray(history) && history.length) ? <Pagination changePage={changeAmount} pages={Math.ceil(history.length / length)}/> : null}
        </>
      ) : <div className={styles.EmptyDialogs}>You have no users in history list</div>)}
      {type === 'guests' && ((Array.isArray(guests) && guests.length) ? (
        <>
          {guests.map((item, index) => {
            if (index + 1 >= itemsAmount.min && index + 1 <= itemsAmount.max) {
              return <IgnoreItem unset={removeFromBlackList} key={item.uid} item={item} />;
            } else return null;
          })}
          {(Array.isArray(guests) && guests.length) ? <Pagination changePage={changeAmount} pages={Math.ceil(guests.length / length)}/> : null}
        </>
      ) : <div className={styles.EmptyDialogs}>You have no users in guests list</div>)}
      {type === 'followers' && ((Array.isArray(followers) && followers.length) ? (
        <>
          {followers.map((item, index) => {
            if (index + 1 >= itemsAmount.min && index + 1 <= itemsAmount.max) {
              return <IgnoreItem key={item.uid} item={item} />;
            } else return null;
          })}
          {(Array.isArray(followers) && followers.length) ? <Pagination changePage={changeAmount} pages={Math.ceil(followers.length / length)}/> : null}
        </>
      ) : <div className={styles.EmptyDialogs}>You have no users in followers</div>)}
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