import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Close } from "./close.svg";
import styles from "./Notices.module.scss";

export const NoticeItem = ({ remove, item }) => {
  return (
    <div className={styles.DialogItem}>
      <div className={styles.DialogContent}>
        <Link to={`/user/page/${item.uidSender}`} className={styles.CompanionName}>{item.body}</Link>
      </div>
      <div className={styles.DialogLink} onClick={() => remove(item.nid)}>
        <Close />
      </div>
    </div>
  );
}